import type {Task} from './ops';
import type {Learner} from './model';
// A shared cohort assignment and individual self-reported completion are separate records.
export const learnerAssignments=(tasks:Task[],learner:Learner)=>{
 const prefix=learner.campus+' / '+learner.stream+' Year '+learner.year+' / ';
 return tasks.filter(t=>t.kind==='Assignments'&&(t.scope===prefix+learner.batch||t.scope===prefix+'All batches'));
};
export const assignmentDone=(tasks:Task[],learnerId:string,assignmentId:string)=>tasks.some(t=>t.kind==='Assignment completion'&&t.scope===learnerId&&t.title===assignmentId&&t.status==='Completed');
export function toggleAssignment(tasks:Task[],learner:Learner,assignmentId:string):Task[]{
 if(!learnerAssignments(tasks,learner).some(t=>t.id===assignmentId&&t.status==='Open'))return tasks;
 if(assignmentDone(tasks,learner.id,assignmentId))return tasks.filter(t=>!(t.kind==='Assignment completion'&&t.scope===learner.id&&t.title===assignmentId));
 return [...tasks,{id:'assignment-'+learner.id+'-'+assignmentId,scope:learner.id,kind:'Assignment completion',title:assignmentId,status:'Completed'}];
}
