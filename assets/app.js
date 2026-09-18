
(()=>{
const html=document.documentElement;const stored=localStorage.getItem('gitstart-theme');if(stored)html.dataset.theme=stored;else if(matchMedia('(prefers-color-scheme:light)').matches)html.dataset.theme='light';
const toggle=document.querySelector('[data-theme-toggle]');toggle?.addEventListener('click',()=>{const next=html.dataset.theme==='light'?'dark':'light';html.dataset.theme=next;localStorage.setItem('gitstart-theme',next)});
const menu=document.querySelector('.main-nav');const mt=document.querySelector('.menu-toggle');mt?.addEventListener('click',()=>{const o=menu.classList.toggle('open');mt.setAttribute('aria-expanded',String(o))});
document.querySelectorAll('.copy-btn').forEach(btn=>btn.addEventListener('click',async()=>{const code=btn.closest('.code-wrap')?.querySelector('code')?.innerText||'';try{await navigator.clipboard.writeText(code);btn.textContent='Скопировано';setTimeout(()=>btn.textContent='Копировать',1200)}catch{}}));
const dlg=document.getElementById('site-search');const inp=document.getElementById('search-input');const res=document.getElementById('search-results');let idx=[];const root=document.body.dataset.root||'';
fetch(root+'assets/search-index.json').then(r=>r.json()).then(d=>idx=d).catch(()=>{});
document.querySelector('[data-search-open]')?.addEventListener('click',()=>{dlg.showModal();setTimeout(()=>inp.focus(),50)});document.querySelector('[data-search-close]')?.addEventListener('click',()=>dlg.close());
document.addEventListener('keydown',e=>{if((e.ctrlKey||e.metaKey)&&e.key.toLowerCase()==='k'){e.preventDefault();dlg.showModal();setTimeout(()=>inp.focus(),50)}if(e.key==='Escape'&&dlg?.open)dlg.close()});
function render(q){q=q.trim().toLowerCase();if(!q){res.innerHTML='<p class="muted">Например: commit, ветки, push, первый репозиторий</p>';return}const found=idx.filter(x=>(x.title+' '+x.desc).toLowerCase().includes(q)).slice(0,12);res.innerHTML=found.length?found.map(x=>`<a class="search-item" href="${root}${x.url}"><strong>${x.title}</strong><span>${x.desc}</span></a>`).join(''):'<p class="muted">Ничего не найдено.</p>'}inp?.addEventListener('input',()=>render(inp.value));
const filter=document.querySelector('[data-command-filter]');if(filter){filter.addEventListener('input',()=>{const q=filter.value.toLowerCase().trim();document.querySelectorAll('[data-command-row]').forEach(r=>r.hidden=!r.innerText.toLowerCase().includes(q))})}
})();
