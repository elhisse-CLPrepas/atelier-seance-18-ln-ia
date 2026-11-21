"""Build the S18 edition-2 supports from src/seance.json.
Dependencies: requirements-documents.txt; optional local install in .tools/python.
"""
from pathlib import Path
import sys,json,html,zipfile,shutil
R=Path(__file__).resolve().parents[1]
if (R/'.tools/python').exists():sys.path.insert(0,str(R/'.tools/python'))
from reportlab.platypus import SimpleDocTemplate,Paragraph,Spacer,PageBreak,Table,TableStyle
from reportlab.lib.styles import getSampleStyleSheet,ParagraphStyle
from reportlab.lib import colors
from reportlab.pdfgen import canvas
from reportlab.pdfbase import pdfmetrics
from reportlab.pdfbase.ttfonts import TTFont
from pptx import Presentation
from pptx.util import Inches,Pt
from pptx.dml.color import RGBColor
D=json.loads((R/'src/seance.json').read_text(encoding='utf-8'))
O=R/'public/supports';K=O/'kit-candidat';O.mkdir(exist_ok=True,parents=True)
NAVY='#071b33';GOLD='#b08740';MUTED='#52667a'
# Register fonts with French accents on Windows and Linux.
fontpaths=[(Path('C:/Windows/Fonts'),'arial.ttf','arialbd.ttf'),(Path('/usr/share/fonts/truetype/dejavu'),'DejaVuSans.ttf','DejaVuSans-Bold.ttf')]
FONT='Helvetica';BOLD='Helvetica-Bold'
for directory,normal,bold in fontpaths:
 if (directory/normal).exists():
  pdfmetrics.registerFont(TTFont('Body',str(directory/normal)));pdfmetrics.registerFont(TTFont('Bold',str(directory/bold)));FONT='Body';BOLD='Bold';break
pdfmetrics.registerFontFamily(FONT,normal=FONT,bold=BOLD,italic=FONT,boldItalic=BOLD)
S=getSampleStyleSheet()
for name,size,leading in [('Title',26,33),('Heading1',18,24),('Heading2',13,18),('BodyText',10.5,16),('Normal',10.5,16)]:
 S[name].fontName=BOLD if name in ['Title','Heading1','Heading2'] else FONT;S[name].fontSize=size;S[name].leading=leading;S[name].textColor=colors.HexColor(NAVY);S[name].spaceAfter=10
S.add(ParagraphStyle('Small',fontName=FONT,fontSize=9,leading=14,textColor=colors.HexColor(MUTED),spaceAfter=8))
def p(t,style='BodyText'):return Paragraph(html.escape(str(t)).replace('\n','<br/>'),S[style])
def label(a,b):return [p(a,'Heading2'),p(b)]
def head(a,b):return [p(a,'Small'),p(b,'Title'),Spacer(1,12)]
def frame(c,doc):
 c.saveState();w,h=doc.pagesize;c.setFillColor(colors.HexColor(NAVY));c.rect(0,h-65,w,65,fill=1,stroke=0)
 c.drawImage(str(R/'public/assets/logo-LN-IA.png'),40,h-55,76,38,preserveAspectRatio=True,mask='auto')
 c.setFillColor(colors.white);c.setFont(BOLD,10);c.drawString(137,h-32,'LN-IA · MODULE 05 · SÉANCE 18');c.setFont(FONT,8);c.drawString(137,h-48,'Édition 2 · Lundi 23 novembre 2026')
 c.setFillColor(colors.HexColor(MUTED));c.setFont(FONT,8);c.drawString(42,29,'Prof. Abderrahman EL HISSE · Du Web au mini-site');c.drawRightString(w-42,29,str(doc.page));c.restoreState()
def pdf(name,story):SimpleDocTemplate(str(O/name),pagesize=(595.28,841.89),leftMargin=46,rightMargin=46,topMargin=91,bottomMargin=58,title='S18 · '+name,author=D['meta']['author']).build(story,onFirstPage=frame,onLaterPages=frame)
story=head('CONDUCTEUR · 90 MINUTES','Du Web au mini-site')+[p('Rouvrir le support et le carnet S17. Préparer le dossier Challenge, les ressources et un dossier de production dans VS Code. La génération peut se poursuivre après la séance selon les outils disponibles.')]
for i,phase in enumerate(D['phases']):
 if i in [2,4]:story.append(PageBreak())
 story+=[p(phase['time']+' min · '+phase['verb'],'Heading1')]+label('Candidat',phase['candidate'])+label('À observer',phase['observe'])+label('Relance',phase['relance'])
pdf('conducteur-S18.pdf',story)
story=[]
for i,c in enumerate(D['cases']):
 if i:story.append(PageBreak())
 story+=head('DÉMONSTRATION FICTIVE · '+c['sector'],c['title'])
 for a,b in [('Public et besoin',c['public']+' — '+c['need']),('Source disponible',c['source']),('Formulation à reprendre',c['before']),('Formulation fidèle',c['after']),('Action',c['action']),('Style et interactions',c['visualStyle']+'\n'+c['interactions'])]:story+=label(a,b)
 story+=[p('Dans Atelier : charger cet exemple, adapter les champs puis exporter le prompt maître. Les observations de lecture restent personnelles.','Small')]
pdf('cas-fictifs-S18.pdf',story)
story=head('FICHE CANDIDAT · 1 / 3','Cadrer mon mini-site')
def lines(labeltext):
 table=Table([[''],['']],colWidths=[495],rowHeights=[23,23]);table.setStyle(TableStyle([('LINEBELOW',(0,0),(-1,-1),.4,colors.HexColor('#d9e2e8'))]));return [p(labeltext,'Heading2'),table,Spacer(1,9)]
for l in ['Projet, public et besoin','Source et limites à respecter','Six sections et action unique','Pages et destination']:story+=lines(l)
story+=[PageBreak()]+head('FICHE CANDIDAT · 2 / 3','Personnaliser et exporter')
for l in ['Type de site et style visuel','Interactions attendues','Ressources réellement jointes','Contraintes techniques et nom du pack','Prompt exporté et agent choisi']:story+=lines(l)
story+=[PageBreak()]+head('FICHE CANDIDAT · 3 / 3','Éprouver et conserver')
for l in ['Binôme, date et mots observés','Fichiers et ZIP réellement obtenus','Essais après extraction et déplacement','Correction et essai encore à faire','Pilote, date et décision']:story+=lines(l)
pdf('fiche-candidat-S18.pdf',story)
story=head('GUIDE DE PRODUCTION','De l’atelier à VS Code')
for a,b in [('Continuité avec S17','HTML organise le contenu, CSS définit la présentation et JavaScript gère les interactions. Le navigateur interprète les fichiers. Rouvrir le support fourni et le carnet avant de demander une production.'),('Saisie manuelle ou exemple','Dans Atelier, remplir son projet ou charger Déclic Web, Jardin partagé, Atelier Terre Claire ou Portfolio Nadia. Chaque champ reste modifiable. Le chargement demande confirmation si des saisies sont présentes.'),('Personnaliser le prompt','Préciser public, besoin, source, six sections, destination, pages, style, interactions, ressources et contraintes. Chaque modification actualise le prompt maître. Relire les limites et les fichiers à joindre.'),('Exporter','Enregistrer le contenu dans 04-WEB/contenu-page-projet.md et le prompt dans 02-PROMPTS/prompt-maitre-mini-site-S18.md. Sauvegarder le carnet JSON pour reprendre les champs.')]:story+=label(a,b)
story+=[PageBreak()]+head('PRODUCTION ET CONTRÔLE','Les fichiers, puis les essais')
for a,b in [('Lancer l’agent','Ouvrir un dossier de production dans VS Code et fournir le prompt à Codex, GPT ou Claude Code. Joindre les fichiers source et visuels réellement disponibles. Le navigateur de l’atelier prépare le prompt ; il ne lance pas l’agent.'),('Livraison demandée','Un dossier avec index.html, css/styles.css, js/app.js, assets/, pieces/, README.md et CONTROLE.md, puis une archive ZIP contenant ce dossier racine. Conserver les chemins relatifs et le fonctionnement hors ligne.'),('Éprouver le pack','Extraire dans un autre emplacement, déplacer le dossier, ouvrir index.html puis activer les liens et interactions. Essayer le clavier et une largeur mobile. Documenter les résultats réellement observés et les essais manquants.'),('Dossier et affiches','Présentation et Ressources donnent accès aux neuf affiches et à une copie consultable et téléchargeable du dossier Challenge. Les originaux personnels ne sont pas réinitialisés. Les dates d’été imprimées sur les affiches restent celles des supports originaux.')]:story+=label(a,b)
pdf('guide-web-S18.pdf',story)
story=[]
for chunk in range(3):
 if story:story.append(PageBreak())
 story+=head('RÉVISION','Les rôles et le parcours')
 for q,a in D['cards'][chunk*4:chunk*4+4]:story+=label(q,a)
for chunk in range(4):
 story+=[PageBreak()]+head('QUIZ CORRIGÉ','Comparer les choix')
 for q,choices,correct,explanations in D['quiz'][chunk*2:chunk*2+2]:
  story+=[p(q,'Heading2')]
  for j,(c,exp) in enumerate(zip(choices,explanations)):story+=[p(c+(' · Choix attendu' if j==correct else ''),'BodyText'),p(exp,'Small')]
pdf('revision-S18.pdf',story)
# Matching editable PPTX and landscape PDF, same 22 slides and notes.
prs=Presentation();prs.slide_width=Inches(13.333);prs.slide_height=Inches(7.5)
C=canvas.Canvas(str(O/'presentation-S18.pdf'),pagesize=(960,540));C.setTitle(D['meta']['title']);C.setAuthor(D['meta']['author'])
def pdftext(text,x,top,width,size,color,bold=False,maxheight=100):
 style=ParagraphStyle('slide',fontName=BOLD if bold else FONT,fontSize=size,leading=size*1.25,textColor=colors.HexColor(color))
 pp=Paragraph(html.escape(text),style);_,h=pp.wrap(width,500)
 if h>maxheight:raise ValueError('PDF overflow: '+text)
 pp.drawOn(C,x,540-top-h)
def ppttext(sl,text,x,y,w,h,size,color,bold=False):
 box=sl.shapes.add_textbox(Inches(x),Inches(y),Inches(w),Inches(h));tf=box.text_frame;tf.clear();tf.word_wrap=True;tf.margin_left=tf.margin_right=Inches(.015);tf.margin_top=Inches(.02)
 para=tf.paragraphs[0];para.text=text;para.font.name='Arial';para.font.size=Pt(size);para.font.bold=bold;para.font.color.rgb=RGBColor.from_string(color.lstrip('#'))
 return box
for i,s in enumerate(D['slides']):
 dark=s['dark'];bg=NAVY if dark else '#f7f9fb';fg='#ffffff' if dark else NAVY;muted='#d4dfe9' if dark else MUTED
 sl=prs.slides.add_slide(prs.slide_layouts[6]);sl.background.fill.solid();sl.background.fill.fore_color.rgb=RGBColor.from_string(bg[1:])
 C.setFillColor(colors.HexColor(bg));C.rect(0,0,960,540,fill=1,stroke=0)
 for text,x,y,w,h,size,color,bold in [('MODULE 05 / SÉANCE 18',.65,.35,9,.4,11,muted,True),(s['title'],.65,1.15,12,1.05,32,fg,True),(s['lead'],.65,2.35,12,.75,18,muted,False)]:
  ppttext(sl,text,x,y,w,h,size,color,bold);pdftext(text,x*72,y*72,w*72,size,color,bold,h*72)
 sl.shapes.add_picture(str(R/'public/assets/logo-LN-IA.png'),Inches(11.45),Inches(.3),width=Inches(1.2))
 C.drawImage(str(R/'public/assets/logo-LN-IA.png'),824,475,86,43,preserveAspectRatio=True,mask='auto')
 for j,(a,b) in enumerate(s['points']):
  x=.65+j*6.1
  ppttext(sl,a,x,3.65,5.7,.55,21,GOLD,True);ppttext(sl,b,x,4.3,5.7,1.2,20,fg)
  pdftext(a,x*72,3.65*72,5.7*72,21,GOLD,True,40);pdftext(b,x*72,4.3*72,5.7*72,20,fg,False,90)
 ppttext(sl,s['gesture'],.65,6.65,11.3,.55,12,muted);ppttext(sl,f'{i+1:02} / 22',12,6.65,.7,.4,10,muted)
 pdftext(s['gesture'],47,479,810,12,muted,maxheight=40);pdftext(f'{i+1:02} / 22',865,479,70,10,muted)
 sl.notes_slide.notes_text_frame.text=s['note'];C.showPage()
prs.core_properties.title=D['meta']['title'];prs.core_properties.author=D['meta']['author'];prs.save(O/'presentation-S18.pptx');C.save()
# Repack only current support content.
shutil.copyfile(O/'fiche-candidat-S18.pdf',K/'fiche-candidat-S18.pdf');shutil.copyfile(O/'prompts-S18.md',K/'prompts-S18.md');shutil.copyfile(O/'GUIDE-PRODUCTION-VSCODE.md',K/'GUIDE-PRODUCTION-VSCODE.md')
def archive(source,target,prefix):
 with zipfile.ZipFile(target,'w',zipfile.ZIP_DEFLATED) as z:
  for pth in sorted(source.rglob('*')):
   if pth.is_file() and not any(v.startswith('.') for v in pth.relative_to(source).parts):z.write(pth,prefix+'/'+pth.relative_to(source).as_posix())
archive(K,O/'kit-candidat-S18.zip','kit-candidat-S18');archive(K/'APPROFONDISSEMENT/prototype-S18',O/'prototype-S18.zip','prototype-S18');archive(R/'public/dossier-challenge',O/'dossier-challenge-Module05.zip','mon-dossier-challenge-Module05')
print('22 vues PDF/PPTX, cinq supports PDF et trois ZIP synchronisés.')
