import { useCallback, useEffect, useRef, useState } from 'react';

/** Reset the rendered window when the ordered result set changes, not on selection or theme changes. */
export function useInfiniteRows(total:number, resetKey:string, batchSize=50) {
  const [window,setWindow]=useState({key:resetKey,count:batchSize});
  if(window.key!==resetKey)setWindow({key:resetKey,count:batchSize});
  const count=Math.min(total,window.key===resetKey?window.count:batchSize);
  const loadMore=useCallback(()=>setWindow(previous=>({
    key:resetKey,
    count:Math.min(total,(previous.key===resetKey?previous.count:batchSize)+batchSize),
  })),[total,resetKey,batchSize,count]);
  return {count,loadMore,hasMore:count<total};
}

/** Observes the end of the rendered rows, including clipping by a nested scroll container. */
export function InfiniteRows({hasMore,onLoad}:{hasMore:boolean;onLoad:()=>void}) {
  const marker=useRef<HTMLDivElement>(null);
  useEffect(()=>{
    if(!hasMore||!marker.current||!('IntersectionObserver' in window))return;
    const observer=new IntersectionObserver(entries=>{
      if(entries.some(entry=>entry.isIntersecting)){observer.disconnect();onLoad();}
    },{rootMargin:'160px 0px'});
    observer.observe(marker.current);
    return()=>observer.disconnect();
  },[hasMore,onLoad]);
  return <div ref={marker} className="infinite-rows">
    {hasMore?<button onClick={onLoad}>Load more rows</button>:<span>All rows loaded</span>}
  </div>;
}
