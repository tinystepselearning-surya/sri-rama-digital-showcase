import {campuses} from './institution';
import {initialLearners,annualFee,subjects,sum} from './model';
import type {Task} from './ops';
// Fictional starting records for the November 27 demonstration snapshot.
// Choose only existing learners and actual review criteria; no real staff or family details.
export function buildSampleTasks():Task[]{
 const tasks:Task[]=[];
 const add=(t:Omit<Task,'id'>)=>tasks.push({id:'seed-'+(tasks.length+1),...t});
 for(const [i,c] of campuses.entries()){
  const roster=initialLearners.filter(s=>s.campus===c.name);
  add({scope:c.name,kind:'Campus management actions',title:i%2?'Review overdue collections with accounts':'Coordinate attendance follow-up',status:'Open',owner:'Centre Head',due:'2026-12-02'});
  add({scope:c.name,kind:'Operational incident queue',title:'Review classroom equipment',status:i%3===0?'Completed':'Open',owner:'Campus operations',due:'2026-11-30'});
  // Keep default learner and default-campus intervention register available for a clean interactive demonstration.
  if(i===0)continue;
  const risk=roster.find(s=>s.present[5]<24||s.marks[5].some(m=>m<60));
  if(risk)add({scope:risk.id,kind:'Academic intervention',title:risk.present[5]<24?'Review attendance and learning support':'Plan subject revision',status:'Open',owner:'Academic team',due:'2026-12-04',period:5});
  const overdue=roster.find(s=>{const f=annualFee(s);return sum(f.schedule.slice(0,6))>sum(f.receipts.slice(0,6))});
  if(overdue)add({scope:overdue.id,kind:'Fee follow-up',title:'Review overdue annual fee instalments',status:i%3===0?'Completed':'Open',owner:'Accounts team',due:'2026-12-04',period:5});
  const learner=roster[0];
  add({scope:learner.id,kind:'Family support history',title:'Assessment clarification',status:i%2?'Open':'Completed',owner:'Centre Head'});
  add({scope:c.name+' / '+learner.stream+' Year '+learner.year+' / All batches',kind:'Assignments',title:subjects[learner.stream][0]+' · review and practice assignment',status:'Open',owner:'Academic team',due:'2026-12-02'});
 }
 add({scope:'All campuses',kind:'Executive action tracker',title:'Review outstanding fee recovery',status:'Open',owner:'Executive management',due:'2026-12-04'});
 add({scope:'All campuses',kind:'Executive action tracker',title:'Review digital coaching performance',status:'Completed',owner:'Executive management'});
 return tasks;
}
