// Un événement change deux états cohérents : visibilité et indication accessible.
const button=document.querySelector('#toggle');
const source=document.querySelector('#source');
button.addEventListener('click',()=>{
 const opened=source.hidden;
 source.hidden=!opened;
 button.setAttribute('aria-expanded',String(opened));
 button.textContent=opened?'Masquer l’appui':'Afficher l’appui';
});
