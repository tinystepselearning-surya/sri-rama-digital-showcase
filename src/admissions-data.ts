import {campuses} from './institution';
import {streams} from './model';
import {paidProducts} from './academy';
export type Lead={id:number;programme:string;campus:string;status:string;source:'Online'|'Walk-in';product?:string;admissionYear?:1|2;academicYear?:string;courseKind?:'annual'|'crash'|'undecided';origin?:string;intent?:string;lossReason?:string;owner?:string;due?:string;followedUp?:boolean;created?:string;convertedAt?:string;activity?:string[]};
export const isDigital=(l:Lead)=>l.campus==='Digital academy'||l.programme==='Online preparation';
export const courseKind=(l:Lead)=>l.courseKind||(l.product?.includes('Annual programme')?'annual':l.product?.includes('Crash course')?'crash':'undecided');
export const initialLeads:Lead[]=[...campuses.flatMap((c,i)=>[12,18,30,52,68,38,3,2,1,1].flatMap((base,m)=>Array.from({length:base+(m<6?i:0)},(_,j)=>{const seed=(i*53+m*31+j*17)%100,created='2026-'+String(m+1).padStart(2,'0')+'-'+String(1+(j*7+i)%20).padStart(2,'0');const admissionYear:1|2=(j+i+m)%19===0?2:1;const status=m<6?(seed<(admissionYear===1?43:25)?'Converted':'Closed'):m<9?'Closed':seed<35?'Closed':seed<65?'Counselling':seed<85?'Application':'New';return {id:1000+i*1000+m*100+j,programme:streams[(i+j)%4],campus:c.name,admissionYear,academicYear:'2026–27',status,source:(j+i)%3===0?'Online' as const:'Walk-in' as const,owner:j%13===0?undefined:'Counsellor '+(1+(i+j)%5),due:status==='Converted'||status==='Closed'?undefined:'2026-11-'+String(23+j%7).padStart(2,'0'),created,convertedAt:status==='Converted'?created.slice(0,8)+String(Number(created.slice(8))+2+(j%6)).padStart(2,'0'):undefined,activity:['Sample campus enquiry created '+created]}}))),...[64,88,112,145,174,210].flatMap((n,m)=>Array.from({length:n},(_,j)=>{const product=paidProducts[(j*3+m)%paidProducts.length],seed=(j*23+m*11)%100,created='2026-'+String(m+5).padStart(2,'0')+'-'+String(1+j%20).padStart(2,'0'),status=seed<18?'Converted':seed<54?'Closed':seed<70?'Counselling':seed<80?'Course selected':seed<88?'Payment pending':'New';return {id:20000+m*1000+j,programme:'Online preparation',campus:'Digital academy',product:product.title,courseKind:product.kind as 'annual'|'crash',source:'Online' as const,status,created,convertedAt:status==='Converted'?created.slice(0,8)+String(Number(created.slice(8))+2+(j%6)).padStart(2,'0'):undefined,owner:j%13===0?undefined:'Counsellor '+(1+j%5),due:'2026-11-'+String(22+j%9).padStart(2,'0'),origin:'Online academy',activity:['Sample digital coaching enquiry '+created]}}))];

export const sampleSnapshot='2026-11-27';
export const campusStages=['New','Counselling','Visit scheduled','Application','Converted','Closed'];
export const onlineStages=['New','Counselling','Course selected','Payment pending','Converted','Closed'];
export const isOpenLead=(l:Lead)=>!['Converted','Closed'].includes(l.status);
export const isDueLead=(l:Lead)=>isOpenLead(l)&&!l.followedUp&&!!l.due&&l.due<=sampleSnapshot;
export const filterAdmissions=(leads:Lead[],business:string,campus:string,source:string,kind:string)=>leads.filter(l=>business==='Online coaching'?isDigital(l)&&(kind==='All courses'||courseKind(l)===kind):!isDigital(l)&&(campus==='All campuses'||l.campus===campus)&&(source==='All sources'||l.source===source));
// Historical confirmed orders only: a session CRM stage edit never creates a receipt.
export const confirmedOnlineOrders=()=>initialLeads.filter(l=>isDigital(l)&&l.status==='Converted').flatMap(l=>{const p=paidProducts.find(p=>p.title===l.product),month=Number(l.convertedAt?.slice(5,7))-5;if(!p||!Number.isInteger(month)||month<0||month>5)return [];return [{id:'ORDER-'+l.id,leadId:l.id,product:p.title,kind:p.kind,month,fee:p.kind==='annual'?9999:p.fee}]});

export const counsellorNames=['Counsellor 1','Counsellor 2','Counsellor 3','Counsellor 4','Counsellor 5','Unassigned'];
export const counsellorOf=(l:Lead)=>l.owner||'Unassigned';
export const matchesCounsellor=(l:Lead,owner:string)=>owner==='All counsellors'||counsellorOf(l)===owner;
export const sortFollowups=(a:Lead,b:Lead)=>(a.due||'9999-12-31').localeCompare(b.due||'9999-12-31')||(a.created||'9999-12-31').localeCompare(b.created||'9999-12-31')||a.id-b.id;

// Current-cycle campus demand and digital course demand are separate from enrolment and receipt ledgers.
export function admissionHistory(leads:Lead[],digital:boolean){
 const start=digital?5:1;return Array.from({length:11-start},(_,i)=>{const m=start+i,month='2026-'+String(m).padStart(2,'0'),cutoff='2026-'+String(m+1).padStart(2,'0')+'-01',rows=leads.filter(l=>isDigital(l)===digital&&l.created?.startsWith(month));const first=rows.filter(l=>digital?courseKind(l)==='annual':l.admissionYear===1).length,second=rows.filter(l=>digital?courseKind(l)==='crash':l.admissionYear===2).length;return {label:['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct'][m-1],month,total:rows.length,first,second,unknown:rows.length-first-second,converted:rows.filter(l=>l.convertedAt&&l.convertedAt<cutoff).length};});
}
