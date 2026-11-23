import fs from 'node:fs/promises';
import path from 'node:path';
import {fileURLToPath} from 'node:url';
import {transform} from 'esbuild';
const root=path.resolve(path.dirname(fileURLToPath(import.meta.url)),'..');
let html=await fs.readFile(path.join(root,'dist/index.html'),'utf8');
const script=html.match(/<script type="module"[^>]*src="([^"]+)"[^>]*><\/script>/);
const stylesheet=html.match(/<link rel="stylesheet"[^>]*href="([^"]+)"[^>]*>/);
if(!script||!stylesheet)throw new Error('Sortie Vite inattendue : fichiers JS/CSS introuvables.');
const rawJS=await fs.readFile(path.join(root,'dist',script[1]),'utf8');
const js=(await transform(rawJS,{format:'iife',target:'es2020',minify:true})).code;
const cssPath=path.join(root,'dist',stylesheet[1]);
let css=await fs.readFile(cssPath,'utf8');
css=css.replace(/url\(([^)]+)\)/g,(all,url)=>{const clean=url.replace(/^['"]|['"]$/g,'');if(/^(data:|https?:|#)/.test(clean))return all;return `url("./dist/${path.posix.normalize(path.posix.join(path.posix.dirname(stylesheet[1]),clean))}")`});
html=html.replace(script[0],'').replace(stylesheet[0],()=>'<style>'+css+'</style>').replace(/(src|href)="\.\/(assets|supports|dossier-challenge|livrables)\//g,'$1="./dist/$2/').replace('data-resource-base="./"','data-resource-base="./dist/"');
// A callback preserves literal $&, $' and $` sequences in bundled code.
// Passing JavaScript as a replacement string expands them and corrupts the script.
html=html.replace('</body>',()=>'<script>'+js.replace(/<\/script/gi,'<\\/script')+'</script></body>');
html=html.replace(/<\/script>[ \t]+(?=\r?$)/gm,'</script>');
await fs.writeFile(path.join(root,'OUVRIR-SEANCE-18.html'),html);
await fs.writeFile(path.join(root,'PROJECTION-SEANCE-18.html'),html.replace('data-resource-base="./dist/"','data-resource-base="./dist/" data-project="true"'));
console.log('Deux entrées hors ligne générées, sans imports JavaScript ni CDN.');
