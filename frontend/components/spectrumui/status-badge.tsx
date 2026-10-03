// Spectrum UI, Apache-2.0. Adapted from statusdemo.tsx: reusable tones and labels.
// Source and license: frontend/NOTICE.md and frontend/SPECTRUM-LICENSE.
import type { ReactNode } from 'react';
import { CircleCheck, CircleDashed, Clock5, ScanSearch, TriangleAlert, CircleX } from 'lucide-react';
import { cn } from '@/lib/utils';

export type StatusTone = 'neutral' | 'success' | 'warning' | 'info' | 'violet' | 'danger';
const tones = {
  neutral: {icon: Clock5, style: 'bg-neutral-100 text-neutral-600 ring-neutral-500/15'},
  success: {icon: CircleCheck, style: 'bg-emerald-50 text-emerald-700 ring-emerald-600/15'},
  warning: {icon: TriangleAlert, style: 'bg-amber-50 text-amber-800 ring-amber-600/15'},
  info: {icon: CircleDashed, style: 'bg-sky-50 text-sky-700 ring-sky-600/15'},
  violet: {icon: ScanSearch, style: 'bg-violet-50 text-violet-700 ring-violet-600/15'},
  danger: {icon: CircleX, style: 'bg-rose-50 text-rose-700 ring-rose-600/15'},
};

export function StatusBadge({children,tone='neutral',className,showIcon=true}:{children:ReactNode;tone?:StatusTone;className?:string;showIcon?:boolean}) {
  const {icon:Icon,style}=tones[tone];
  return <span data-tone={tone} className={cn('inline-flex w-fit items-center gap-1.5 whitespace-nowrap rounded-full px-2.5 py-1 text-[11px] font-medium leading-none ring-1 ring-inset',style,className)}>
    {showIcon&&<Icon className="size-3 shrink-0" strokeWidth={2} aria-hidden="true"/>}{children}
  </span>;
}
