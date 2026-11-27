import type {Task} from './ops';
import {subjects,reviewSubjectMinimum,type Learner} from './model';
// A shared cohort assignment and individual self-reported completion are separate records.
export const learnerAssignments=(tasks:Task[],learner:Learner)=>{
 const prefix=learner.campus+' / '+learner.stream+' Year '+learner.year+' / ';
 return tasks.filter(t=>t.kind==='Assignments'&&(t.scope===learner.id||t.scope===prefix+learner.batch||t.scope===prefix+'All batches'));
};
export const assignmentDone=(tasks:Task[],learnerId:string,assignmentId:string)=>tasks.some(t=>t.kind==='Assignment completion'&&t.scope===learnerId&&t.title===assignmentId&&t.status==='Completed');
export function toggleAssignment(tasks:Task[],learner:Learner,assignmentId:string):Task[]{
 if(!learnerAssignments(tasks,learner).some(t=>t.id===assignmentId&&t.status==='Open'))return tasks;
 if(assignmentDone(tasks,learner.id,assignmentId))return tasks.filter(t=>!(t.kind==='Assignment completion'&&t.scope===learner.id&&t.title===assignmentId));
 return [...tasks,{id:'assignment-'+learner.id+'-'+assignmentId,scope:learner.id,kind:'Assignment completion',title:assignmentId,status:'Completed'}];
}

// Targeted assignments are linked to an open individual intervention and remain separate from assessment marks.
export function interventionSubject(learner:Learner,month:number){const marks=learner.marks[month];if(!marks)return undefined;const min=Math.min(...marks);return min<reviewSubjectMinimum?subjects[learner.stream][marks.indexOf(min)]:undefined}
export const interventionAssignment=(tasks:Task[],interventionId:string)=>tasks.find(t=>t.kind==='Assignments'&&t.sourceIntervention===interventionId);
export function addInterventionAssignment(tasks:Task[],learner:Learner,interventionId:string,month:number):Task[]{
 const intervention=tasks.find(t=>t.id===interventionId&&t.kind==='Academic intervention'&&t.scope===learner.id&&t.period===month&&t.status==='Open');
 const subject=interventionSubject(learner,month);
 if(!intervention||!subject||interventionAssignment(tasks,interventionId))return tasks;
 return [...tasks,{id:'targeted-'+intervention.id,scope:learner.id,kind:'Assignments',title:subject+' · targeted review and practice',status:'Open',owner:'Academic team',due:'2026-12-04',period:month,subject,sourceIntervention:intervention.id}];
}
