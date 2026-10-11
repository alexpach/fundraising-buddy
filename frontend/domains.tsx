import { useMemo, useState } from 'react';
import { Download, ExternalLink } from 'lucide-react';
import { DataTable, type DataTableColumn, type DataTableSort } from './components/data-table';
import { Button } from './components/button';
import { sectorValues } from './sectors';

type Firm={id:string;name:string;domain:string;record_level:string;fields:Record<string,unknown>};
type Relationship={name:string;domain:string;status:string};
type Row={domain:string;funds:string[];sources:string[];research:string[];sectors:string[];statuses:string[]};
type State={q:string;source:string;research:string;sector:string;tld:string;sort:DataTableSort|null};
function initial():State {
  const p=new URLSearchParams(location.hash.split('?')[1]||'');
  return {q:p.get('q')||'',source:p.get('source')||'',research:p.get('research')||'',sector:p.get('sector')||'',tld:p.get('tld')||'',sort:{columnId:p.get('sort')||'domain',direction:p.get('direction')==='desc'?'desc':'asc'}};
}
export function Domains({firms,relationships,extraDomains}:{firms:Firm[];relationships:Relationship[];extraDomains:string[]}) {
  const [state,setState]=useState<State>(initial);
  function update(patch:Partial<State>){
    const next={...state,...patch};setState(next);
    const p=new URLSearchParams();
    for(const key of ['q','source','research','sector','tld'] as const)if(next[key])p.set(key,next[key]);
    if(next.sort){p.set('sort',next.sort.columnId);p.set('direction',next.sort.direction);}
    history.replaceState(null,'','#domains?'+p);
  }
  const rows=useMemo(()=>{
    const map=new Map<string,Row>();
    function add(value:string,source:string){
      const domain=value.trim().toLowerCase().replace(/\.$/,'');
      if(!/^(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z]{2,63}$/.test(domain))return;
      const row=map.get(domain)||{domain,funds:[],sources:[],research:[],sectors:[],statuses:[]};
      if(!row.sources.includes(source))row.sources.push(source);map.set(domain,row);return row;
    }
    for(const f of firms){const r=add(f.domain,'Catalog');if(r){r.funds.push(f.name);r.research.push(f.record_level==='sourced'?'Sourced':'Directory');r.sectors.push(...sectorValues(f.fields.sectors));}}
    for(const f of relationships){const r=add(f.domain,'Pipeline');if(r){r.funds.push(f.name);r.statuses.push(f.status);}}
    for(const domain of extraDomains)add(domain,'Configured alias');
    return [...map.values()].map(r=>({...r,...Object.fromEntries(['funds','sources','research','sectors','statuses'].map(k=>[k,[...new Set(r[k as keyof Row] as string[])].sort()]))}));
  },[firms,relationships,extraDomains]);
  const value=(r:Row,key:string)=>key==='domain'?r.domain:(r[key as keyof Row] as string[]|undefined)?.join(', ')||'';
  const visible=useMemo(()=>{
    const q=state.q.trim().toLowerCase();
    const result=rows.filter(r=>(!q||[r.domain,...r.funds].join(' ').toLowerCase().includes(q))&&(!state.source||r.sources.includes(state.source))&&(!state.research||r.research.includes(state.research))&&(!state.sector||r.sectors.includes(state.sector))&&(!state.tld||r.domain.endsWith('.'+state.tld.trim().replace(/^\./,'').toLowerCase())));
    const sort=state.sort;
    return result.sort((a,b)=>sort?(value(a,sort.columnId).localeCompare(value(b,sort.columnId),undefined,{numeric:true,sensitivity:'base'})*(sort.direction==='asc'?1:-1)||a.domain.localeCompare(b.domain)):a.domain.localeCompare(b.domain));
  },[rows,state]);
  function download(){
    const url=URL.createObjectURL(new Blob([visible.map(r=>r.domain).join('\n')+'\n'],{type:'text/plain;charset=utf-8'}));
    const a=document.createElement('a');a.href=url;a.download='investor-domains.txt';a.click();setTimeout(()=>URL.revokeObjectURL(url),1000);
  }
  const columns:DataTableColumn<Row>[]=[
    {id:'domain',header:'Domain',sortable:true,value:r=>r.domain,cell:r=><a className="text-link domain-link" href={'https://'+r.domain} target="_blank" rel="noopener noreferrer">{r.domain}<ExternalLink size={12}/></a>},
    ...(['funds','sources','research','sectors','statuses'] as const).map(key=>({id:key,header:({funds:'Funds',sources:'Source',research:'Research',sectors:'Sectors',statuses:'Relationship'})[key],sortable:true,value:(r:Row)=>r[key].join(', '),cell:(r:Row)=><span className="grid-cell" title={r[key].join(', ')}>{r[key].join(', ')||'Unknown'}</span>})),
  ];
  return <section aria-label="Domains">
    <div className="funds-heading"><div><h1>Domains</h1><p>{rows.length.toLocaleString()} tracked domains</p></div><Button onClick={download} disabled={!visible.length}><Download size={14}/>Export filtered list</Button></div>
    <div className="grid-controls domains-controls">
      <input className="grid-search" type="search" aria-label="Search domains" placeholder="Search domains or funds..." value={state.q} onChange={e=>update({q:e.target.value})}/>
      <label>Source<select aria-label="Source" value={state.source} onChange={e=>update({source:e.target.value})}><option value="">All sources</option>{['Catalog','Pipeline','Configured alias'].map(v=><option key={v}>{v}</option>)}</select></label>
      <label>Research<select aria-label="Research" value={state.research} onChange={e=>update({research:e.target.value})}><option value="">All research</option><option>Sourced</option><option>Directory</option></select></label>
      <label>Sector<select aria-label="Sector" value={state.sector} onChange={e=>update({sector:e.target.value})}><option value="">All sectors</option>{[...new Set(rows.flatMap(r=>r.sectors))].sort().map(v=><option key={v}>{v}</option>)}</select></label>
      <label>Domain suffix<input aria-label="Domain suffix" value={state.tld} placeholder="e.g. vc" onChange={e=>update({tld:e.target.value})}/></label>
      <button className="grid-clear" onClick={()=>update({q:'',source:'',research:'',sector:'',tld:''})}>Clear filters</button>
      <span className="grid-count" role="status">{visible.length.toLocaleString()} of {rows.length.toLocaleString()} domains</span>
    </div>
    <DataTable className="records-table" title="Tracked domains" caption="Tracked domains" data={visible} columns={columns} rowId={r=>r.domain} sort={state.sort} onSortChange={sort=>update({sort})} variant="panel" density="compact" batchSize={50} stickyHeader maxHeight="70vh" keyboardNavigation={false}/>
  </section>;
}
