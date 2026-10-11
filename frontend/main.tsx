import { useEffect, useRef, useState } from 'react';
import { createRoot } from 'react-dom/client';
import { MotionConfig } from 'motion/react';
import { ArrowLeft, ArrowUpRight, BookOpen, Building2, Contact, Globe, Layers, LockKeyhole, RefreshCw, Bookmark, Target, Users, Sun, Moon } from 'lucide-react';
import { DataTable, type DataTableColumn } from './components/data-table';
// User-supplied figure.socialdance SVG.
function BrandMark(){return <svg width="23" height="23" viewBox="0 0 24.4669 21.8066" fill="currentColor" aria-hidden="true"><path d="M6.5645 4.45312C7.67778 4.45312 8.58598 3.54492 8.58598 2.43164C8.58598 1.31836 7.67778 0.419922 6.5645 0.419922C5.45121 0.419922 4.55278 1.31836 4.55278 2.43164C4.55278 3.54492 5.45121 4.45312 6.5645 4.45312ZM18.3516 4.0332C19.4649 4.0332 20.3731 3.125 20.3731 2.01172C20.3731 0.908203 19.4649 0 18.3516 0C17.2383 0 16.3399 0.908203 16.3399 2.01172C16.3399 3.125 17.2383 4.0332 18.3516 4.0332ZM0.939495 6.93359L3.00004 7.09961C3.13676 7.10938 3.23442 7.20703 3.23442 7.36328L3.23442 11.1035C3.23442 11.8555 3.47856 12.5879 3.93754 13.1641L6.34965 16.2695L5.11918 20.3613C4.95317 20.8984 5.26567 21.4746 5.78325 21.6211C6.30082 21.7676 6.86723 21.5234 7.04301 20.9375L8.41996 16.3379C8.44926 16.25 8.45903 16.1816 8.45903 16.0938L12.1895 20.8105C12.5313 21.2402 13.1758 21.3281 13.586 20.9863C14.0254 20.6152 14.1036 20.0098 13.7618 19.5703L7.1016 11.1426L7.40434 8.1543C7.43364 7.93945 7.62895 7.83203 7.8145 7.91992L10.1289 9.08203C10.2852 9.16992 10.5684 9.22852 10.793 9.22852L14.3575 9.22852C14.5918 9.22852 14.836 9.14062 15.002 8.99414L16.6914 7.54883C16.8575 7.40234 17.0625 7.4707 17.1407 7.66602L18.0879 10.3027L14.0938 11.3965C13.6934 11.5039 13.3809 11.8555 13.3418 12.2754L12.8926 16.875C12.834 17.5293 13.4102 17.9688 13.8985 17.9688C14.4063 17.9688 14.8457 17.5977 14.8946 17.0703L15.2754 13.2422L18.0782 12.8125L16.7403 15.5078C16.5938 15.8008 16.5157 16.123 16.6329 16.4258L18.4786 21.0254C18.7032 21.582 19.3086 21.7773 19.7872 21.582C20.295 21.377 20.5489 20.791 20.3438 20.2734L18.7032 16.1816L20.9688 12.959C21.545 12.1582 21.75 11.123 21.5743 10.1562L21.2227 8.22266C21.1739 7.95898 21.3789 7.79297 21.6231 7.87109L22.7852 8.26172C23.5762 8.53516 24.1719 8.04688 24.1036 7.25586L23.6348 2.60742C23.586 2.03125 23.0684 1.64062 22.5411 1.69922C22.0039 1.75781 21.584 2.24609 21.6329 2.8125L21.9454 5.87891L19.1719 4.95117C18.0391 4.57031 16.8379 4.77539 15.9004 5.58594L13.9961 7.22656L10.9102 7.22656L7.93168 5.74219C7.48246 5.50781 7.04301 5.39062 6.54496 5.35156L2.37504 5.03906L3.34184 2.11914C3.52739 1.58203 3.23442 1.01562 2.71684 0.839844C2.1895 0.664062 1.61332 0.947266 1.44731 1.47461L0.0508236 5.60547C-0.154255 6.23047 0.285199 6.88477 0.939495 6.93359Z"/></svg>;}

import { NavListCard } from './components/nav-list-card';
import { Grid, type GridColumn } from './grid';
import { Funds } from './funds';
import { Domains } from './domains';
import { Prospects } from './prospects';
import { Button } from './components/button';
import { StatCards } from './components/spectrumui/charts/stat-cards';
import { StatusBadge } from './components/spectrumui/status-badge';
import { CodeBlock } from './components/spectrumui/blocks/ai-assistants/code-block';
import './style.css';
import './theme.css';

type Firm = {id:string;name:string;domain:string;website:string;record_level:string;researched_at?:string;fields:{sectors?:string[];stages?:string[]}&Record<string,unknown>;sources:string[];portfolio:unknown[];scores?:Record<string,number>};
type Person = {id:string;name:string;firm_id:string;title:string;profile:string;focus:string;sources:string[];researched_at?:string};
type Relationship = {id:string;name:string;domain:string;page:string;status:string;next_action:string;next_action_due:string;expected_response:string};
type Page = {id:string;title:string};
type Catalog = {extra_domains?:string[];firms:Firm[];people:Person[];private_firms:Relationship[];pages:Page[];today:string};
type View = 'domains'|'directory'|'shortlists'|'people'|'people-table'|'prospects'|'pipeline'|'wiki';
const settings = {
  domains: ['Domains', ''],
  directory: ['Funds', ''],
  people: ['People', 'Public team members, roles, and sources.'],
  shortlists: ['Shortlists', ''],
  'people-table': ['Contacts table', 'Sort and filter public team members by recorded attributes.'],
  prospects: ['Your prospects', 'Company criteria, matching investors, and saved lists.'],
  pipeline: ['Your pipeline', 'Tracked investors, follow-ups, and next actions.'],
  wiki: ['Your wiki', 'Private notes and linked pages.'],
};
function pageHref(id:string) {return '#page='+encodeURIComponent(id);}
function openPage(id:string) {location.hash=pageHref(id);}
async function get<T,>(url:string, signal?:AbortSignal):Promise<T> {
  const response=await fetch(url,{signal}); const data=await response.json();
  if(!response.ok) throw new Error(data.error || 'Unable to load workspace');
  return data;
}
function Badge({children,tone='neutral'}:{children:React.ReactNode;tone?:string}) {return <StatusBadge tone={tone==='purple'?'violet':tone==='orange'?'warning':tone==='success'?'success':'neutral'}>{children}</StatusBadge>;}
function Name({name,detail}:{name:string;detail?:string}) {return <span className="record-name"><span className="avatar" aria-hidden="true">{name.slice(0,2).toUpperCase()}</span><span><span className="block font-medium">{name}</span>{detail&&<small>{detail}</small>}</span></span>;}

function Reader({id,data,back,revision}:{id:string;data:Catalog;back:View;revision:number}) {
  const [html,setHtml]=useState(''),[error,setError]=useState('');
  useEffect(()=>{const controller=new AbortController();setHtml('');setError('');
    get<{html:string}>('/api/page?id='+encodeURIComponent(id),controller.signal).then(p=>setHtml(p.html)).catch(e=>{if(e.name!=='AbortError')setError(e.message);});
    return ()=>controller.abort();
  },[id,revision]);
  const firm=data.firms.find(f=>'public/firms/'+f.id===id);
  const tracked=firm&&data.private_firms.find(f=>f.id===firm.id);
  return <section className="reader">
    <Button variant="ghost" asChild><a href={'#'+back}><ArrowLeft/>Back to {settings[back][0].toLowerCase()}</a></Button>
    <p className="eyebrow mt-8">{id.startsWith('private/')?'Private workspace':'Public research'}</p>
    {firm&&<div className="track-note"><div><div className="section-kicker"><Target size={15}/>PIPELINE</div><strong>{tracked?'Already in your pipeline':'Track investor'}</strong><p>{tracked?'Your private notes are linked below.':'Run this command to create a private relationship page. Nothing is sent.'}</p><CodeBlock code={`uv run fundraising-buddy track ${firm.id}`} filename="Track this investor" language="sh" copyLabel="Copy tracking command" className="command-block"/></div>{tracked&&<Button variant="outline" asChild><a href={pageHref('private/'+tracked.page)}>Open relationship<ArrowUpRight/></a></Button>}</div>}
    {error?<div role="alert" className="notice">{error}</div>:html?<article dangerouslySetInnerHTML={{__html:html}}/>:<p role="status">Loading page...</p>}
  </section>;
}
function Listings({view,data}:{view:View;data:Catalog}) {
  const common={rowId:(row:{id:string})=>row.id,searchable:true,batchSize:50,variant:'panel' as const,caption:settings[view][0],keyboardNavigation:false,className:'records-table'};
  if(view==='people') {
    const firmName=(id:string)=>data.firms.find(f=>f.id===id)?.name||id;
    const columns:DataTableColumn<Person>[]=[
      {id:'name',header:'Person',sortable:true,cell:p=><Name name={p.name}/>},
      {id:'firm',header:'Firm',sortable:true,value:p=>firmName(p.firm_id),cell:p=><a className="text-link" href={pageHref('public/firms/'+p.firm_id)}>{firmName(p.firm_id)}</a>},
      {id:'title',header:'Role',sortable:true},
      {id:'researched_at',header:'Research date',sortable:true},
    ];
    return <><DataTable {...common} title="Public people" data={data.people} columns={columns} searchPlaceholder="Search people..." searchText={p=>JSON.stringify(p)+' '+firmName(p.firm_id)} onRowClick={p=>openPage('public/people/'+p.id)}/><p className="footnote">Roles reflect the recorded research date. Verify current employment before reaching out. Personal email addresses are not included.</p></>;
  }
  if(view==='people-table') {
    const firmName=(id:string)=>data.firms.find(f=>f.id===id)?.name||id;
    const columns:GridColumn<Person>[]=[
      {id:'name',header:'Name',get:p=>p.name},{id:'id',header:'ID',get:p=>p.id},{id:'firm_id',header:'Firm ID',get:p=>p.firm_id},{id:'firm',header:'Firm',get:p=>firmName(p.firm_id)},
      {id:'title',header:'Title',get:p=>p.title},{id:'profile',header:'Profile',get:p=>p.profile},{id:'focus',header:'Focus',get:p=>p.focus},{id:'researched_at',header:'Research date',get:p=>p.researched_at||''},
      {id:'sources_count',header:'Sources',numeric:true,get:p=>p.sources.length},
    ];
    return <Grid view={view} rows={data.people} columns={columns} rowId={p=>p.id} title="Contacts" onRowClick={p=>openPage('public/people/'+p.id)}/>;
  }
  if(view==='pipeline') {
    const columns:DataTableColumn<Relationship>[]=[
      {id:'name',header:'Investor',sortable:true,cell:f=><Name name={f.name} detail={f.domain}/>},
      {id:'status',header:'Status',sortable:true,cell:f=><Badge tone="purple">{f.status}</Badge>},
      {id:'next_action',header:'Next action',cell:f=><span className="focus-cell">{f.next_action||'No next action recorded'}</span>},
      {id:'next_action_due',header:'Due / expected reply',sortable:true,cell:f=><span className="flex flex-col gap-1">{[['Action',f.next_action_due],['Reply',f.expected_response]].filter(([,d])=>d).map(([label,date])=><Badge key={label} tone={date<data.today?'orange':'neutral'}>{label}: {date}</Badge>)}</span>},
    ];
    return <DataTable {...common} title="Private relationships" data={data.private_firms} columns={columns} searchPlaceholder="Search pipeline..." onRowClick={f=>openPage('private/'+f.page)} quickFilter={{columnId:'status'}} emptyState={!data.private_firms.length?<div className="empty"><Layers/><h2>No tracked investors</h2><p>Open an investor profile and run its tracking command to add it to the pipeline.</p><Button asChild><a href="#directory">View investors<ArrowUpRight/></a></Button></div>:undefined}/>;
  }
  const columns:DataTableColumn<Page>[]=[{id:'title',header:'Page',sortable:true,cell:p=><Name name={p.title}/>},{id:'id',header:'Location',cell:p=>p.id.replace('private/','')}];
  return <><DataTable {...common} title="Workspace pages" data={data.pages.filter(p=>p.id.startsWith('private/'))} columns={columns} searchPlaceholder="Search wiki..." onRowClick={p=>openPage(p.id)}/><p className="footnote">Edit Markdown in workspace/wiki or ask your agent to update it. Run rollup to refresh the pipeline, then click Refresh here.</p></>;
}
function initialDarkMode() {
  // Embedded in aiex the parent passes ?theme=; it wins over the saved choice but is not persisted.
  const embedded=new URLSearchParams(location.search).get('theme');
  if(embedded==='dark'||embedded==='light')return embedded==='dark';
  try { const saved=localStorage.getItem('color-theme');if(saved==='dark'||saved==='light')return saved==='dark'; } catch {}
  return window.matchMedia('(prefers-color-scheme: dark)').matches;
}
const startingDarkMode=initialDarkMode();
document.documentElement.classList.toggle('dark',startingDarkMode);

function App() {
  const [dark,setDark]=useState(startingDarkMode);
  function toggleTheme(){
    const next=!dark;setDark(next);
    document.documentElement.classList.toggle('dark',next);
    try{localStorage.setItem('color-theme',next?'dark':'light');}catch{}
  }
  useEffect(()=>{
    // aiex posts {type:'aiex:theme', theme} when its own toggle flips; follow it without persisting.
    function onMessage(e:MessageEvent){
      if(e.source!==window.parent||e.data?.type!=='aiex:theme')return;
      const next=e.data.theme==='dark';setDark(next);document.documentElement.classList.toggle('dark',next);
    }
    addEventListener('message',onMessage);return()=>removeEventListener('message',onMessage);
  },[]);
  const [data,setData]=useState<Catalog>(),[error,setError]=useState(''),[busy,setBusy]=useState(false),[revision,setRevision]=useState(0),[route,setRoute]=useState(location.hash.slice(1));
  const request=useRef(0),back=useRef<View>('directory');
  const routeName=route.split('?')[0]==='firms-table'?'directory':route.split('?')[0];
  const view:View=Object.hasOwn(settings,routeName)?routeName as View:back.current;
  if(!route.startsWith('page='))back.current=view;
  let page='';try{if(route.startsWith('page='))page=decodeURIComponent(route.slice(5));}catch{page='invalid';}
  useEffect(()=>{const update=()=>setRoute(location.hash.slice(1));window.addEventListener('hashchange',update);return()=>window.removeEventListener('hashchange',update);},[]);
  async function refresh(){const token=++request.current;setBusy(true);setError('');try{const next=await get<Catalog>('/api/catalog');if(token===request.current){setData(next);setRevision(r=>r+1);}}catch(e){if(token===request.current)setError(e instanceof Error?e.message:'Unable to load');}finally{if(token===request.current)setBusy(false);}}
  useEffect(()=>{void refresh();},[]);
  const researchNav=[
    {icon:<Building2/>,label:'Funds',href:'#directory',meta:data?.firms.length.toLocaleString()},
    {icon:<Globe/>,label:'Domains',href:'#domains'},
    {icon:<Users/>,label:'People',href:'#people',meta:data?.people.length.toLocaleString()},
    {icon:<Contact/>,label:'Contacts table',href:'#people-table'},
  ];
  const workspaceNav=[
    {icon:<Bookmark/>,label:'Shortlists',href:'#shortlists'},
    {icon:<Target/>,label:'Your prospects',href:'#prospects'},
    {icon:<Layers/>,label:'Your pipeline',href:'#pipeline',meta:data?.private_firms.length.toLocaleString()},
    {icon:<BookOpen/>,label:'Your wiki',href:'#wiki'},
  ];
  const activeHref=page?undefined:'#'+view;
  const publicView=page?page.startsWith('public/'):['directory','people','people-table'].includes(view);
  return <MotionConfig reducedMotion="user" nonce={document.querySelector<HTMLMetaElement>('meta[name="style-nonce"]')?.content}>
    <a href="#content" className="skip-link" onClick={e=>{e.preventDefault();document.getElementById('content')?.focus();}}>Skip to content</a>
    <div className="app-shell">
      <aside className="sidebar">
        <a href="#directory" className="brand"><span className="brand-icon"><BrandMark/></span><span>Fundraising Buddy</span></a>
        <nav aria-label="Main navigation" data-current={view}>
          <NavListCard title="RESEARCH LIBRARY" items={researchNav} activeHref={activeHref}/>
          <NavListCard title="PRIVATE WORKSPACE" items={workspaceNav} activeHref={activeHref}/>
        </nav>
        <div className="sidebar-bottom">
          <div className="local-note"><span className="local-note-icon"><LockKeyhole size={17}/></span><strong>Local data</strong><p>Company details and relationship notes are stored in your private workspace.</p><StatusBadge tone="neutral" showIcon={false}>Docker workspace</StatusBadge></div>
          <a href="https://ui.spectrumhq.in" target="_blank" rel="noreferrer" className="spectrum-credit">Built with Spectrum UI<ArrowUpRight size={13}/></a>
        </div>
      </aside>
      <main id="content" tabIndex={-1}>
        <header className="topbar">
          <div className="breadcrumb"><span className="breadcrumb-icon">{publicView?<Building2 size={15}/>:<LockKeyhole size={15}/>}</span><span>{publicView?'Research library':'Private workspace'}</span><span className="breadcrumb-divider">/</span><strong>{page?'Profile':settings[view][0]}</strong></div>
          <div className="top-actions"><span className="local-status"><StatusBadge tone="success" showIcon={false}><span className="status-dot"/>Docker workspace</StatusBadge></span><Button variant="outline" size="sm" onClick={()=>void refresh()} disabled={busy}><RefreshCw size={14} className={busy?'animate-spin':''}/>{busy?'Refreshing...':'Refresh'}</Button><button className="theme-toggle" aria-label={dark?'Switch to day mode':'Switch to night mode'} title={dark?'Switch to day mode':'Switch to night mode'} onClick={toggleTheme}>{dark?<Sun size={17}/>:<Moon size={17}/>}</button></div>
        </header>
        <div className="main-content">
          {error&&<div role="alert" className="notice">{error} {data?'Showing previously loaded data.':''}</div>}
          {!data&&!error&&<p role="status" className="loading-workspace">Loading your workspace...</p>}
          {data&&(page?<Reader key={page} id={page} data={data} back={back.current} revision={revision}/>:<>
            {view==='domains'?<Domains firms={data.firms} relationships={data.private_firms} extraDomains={data.extra_domains||[]}/>:view==='directory'||view==='shortlists'?<Funds key={view} funds={data.firms} people={data.people} revision={revision} shortlistsOnly={view==='shortlists'}/>:<>
            <section className="intro">
              <div><h1>{settings[view][0]}</h1><p className="subtitle">{settings[view][1]}</p></div>
            </section>
            <StatCards className="metrics" columns={4} cards={[
              {label:'Investor firms',value:data.firms.length,format:v=>Math.round(v).toLocaleString('en-US'),caption:'Public firm identities'},
              {label:'Public people',value:data.people.length,format:v=>Math.round(v).toLocaleString('en-US'),caption:'People-at-firm records'},
              {label:'Sourced profiles',value:data.firms.filter(f=>f.record_level==='sourced').length,format:v=>Math.round(v).toLocaleString('en-US'),caption:'Dated evidence, not live verification'},
              {label:'In your pipeline',value:data.private_firms.length,format:v=>Math.round(v).toLocaleString('en-US'),caption:'Your private relationships'},
            ]}/>
            {view==='prospects'?<Prospects revision={revision}/>:<Listings key={view} view={view} data={data}/> }</>}
            <footer className="page-footer"><span>Fundraising Buddy <span className="footer-version">LOCAL PREVIEW</span></span></footer>
          </>)}
        </div>
      </main>
    </div>
  </MotionConfig>;
}
createRoot(document.getElementById('root')!).render(<App/>);
