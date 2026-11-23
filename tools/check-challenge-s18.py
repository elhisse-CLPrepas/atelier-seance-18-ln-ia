"""Validate the synchronized S18 payload and its visible links. --all includes S17/S19/S20."""
from pathlib import Path
from html.parser import HTMLParser
from urllib.parse import unquote, urlsplit
import argparse
import hashlib
import json
import re
import zipfile

ROOT = Path(__file__).resolve().parents[1]
NAME = 'mon-dossier-challenge-Module05'
manifest = json.loads((ROOT / NAME / '00-SOURCES/S18/SYNCHRONISATION-S18.json').read_text(encoding='utf-8'))
parser = argparse.ArgumentParser(description=__doc__)
parser.add_argument('--all', action='store_true')
args = parser.parse_args()
sessions = [ROOT.parent / f'atelier-seance-{n}-ln-ia' for n in [17, 18, 19, 20]] if args.all else [ROOT]

class Links(HTMLParser):
    def __init__(self):
        super().__init__()
        self.links = []
    def handle_starttag(self, tag, attrs):
        value = dict(attrs).get('href')
        if value:
            self.links.append(value)

for session in sessions:
    for dossier in [session / NAME, session / 'public/dossier-challenge', session / 'dist/dossier-challenge']:
        for name, expected in manifest['files'].items():
            assert hashlib.sha256((dossier / name).read_bytes()).hexdigest() == expected, dossier / name
        index = (dossier / 'index.html').read_text(encoding='utf-8')
        panel = re.search(r'<!-- PRODUCTIONS-S18:START -->(.*?)<!-- PRODUCTIONS-S18:END -->', index, re.S)
        assert panel, dossier
        links = Links()
        links.feed(panel.group(1))
        assert len(links.links) == 8
        for link in links.links:
            target = (dossier / unquote(urlsplit(link).path)).resolve()
            assert target.is_relative_to(dossier.resolve()) and target.is_file(), target
        assert 'PRODUCTIONS-S18:START' in (dossier / '06-PORTFOLIO/index-portfolio.md').read_text(encoding='utf-8')
    for kind in ['public', 'dist']:
        archive = session / kind / 'supports/dossier-challenge-Module05.zip'
        with zipfile.ZipFile(archive) as zipped:
            assert zipped.testzip() is None, archive
            assert not any('/.git/' in n for n in zipped.namelist()), archive
            for name, expected in manifest['files'].items():
                assert hashlib.sha256(zipped.read(NAME + '/' + name)).hexdigest() == expected, (archive, name)
print(f'Contrôles OK : {len(sessions) * 3} dossiers, {len(sessions) * 2} archives et {len(manifest["files"])} fichiers S18 identiques ; liens et portfolio accessibles.')
