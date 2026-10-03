import { useMemo, useState } from 'react';
import { DataTable, type DataTableColumn, type DataTableSort } from './components/data-table';

/** A flat, sortable, filterable view over any record. `get` returns the cell value. */
export type GridColumn<T> = {id:string;header:string;get:(row:T)=>string|number|undefined;numeric?:boolean};

type GridState = {q:string;sort:DataTableSort|null;filters:Record<string,string>};

// State lives in the hash query: #firms-table?q=ai&sort=name:asc&f.hq=london
function readState(view:string):GridState {
  const hash=location.hash.slice(1);
  const query=hash.startsWith(view+'?')?new URLSearchParams(hash.slice(view.length+1)):new URLSearchParams();
  const [columnId,direction]=(query.get('sort')||'').split(':');
  const filters:Record<string,string>={};
  query.forEach((value,key)=>{if(key.startsWith('f.')&&value)filters[key.slice(2)]=value;});
  return {q:query.get('q')||'',sort:columnId&&(direction==='asc'||direction==='desc')?{columnId,direction}:null,filters};
}
function writeState(view:string,state:GridState) {
  const query=new URLSearchParams();
  if(state.q)query.set('q',state.q);
  if(state.sort)query.set('sort',state.sort.columnId+':'+state.sort.direction);
  for(const [key,value] of Object.entries(state.filters))if(value)query.set('f.'+key,value);
  const text=query.toString();
  history.replaceState(null,'','#'+view+(text?'?'+text:''));
}

export function Grid<T>({view,rows,columns,rowId,onRowClick,title}:{view:string;rows:T[];columns:GridColumn<T>[];rowId:(row:T)=>string;onRowClick:(row:T)=>void;title:string}) {
  const [state,setState]=useState(()=>readState(view));
  const update=(patch:Partial<GridState>)=>{const next={...state,...patch};setState(next);writeState(view,next);};
  const text=(row:T,column:GridColumn<T>)=>{const value=column.get(row);return value===undefined||value===''?'':String(value);};
  const visible=useMemo(()=>{
    const needle=state.q.trim().toLowerCase();
    const active=columns.filter(c=>state.filters[c.id]?.trim());
    return rows.filter(row=>(!needle||columns.some(c=>text(row,c).toLowerCase().includes(needle)))
      &&active.every(c=>text(row,c).toLowerCase().includes(state.filters[c.id].trim().toLowerCase())));
  },[rows,columns,state.q,state.filters]);
  const tableColumns:DataTableColumn<T>[]=columns.map(c=>({id:c.id,header:c.header,sortable:true,numeric:c.numeric,value:row=>c.get(row),
    cell:row=>{const value=text(row,c);return <span className="grid-cell" title={value}>{value}</span>;}}));
  const activeCount=Object.values(state.filters).filter(v=>v.trim()).length;
  return <>
    <div className="grid-controls">
      <input type="search" className="grid-search" placeholder={'Search all columns...'} value={state.q} onChange={e=>update({q:e.target.value})} aria-label="Search all columns"/>
      <details open={activeCount>0||undefined}><summary>Column filters{activeCount?` (${activeCount})`:''}</summary>
        <div className="grid-filters">{columns.map(c=><label key={c.id}><span>{c.header}</span><input type="text" value={state.filters[c.id]||''} onChange={e=>update({filters:{...state.filters,[c.id]:e.target.value}})}/></label>)}
        {activeCount>0&&<button type="button" className="grid-clear" onClick={()=>update({filters:{}})}>Clear filters</button>}</div>
      </details>
      <span className="grid-count" role="status">{visible.length.toLocaleString()} of {rows.length.toLocaleString()}</span>
    </div>
    <DataTable className="records-table grid-table" data={visible} columns={tableColumns} rowId={rowId} title={title} caption={title} variant="panel" density="compact" batchSize={50}
      sort={state.sort} onSortChange={sort=>update({sort})} onRowClick={onRowClick} keyboardNavigation={false} pinFirstColumn stickyHeader maxHeight="70vh"/>
  </>;
}

export const joined=(value:unknown)=>Array.isArray(value)?value.join(', '):value===undefined||value===null?'':String(value);
