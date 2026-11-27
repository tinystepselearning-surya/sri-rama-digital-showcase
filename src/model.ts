import {campuses} from './institution';
export const months=['May','Jun','Jul','Aug','Sep','Oct'];
export const streams=['MPC','BiPC','MEC','CEC'] as const;
export type Stream=typeof streams[number];
export const subjects:Record<Stream,string[]>={MPC:['Mathematics','Physics','Chemistry'],BiPC:['Biology','Physics','Chemistry'],MEC:['Mathematics','Economics','Commerce'],CEC:['Civics','Economics','Commerce']};
export type Learner={id:string;campus:string;stream:Stream;year:1|2;batch:string;present:number[];marks:number[][];feedback?:string};
export const initialLearners:Learner[]=campuses.flatMap((c,i)=>streams.flatMap((stream,k)=>([1,2] as const).flatMap(year=>Array.from({length:[32,26,22,40,30,38,22,44,34][i]+[8,4,-5,-7][k]+(year===1?2:-2)},(_,j)=>{const seed=i*101+k*37+year*19+j*11;const trend=(j%7===0?-3:j%4===0?0:2)+(k===1?1:0);return {id:'DEMO-'+String(i+1).padStart(2,'0')+'-'+stream+'-'+year+'-'+String(j+1).padStart(2,'0'),campus:c.name,stream,year,batch:j%2===0?'A':'B',present:months.map((_,m)=>Math.max(12,Math.min(30,29-((seed+m*3)%5)-(j%11===0?8:j%5===0?4:0)+(i===5?1:i===4?-3:0)+(m>=4&&i===6?-3:0)))),marks:months.map((_,m)=>[0,1,2].map(s=>Math.max(0,Math.min(100,42+(seed+s*13)%46+trend*m+(i===5?8:i===4?-8:0)+(s===1?-5:s===2?4:0)))))};}))));
export const feeMonths=['May','Jun','Jul','Aug','Sep','Oct','Nov','Dec','Jan','Feb','Mar','Apr'];
export const annualFee=(s:Learner)=>{const i=campuses.findIndex(c=>c.name===s.campus),n=Number(s.id.slice(-2)),gross=[68000,85000,70000,145000,105000,150000,125000,115000,65000][i]+(s.stream==='MPC'||s.stream==='BiPC'?12000:0)+(s.year===2?5000:0),concession=n%9===0?6000:n%5===0?3000:0,billed=gross-concession;
 const schedule=feeMonths.map(()=>0);const pattern=n%8;
 if(pattern===0){schedule[0]=billed}else if(pattern===1){schedule[0]=Math.round(billed*.55);schedule[3]=billed-schedule[0]}else{schedule[0]=Math.round(billed*.30);schedule[1]=Math.round(billed*.20);schedule[3]=Math.round(billed*.20);schedule[6]=Math.round(billed*.15);schedule[9]=billed-schedule.reduce((a,b)=>a+b,0)}
 const rate=pattern<4?1:pattern===4?.95:pattern===5?.85:pattern===6?.70:.55;
 const receipts=schedule.map((amount,m)=>m<6?Math.round(amount*rate):0);
 for(const m of [2,4,5]){const shortfall=schedule.slice(0,m+1).reduce((a,b)=>a+b,0)-receipts.slice(0,m+1).reduce((a,b)=>a+b,0);receipts[m]+=Math.round(shortfall*(pattern===4?.6:.25))}
 return {gross,concession,billed,schedule,receipts}};
export const money=(v:number)=>{const abs=Math.abs(v),sign=v<0?'−':'';return sign+'₹'+(abs>=10000000?(abs/10000000).toFixed(2)+' Cr':abs>=100000?(abs/100000).toFixed(2)+' L':Math.round(abs).toLocaleString('en-IN'))};
export const sum=(xs:number[])=>xs.reduce((a,b)=>a+b,0);
export const ratio=(a:number,b:number)=>b?100*a/b:0;

// All reports use the same fixed sample assessment/session denominators.
export const scheduledSessions=30;
export const assessmentMaximum=300;
export const reviewAttendanceMinimum=24;
export const reviewSubjectMinimum=60;
export const learnerScore=(s:Learner,month:number)=>sum(s.marks[month]);
export const attendanceRate=(rows:Learner[],month:number)=>ratio(sum(rows.map(s=>s.present[month])),rows.length*scheduledSessions);
export const assessmentRate=(rows:Learner[],month:number)=>ratio(sum(rows.map(s=>learnerScore(s,month))),rows.length*assessmentMaximum);
