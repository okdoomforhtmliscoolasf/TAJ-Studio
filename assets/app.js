const menu=document.querySelector('.menu'),nav=document.querySelector('.nav');
if(menu&&nav){menu.addEventListener('click',()=>{const open=nav.classList.toggle('open');menu.setAttribute('aria-expanded',String(open));menu.innerHTML=open?'<svg class="nav-icon" viewBox="0 0 24 24" aria-hidden="true"><path d="M6 6l12 12M18 6 6 18"/></svg>':'<svg class="nav-icon" viewBox="0 0 24 24" aria-hidden="true"><path d="M4 7h16M4 12h16M4 17h16"/></svg>'});}
const current=(location.pathname.split('/').pop()||'index.html').toLowerCase();
document.querySelectorAll('.nav a').forEach(a=>{if((a.getAttribute('href')||'').toLowerCase()===current)a.setAttribute('aria-current','page')});
document.querySelectorAll('[data-year]').forEach(el=>el.textContent=new Date().getFullYear());
if('IntersectionObserver'in window){const observer=new IntersectionObserver(entries=>entries.forEach(e=>{if(e.isIntersecting){e.target.classList.add('visible');observer.unobserve(e.target)}}),{threshold:.08});document.querySelectorAll('.reveal').forEach(el=>observer.observe(el));}else{document.querySelectorAll('.reveal').forEach(el=>el.classList.add('visible'))}
const serviceGrid=document.querySelector('#serviceGrid');
if(serviceGrid){
 const cards=[...serviceGrid.querySelectorAll('[data-service]')],search=document.querySelector('#serviceSearch'),sort=document.querySelector('#serviceSort'),count=document.querySelector('#serviceResultCount'),empty=document.querySelector('#serviceEmpty'),filters=[...document.querySelectorAll('[data-service-filter]')];let category='all';
 const render=()=>{const term=(search?.value||'').trim().toLowerCase();let visible=0;cards.forEach(card=>{const match=(!term||card.textContent.toLowerCase().includes(term))&&(category==='all'||card.dataset.category===category);card.hidden=!match;if(match)visible++});const mode=sort?.value||'featured';cards.sort((a,b)=>mode==='az'?a.dataset.name.localeCompare(b.dataset.name):mode==='za'?b.dataset.name.localeCompare(a.dataset.name):mode==='category'?a.dataset.category.localeCompare(b.dataset.category)||a.dataset.name.localeCompare(b.dataset.name):Number(a.dataset.order)-Number(b.dataset.order)).forEach(c=>serviceGrid.appendChild(c));if(count)count.textContent=`Showing ${visible} of ${cards.length} services`;if(empty)empty.style.display=visible?'none':'block'};
 search?.addEventListener('input',render);sort?.addEventListener('change',render);filters.forEach(btn=>btn.addEventListener('click',()=>{category=btn.dataset.serviceFilter;filters.forEach(x=>x.classList.toggle('active',x===btn));render()}));render();
}
const projectGrid=document.querySelector('#projectGrid');
if(projectGrid){
 const cards=[...projectGrid.querySelectorAll('[data-project]')],search=document.querySelector('#projectSearch'),sort=document.querySelector('#workSort'),count=document.querySelector('#workResultCount'),empty=document.querySelector('#workEmpty'),filters=[...document.querySelectorAll('[data-filter]')];let category='all';
 const render=()=>{const term=(search?.value||'').trim().toLowerCase();let visible=0;cards.forEach(c=>{const ok=(!term||c.textContent.toLowerCase().includes(term))&&(category==='all'||c.dataset.category===category);c.hidden=!ok;if(ok)visible++});const mode=sort?.value||'featured';cards.sort((a,b)=>mode==='az'?a.dataset.name.localeCompare(b.dataset.name):mode==='za'?b.dataset.name.localeCompare(a.dataset.name):0).forEach(c=>projectGrid.appendChild(c));if(count)count.textContent=`Showing ${visible} of ${cards.length} concept studies`;if(empty)empty.style.display=visible?'none':'block'};
 search?.addEventListener('input',render);sort?.addEventListener('change',render);filters.forEach(btn=>btn.addEventListener('click',()=>{category=btn.dataset.filter;filters.forEach(x=>x.classList.toggle('active',x===btn));render()}));render();
}
const form=document.querySelector('#projectForm');
if(form){
 const requested=new URLSearchParams(location.search).get('service');
 if(requested){const names=['Website Design','Website Development','Landing Page Design','E-commerce Websites','UI/UX Design','Website Redesign','Website Maintenance','Search Engine Optimisation Setup','Logo Design','Brand Identity Design','Brand Guidelines','Graphic Design','Social Media Creatives','Advertising Creatives','Posters & Flyers','Brochures & Catalogues','Business Cards & Stationery','Packaging Design','Presentation Design','Photo & Video Editing'];const select=form.querySelector('[name="service"]');if(select&&names[Number(requested)-1])select.value=names[Number(requested)-1]}
 form.addEventListener('submit',e=>{e.preventDefault();if(!form.reportValidity())return;const d=new FormData(form);const message=['TAJ STUDIO — PROJECT ENQUIRY',`Name: ${d.get('name')}`,`Business: ${d.get('business')||'Not provided'}`,`Service: ${d.get('service')}`,`Budget: ${d.get('budget')||'Prefer to discuss'}`,`Details: ${d.get('details')||'Not provided'}`].join('\n');window.open('https://wa.me/919819088014?text='+encodeURIComponent(message),'_blank','noopener')});
}


// Lightweight inspiration carousel: transform-based, no horizontal scroll container.
const carousel=document.querySelector('[data-carousel]');
if(carousel){
 const track=carousel.querySelector('.inspiration-track');
 const slides=[...carousel.querySelectorAll('.inspiration-slide')];
 const count=carousel.querySelector('[data-carousel-count]');
 const prev=carousel.querySelector('[data-carousel-prev]');
 const next=carousel.querySelector('[data-carousel-next]');
 const dots=carousel.querySelector('.inspiration-dots');
 let active=0,startX=0,deltaX=0,dragging=false;
 slides.forEach((slide,i)=>{
  const dot=document.createElement('button');dot.type='button';dot.className='inspiration-dot';
  dot.setAttribute('aria-label',`Show reference ${i+1}`);
  dot.addEventListener('click',()=>go(i));dots?.appendChild(dot);
  const image=slide.querySelector('img');if(image){image.loading='lazy';image.decoding='async';}
 });
 const render=()=>{
  const gap=parseFloat(getComputedStyle(track).gap)||0;
  const width=slides[0]?.getBoundingClientRect().width||0;
  track.style.transform=`translate3d(${-active*(width+gap)}px,0,0)`;
  if(count)count.textContent=`${String(active+1).padStart(2,'0')} / ${String(slides.length).padStart(2,'0')}`;
  if(prev)prev.disabled=active===0;if(next)next.disabled=active===slides.length-1;
  [...(dots?.children||[])].forEach((dot,i)=>dot.setAttribute('aria-current',i===active?'true':'false'));
 };
 const go=i=>{active=Math.max(0,Math.min(slides.length-1,i));render()};
 prev?.addEventListener('click',()=>go(active-1));next?.addEventListener('click',()=>go(active+1));
 track.addEventListener('pointerdown',e=>{if(e.pointerType==='mouse'&&e.button!==0)return;startX=e.clientX;deltaX=0;dragging=true;track.setPointerCapture?.(e.pointerId);track.style.transition='none'});
 track.addEventListener('pointermove',e=>{if(!dragging)return;deltaX=e.clientX-startX;const gap=parseFloat(getComputedStyle(track).gap)||0;const width=slides[0]?.getBoundingClientRect().width||0;const base=-active*(width+gap);const resistance=(active===0&&deltaX>0)||(active===slides.length-1&&deltaX<0)?.28:1;track.style.transform=`translate3d(${base+deltaX*resistance}px,0,0)`});
 const endDrag=()=>{if(!dragging)return;dragging=false;track.style.transition='';if(Math.abs(deltaX)>45)go(active+(deltaX<0?1:-1));else render();deltaX=0};
 track.addEventListener('pointerup',endDrag);track.addEventListener('pointercancel',endDrag);
 track.addEventListener('keydown',e=>{if(e.key==='ArrowRight'){e.preventDefault();go(active+1)}if(e.key==='ArrowLeft'){e.preventDefault();go(active-1)}});
 window.addEventListener('resize',render,{passive:true});render();
}
// Diffused cursor light
if(matchMedia('(hover:hover) and (pointer:fine)').matches&&!matchMedia('(prefers-reduced-motion: reduce)').matches){
 const glow=document.createElement('div');glow.className='cursor-glow';glow.setAttribute('aria-hidden','true');document.body.appendChild(glow);document.body.classList.add('has-cursor-glow');
 let raf=0,x=0,y=0;window.addEventListener('pointermove',e=>{x=e.clientX;y=e.clientY;if(!raf)raf=requestAnimationFrame(()=>{glow.style.left=x+'px';glow.style.top=y+'px';glow.style.opacity='.9';raf=0})},{passive:true});
 document.documentElement.addEventListener('pointerleave',()=>glow.style.opacity='0');
}
// Floating project brief prompt
const brief=document.querySelector('[data-floating-prompt]');
if(brief){const wrap=brief.closest('.field-floating');const sync=()=>wrap?.classList.toggle('has-value',!!brief.value.trim());brief.addEventListener('input',sync);brief.addEventListener('focus',sync);brief.addEventListener('blur',sync);sync()}
// Back-to-top appears at the bottom with a small bounce
const backTop=document.createElement('button');backTop.className='back-top';backTop.type='button';backTop.setAttribute('aria-label','Back to top');backTop.textContent='↑';document.body.appendChild(backTop);
let bottomShown=false;const checkBottom=()=>{const atBottom=window.scrollY+window.innerHeight>=document.documentElement.scrollHeight-100;if(atBottom&&!bottomShown){backTop.classList.add('visible');bottomShown=true}else if(!atBottom){backTop.classList.remove('visible');bottomShown=false}};
window.addEventListener('scroll',checkBottom,{passive:true});window.addEventListener('resize',checkBottom);backTop.addEventListener('click',()=>window.scrollTo({top:0,behavior:'smooth'}));checkBottom();
