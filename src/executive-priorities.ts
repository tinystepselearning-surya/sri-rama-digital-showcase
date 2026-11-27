import {campuses} from './institution';
import {reviewAttendanceMinimum,reviewSubjectMinimum,ratio,type Learner} from './model';
import {feeSummary,type Ledger} from './finance';
import {isDueLead,isDigital,type Lead} from './admissions-data';
import type {Task} from './ops';
export type Priority={id:string;campus:string;title:string;value:number;denominator:number;unit:'learners'|'rupees'|'leads';owner:string;destination:string;recommendation:string;period?:number};
export function executivePriorities(cohort:Learner[],ledger:Ledger[],leads:Lead[],scope:string,month:number):Priority[]{
 const rows=campuses.filter(c=>scope==='All campuses'||c.name===scope).map(c=>{
  const learners=cohort.filter(s=>s.campus===c.name),fees=feeSummary(ledger.filter(r=>r.channel==='Campus'&&r.campus===c.name),month),enquiries=leads.filter(l=>!isDigital(l)&&l.campus===c.name);
  return {campus:c.name,n:learners.length,attendance:learners.filter(s=>s.present[month]<reviewAttendanceMinimum).length,academic:learners.filter(s=>s.marks[month].some(m=>m<reviewSubjectMinimum)).length,overdue:fees.overdue,due:fees.due,followups:enquiries.filter(isDueLead).length,enquiries:enquiries.length};
 });
 const results:Priority[]=[];
 // Prioritise by exception rate within each category, then count, then campus name; fees use overdue amount.
 const choose=(key:'attendance'|'academic'|'overdue'|'followups',den:'n'|'due'|'enquiries')=>[...rows].filter(r=>r[key]>0).sort((a,b)=>(key==='attendance'||key==='academic'?ratio(b[key],b[den])-ratio(a[key],a[den]):0)||b[key]-a[key]||a.campus.localeCompare(b.campus))[0];
 const a=choose('attendance','n'),s=choose('academic','n'),f=choose('overdue','due'),l=choose('followups','enquiries');
 if(a)results.push({id:'attendance',campus:a.campus,title:'Review campus attendance exceptions',value:a.attendance,denominator:a.n,unit:'learners',owner:'Centre Head',destination:'attendance',recommendation:'Review absence context and agree a learner follow-up plan.',period:month});
 if(s)results.push({id:'academic',campus:s.campus,title:'Review subject learning gaps',value:s.academic,denominator:s.n,unit:'learners',owner:'Academic team',destination:'academics',recommendation:'Review subject-level results and plan targeted practice.',period:month});
 if(f)results.push({id:'fees',campus:f.campus,title:'Review outstanding fee recovery',value:f.overdue,denominator:f.due,unit:'rupees',owner:'Accounts team',destination:'finance',recommendation:'Reconcile scheduled receipts and review outstanding instalments.',period:month});
 if(l)results.push({id:'admissions',campus:l.campus,title:'Review admissions follow-up backlog',value:l.followups,denominator:l.enquiries,unit:'leads',owner:'Admissions team',destination:'admissions',recommendation:'Review due enquiries and assign timely counsellor follow-ups.'});
 return results;
}
export const priorityOpen=(tasks:Task[],p:Priority)=>tasks.some(t=>t.kind==='Executive action tracker'&&t.scope===p.campus&&t.title===p.title&&t.status==='Open');
export function addPriorityAction(tasks:Task[],p:Priority):Task[]{
 if(p.value<=0||priorityOpen(tasks,p))return tasks;
 return [...tasks,{id:String(Math.max(0,...tasks.map(t=>Number(t.id)||0))+1),kind:'Executive action tracker',scope:p.campus,title:p.title,status:'Open',owner:p.owner,due:'2026-12-04',period:p.period,evidence:priorityEvidence(p),successCriterion:priorityCriterion(p)}];
}

export function priorityEvidence(p:Priority){return p.unit==='rupees'?'₹'+p.value.toLocaleString('en-IN')+' overdue of ₹'+p.denominator.toLocaleString('en-IN')+' scheduled':p.value+' of '+p.denominator+' '+p.unit+' · '+(p.period===undefined?'27 Nov snapshot':['May','June','July','August','September','October'][p.period]+' 2026');}
export function priorityCriterion(p:Priority){switch(p.id){case 'attendance':return 'Review every flagged learner; compare below-80% count and share in next completed month.';case 'academic':return 'Assign targeted revision and compare subject scores at the next assessment; aim for 60/100 or above.';case 'fees':return 'Reconcile every overdue instalment; review actual receipts and remaining overdue amount at next cutoff.';default:return 'Assign unowned due leads, complete follow-ups and review remaining due count; do not assume conversion.';}}
