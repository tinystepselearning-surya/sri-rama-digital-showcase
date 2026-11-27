import {paidProducts} from './academy';
import {isOpenLead,isDueLead,sampleSnapshot,type Lead} from './admissions-data';
export const plannedSeats=[250,500,1000,1500];
export const annualShares=[0,25,50,75,100];
export function coachingScenario(seats:number,annualShare:number){
 if(!plannedSeats.includes(seats)||!annualShares.includes(annualShare))throw new Error('Unsupported scenario assumption');
 const annualFees=[...new Set(paidProducts.filter(p=>p.kind==='annual').map(p=>p.fee))],crashFees=[...new Set(paidProducts.filter(p=>p.kind==='crash').map(p=>p.fee))];
 if(annualFees.length!==1||crashFees.length!==1)throw new Error('Scenario requires uniform fees per course type');
 const annual=Math.round(seats*annualShare/100),crash=seats-annual,annualFee=annualFees[0],crashFee=crashFees[0];
 return {seats,annual,crash,annualFee,crashFee,gross:annual*annualFee+crash*crashFee};
}
export function admissionsWorkload(leads:Lead[],business:string){
 const open=leads.filter(isOpenLead),due=open.filter(isDueLead),lateStage=business==='Online coaching'?'Payment pending':'Application';
 return {open:open.length,due:due.length,unassigned:open.filter(l=>!l.owner).length,unassignedDue:due.filter(l=>!l.owner).length,late:open.filter(l=>l.status===lateStage).length,lateStage};
}
export function recordDueFollowup(leads:Lead[],id:number):Lead[]{
 if(!leads.some(l=>l.id===id&&isDueLead(l)))return leads;
 return leads.map(l=>l.id===id?{...l,followedUp:true,activity:[...(l.activity||[]),sampleSnapshot+' · Sample follow-up completed']}:l);
}

export const annualEnrollmentTargets=[250,500,1000,1500];
export const crashEnrollmentTargets=[0,250,500,1000,1500,2000];
export const crashPlanningFees=[2500,3500];
export function enrollmentPlan(annual:number,crash:number,crashFee:number){if(!annualEnrollmentTargets.includes(annual)||!crashEnrollmentTargets.includes(crash)||!crashPlanningFees.includes(crashFee))throw new Error('Unsupported enrolment assumption');const annualFee=coachingScenario(1000,100).annualFee;return {annual,crash,annualFee,crashFee,total:annual+crash,annualGross:annual*annualFee,crashGross:crash*crashFee,gross:annual*annualFee+crash*crashFee};}
