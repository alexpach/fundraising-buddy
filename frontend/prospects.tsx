import { useEffect, useState } from 'react';
import { DataTable, type DataTableColumn } from './components/data-table';
import { StatusBadge } from './components/spectrumui/status-badge';
import { CodeBlock } from './components/spectrumui/blocks/ai-assistants/code-block';
import { Button } from './components/button';
import { ArrowUpRight, FileCheck2, Info, ListChecks, SlidersHorizontal, Target } from 'lucide-react';

type Evidence = {field:string;url:string;as_of:string;freshness:string};
type Reason = {criterion:string;status:'match'|'conflict'|'unknown'|'unverified';detail:string;evidence:Evidence[]};
type Contact = {id:string;name:string;title:string;focus:string;researched_at:string;focus_overlap:boolean;sources:string[]};
type Warning = {kind:string;detail:string;url?:string;as_of?:string};
type Prospect = {firm_id:string;name:string;domain:string;record_level:string;support_score:number;counts:Record<string,number>;reasons:Reason[];warnings:Warning[];contacts:Contact[]};
type Snapshot = {id:string;name:string;created_at:string;criteria:Record<string,unknown>;rows:Prospect[]};
type Result = {criteria:Record<string,unknown>;rows:Prospect[];lists:Snapshot[];message:string};
const href=(id:string)=>'#page='+encodeURIComponent(id);
const quote=(value:string)=>"'"+value.replaceAll("'", "'\"'\"'")+"'";

function Detail({row,listId}:{row:Prospect;listId:string}) {
  return <div className="prospect-detail">
    <p><a href={href('public/firms/'+row.firm_id)}>Open public research</a></p>
    <h4>Fit reasons and evidence</h4>
    <ul>{row.reasons.map(r=><li key={r.criterion}><strong>{r.criterion}</strong> <StatusBadge tone={r.status==='match'?'success':r.status==='conflict'?'warning':'neutral'}>{r.status==='conflict'?'potential mismatch':r.status}</StatusBadge><p>{r.detail}</p>
      {r.evidence.map(e=><p key={e.field}><a href={e.url} target="_blank" rel="noreferrer">Source for {e.field}</a> · {e.as_of||'Date unknown'} · {e.freshness}</p>)}</li>)}</ul>
    <h4>Review flags</h4>{row.warnings.length?row.warnings.map((w,i)=><p key={i}>{w.detail}{w.url&&<> <a href={w.url} target="_blank" rel="noreferrer">Source</a> ({w.as_of||'date unknown'})</>}</p>):<p>No recorded flags. This does not establish absence of conflicts.</p>}
    <h4>Public contacts</h4>{row.contacts.length?<ul>{row.contacts.map(p=><li key={p.id}><strong>{p.name}</strong> · {p.title} · Research date: {p.researched_at||'unknown'}<p>{p.focus||'Focus not recorded'}{p.focus_overlap?' (textual focus overlap; verify relevance)':''}</p>{p.sources.map(s=><a key={s} href={s} target="_blank" rel="noreferrer">Source </a>)}</li>)}</ul>:<p>No public contacts recorded. Research the current team before outreach.</p>}
    <h4>Track explicitly in your terminal</h4><CodeBlock code={listId?`uv run fundraising-buddy prospects-track ${listId} --firm ${row.firm_id}`:`uv run fundraising-buddy track ${row.firm_id}`} filename="Track selected investor" language="sh" copyLabel="Copy tracking command" className="command-block"/>
    <p>Tracking preserves existing relationship history. It does not send a message.</p>
  </div>;
}

export function Prospects({revision}:{revision:number}) {
  const [result,setResult]=useState<Result>(),[error,setError]=useState(''),[listId,setListId]=useState(''),[selected,setSelected]=useState<string[]>([]);
  const [newId,setNewId]=useState('my-shortlist'),[name,setName]=useState('My shortlist');
  useEffect(()=>{const controller=new AbortController();setError('');
    fetch('/api/prospects',{signal:controller.signal}).then(async r=>{const body=await r.json();if(!r.ok)throw new Error(body.error||'Unable to load prospects');return body as Result;}).then(r=>{setResult(r);setSelected([]);}).catch(e=>{if(e.name!=='AbortError')setError(e.message);});
    return ()=>controller.abort();
  },[revision]);
  if(error)return <p role="alert" className="notice">{error}</p>;
  if(!result)return <p role="status">Loading private prospect criteria...</p>;
  const snapshot=result.lists.find(s=>s.id===listId);
  const rows=snapshot?snapshot.rows:result.rows;
  const columns:DataTableColumn<Prospect>[]=[
    {id:'name',header:'Investor',sortable:true,cell:r=><a className="text-link" href={href('public/firms/'+r.firm_id)}>{r.name}</a>},
    {id:'support_score',header:'Supported fit',sortable:true,numeric:true,cell:r=>`${r.support_score}/100`},
    {id:'record_level',header:'Evidence',sortable:true,cell:r=><StatusBadge tone={r.record_level==='sourced'?'success':'neutral'}>{r.record_level}</StatusBadge>},
    {id:'matches',header:'Matches',value:r=>r.counts.match,numeric:true},
    {id:'conflicts',header:'Potential mismatches',value:r=>r.counts.conflict,numeric:true},
    {id:'uncertainties',header:'Unknown / unverified',value:r=>r.counts.unknown+r.counts.unverified,numeric:true},
  ];
  const validId=/^[a-z0-9][a-z0-9-]{0,79}$/.test(newId);
  const saveCommand=validId&&name.trim()&&selected.length?`uv run fundraising-buddy prospects-save ${newId} --name ${quote(name)} `+selected.map(id=>'--firm '+id).join(' '):'';
  return <section aria-label="Private prospect workflow">
    <div className="evidence-note"><Info size={18} aria-hidden="true"/><div><strong>How matching works</strong><p>Supported fit measures recorded sourced support for your criteria. Unknown data is not a mismatch, legacy tags are unverified, and completeness scores do not affect ranking.</p></div></div>
    <div className="prospect-setup">
      <div className="prospect-panel criteria-panel">
        <div className="panel-heading"><span className="panel-icon"><SlidersHorizontal size={18}/></span><div><p className="section-kicker">01 / CRITERIA</p><h2>Company and round criteria</h2></div><StatusBadge tone="violet">Private</StatusBadge></div>
        <p>Set your stage, sectors, geography, check range, and lead requirements. Edit <code>workspace/prospects/criteria.json</code> with your agent, then click Refresh.</p>
        <details><summary>{snapshot?'Saved criteria snapshot':'Current private criteria'}</summary><CodeBlock code={JSON.stringify(snapshot?snapshot.criteria:result.criteria,null,2)} filename="criteria.json" language="json" collapsedLines={100} variant="Numbered" copyLabel="Copy private criteria" className="command-block"/></details>
        {!snapshot&&<p className="setup-command">First time? Run <code>uv run fundraising-buddy prospects-init</code> to create the private criteria file.</p>}
      </div>
      <div className="prospect-panel shortlist-panel">
        <div className="panel-heading"><span className="panel-icon"><ListChecks size={18}/></span><div><p className="section-kicker">02 / CANDIDATES</p><h2>{snapshot?'Saved shortlist':'Choose a shortlist'}</h2></div></div>
        <label className="field-label">View shortlist<select aria-label="View shortlist" value={listId} onChange={e=>{setListId(e.target.value);setSelected([]);}}><option value="">Current matching results</option>{result.lists.map(s=><option key={s.id} value={s.id}>{s.name}</option>)}</select></label>
        {snapshot?<><p>Saved {new Date(snapshot.created_at).toLocaleDateString('en-US',{year:'numeric',month:'short',day:'numeric'})}. These are recorded results, not live matching. Create a new snapshot to revise the list.</p><CodeBlock code={`uv run fundraising-buddy prospects-export ${snapshot.id} --format csv`} filename="Export privately (use --format json for JSON)" language="sh" copyLabel="Copy export command" className="command-block"/><Button variant="outline" size="sm" asChild><a href={href('private/prospect-lists/'+snapshot.id)}>Open linked wiki snapshot<ArrowUpRight/></a></Button></>:<><p>{result.message||'Compare recorded support, potential mismatches, and unverified hints. Expand a row to inspect evidence, dates, conflicts, and contacts before selecting it.'}</p><div className="shortlist-summary"><StatusBadge tone="info">{rows.length.toLocaleString()} candidates</StatusBadge><span>{result.lists.length} saved {result.lists.length===1?'list':'lists'}</span></div></>}
      </div>
    </div>
    <DataTable className="records-table" key={listId||'preview'} data={rows} columns={columns} rowId={r=>r.firm_id} rowLabel={r=>r.name} title={snapshot?snapshot.name:'Matching candidates'} caption="Private investor matching candidates" searchable searchPlaceholder="Search matching candidates..." batchSize={50} variant="panel" keyboardNavigation={false} clipboard={false} selectable={!snapshot} selectedIds={selected} onSelectedChange={setSelected} renderDetail={r=><Detail row={r} listId={snapshot?.id||''}/>}/>
    {!snapshot&&<div className="prospect-panel save-panel">
      <div className="panel-heading"><span className="panel-icon"><FileCheck2 size={18}/></span><div><p className="section-kicker">03 / SAVE LIST</p><h2>Save selected investors</h2></div><StatusBadge tone={selected.length?'violet':'neutral'}>{selected.length} selected</StatusBadge></div>
      <p>Select investors after reviewing their evidence. Each new list preserves its criteria and results; nothing is saved automatically.</p>
      <div className="prospect-inputs"><label className="field-label">New list ID<input value={newId} onChange={e=>setNewId(e.target.value)}/></label><label className="field-label">List name<input value={name} onChange={e=>setName(e.target.value)}/></label></div>
      <p role="status" className="selection-status">{selected.length} investors selected</p>
      {saveCommand?<><p>Run this command in your terminal, then Refresh:</p><CodeBlock code={saveCommand} filename="Save shortlist command" language="sh" copyLabel="Copy save command" className="command-block"/></>:<div className="selection-hint"><Target size={16}/><p>Select at least one investor and use a valid lowercase list ID and name.</p></div>}
    </div>}
  </section>;
}
