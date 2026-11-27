import type {Task} from './ops';
import type {Learner} from './model';
import {sampleSnapshot} from './admissions-data';
export const taskDue=(t:Task)=>t.status==='Open'&&!!t.due&&t.due<=sampleSnapshot;
export const executiveActions=(tasks:Task[],campus:string)=>tasks.filter(t=>t.kind==='Executive action tracker'&&(campus==='All campuses'||t.scope===campus));
export const campusActionSummary=(tasks:Task[],learners:Learner[],campus:string)=>{
 const ids=new Set(learners.filter(s=>s.campus===campus).map(s=>s.id));
 const rows=tasks.filter(t=>t.status==='Open'&&(ids.has(t.scope)||t.scope===campus));
 const academic=rows.filter(t=>t.kind==='Academic intervention').length;
 const fees=rows.filter(t=>t.kind==='Fee follow-up').length;
 const family=rows.filter(t=>t.kind==='Family support history').length;
 const operations=rows.filter(t=>['Campus management actions','Operational incident queue'].includes(t.kind)).length;
 const executive=rows.filter(t=>t.kind==='Executive action tracker').length;
 return {academic,fees,family,operations,executive,total:academic+fees+family+operations+executive};
};
export const taskDefaults=(kind:string)=>({owner:({'Executive action tracker':'Executive management','Campus management actions':'Centre Head','Operational incident queue':'Campus operations','Syllabus milestones':'Academic team','Lesson planning':'Academic team','Assignments':'Academic team','Study planner':'Student'} as Record<string,string>)[kind]||'Not assigned',due:'2026-12-04'});
