import { useEffect, useRef, useState } from 'react';
import { createRoot } from 'react-dom/client';
import { MotionConfig } from 'motion/react';
import { ArrowLeft, ArrowUpRight, BookOpen, Building2, Contact, Download, Layers, LockKeyhole, RefreshCw, Bookmark, Target, Users, Sun, Moon } from 'lucide-react';
import { DataTable, type DataTableColumn } from './components/data-table';
// Original stick-figure-with-ball glyph, drawn in the lucide stroke style. Not Apple's SF Symbols artwork.
function FigurePlay({size=22}:{size?:number}){return <svg width={size} height={size} viewBox="0 0 32 32" fill="none" stroke="currentColor" strokeWidth={2.4} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><circle cx="14" cy="8" r="2.6"/><path d="M14 11.5v6.5"/><path d="M14 13l-5 3.5"/><path d="M14 13l5.5-3"/><path d="M14 18l-4 7.5"/><path d="M14 18l5.5 3"/><circle cx="24" cy="7" r="2.6" fill="currentColor" stroke="none"/></svg>;}

import { NavListCard } from './components/nav-list-card';
import { Grid, type GridColumn } from './grid';
import { Funds } from './funds';
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
type Catalog = {firms:Firm[];people:Person[];private_firms:Relationship[];pages:Page[];today:string};
type View = 'directory'|'shortlists'|'people'|'people-table'|'prospects'|'pipeline'|'wiki';
const settings = {
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
  function download(){if(!data)return;const domains=[...new Set(data.firms.map(f=>f.domain).filter(Boolean))].sort();const url=URL.createObjectURL(new Blob([domains.join('\n')+'\n'],{type:'text/plain'}));const a=document.createElement('a');a.href=url;a.download='investor-domains.txt';a.click();setTimeout(()=>URL.revokeObjectURL(url),1000);}
  const researchNav=[
    {icon:<Building2/>,label:'Funds',href:'#directory',meta:data?.firms.length.toLocaleString()},
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
        <a href="#directory" className="brand"><span className="brand-icon"><FigurePlay size={25}/></span><span>fundraising buddy</span></a>
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
          <div className="top-actions">{view==='directory'&&!page&&<Button variant="outline" size="sm" aria-label="Export domains" onClick={download}><Download size={14}/><span className="export-label">Export domains</span></Button>}<span className="local-status"><StatusBadge tone="success" showIcon={false}><span className="status-dot"/>Docker workspace</StatusBadge></span><Button variant="outline" size="sm" onClick={()=>void refresh()} disabled={busy}><RefreshCw size={14} className={busy?'animate-spin':''}/>{busy?'Refreshing...':'Refresh'}</Button><button className="theme-toggle" aria-label={dark?'Switch to day mode':'Switch to night mode'} title={dark?'Switch to day mode':'Switch to night mode'} onClick={toggleTheme}>{dark?<Sun size={17}/>:<Moon size={17}/>}</button></div>
        </header>
        <div className="main-content">
          {error&&<div role="alert" className="notice">{error} {data?'Showing previously loaded data.':''}</div>}
          {!data&&!error&&<p role="status" className="loading-workspace">Loading your workspace...</p>}
          {data&&(page?<Reader key={page} id={page} data={data} back={back.current} revision={revision}/>:<>
            {view==='directory'||view==='shortlists'?<Funds key={view} funds={data.firms} people={data.people} revision={revision} shortlistsOnly={view==='shortlists'}/>:<>
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
