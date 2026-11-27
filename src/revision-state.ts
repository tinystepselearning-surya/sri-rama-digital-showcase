import {questions,type FreeEvent} from './free-learning';
export type Outcome='correct'|'incorrect'|'unanswered';
export function revisionItems(events:FreeEvent[],learnerId:string,allowed:string[]){
 const last=new Map<number,Outcome>();
 for(const e of events){if(e.learnerId!==learnerId)continue;
 if(e.kind==='practice'&&(e.correct===0||e.correct===1))last.set(Number(e.key),e.correct===1?'correct':'incorrect');
 if(e.kind==='mock')for(const o of e.outcomes||[])last.set(o.id,o.result);}
 return questions.filter(q=>allowed.includes(q.subject)&&last.has(q.id)&&last.get(q.id)!=='correct').map(q=>({...q,result:last.get(q.id)!,alternatives:questions.filter(a=>a.id!==q.id&&a.subject===q.subject&&a.topic===q.topic&&!last.has(a.id)).map(a=>a.id)}));
}
