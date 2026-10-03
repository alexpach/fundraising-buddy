import { useEffect, useMemo, useRef, useState } from 'react';
import { ArrowDown, ArrowUp, ArrowUpDown, Bookmark, Check, ChevronDown, Columns3, Filter, FolderPlus, Layers, Plus, Search, X } from 'lucide-react';
import { Button } from './components/button';
import './funds.css';
import { InfiniteRows, useInfiniteRows } from './components/infinite-rows';
import { sectorValues } from './sectors';

export type Fund = {id:string;name:string;domain:string;website:string;record_level:string;researched_at?:string;fields:Record<string,unknown>;sources:string[];portfolio:unknown[];scores?:Record<string,number>};
type Shortlist = {id:string;name:string;firm_ids:string[];created_at:string;updated_at:string};
type ListData = {revision:number;lists:Shortlist[];token:string;changed_id?:string};
type Column = {id:string;label:string;kind:'text'|'tags'|'number'|'boolean'|'research'|'date';get:(f:Fund)=>unknown};
type Rule = {field:string;op:string;value:string};
type Sort = {field:string;direction:'asc'|'desc'};
type ViewState = {q:string;columns:string[];filters:Rule[];match:'all'|'any';sorts:Sort[];group:string;list:string};
const defaults:ViewState = {q:'',columns:['name','stages','sectors','leads_rounds','record_level','people_count'],filters:[],match:'all',sorts:[{field:'name',direction:'asc'}],group:'',list:''};
const storageKey='funds-view-v2';
const text=(v:unknown):string=>Array.isArray(v)?v.map(text).join(', '):v==null?'':typeof v==='object'?JSON.stringify(v):String(v);
const values=(v:unknown):string[]=>Array.isArray(v)?v.map(text).filter(Boolean):text(v)?[text(v)]:[];
const blank=(v:unknown)=>v==null||v===''||(Array.isArray(v)&&!v.length);
const bool=(v:unknown)=>v===true||v==='yes'?'Yes':v===false||v==='no'?'No':blank(v)?'Unknown':text(v);
const label=(key:string)=>({aum:'AUM',lps:'LPs',hq:'HQ',id:'ID','jev-score':'Jev score'} as Record<string,string>)[key]||key.replaceAll('_',' ').replace(/^./,c=>c.toUpperCase());
const aumLimits=[100e6,300e6,500e6,1e9,2e9,5e9,10e9,50e9,100e9,Infinity];
const aumLabels=['Under 100M','100M to <300M','300M to <500M','500M to <1B','1B to <2B','2B to <5B','5B to <10B','10B to <50B','50B to <100B','100B+'];
// ECB reference rates, 2026-10-02, units per EUR. USD conversion = USD / currency.
// https://www.ecb.europa.eu/stats/policy_and_exchange_rates/euro_reference_exchange_rates/html/index.en.html
const aumFx:Record<string,number>={EUR:1,USD:1.1225,GBP:.85033,CHF:.9279,JPY:176.99,CAD:1.5984,AUD:1.6176,CNY:7.5259,SEK:11.29,NOK:10.8315,DKK:7.4736,INR:108.1245,HKD:8.8084,SGD:1.4366,NZD:2.0002};
function aumGroup(value:unknown):string {
  if(blank(value))return 'Unknown';
  const s=text(value).trim();
  // Use the first explicit currency, ignoring later parenthetical equivalents.
  const currencyToken=s.match(/\b(?:EUR|USD|GBP|CHF|JPY|CAD|AUD|CNY|SEK|NOK|DKK|INR|HKD|SGD|NZD)\b|Euro\b|US\$|C\$|A\$|[$€£]/i)?.[0];
  const currency=currencyToken?({'€':'EUR','£':'GBP','$':'USD','US$':'USD','C$':'CAD','A$':'AUD','EURO':'EUR'} as Record<string,string>)[currencyToken.toUpperCase()]||currencyToken.toUpperCase():'USD';
  const match=s.match(/^(?:(?:approximately|about|over|more than|at least|rund)\s+)?(?:(?:[A-Z]{3}|US|C|A)\s*)?[$€£]?\s*(\d+(?:,\d{3})*(?:[.,]\d+)?)\s*(trillion|billion|million|milliarden|millions|bn|mn|[kmbt])?\b/i);
  if(!match)return 'Unknown';
  const amount=Number(/^\d+,\d{1,2}$/.test(match[1])?match[1].replace(',','.'):match[1].replaceAll(',',''));
  const unit=(match[2]||'').toLowerCase();
  const n=amount*(unit.startsWith('t')?1e12:unit==='milliarden'||unit.startsWith('b')?1e9:unit.startsWith('m')?1e6:unit==='k'?1e3:1);
  if(!Number.isFinite(n)||n<=0||(!unit&&n<1e6))return 'Unknown';
  const usd=currency==='USD'?n:n*aumFx.USD/aumFx[currency];
  return Number.isFinite(usd)?aumLabels[aumLimits.findIndex(limit=>usd<limit)]:'Unknown';
}
const stageOrder=['pre-seed','seed','series A','series B','series C+','growth','any','unknown'];
function stageValues(value:unknown):string[] {
  const normalized=values(value).flatMap(raw=>{
    const s=raw.toLowerCase().trim().replace(/[-_]+/g,' ').replace(/\s+/g,' ');
    if(/^(any|multi stage|stage agnostic)\b/.test(s))return ['any'];
    if(/^(growth|growth stage|growth equity)$/.test(s))return ['growth'];
    if(/^(pre seed|pre incorporation|inception)$/.test(s))return ['pre-seed'];
    if(/^(seed|late seed)$/.test(s))return ['seed'];
    const series=s.match(/^(?:early )?series ([a-z])\+?$/);
    if(series)return [series[1]==='a'?'series A':series[1]==='b'?'series B':'series C+'];
    // Broad or narrative stage claims need review before assigning specific rounds.
    return ['unknown'];
  });
  return stageOrder.filter(stage=>normalized.includes(stage));
}
function initial():ViewState {
  try {
    const params=new URLSearchParams(location.hash.split('?')[1]||'');
    const raw=params.get('view')||localStorage.getItem(storageKey);
    const saved=raw?JSON.parse(raw):{};
    if(!saved||typeof saved!=='object')return defaults;
    const state={...defaults,...saved};
    if(typeof state.q!=='string'||typeof state.group!=='string'||typeof state.list!=='string'
      ||!['all','any'].includes(state.match)
      ||!Array.isArray(state.columns)||!state.columns.every((c:unknown)=>typeof c==='string')
      ||!Array.isArray(state.filters)||!state.filters.every((r:Rule)=>r&&typeof r.field==='string'&&typeof r.op==='string'&&typeof r.value==='string')
      ||!Array.isArray(state.sorts)||!state.sorts.every((r:Sort)=>r&&typeof r.field==='string'&&['asc','desc'].includes(r.direction)))return defaults;
    if(params.has('view')&&params.get('v')!=='2')state.group='';
    if(params.has('q'))state.q=params.get('q')||'';
    for(const [key,value] of params)if(key.startsWith('f.'))state.filters=[...state.filters,{field:key.slice(2),op:'contains',value}];
    return state;
  }catch{return defaults;}
}
function matches(f:Fund,rule:Rule,columns:Column[]) {
  const c=columns.find(c=>c.id===rule.field);
  if(!c)return true;
  const value=c.get(f), query=rule.value.trim().toLowerCase();
  if(rule.op==='empty')return blank(value);
  if(rule.op==='present')return !blank(value);
  if(!query)return true;
  if(blank(value))return c.kind==='boolean'&&rule.op==='equals'&&query==='unknown';
  if(c.kind==='number'){
    const n=Number(value),q=Number(query);if(!Number.isFinite(n)||!Number.isFinite(q))return false;
    return rule.op==='gte'?n>=q:rule.op==='lte'?n<=q:rule.op==='not'?n!==q:n===q;
  }
  const parts=c.kind==='boolean'?[bool(value).toLowerCase()]:values(value).map(v=>v.toLowerCase());
  if(rule.op==='equals')return parts.includes(query);
  if(rule.op==='not')return !parts.includes(query);
  if(rule.op==='excludes')return !parts.some(v=>v.includes(query));
  if(rule.op==='gte')return text(value)>=rule.value;
  if(rule.op==='lte')return text(value)<=rule.value;
  return parts.some(v=>v.includes(query));
}
function Pill({value,kind='tags'}:{value:string;kind?:string}) {
  const color=kind==='research'?(value==='sourced'?'green':'gray'):kind==='boolean'?(value==='Yes'?'green':value==='No'?'gray':'amber'):['violet','blue','orange','green'][Array.from(value).reduce((n,c)=>n+c.charCodeAt(0),0)%4];
  return <span className={'fund-pill '+color}><span className="pill-dot"/>{kind==='research'?(value==='sourced'?'Sourced':'Directory'):value}</span>;
}
function Cell({column,fund}:{column:Column;fund:Fund}) {
  const v=column.get(fund);
  if(column.id==='name'){
    const website=/^https?:\/\//i.test(fund.website||'')?fund.website:fund.domain?'https://'+fund.domain:'';
    return <div className="fund-name"><span className="fund-monogram">{fund.name.slice(0,2).toUpperCase()}</span><span><a href={'#page='+encodeURIComponent('public/firms/'+fund.id)}><strong>{fund.name}</strong></a><small>{website?<a className="fund-website" href={website} target="_blank" rel="noopener noreferrer">{fund.domain||website}</a>:fund.domain}</small></span></div>;
  }
  if(blank(v))return <span className="fund-unknown">Unknown</span>;
  if(column.kind==='research')return <Pill value={text(v)} kind="research"/>;
  if(column.kind==='boolean')return <Pill value={bool(v)} kind="boolean"/>;
  if(column.kind==='tags')return <Tags key={JSON.stringify(v)} items={values(v)}/>;
  if(column.kind==='number')return <span className="fund-number">{Number(v).toLocaleString()}</span>;
  return <span className="fund-text" title={text(v)}>{text(v)}</span>;
}
function Tags({items}:{items:string[]}) {
  const [expanded,setExpanded]=useState(false);
  return <div className="fund-tags">{(expanded?items:items.slice(0,2)).map((value,index)=>!expanded&&index===1&&items.length>2?
    <span className="fund-tag-tail" key={value}><Pill value={value}/><button className="extra-tags" aria-label={'Show '+(items.length-2)+' more tags'} onClick={()=>setExpanded(true)}>+{items.length-2}</button></span>:
    <Pill key={value} value={value}/>)}</div>;
}
export function Funds({funds,people,revision,shortlistsOnly=false}:{funds:Fund[];people:{firm_id:string}[];revision:number;shortlistsOnly?:boolean}) {
  const [state,setState]=useState<ViewState>(initial);
  const [listData,setListData]=useState<ListData>();
  const [error,setError]=useState(''),[message,setMessage]=useState(''),[saving,setSaving]=useState(false);
  const [panel,setPanel]=useState(''),[selected,setSelected]=useState<string[]>([]),[collapsed,setCollapsed]=useState<string[]>([]);
  const [dialog,setDialog]=useState<null|{mode:'create'|'add'|'rename';ids:string[]}>(null),[name,setName]=useState(''),[target,setTarget]=useState('');
  const dialogRef=useRef<HTMLDialogElement>(null);
  const [columnQuery,setColumnQuery]=useState('');
  const scrollRef=useRef<HTMLDivElement>(null);
  const columns=useMemo<Column[]>(()=>{
    const counts=new Map<string,number>();people.forEach(p=>counts.set(p.firm_id,(counts.get(p.firm_id)||0)+1));
    const tags=new Set(['type','stages','sectors','geographies','offices']);
    const keys=[...new Set(['type','hq','stages','sectors','geographies','leads_rounds','check_size_min','check_size_max','aum','founded',...funds.flatMap(f=>Object.keys(f.fields))])];
    return [
      {id:'name',label:'Fund',kind:'text',get:f=>f.name},
      ...keys.map((key):Column=>({id:key,label:({hq:'Headquarters',leads_rounds:'Leads rounds',check_size_min:'Min. check',check_size_max:'Max. check'} as Record<string,string>)[key]||label(key),kind:tags.has(key)?'tags':key==='founded'?'number':key==='leads_rounds'?'boolean':'text',get:f=>key==='stages'?stageValues(f.fields[key]):key==='sectors'?sectorValues(f.fields[key]):f.fields[key]})),
      {id:'record_level',label:'Research',kind:'research',get:f=>f.record_level},
      {id:'researched_at',label:'Research date',kind:'date',get:f=>f.researched_at},
      {id:'people_count',label:'People',kind:'number',get:f=>counts.get(f.id)||0},
      {id:'portfolio_count',label:'Portfolio',kind:'number',get:f=>f.portfolio.length},
      {id:'sources_count',label:'Sources',kind:'number',get:f=>f.sources.length},
      {id:'domain',label:'Domain',kind:'text',get:f=>f.domain},
      {id:'website',label:'Website',kind:'text',get:f=>f.website},
      {id:'id',label:'ID',kind:'text',get:f=>f.id},
      ...[...new Set(funds.flatMap(f=>Object.keys(f.scores||{})))].sort().map((key):Column=>({id:'score:'+key,label:label(key)+' (completeness)',kind:'number',get:f=>f.scores?.[key]})),
    ];
  },[funds,people]);
  const activeList=listData?.lists.find(l=>l.id===state.list);
  async function loadLists(signal?:AbortSignal) {
    try{const r=await fetch('/api/shortlists',{signal});const data=await r.json();if(!r.ok)throw new Error(data.error);setListData(data);}
    catch(e){if(!(e instanceof Error&&e.name==='AbortError'))setError(e instanceof Error?e.message:'Cannot load shortlists');}
  }
  useEffect(()=>{const controller=new AbortController();void loadLists(controller.signal);return()=>controller.abort();},[revision]);
  useEffect(()=>{
    try{localStorage.setItem(storageKey,JSON.stringify(state));}catch{/* The URL still retains this view when browser storage is unavailable. */}
    const route=shortlistsOnly?'shortlists':'directory';
    history.replaceState(null,'','#'+route+'?v=2&view='+encodeURIComponent(JSON.stringify(state)));
  },[state,shortlistsOnly]);
  useEffect(()=>{if(dialog)dialogRef.current?.showModal();else dialogRef.current?.close();},[dialog]);
  useEffect(()=>{const restore=()=>{if(['directory','firms-table','shortlists'].includes(location.hash.slice(1).split('?')[0])){setState(initial());setSelected([]);setCollapsed([]);}};window.addEventListener('hashchange',restore);return()=>window.removeEventListener('hashchange',restore);},[]);
  const update=(patch:Partial<ViewState>)=>{setState(s=>({...s,...patch}));setCollapsed([]);};
  const selectList=(id:string)=>{update({list:id});setSelected([]);setMessage('');};
  function openDialog(mode:'create'|'add'|'rename',ids:string[]=[]){setError('');setName(mode==='rename'?activeList?.name||'':'');setTarget(activeList?.id||listData?.lists[0]?.id||'');setDialog({mode,ids});}
  async function mutate(action:string,extra:Record<string,unknown>,close=true) {
    if(!listData)return;
    setSaving(true);setError('');setMessage('');
    try {
      const response=await fetch('/api/shortlists',{method:'POST',headers:{'Content-Type':'application/json','X-Shortlist-Token':listData.token},body:JSON.stringify({revision:listData.revision,action,...extra})});
      const next=await response.json();if(!response.ok)throw new Error(next.error||'Cannot save shortlist');
      setListData(next);setSelected([]);
      if(close)setDialog(null);
      if(action==='create'&&shortlistsOnly)selectList(next.changed_id);
      setMessage(action==='create'?'Shortlist created.':action==='remove'?'Funds removed from shortlist.':'Shortlist saved.');
    }catch(e){setError(e instanceof Error?e.message:'Cannot save shortlist');}
    finally{setSaving(false);}
  }
  const visibleColumns=[...new Set(['name',...state.columns])].map(id=>columns.find(c=>c.id===id)).filter((c):c is Column=>!!c);
  const matching=useMemo(()=>{
    // A missing saved list must never silently display all funds.
    const listIds=state.list?new Set(activeList?.firm_ids||[]):null;
    const needle=state.q.trim().toLowerCase();
    return funds.filter(f=>(!listIds||listIds.has(f.id))&&(!needle||columns.some(c=>text(c.get(f)).toLowerCase().includes(needle)))&&
      (!state.filters.length||(state.match==='any'?state.filters.some(r=>matches(f,r,columns)):state.filters.every(r=>matches(f,r,columns)))))
      .sort((a,b)=>{
        for(const sort of state.sorts){
          const c=columns.find(c=>c.id===sort.field);if(!c)continue;
          const av=c.get(a),bv=c.get(b);
          if(blank(av)!==blank(bv))return blank(av)?1:-1;
          const d=c.kind==='number'?Number(av)-Number(bv):text(av).localeCompare(text(bv),undefined,{numeric:true,sensitivity:'base'});
          if(d)return sort.direction==='asc'?d:-d;
        }
        return a.id.localeCompare(b.id);
      });
  },[funds,columns,state,activeList]);
  const groupColumn=columns.find(c=>c.id===state.group);
  const groups=useMemo(()=>{
    if(!groupColumn)return [['All funds',matching]] as [string,Fund[]][];
    const grouped=new Map<string,Fund[]>();
    for(const f of matching){
      const v=groupColumn.get(f);
      const scoreBand=groupColumn.id==='score:jev-score'&&!blank(v)&&Number.isFinite(Number(v))?Math.floor(Number(v)/10)*10:null;
      const names=groupColumn.id==='aum'?[aumGroup(v)]:groupColumn.id==='score:jev-score'?(scoreBand===null?[]:[scoreBand===100?'100':`${scoreBand}-${scoreBand+9}`]):groupColumn.kind==='boolean'?[bool(v)]:values(v);
      for(const key of new Set(names.length?names:[groupColumn.id==='stages'?'unknown':'Unknown']))grouped.set(key,[...(grouped.get(key)||[]),f]);
    }
    return [...grouped].sort(([a],[b])=>groupColumn.id==='stages'?stageOrder.indexOf(a)-stageOrder.indexOf(b):a==='Unknown'?1:b==='Unknown'?-1:groupColumn.id==='aum'?(aumLabels.findIndex(label=>a.startsWith(label))-aumLabels.findIndex(label=>b.startsWith(label))||a.localeCompare(b)):a.localeCompare(b,undefined,{numeric:true}));
  },[matching,groupColumn]);
  const entries=groups.flatMap(([group,rows])=>collapsed.includes(group)?[]:rows.map(fund=>({group,fund})));
  const resetKey=JSON.stringify([state.q,state.filters,state.match,state.sorts,state.group,state.list,revision,collapsed]);
  const {count,loadMore,hasMore}=useInfiniteRows(entries.length,resetKey);
  useEffect(()=>{if(scrollRef.current)scrollRef.current.scrollTop=0;},[resetKey]);
  const loadedEntries=entries.slice(0,count);
  const loadedIds=[...new Set(loadedEntries.map(e=>e.fund.id))];
  const shownGroups=groups.filter(([g])=>collapsed.includes(g)||loadedEntries.some(e=>e.group===g));
  const allChecked=loadedIds.length>0&&loadedIds.every(id=>selected.includes(id));
  const toggle=(id:string)=>setSelected(s=>s.includes(id)?s.filter(x=>x!==id):[...s,id]);
  const moveColumn=(id:string,delta:number)=>{const ids=visibleColumns.map(c=>c.id);const i=ids.indexOf(id),j=i+delta;if(j<1||j>=ids.length)return;[ids[i],ids[j]]=[ids[j],ids[i]];update({columns:ids});};
  const changeRule=(i:number,patch:Partial<Rule>)=>update({filters:state.filters.map((r,j)=>i===j?{...r,...patch}:r)});
  const sortColumn=(id:string)=>update({sorts:[{field:id,direction:state.sorts[0]?.field===id&&state.sorts[0].direction==='asc'?'desc':'asc'},...state.sorts.filter(s=>s.field!==id)]});
  const missing=activeList?.firm_ids.filter(id=>!funds.some(f=>f.id===id))||[];
  return <section className="funds-workbench" aria-label="Funds explorer">
    <div className="funds-heading"><div><h1>{shortlistsOnly?'Shortlists':'Funds'}</h1><p>{funds.length.toLocaleString()} funds<span>·</span>{listData?.lists.length||0} shortlists</p></div><Button onClick={()=>openDialog('create')} disabled={!listData}><FolderPlus size={15}/>New shortlist</Button></div>
    {error&&<div role="alert" className="notice">{error} <button onClick={()=>{setError('');void loadLists();}}>Reload lists</button></div>}
    {message&&<p className="funds-message" role="status"><Check size={15}/>{message}</p>}
    <div className="funds-surface">
      <div className="funds-tabs"><button className={!state.list?'active':''} onClick={()=>selectList('')}>All funds <span>{funds.length}</span></button><label><Bookmark size={15}/><select aria-label="Browse shortlist" value={state.list} onChange={e=>selectList(e.target.value)}><option value="">Shortlists</option>{listData?.lists.map(l=><option key={l.id} value={l.id}>{l.name} ({l.firm_ids.length})</option>)}</select></label>{activeList&&<button className="rename-list" onClick={()=>openDialog('rename')}>Rename</button>}</div>
      {shortlistsOnly&&!state.list&&<div className="shortlist-cards">{listData?.lists.length?listData.lists.map(l=><button key={l.id} onClick={()=>selectList(l.id)}><Bookmark size={18}/><strong>{l.name}</strong><span>{l.firm_ids.length} funds</span></button>):<p>No shortlists yet. Create one, then add funds.</p>}</div>}
      <div className="funds-toolbar">
        <label className="funds-search"><Search size={16}/><input type="search" aria-label="Search funds" placeholder="Search funds..." value={state.q} onChange={e=>update({q:e.target.value})}/></label>
        <div className="funds-controls">{[{id:'filters',icon:<Filter size={15}/>,title:'Filters',count:state.filters.length},{id:'sort',icon:<ArrowUpDown size={15}/>,title:'Sort',count:state.sorts.length},{id:'group',icon:<Layers size={15}/>,title:'Group',count:state.group?1:0},{id:'columns',icon:<Columns3 size={15}/>,title:'Columns',count:visibleColumns.length}].map(p=><button key={p.id} aria-expanded={panel===p.id} onClick={()=>setPanel(panel===p.id?'':p.id)}>{p.icon}{p.title}{p.count>0&&<span>{p.count}</span>}</button>)}</div>
      </div>
      {panel&&<div className="funds-settings">
        <div className="settings-heading"><strong>{panel==='columns'?'Visible columns':panel==='group'?'Group funds':panel==='sort'?'Sort funds':'Filter funds'}</strong><button aria-label="Close settings" onClick={()=>setPanel('')}><X size={16}/></button></div>
        {panel==='columns'&&<><input aria-label="Find column" placeholder="Find a column..." value={columnQuery} onChange={e=>setColumnQuery(e.target.value)}/><div className="column-choices">{[...visibleColumns,...columns.filter(c=>!visibleColumns.some(v=>v.id===c.id))].filter(c=>c.label.toLowerCase().includes(columnQuery.toLowerCase())).map(c=><div key={c.id}><label><input type="checkbox" checked={visibleColumns.some(v=>v.id===c.id)} disabled={c.id==='name'} onChange={e=>update({columns:e.target.checked?[...state.columns,c.id]:state.columns.filter(id=>id!==c.id)})}/>{c.label}</label>{c.id!=='name'&&visibleColumns.some(v=>v.id===c.id)&&<span><button aria-label={'Move '+c.label+' left'} onClick={()=>moveColumn(c.id,-1)} disabled={visibleColumns[1]?.id===c.id}><ArrowUp size={13}/></button><button aria-label={'Move '+c.label+' right'} onClick={()=>moveColumn(c.id,1)} disabled={visibleColumns.at(-1)?.id===c.id}><ArrowDown size={13}/></button></span>}</div>)}</div><button className="text-button" onClick={()=>update({columns:defaults.columns})}>Reset columns</button></>}
        {panel==='group'&&<><label className="setting-label">Group by<select aria-label="Group by" value={state.group} onChange={e=>update({group:e.target.value})}><option value="">None</option>{columns.filter(c=>c.id!=='name').map(c=><option key={c.id} value={c.id}>{c.label}</option>)}</select></label><p>{state.group==='aum'?<>AUM buckets are in USD. Unspecified currencies are treated as USD. Conversion uses <a className="text-link" href="https://www.ecb.europa.eu/stats/policy_and_exchange_rates/euro_reference_exchange_rates/html/index.en.html" target="_blank" rel="noreferrer">ECB rates from 2 October 2026</a>.</>:<>Funds with several values appear in each matching group. Empty values appear under Unknown.</>}</p><div className="settings-actions"><button onClick={()=>{setCollapsed(groups.map(([g])=>g));}}>Collapse all</button><button onClick={()=>{setCollapsed([]);}}>Expand all</button></div></>}
        {panel==='sort'&&<>{state.sorts.map((s,i)=><div className="rule-row" key={i}><span>{i+1}</span><select aria-label={'Sort field '+(i+1)} value={s.field} onChange={e=>update({sorts:state.sorts.map((x,j)=>j===i?{...x,field:e.target.value}:x)})}>{columns.map(c=><option key={c.id} value={c.id}>{c.label}</option>)}</select><select aria-label={'Sort direction '+(i+1)} value={s.direction} onChange={e=>update({sorts:state.sorts.map((x,j)=>j===i?{...x,direction:e.target.value as 'asc'|'desc'}:x)})}><option value="asc">Ascending</option><option value="desc">Descending</option></select><button aria-label={'Remove sort '+(i+1)} onClick={()=>update({sorts:state.sorts.filter((_,j)=>i!==j)})}><X size={15}/></button></div>)}<button className="text-button" onClick={()=>update({sorts:[...state.sorts,{field:columns.find(c=>!state.sorts.some(s=>s.field===c.id))?.id||'name',direction:'asc'}]})}><Plus size={14}/>Add sort</button><p>Sorts apply within each group. Unknown values appear last.</p></>}
        {panel==='filters'&&<><label className="setting-label">Match<select aria-label="Filter match" value={state.match} onChange={e=>update({match:e.target.value as 'all'|'any'})}><option value="all">All rules</option><option value="any">Any rule</option></select></label>{state.filters.map((r,i)=>{const c=columns.find(c=>c.id===r.field);const options=[...new Set(funds.flatMap(f=>c?.kind==='boolean'?[bool(c.get(f))]:values(c?.get(f))))].sort();return <div className="rule-row" key={i}><select aria-label={'Filter field '+(i+1)} value={r.field} onChange={e=>changeRule(i,{field:e.target.value,op:'equals',value:''})}>{columns.map(c=><option key={c.id} value={c.id}>{c.label}</option>)}</select><select aria-label={'Filter operator '+(i+1)} value={r.op} onChange={e=>changeRule(i,{op:e.target.value})}>{[...(c?.kind==='number'||c?.kind==='date'?[]:[['contains','contains'],['excludes','does not contain']]),['equals','is'],['not','is not'],...(c?.kind==='number'||c?.kind==='date'?[['gte','at least / after'],['lte','at most / before']]:[]),['empty','is unknown'],['present','is recorded']].map(([v,l])=><option key={v} value={v}>{l}</option>)}</select>{!['empty','present'].includes(r.op)&&<><input aria-label={'Filter value '+(i+1)} list={'filter-options-'+i} type={c?.kind==='number'?'number':c?.kind==='date'?'date':'text'} placeholder="Value" value={r.value} onChange={e=>changeRule(i,{value:e.target.value})}/><datalist id={'filter-options-'+i}>{options.slice(0,500).map(o=><option key={o} value={o}/>)}</datalist></>}<button aria-label={'Remove filter '+(i+1)} onClick={()=>update({filters:state.filters.filter((_,j)=>i!==j)})}><X size={15}/></button></div>})}<div className="settings-actions"><button onClick={()=>update({filters:[...state.filters,{field:'sectors',op:'contains',value:''}]})}><Plus size={14}/>Add filter</button>{state.filters.length>0&&<button onClick={()=>update({filters:[]})}>Clear filters</button>}</div></>}
      </div>}
      {state.filters.length>0&&<div className="active-filters"><span>{state.match==='all'?'All':'Any'}:</span>{state.filters.map((r,i)=><button key={i} onClick={()=>update({filters:state.filters.filter((_,j)=>i!==j)})}>{columns.find(c=>c.id===r.field)?.label} {r.op} {r.value}<X size={12}/></button>)}</div>}
      <div className="funds-results"><span>{activeList&&<strong>{activeList.name} · </strong>}{matching.length.toLocaleString()} funds{groupColumn&&<> · {groups.length} groups</>}</span><div>{selected.length>0?<><span>{selected.length} selected</span><button onClick={()=>openDialog('add',selected)} disabled={!listData}><Plus size={14}/>Add to shortlist</button>{activeList&&<button disabled={saving} onClick={()=>void mutate('remove',{id:activeList.id,firm_ids:selected})}>Remove from list</button>}<button onClick={()=>setSelected([])}>Clear</button></>:<span>Select funds to add to a shortlist</span>}</div></div>
      {missing.length>0&&<p className="notice">{missing.length} saved funds are no longer in the catalog. Their IDs remain saved in this shortlist.</p>}
      {state.list&&listData&&!activeList&&<p role="alert" className="notice">This shortlist is unavailable. Choose another list or All funds.</p>}
      <div ref={scrollRef} className="funds-table-scroll" tabIndex={0} aria-label="Scrollable funds table">
        <table className="funds-table"><caption className="sr-only">{activeList?.name||'Funds'}</caption><thead><tr><th className="select-cell"><input type="checkbox" aria-label="Select loaded funds" checked={allChecked} disabled={!loadedIds.length} onChange={()=>setSelected(s=>allChecked?s.filter(id=>!loadedIds.includes(id)):[...new Set([...s,...loadedIds])])}/></th>{visibleColumns.map(c=><th className={c.id==='name'?'fund-name-column':undefined} key={c.id} aria-sort={state.sorts[0]?.field===c.id?(state.sorts[0].direction==='asc'?'ascending':'descending'):undefined}><button onClick={()=>sortColumn(c.id)}>{c.label}{state.sorts.some(s=>s.field===c.id)?(state.sorts.find(s=>s.field===c.id)?.direction==='asc'?<ArrowUp size={12}/>:<ArrowDown size={12}/>):<ArrowUpDown size={12}/>}</button></th>)}<th><span className="sr-only">Shortlists</span><Bookmark size={14}/></th></tr></thead>
          {shownGroups.map(([group,rows])=><tbody key={group}>{groupColumn&&<tr className="fund-group"><th colSpan={visibleColumns.length+2}><button aria-expanded={!collapsed.includes(group)} onClick={()=>{setCollapsed(s=>s.includes(group)?s.filter(g=>g!==group):[...s,group]);}}><ChevronDown size={15} className={collapsed.includes(group)?'collapsed':''}/><span className="group-dot"/><strong>{groupColumn.kind==='research'?(group==='sourced'?'Sourced profiles':'Directory seeds'):group}</strong><span className="group-count">{rows.length}</span></button></th></tr>}{!collapsed.includes(group)&&loadedEntries.filter(e=>e.group===group).map(({fund:f})=><tr key={f.id} className={selected.includes(f.id)?'selected':''}><td className="select-cell"><input type="checkbox" aria-label={'Select '+f.name} checked={selected.includes(f.id)} onChange={()=>toggle(f.id)}/></td>{visibleColumns.map(c=><td key={c.id}><Cell column={c} fund={f}/></td>)}<td><button className={'fund-save '+(listData?.lists.some(l=>l.firm_ids.includes(f.id))?'saved':'')} aria-label={'Add '+f.name+' to shortlist'} title={listData?.lists.filter(l=>l.firm_ids.includes(f.id)).map(l=>l.name).join(', ')||'Add to shortlist'} onClick={()=>openDialog('add',[f.id])} disabled={!listData}><Bookmark size={16}/></button></td></tr>)}</tbody>)}
        </table>
        {entries.length>0&&<InfiniteRows hasMore={hasMore} onLoad={loadMore}/>}
        {!matching.length&&<div className="funds-empty"><Search size={24}/><h2>{activeList&&!activeList.firm_ids.length?'This shortlist is empty':'No matching funds'}</h2><p>{activeList&&!activeList.firm_ids.length?'Open All funds and add funds to this list.':'Change the search or filters to see more funds.'}</p><button onClick={()=>update({q:'',filters:[]})}>Clear search and filters</button></div>}
      </div>
      <div className="funds-load-count">{count} of {entries.length} rows loaded{groupColumn?.kind==='tags'?' (funds may appear in several groups)':''}</div>
    </div>
    <p className="funds-footnote">Directory data is unverified. Research dates and sources are available in each profile. Completeness scores do not measure investment fit.</p>
    <dialog ref={dialogRef} className="shortlist-dialog" aria-labelledby="shortlist-dialog-title" onCancel={e=>{if(saving)e.preventDefault();else setDialog(null);}} onClose={()=>{if(!saving)setDialog(null);}}>
      {dialog&&<><div className="settings-heading"><h2 id="shortlist-dialog-title">{dialog.mode==='rename'?'Rename shortlist':dialog.mode==='create'?'New shortlist':'Add to shortlist'}</h2><button aria-label="Close shortlist dialog" disabled={saving} onClick={()=>setDialog(null)}><X size={18}/></button></div>
        {dialog.ids.length>0&&<p>{dialog.ids.length} {dialog.ids.length===1?'fund':'funds'} selected</p>}
        {error&&<p className="notice" role="alert">{error} <button disabled={saving} onClick={()=>{setError('');void loadLists();}}>Reload lists</button></p>}
        {dialog.mode==='add'&&listData?.lists.length!==0&&<label>Shortlist<select aria-label="Destination shortlist" value={target} onChange={e=>setTarget(e.target.value)}>{listData?.lists.map(l=><option key={l.id} value={l.id}>{l.name}</option>)}<option value="">Create new shortlist</option></select></label>}
        {(dialog.mode!=='add'||!target)&&<label>Shortlist name<input autoFocus aria-label="Shortlist name" maxLength={100} value={name} onChange={e=>setName(e.target.value)} placeholder="e.g. European seed funds"/></label>}
        <div className="dialog-actions"><Button variant="outline" disabled={saving} onClick={()=>setDialog(null)}>Cancel</Button><Button disabled={saving||!listData||((dialog.mode!=='add'||!target)&&!name.trim())} onClick={()=>void mutate(dialog.mode==='rename'?'rename':dialog.mode==='add'&&target?'add':'create',{id:dialog.mode==='rename'?activeList?.id:target,name,firm_ids:dialog.ids})}>{saving?'Saving...':dialog.mode==='rename'?'Save name':dialog.mode==='add'&&target?'Add funds':'Create shortlist'}</Button></div>
      </>}
    </dialog>
  </section>;
}
