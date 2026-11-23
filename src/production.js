// Shared presentation of the three production documents. Content is embedded at build time.
const escape = value => String(value ?? '').replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
export const productionFiles = ['INSTRUCTIONS-PARTICIPANTS-S18.md','PROMPT-MAITRE-PRODUCTION-S18.md','AGENT.md'];
export const productionLabels = ['1 · Mes consignes','2 · Mon prompt maître','3 · La méthode de l’agent'];
export const essentialFields = ['project','audience','need','reference','source','title','hook','problem','promise','benefit','support','action','target','assets','packName'];

function markdown(text) {
  let code=false, list=false, table=false;
  const out=[];
  const inline=s=>escape(s).replace(/`([^`]+)`/g,'<code>$1</code>').replace(/\*\*([^*]+)\*\*/g,'<strong>$1</strong>');
  const close=()=>{if(list){out.push('</ul>');list=false}if(table){out.push('</tbody></table></div>');table=false}};
  for(const line of text.split('\n')){
    if(line.startsWith('```')){close();out.push(code?'</code></pre>':'<pre><code>');code=!code;continue}
    if(code){out.push(escape(line)+'\n');continue}
    if(line.startsWith('|')){if(list){out.push('</ul>');list=false}if(/^\|[\s:|-]+\|\s*$/.test(line))continue;if(!table){out.push('<div class="table-responsive"><table class="table"><tbody>');table=true}out.push('<tr>'+line.split('|').slice(1,-1).map(v=>'<td>'+inline(v.trim())+'</td>').join('')+'</tr>');continue}
    if(/^[-*] |^\d+\. /.test(line)){if(table){out.push('</tbody></table></div>');table=false}if(!list){out.push('<ul>');list=true}out.push('<li>'+inline(line.replace(/^([-*]|\d+\.) /,''))+'</li>');continue}
    close();
    const h=line.match(/^(#{1,6}) (.+)/);if(h){const level=Math.min(6,h[1].length+2);out.push(`<h${level}>${inline(h[2])}</h${level}>`)}
    else if(line.startsWith('> '))out.push('<blockquote>'+inline(line.slice(2))+'</blockquote>');
    else if(line.trim()&&line!=='---')out.push('<p>'+inline(line)+'</p>');
  }
  close();if(code)out.push('</code></pre>');return out.join('\n');
}
export function documentCards(documents={}) {
  return `<div class="document-intro"><span class="step-badge">LE TRIO DE PRODUCTION</span><h3>Trois fichiers, une seule méthode</h3><p>Lisez les consignes, personnalisez le prompt, puis joignez AGENT.md et vos sources à votre agent.</p><a class="btn cta navy" href="./supports/trio-production-S18.zip" download>Télécharger les trois fichiers (.zip)</a></div><div class="production-documents">${productionFiles.map((name,i)=>`<article class="document-card"><span class="document-number">0${i+1}</span><h3>${productionLabels[i]}</h3><p>${['Le parcours de séance et les pièces à remettre.','Le projet, les sources et le contrat du pack.','Dix étapes pour réaliser, contrôler et livrer.'][i]}</p><a class="inklink" href="./supports/production/${name}" download>Télécharger ${name}</a><details><summary>Lire le document ici</summary><div class="document-reader">${markdown(documents[name]||'Document indisponible : reconstruire les supports.')}</div></details></article>`).join('')}</div>`;
}
export function caseResources(c,base='./'){
  const path=`${base}supports/exemples/${c.id}/`;
  const produced=c.id==='declic-web'?`<aside class="launch-note"><b>Déclic Web · V1 produite à partir de ce dossier</b><p>Comparez les sources au résultat, puis essayez le pack extrait. La revue du pilote reste à examiner.</p><div class="actions"><a class="btn cta navy" href="${base}livrables/mini-site-declic-web/index.html" target="_blank" rel="noopener">Ouvrir le mini-site produit</a><a class="btn cta light" href="${base}livrables/mini-site-declic-web.zip" download>Télécharger le pack produit</a><a class="inklink" href="${base}livrables/mini-site-declic-web/CONTROLE.md" download>Compte rendu des essais</a></div></aside>`:'';
  return `<div class="case-source-pack"><a href="${path}entrees/affiche.svg" target="_blank" rel="noopener" aria-label="Agrandir l’affiche ${escape(c.title)}"><img src="${path}entrees/affiche.svg" alt="Affiche dédiée à ${escape(c.title)}, exemple fictif S18" loading="lazy" width="600" height="800"></a><div><p class="eyebrow">DOSSIER SOURCE · EXEMPLE FICTIF</p><h3>${escape(c.title)} : du document au site</h3><p>${escape(c.source)}</p><ul>${c.items.map(([a,b])=>`<li><b>${escape(a)}</b> — ${escape(b)}</li>`).join('')}</ul><div class="actions"><a class="btn cta navy" href="${base}supports/exemples/${c.id}.zip" download>Emporter cet exemple (.zip)</a><a class="btn cta light" href="${path}entrees/guide-source.md" download>Guide source</a><a class="btn cta light" href="${path}entrees/affiche.svg" download>Affiche SVG</a></div><p class="quiet">Le ZIP réunit le guide, l’affiche, la fiche cible, les trois documents et un prompt prérempli. Les faits sont inventés pour l’exercice, les observations restent personnelles.</p>${produced}</div></div>`;
}
