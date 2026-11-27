import {campuses} from './institution';
export const months=['May','Jun','Jul','Aug','Sep','Oct'];
export const streams=['MPC','BiPC','MEC','CEC'] as const;
export type Stream=typeof streams[number];
export const subjects:Record<Stream,string[]>={MPC:['Mathematics','Physics','Chemistry'],BiPC:['Biology','Physics','Chemistry'],MEC:['Mathematics','Economics','Commerce'],CEC:['Civics','Economics','Commerce']};
export type Learner={id:string;campus:string;stream:Stream;year:1|2;batch:string;present:number[];marks:number[][];feedback?:string};
export const initialLearners:Learner[]=campuses.flatMap((c,i)=>streams.flatMap((stream,k)=>([1,2] as const).flatMap(year=>Array.from({length:24+i*2},(_,j)=>{const seed=i*101+k*37+year*19+j*11;const trend=(j%7===0?-2:2)+(k===1?1:0);return {id:'DEMO-'+String(i+1).padStart(2,'0')+'-'+stream+'-'+year+'-'+String(j+1).padStart(2,'0'),campus:c.name,stream,year,batch:j%2===0?'A':'B',present:months.map((_,m)=>Math.max(12,Math.min(30,27-((seed+m*3)%7)+(i===5?3:i===4?-4:0)+(m>=4&&i===6?-3:0)))),marks:months.map((_,m)=>[0,1,2].map(s=>Math.max(0,Math.min(100,42+(seed+s*13)%46+trend*m+(i===5?8:i===4?-8:0)+(s===1?-5:s===2?4:0)))))};}))));
export const feeMonths=['May','Jun','Jul','Aug','Sep','Oct','Nov','Dec','Jan','Feb','Mar','Apr'];
export const annualFee=(s:Learner)=>{const i=campuses.findIndex(c=>c.name===s.campus),n=Number(s.id.slice(-2)),gross=68000+(i%4)*12000+(s.stream==='MPC'||s.stream==='BiPC'?12000:0)+(s.year===2?5000:0),concession=n%9===0?6000:n%5===0?3000:0,billed=gross-concession;
 const schedule=feeMonths.map(()=>0);schedule[0]=Math.round(billed*.30);schedule[1]=Math.round(billed*.20);schedule[3]=Math.round(billed*.20);schedule[6]=Math.round(billed*.15);schedule[9]=billed-schedule.reduce((a,b)=>a+b,0);
 const receipts=schedule.map((amount,m)=>m<6?Math.round(amount*(n%11===0?.60:n%5===0?.82:.96)):0);
 // Late instalment recovery, without exceeding the accrued payment obligation.
 receipts[2]=Math.round((schedule[0]+schedule[1]-receipts[0]-receipts[1])*.35);receipts[4]=Math.round((schedule[0]+schedule[1]+schedule[3]-receipts[0]-receipts[1]-receipts[2]-receipts[3])*.35);receipts[5]=Math.round((schedule.slice(0,6).reduce((a,b)=>a+b,0)-receipts.slice(0,5).reduce((a,b)=>a+b,0))*.25);
 return {gross,concession,billed,schedule,receipts}};
export const money=(v:number)=>{const abs=Math.abs(v),sign=v<0?'−':'';return sign+'₹'+(abs>=10000000?(abs/10000000).toFixed(2)+' Cr':abs>=100000?(abs/100000).toFixed(2)+' L':Math.round(abs).toLocaleString('en-IN'))};
export const sum=(xs:number[])=>xs.reduce((a,b)=>a+b,0);
export const ratio=(a:number,b:number)=>b?100*a/b:0;
