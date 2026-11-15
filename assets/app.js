
const m=document.querySelector('.menu'),n=document.querySelector('.nav');if(m&&n)m.onclick=()=>n.classList.toggle('open');
const c=document.querySelector('.cursor');if(c){onpointermove=e=>{c.style.left=e.clientX+'px';c.style.top=e.clientY+'px'};document.querySelectorAll('a,button,input,summary').forEach(x=>{x.onmouseenter=()=>c.classList.add('big');x.onmouseleave=()=>c.classList.remove('big')})}
document.querySelectorAll('.wordmark').forEach(el=>{let t=el.textContent;el.innerHTML='';[...t].forEach(ch=>{let s=document.createElement('span');s.textContent=ch;el.append(s)})});
if('IntersectionObserver'in window){let o=new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting){e.target.classList.add('in');o.unobserve(e.target)}}),{threshold:.08});document.querySelectorAll('.reveal').forEach(x=>o.observe(x))}

// Services: live search, category filters, sorting and result count.
const serviceGrid=document.querySelector('#serviceGrid');
if(serviceGrid){
 const search=document.querySelector('#serviceSearch');
 const sort=document.querySelector('#serviceSort');
 const clear=document.querySelector('#clearServiceSearch');
 const count=document.querySelector('#serviceResultCount');
 const empty=document.querySelector('#serviceEmpty');
 const filterButtons=[...document.querySelectorAll('[data-service-filter]')];
 const serviceCards=[...serviceGrid.querySelectorAll('[data-service]')];
 let category='all';
 const renderServices=()=>{
   const term=(search?.value||'').trim().toLowerCase();
   let visible=0;
   serviceCards.forEach(card=>{
     const haystack=(card.dataset.name+' '+card.dataset.category+' '+card.textContent).toLowerCase();
     const matchesText=!term||haystack.includes(term);
     const matchesCategory=category==='all'||card.dataset.category===category;
     card.hidden=!(matchesText&&matchesCategory);
     if(!card.hidden)visible++;
   });
   const mode=sort?.value||'featured';
   const sorted=[...serviceCards].sort((a,b)=>{
     if(mode==='az')return a.dataset.name.localeCompare(b.dataset.name);
     if(mode==='za')return b.dataset.name.localeCompare(a.dataset.name);
     if(mode==='category')return a.dataset.category.localeCompare(b.dataset.category)||a.dataset.name.localeCompare(b.dataset.name);
     return Number(a.dataset.order)-Number(b.dataset.order);
   });
   sorted.forEach(card=>serviceGrid.appendChild(card));
   if(count)count.textContent=`Showing ${visible} of ${serviceCards.length} services`;
   if(empty)empty.hidden=visible!==0;
 };
 search?.addEventListener('input',renderServices);
 sort?.addEventListener('change',renderServices);
 clear?.addEventListener('click',()=>{search.value='';category='all';filterButtons.forEach(b=>b.classList.toggle('active',b.dataset.serviceFilter==='all'));renderServices();search.focus()});
 filterButtons.forEach(button=>button.addEventListener('click',()=>{
   category=button.dataset.serviceFilter;
   filterButtons.forEach(b=>b.classList.toggle('active',b===button));
   renderServices();
 }));
 renderServices();
}

// Portfolio: search, category filters and sorting work independently from services.
const projectSearch=document.querySelector('#projectSearch');
const projectSort=document.querySelector('#workSort');
const projectCardsContainer=document.querySelector('.projectgrid');
if(projectCardsContainer){
 const projects=[...projectCardsContainer.querySelectorAll('[data-project]')];
 const projectFilters=[...document.querySelectorAll('[data-filter]')];
 const empty=document.querySelector('#workEmpty');
 const count=document.querySelector('#workResultCount');
 let chosen='all';
 const renderProjects=()=>{
   const term=(projectSearch?.value||'').trim().toLowerCase();
   let visible=0;
   projects.forEach(card=>{
     const matchesText=!term||card.textContent.toLowerCase().includes(term);
     const matchesCategory=chosen==='all'||card.dataset.category===chosen;
     card.hidden=!(matchesText&&matchesCategory);
     if(!card.hidden)visible++;
   });
   const mode=projectSort?.value||'featured';
   const sorted=[...projects].sort((a,b)=>{
     const an=a.dataset.name||a.textContent.toLowerCase();
     const bn=b.dataset.name||b.textContent.toLowerCase();
     if(mode==='az')return an.localeCompare(bn);
     if(mode==='za')return bn.localeCompare(an);
     return Number(a.querySelector('small')?.textContent.match(/\d+/)?.[0]||0)-Number(b.querySelector('small')?.textContent.match(/\d+/)?.[0]||0);
   });
   sorted.forEach(card=>projectCardsContainer.appendChild(card));
   if(count)count.textContent=`Showing ${visible} of ${projects.length} concept studies`;
   if(empty)empty.hidden=visible!==0;
 };
 projectSearch?.addEventListener('input',renderProjects);
 projectSort?.addEventListener('change',renderProjects);
 projectFilters.forEach(button=>button.addEventListener('click',()=>{
   chosen=button.dataset.filter;
   projectFilters.forEach(b=>b.classList.toggle('active',b===button));
   renderProjects();
 }));
 renderProjects();
}

document.querySelectorAll('[data-year]').forEach(x=>x.textContent=new Date().getFullYear());

// Highlight the current icon destination.
const currentFile=(location.pathname.split('/').pop()||'index.html').toLowerCase();
document.querySelectorAll('.nav .iconlink').forEach(a=>{
  if((a.getAttribute('href')||'').toLowerCase()===currentFile)a.setAttribute('aria-current','page');
});

// Preselect a service when a visitor arrives from a service card.
const serviceSelect=document.querySelector('#projectForm select[name="service"]');
if(serviceSelect){
 const requested=new URLSearchParams(location.search).get('service');
 if(requested){
   const serviceNames=['Website Design','Website Development','Landing Page Design','E-commerce Websites','UI/UX Design','Website Redesign','Website Maintenance','Search Engine Optimisation Setup','Logo Design','Brand Identity Design','Brand Guidelines','Graphic Design','Social Media Creatives','Advertising Creatives','Posters & Flyers','Brochures & Catalogues','Business Cards & Stationery','Packaging Design','Presentation Design','Photo & Video Editing'];
   const index=Number(requested)-1;
   if(index>=0&&index<serviceNames.length){
     const option=[...serviceSelect.options].find(o=>o.textContent===serviceNames[index]);
     if(option)serviceSelect.value=option.value;
   }
 }
}
