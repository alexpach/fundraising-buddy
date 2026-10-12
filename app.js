const $ = id => document.getElementById(id);
const text = value => Array.isArray(value) ? value.map(text).join(', ') : value == null ? '' : typeof value === 'object' ? JSON.stringify(value) : String(value);
const escape = value => text(value).replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const label = key => ({hq:'Headquarters',aum:'AUM',lps:'LPs',check_size_min:'Min. check',check_size_max:'Max. check',record_level:'Research',researched_at:'Research date',people:'People'}[key] || key.replaceAll('_',' ').replace(/^./, c => c.toUpperCase()));
const safeUrl = value => { try { const u = new URL(value); return ['https:','http:'].includes(u.protocol) ? escape(u.href) : ''; } catch { return ''; } };
const link = (url, name) => safeUrl(url) ? `<a href="${safeUrl(url)}" target="_blank" rel="noopener noreferrer">${escape(name)}</a>` : escape(name);
const show = value => !text(value) ? '<span class="unknown">Unknown</span>' : Array.isArray(value) ? value.map(v=>`<span class="pill">${escape(v)}</span>`).join('') : escape(value);
let data, funds = [], columns = [], page = 0, sort = 'name', ascending = true;
let visible = ['name','stages','sectors','hq','leads_rounds','record_level','people'];
const size = 50;
const people = new Map();
const searches = new Map();
const value = (f,key) => key === 'people' ? (people.get(f.id)||[]).length : f[key] ?? f.fields[key];
function draw() {
  const q = $('search').value.toLowerCase().trim(), stage = $('stage').value, sector = $('sector').value, research = $('research').value;
  const filtered = funds.filter(f => (!q || searches.get(f.id).includes(q)) && (!stage || (f.fields.stages||[]).includes(stage)) && (!sector || (f.fields.sectors||[]).includes(sector)) && (!research || f.record_level === research));
  filtered.sort((a,b) => {
    const av=value(a,sort), bv=value(b,sort);
    if (!text(av) && text(bv)) return 1;
    if (text(av) && !text(bv)) return -1;
    return (typeof av === 'number' && typeof bv === 'number' ? av-bv : text(av).localeCompare(text(bv),undefined,{numeric:true})) * (ascending?1:-1);
  });
  const pages = Math.max(1, Math.ceil(filtered.length/size)); page=Math.min(page,pages-1);
  $('count').textContent = `${filtered.length.toLocaleString()} of ${funds.length.toLocaleString()} funds`;
  $('head').innerHTML = '<tr>'+visible.map(k=>`<th scope="col" aria-sort="${sort===k?(ascending?'ascending':'descending'):'none'}"><button data-sort="${escape(k)}">${escape(k==='name'?'Fund':label(k))} ${sort===k?(ascending?'↑':'↓'):'↕'}</button></th>`).join('')+'</tr>';
  $('rows').innerHTML = filtered.slice(page*size,(page+1)*size).map(f=>'<tr>'+visible.map(k=>'<td>'+(k==='name'?`<a class="fund-link" href="#fund=${encodeURIComponent(f.id)}">${escape(f.name)}</a><span class="domain">${link(f.website,f.domain)}</span>`:k==='record_level'?`<span class="pill ${f.record_level}">${f.record_level==='sourced'?'Sourced':'Directory'}</span>`:show(value(f,k)))+'</td>').join('')+'</tr>').join('');
  $('empty').hidden = filtered.length>0;
  $('page').textContent = `Page ${page+1} of ${pages}`;
  $('previous').disabled = page===0; $('next').disabled = page>=pages-1;
}
function openProfile() {
  const id = new URLSearchParams(location.hash.slice(1)).get('fund');
  const fund = funds.find(f=>f.id===id);
  if (!fund) { if ($('profile').open) $('profile').close(); return; }
  const evidence = key => { const ev=fund.evidence[key]; return ev?`<span class="evidence">${link(ev.url,'Source ↗')}${ev.as_of?' · '+escape(ev.as_of):''}</span>`:''; };
  $('profile-content').innerHTML = `<h2 id="profile-title">${escape(fund.name)}</h2><div class="profile-meta">${link(fund.website,fund.domain+' ↗')}<br>${fund.record_level==='sourced'?'Sourced research':'Directory record'} · Research date: ${escape(fund.researched_at||'Unknown')}</div>${fund.fields.about?`<p class="profile-about">${escape(fund.fields.about)}${evidence('about')}</p>`:''}<dl class="facts">${Object.entries(fund.fields).filter(([k])=>k!=='about').map(([k,v])=>`<div><dt>${escape(label(k))}</dt><dd>${show(v)}${evidence(k)}</dd></div>`).join('')}</dl><h3>People (${(people.get(id)||[]).length})</h3>${(people.get(id)||[]).map(p=>`<div class="person">${link(p.profile,p.name)}<small>${escape(p.title)}${p.focus?' · '+escape(p.focus):''}</small><small>Research date: ${escape(p.researched_at||'Unknown')} · ${p.sources.map((s,i)=>link(s,'Source '+(i+1))).join(' · ')}</small></div>`).join('')||'<p class="profile-meta">No public team members recorded.</p>'}<h3>Portfolio (${fund.portfolio.length})</h3>${fund.portfolio.map(p=>`<div class="person">${link(p.url,p.company)}<small>${escape([p.sector,p.round,p.date].filter(Boolean).join(' · '))}</small></div>`).join('')||'<p class="profile-meta">No portfolio companies recorded.</p>'}<h3>Research sources</h3><ul class="source-list">${fund.sources.map(s=>`<li>${link(s,s)}</li>`).join('')}</ul>${Object.keys(fund.scores||{}).length?`<h3>Profile completeness</h3><p class="profile-meta">${Object.entries(fund.scores).map(([k,v])=>escape(k)+': '+escape(v)+'/100').join(' · ')}. Completeness describes data coverage, not investment fit.</p>`:''}`;
  if (!$('profile').open) $('profile').showModal();
}
$('filters').addEventListener('submit', e=>e.preventDefault());
$('filters').addEventListener('input', ()=>{if(data){page=0;draw();}});
$('filters').addEventListener('reset', ()=>setTimeout(()=>{if(data){page=0;draw();}},0));
$('head').addEventListener('click',e=>{const button=e.target.closest('[data-sort]');if(button){ascending=sort===button.dataset.sort?!ascending:true;sort=button.dataset.sort;page=0;draw();}});
$('previous').onclick=()=>{page--;draw();}; $('next').onclick=()=>{page++;draw();};
$('column-options').addEventListener('change',()=>{visible=columns.filter(k=>k==='name'||document.querySelector(`[data-column="${k}"]`)?.checked);draw();});
$('close').onclick=()=> $('profile').close();
$('profile').addEventListener('close',()=>{history.replaceState(null,'',location.pathname+location.search);});
window.addEventListener('hashchange',openProfile);
try {
  const response=await fetch('./data/public/catalog.json');
  if(!response.ok)throw new Error('Could not load catalog');
  data=await response.json(); funds=data.firms;
  for(const p of data.people){if(!people.has(p.firm_id))people.set(p.firm_id,[]);people.get(p.firm_id).push(p);}
  for(const f of funds)searches.set(f.id,[f.name,f.domain,...Object.values(f.fields),...(people.get(f.id)||[]).map(p=>p.name)].map(text).join(' ').toLowerCase());
  columns=['name',...new Set(['stages','sectors','hq','geographies','leads_rounds','check_size_min','check_size_max','aum',...funds.flatMap(f=>Object.keys(f.fields))]),'record_level','researched_at','people'];
  $('column-options').innerHTML=columns.filter(k=>k!=='name').map(k=>`<label><input type="checkbox" data-column="${escape(k)}" ${visible.includes(k)?'checked':''}>${escape(label(k))}</label>`).join('');
  for(const key of ['stage','sector']){const field=key==='stage'?'stages':'sectors';const choices=[...new Set(funds.flatMap(f=>f.fields[field]||[]))].sort((a,b)=>a.localeCompare(b));for(const choice of choices)$ (key).add(new Option(choice,choice));}
  $('total').textContent=funds.length.toLocaleString();draw();openProfile();
} catch(error) {
  $('count').textContent='The catalog could not be loaded. Please reload to try again.';
  $('total').textContent='Unavailable';$('previous').disabled=true;$('next').disabled=true;
  console.error(error);
}
