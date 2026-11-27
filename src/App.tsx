import React, { useEffect, useState } from 'react';
import {articles,supportTopics} from './editorial';
import {campuses,methods,coaching,faculty} from './institution';
import {Dashboard,initialLeads,initialLearners} from './dashboard';
import {Academy,onlineRoutes} from './academy';
import {PaperLab} from './learning';
import {InstitutionHeader} from './header';
import {ContactLayer,EnquiryWizard,type Enquiry} from './contact';
import {PublicExtras,extraRoutes} from './public-extras';
import type {Task} from './ops';
import {FreeLearning,freeRoutes,type FreeEvent} from './free-learning';
import {paidProducts} from './academy';
import {workspaceRoutes,splitWorkspace} from './workspace';
import {ResultsHero,ExamLanding,ResultsArchive,resultRoutes,examKeys} from './results';

export const nav = [['home','Home'],['about','About'],['programmes','Academics'],['campuses','Campuses'],['support','Student life'],['achievements','Achievements'],['academy','Online Academy'],['free-centre','Free Learning'],['admissions','Admissions']] as const;
export const academicDetails = [
 ['mpc','MPC','Mathematics · Physics · Chemistry','A pathway for students interested in mathematics, physical sciences and engineering.','mpc'],
 ['bipc','BiPC','Biology · Physics · Chemistry','A pathway for students interested in biological sciences and medicine.','bipc'],
 ['mec','MEC','Mathematics · Economics · Commerce','A pathway for students interested in quantitative reasoning, economics and commerce.',''],
 ['cec','CEC','Civics · Economics · Commerce','A pathway for students interested in society, economics and commerce.',''],
 ['jee','JEE','Engineering entrance preparation','Proposed mathematics, physics and chemistry practice and concept revision.','mpc'],
 ['neet','NEET-UG','Medical entrance preparation','Proposed physics, chemistry and biology practice and concept revision.','bipc'],
 ['eapcet','TG EAPCET','Telangana entrance preparation','Proposed stream-specific preparation. Confirm current examination eligibility and syllabus.',''],
 ['bitsat','BITSAT','BITS Pilani admission test preparation','Proposed subject practice, English proficiency and logical reasoning. Confirm current examination pattern.','']
] as const;
export const routes:Record<string,readonly string[]>={
 ...onlineRoutes,
 ...freeRoutes,
 ...extraRoutes,
 ...workspaceRoutes,
 ...resultRoutes,
 'paper-lab':['/online-academy/question-paper-lab/','Question-paper Lab | Sri Raama Online','Explore a rule-based sample assessment generator.'],
 home:['/','Sri Raama | Intermediate Education & Exam Preparation Concept','Explore the proposed institutional and admissions experience.'],
 about:['/about/','About | Sri Raama Concept','Discover the proposed academic support and learning approach.'],
 campuses:['/campuses/','Campus Discovery | Sri Raama Concept','Explore illustrative campus profiles and location discovery.'],
 programmes:['/academics/','Academic Programmes | Sri Raama Concept','Explore intermediate streams and examination pathways.'],
 academy:['/online-academy/','Online Academy | Sri Raama Concept','Explore proposed annual and crash preparation programmes.'],
 resources:['/parent-guides/','Parent Guides | Sri Raama Concept','Explore questions to ask when choosing a programme.'],
 admissions:['/admissions/','Admissions | Sri Raama Concept','Try a sample enquiry without submitting personal information.'],
 exam:['/online-academy/sample-test/','Sample Test | Sri Raama Concept','Try a sample assessment with explanations.'],
 management:['/management/','Management Workspace | Sri Raama Concept','Explore a synthetic admissions pipeline.'],
 platform:['/digital-platform/','Digital Platform | Sri Raama Concept','Direct access to all fictional demonstration workspaces.'],
 'dashboard-founder':['/dashboard/founder/','Founder Dashboard | Sri Raama Concept','Explore synthetic executive intelligence across campuses.'],
 'dashboard-admissions':['/dashboard/admissions/','Admissions Dashboard | Sri Raama Concept','Explore a connected synthetic admissions pipeline.'],
 'dashboard-campus':['/dashboard/campus/','Centre Head | Sri Raama Digital','Campus-level academic and operational supervision.'],
 'dashboard-teacher':['/dashboard/teacher/','Centre Head | Legacy workspace | Sri Raama Digital','Legacy route for campus-level academic supervision.'],
 'dashboard-parent':['/dashboard/parent/','Parent Dashboard | Sri Raama Concept','Explore a fictional learner progress report.'],
 achievements:['/achievements/','Achievements | Sri Raama Concept','Explore a sample academic achievements archive with institution-supplied posters.'],
 student:['/online-academy/student/','Student Workspace | Sri Raama Concept','Explore an illustrative learning dashboard.'],
 founder:['/about/founder/','Founder & Leadership | Sri Raama','Discover the leadership profile and institutional vision.'],
 support:['/student-support/','Student Support | Sri Raama','Explore academic guidance, wellbeing and future pathways.'],
 life:['/campus-life/','Campus Life | Sri Raama','Explore the student experience and campus life.'],
 ...Object.fromEntries(articles.map(x=>[x.id,['/parent-guides/'+x.id+'/',x.title+' | Sri Raama',x.summary]])),
 ...Object.fromEntries(supportTopics.map(x=>[x.id,['/student-support/'+x.id+'/',x.title+' | Sri Raama',x.intro]])),
 ...Object.fromEntries(academicDetails.map(([key,title,sub,desc])=>[key,['/academics/'+key+'/',title+' | Sri Raama Concept',desc]])),
 approach:['/our-approach/','Our Educational Approach | Sri Raama','Explore the proposed approach to teaching, learning and assessment.'],
 team:['/about/team/','Our Academic Team | Sri Raama','Explore subject faculty and academic mentoring roles.'],
 ...Object.fromEntries(campuses.map(x=>[x.id,['/campuses/'+x.slug+'/',x.name+' | Sri Raama',x.intro]])),
 ...Object.fromEntries(methods.map(x=>[x.id,['/our-approach/'+x.id+'/',x.title+' | Sri Raama',x.intro]])),
 ...Object.fromEntries(coaching.map(x=>[x.id,['/coaching/'+x.id+'/',x.title+' | Sri Raama',x.intro]])),
 ...Object.fromEntries(faculty.map(x=>[x.id,['/about/team/'+x.slug+'/',x.title+' | Sri Raama','Sample faculty profile for '+x.subjects]]))
};
export const readPage=(path:string)=>Object.keys(routes).find(k=>routes[k][0]===(path.endsWith('/')?path:path+'/'))||'home';
export const hrefFor=(page:string)=>routes[page]?.[0]||'/';
type Page=string;
const programmes = [
 {title:'Intermediate — MPC',tag:'Engineering pathway',description:'Mathematics, Physics and Chemistry with a structured preparation pathway.',icon:'∑'},
 {title:'Intermediate — BiPC',tag:'Medical pathway',description:'Biology, Physics and Chemistry with concept-driven examination preparation.',icon:'✚'},
 {title:'Competitive preparation',tag:'JEE · NEET · EAPCET',description:'Practice, revision and feedback designed around examination goals.',icon:'↗'}
];
const courses = [{title:'BITSAT preparation',detail:'Crash course concept',price:'Illustrative'},{title:'JEE preparation',detail:'Annual online programme',price:'₹9,999'},{title:'NEET preparation',detail:'Annual online programme',price:'₹9,999'},{title:'TG EAPCET revision',detail:'Crash course concept',price:'Illustrative'}];
const questions = [
  {
    "subject": "Mathematics",
    "q": "Solve 2x + 5 = 17.",
    "opts": [
      "4",
      "5",
      "6",
      "7"
    ],
    "correct": 2,
    "why": "Subtract 5 and divide by 2."
  },
  {
    "subject": "Mathematics",
    "q": "What are the roots of x² − 5x + 6 = 0?",
    "opts": [
      "1 and 6",
      "2 and 3",
      "−2 and −3",
      "3 and 5"
    ],
    "correct": 1,
    "why": "Factor as (x − 2)(x − 3)."
  },
  {
    "subject": "Mathematics",
    "q": "If x + 1/x = 3, find x² + 1/x².",
    "opts": [
      "5",
      "7",
      "9",
      "11"
    ],
    "correct": 1,
    "why": "Square the equation and subtract 2."
  },
  {
    "subject": "Mathematics",
    "q": "What is the derivative of x³?",
    "opts": [
      "x²",
      "3x",
      "3x²",
      "x⁴/4"
    ],
    "correct": 2,
    "why": "Use the power rule."
  },
  {
    "subject": "Physics",
    "q": "What is the SI unit of force?",
    "opts": [
      "Joule",
      "Newton",
      "Watt",
      "Pascal"
    ],
    "correct": 1,
    "why": "Force is measured in newtons."
  },
  {
    "subject": "Physics",
    "q": "A body travels 120 m in 20 s at constant speed. Find its speed.",
    "opts": [
      "4 m/s",
      "5 m/s",
      "6 m/s",
      "8 m/s"
    ],
    "correct": 2,
    "why": "Speed = distance/time."
  },
  {
    "subject": "Physics",
    "q": "A body starts from rest at 2 m/s² for 5 s. Find its final speed.",
    "opts": [
      "2 m/s",
      "5 m/s",
      "10 m/s",
      "25 m/s"
    ],
    "correct": 2,
    "why": "v = u + at = 10 m/s."
  },
  {
    "subject": "Physics",
    "q": "What is the kinetic energy of a 2 kg body moving at 3 m/s?",
    "opts": [
      "3 J",
      "6 J",
      "9 J",
      "18 J"
    ],
    "correct": 2,
    "why": "Kinetic energy = ½mv² = 9 J."
  },
  {
    "subject": "Chemistry",
    "q": "How many moles are in 18 g of water (molar mass 18 g/mol)?",
    "opts": [
      "0.5",
      "1",
      "2",
      "18"
    ],
    "correct": 1,
    "why": "Divide mass by molar mass."
  },
  {
    "subject": "Chemistry",
    "q": "What mass is 0.5 mol of CO₂ (molar mass 44 g/mol)?",
    "opts": [
      "11 g",
      "22 g",
      "44 g",
      "88 g"
    ],
    "correct": 1,
    "why": "Mass = amount × molar mass."
  },
  {
    "subject": "Chemistry",
    "q": "Which of these is a noble gas?",
    "opts": [
      "Oxygen",
      "Nitrogen",
      "Argon",
      "Chlorine"
    ],
    "correct": 2,
    "why": "Argon is a group 18 noble gas."
  },
  {
    "subject": "Chemistry",
    "q": "What is the atomic number of carbon?",
    "opts": [
      "4",
      "6",
      "8",
      "12"
    ],
    "correct": 1,
    "why": "Carbon has six protons."
  }
];
export function App({initialPage='home'}:{initialPage?:Page}){
 const [page,setPage]=useState<Page>(initialPage);
 const [leads,setLeads]=useState(initialLeads);
 const [admissionsBusiness,setAdmissionsBusiness]=useState('Campus admissions');
 const createEnquiry=(e:Enquiry)=>{setAdmissionsBusiness(e.mode==='Online coaching'?'Online coaching':'Campus admissions');setLeads(prev=>[...prev,{id:Math.max(100,...prev.map(l=>l.id))+1,programme:e.programme,campus:e.campus,courseKind:e.courseKind,product:e.exam==='Not specified'?undefined:e.exam+' coaching',status:'New',source:'Online',origin:e.origin,intent:e.intent,created:'2026-11-27',due:'2026-11-28',activity:['Sample enquiry created via '+e.origin+' · '+e.intent]}]);};
 const [freeEvents,setFreeEvents]=useState<FreeEvent[]>([]);
 const [tasks,setTasks]=useState<Task[]>([]);
 const recordFree=(e:FreeEvent)=>setFreeEvents(prev=>[...prev,e]);
 const [learners,setLearners]=useState(initialLearners);
 const [demoLearnerId,setDemoLearnerId]=useState(initialLearners[0].id);
 const [programme,setProgramme]=useState('MPC');
 const [examInterest,setExamInterest]=useState('Not specified');
 const [campus,setCampus]=useState(campuses[0].name);
 const [notice,setNotice]=useState('');
 const [course,setCourse]=useState('');
 const [answers,setAnswers]=useState<Record<number,number>>({});
 const [submitted,setSubmitted]=useState(false);
 const [examIndex,setExamIndex]=useState(0);
 const [seconds,setSeconds]=useState(900);
 const [review,setReview]=useState<number[]>([]);
 useEffect(()=>{if(page!=='exam'||submitted||seconds<=0)return;const timer=window.setTimeout(()=>{setSeconds(s=>Math.max(0,s-1));if(seconds===1)setSubmitted(true)},1000);return()=>window.clearTimeout(timer)},[page,submitted,seconds]);
 const navigate=(next:Page)=>{if(next===page)return;history.pushState({},'',hrefFor(next));setPage(next);window.scrollTo(0,0);};
 useEffect(()=>{const change=()=>{setPage(readPage(location.pathname));window.scrollTo(0,0);};window.addEventListener('popstate',change);return()=>window.removeEventListener('popstate',change);},[]);
 useEffect(()=>{document.title=routes[page][1];document.querySelector('meta[name="description"]')?.setAttribute('content',routes[page][2]);},[page]);
 const handleNavigation=(e:React.MouseEvent)=>{if(e.defaultPrevented||e.button!==0||e.metaKey||e.ctrlKey||e.shiftKey||e.altKey)return;const a=(e.target as HTMLElement).closest('a');if(!a||a.target||a.hasAttribute('download'))return;const dest=new URL(a.href,location.href);if(dest.origin!==location.origin||dest.hash||dest.search)return;const next=Object.keys(routes).find(k=>routes[k][0]===dest.pathname);if(next){e.preventDefault();navigate(next);}};
 const score=questions.filter((q,i)=>answers[i]===q.correct).length;
 const {role,section}=splitWorkspace(page);
 const internal=role==='management'||role==='platform'||role==='student'||role.startsWith('dashboard-');
 if(internal)return <div className="site enterprise" data-page={page} onClick={handleNavigation}><a className="skip-link" href="#main">Skip to workspace</a><main id="main" tabIndex={-1}><Dashboard key={role} admissionsBusiness={admissionsBusiness} setAdmissionsBusiness={setAdmissionsBusiness} demoLearnerId={demoLearnerId} setDemoLearnerId={setDemoLearnerId} section={section} page={role==='management'?'dashboard-admissions':role} leads={leads} setLeads={setLeads} learners={learners} setLearners={setLearners} hrefFor={hrefFor} freeEvents={freeEvents} recordFree={recordFree} tasks={tasks} setTasks={setTasks}/></main></div>;
 return <div className="site" data-page={page} onClick={handleNavigation}><a className="skip-link" href="#main">Skip to main content</a><InstitutionHeader page={page} hrefFor={hrefFor}/>
 <main id="main" tabIndex={-1}>
 {page==='home'&&<><ResultsHero hrefFor={hrefFor}/>
 <section className="quick-links"><div className="container pathway-strip">{[['01','Find your programme','programmes'],['02','Explore our locations','campuses'],['03','Discover student support','support'],['04','Learn online','academy']].map(([n,t,p])=><a key={n} href={hrefFor(p)}><span>{n}</span><strong>{t}</strong><b>↗</b></a>)}</div></section>
 <section className="container section"><div className="section-head"><div><span className="eyebrow ink">ACADEMICS</span><h2>Find your own direction.</h2></div><p>Four intermediate streams. Distinct pathways to higher education. Explore the subjects and preparation that fit your ambitions.</p></div><div className="academic-editorial">{academicDetails.slice(0,2).map(([key,title,sub,desc,photo])=><article className="image-story" key={key}><a href={hrefFor(key)}><img src={'/media/'+photo+'.jpg'} width={740} height={493} loading="lazy" alt="Students in a Sri Raama classroom"/><div><small>{sub}</small><h3>{title} <span>↗</span></h3><p>{desc}</p></div></a></article>)}<div className="study-list">{academicDetails.slice(2,4).map(([key,title,sub,desc])=><a key={key} href={hrefFor(key)}><small>{sub}</small><h3>{title} <span>↗</span></h3><p>{desc}</p></a>)}<a className="text-button" href={hrefFor('programmes')}>All academic programmes →</a></div></div><div className="exam-links">{academicDetails.slice(4).map(([key,title])=><a key={key} href={hrefFor(key)}>{title} preparation ↗</a>)}</div></section>
 <section className="feature leadership-band"><div className="container feature-inner"><div><span className="eyebrow">OUR INSTITUTION</span><h2>Purpose at the heart of education.</h2><p>A space to share the leadership, values and educational vision behind Sri Raama.</p><a className="btn light" href={hrefFor('founder')}>Meet the founder →</a></div><div className="editorial-aside"><span>THE SRI RAAMA MOTTO</span><strong>Everything You Need<br/>to Succeed.</strong><a href={hrefFor('about')}>About Sri Raama ↗</a><br/><a href={hrefFor('approach')}>Our educational approach ↗</a><br/><a href={hrefFor('team')}>Meet the academic team ↗</a></div></div></section>
 <section className="container section"><div className="section-head"><div><span className="eyebrow ink">BEYOND ACADEMICS</span><h2>Make every day count.</h2></div><p>Education is more than examination preparation. Explore the proposed support and student experience.</p></div><div className="story-split"><img src="/media/classroom.jpg" width={740} height={493} loading="lazy" alt="Students engaged in classroom learning"/><div className="study-list">{[['Student support','Guidance for learning, wellbeing and future choices.','support'],['Campus life','Discover the learning environment and campus experience.','life'],['Achievements','View selected institution-supplied results posters.','achievements']].map(([t,d,p])=><a key={p} href={hrefFor(p)}><h3>{t} <span>↗</span></h3><p>{d}</p></a>)}</div></div></section>
 <section className="online-band"><div className="container feature-inner"><div><span className="eyebrow">SRI RAAMA ONLINE</span><h2>Keep learning.<br/>Wherever you are.</h2><p>Discover the proposed digital academy, with annual programmes, focused revision and practice assessments.</p><a className="btn light" href={hrefFor('academy')}>Discover online learning →</a></div><div className="learning-preview"><small>STUDENT WORKSPACE / SAMPLE</small><h3>Your learning plan</h3><div className="progress-track"><i/></div><p>6 of 10 sample lessons completed</p><a href={hrefFor('student')}>Explore student workspace ↗</a></div></div></section>
 <section className="container section"><div className="section-head"><div><span className="eyebrow ink">OPEN LEARNING</span><h2>Start learning for free.</h2></div><a className="text-button" href={hrefFor('free-centre')}>Explore free learning →</a></div><div className="exam-launch">{[['free-mocks','Mock tests'],['free-practice','Practice questions'],['free-flashcards','Revision flashcards']].map(([id,t])=><a key={id} href={hrefFor(id)}><small>FREE ACCESS</small><strong>{t}</strong><span>No registration →</span></a>)}</div></section><section className="container section"><div className="section-head"><div><span className="eyebrow ink">PARENT JOURNAL</span><h2>Guidance for every step.</h2></div><a className="text-button" href={hrefFor('resources')}>All parent articles →</a></div><JournalCards limit={3}/></section>
 <section className="final-cta"><div className="container"><h2>Ready to explore your next chapter?</h2><a className="btn primary" href={hrefFor('admissions')}>Explore admissions →</a></div></section></>}
 {page==='campuses'&&<section className="container section"><PageIntro tag="Explore Sri Raama" title="Find your campus" text="Explore nine published campus and accommodation entries across Hyderabad. Some share a physical address; confirm current availability before visiting."/><div className="campus-grid">{campuses.map((x,i)=><article key={x.id} className="campus-story"><div className="campus-story-top"><span>{String(i+1).padStart(2,'0')}</span><small>{x.mode}</small></div><h3><a href={hrefFor(x.id)}>{x.name}</a></h3><p>{x.area}</p><a className="text-button" href={hrefFor(x.id)}>Explore campus →</a></article>)}</div><div className="actions"><a className="btn primary" href={hrefFor('admissions')}>Explore admissions →</a><a className="btn outline" href={hrefFor('life')}>Campus life</a></div></section>}
 {page==='programmes'&&<section className="container section"><PageIntro tag="Academics" title="Discover your academic pathway" text="Explore intermediate streams and competitive examination preparation."/><div className="section-head"><h2>Intermediate education</h2><p>Choose subjects that reflect your interests and future plans.</p></div><div className="programme-list">{academicDetails.slice(0,4).map(([key,title,sub,desc,photo],i)=><article key={key}><div className="programme-index">0{i+1}</div><div><small>{sub}</small><h3>{title}</h3><p>{desc}</p><a href={hrefFor(key)}>Explore {title} →</a></div>{photo&&<img src={'/media/'+photo+'.jpg'} width={740} height={493} loading="lazy" alt="Classroom learning at Sri Raama"/>}</article>)}</div><div className="section-head"><h2>Competitive examinations</h2><p>Explore preparation pathways and confirm current eligibility with authorised staff.</p></div><div className="editorial-grid">{academicDetails.slice(4).map(([key,title,sub,desc])=><article className="editorial-card" key={key}><small>{sub}</small><h3>{title}</h3><p>{desc}</p><a href={hrefFor(key)}>Explore preparation →</a></article>)}</div></section>}
 {page==='paper-lab'&&<PaperLab hrefFor={hrefFor}/>}
 {extraRoutes[page]&&<PublicExtras key={page} page={page} hrefFor={hrefFor} record={recordFree}/>}
 {(page.startsWith('free-')||page.startsWith('mock-')||page==='online-tests')&&<FreeLearning key={page} page={page==='online-tests'?'free-mocks':page} hrefFor={hrefFor} record={recordFree}/>}
 {(page==='academy'||page.startsWith('online-')&&page!=='online-tests')&&<Academy key={page} page={page} hrefFor={hrefFor} onEnquiry={product=>{if(!paidProducts.some(p=>p.title===product))return;setAdmissionsBusiness('Online coaching');setLeads(prev=>[...prev,{id:Math.max(100,...prev.map(x=>x.id))+1,programme:'Online preparation',campus:'Digital academy',status:'New',source:'Online',created:'2026-11-27',due:'2026-11-28',origin:'Online academy',activity:['Sample enquiry created 2026-11-27'],product}])}}/>}
 {page==='admissions'&&<section className="container section"><PageIntro tag="Admissions journey" title="Take the first step." text="Choose your preferences with a few clicks. Explore a fictional enquiry without entering personal information."/><div className="admission-layout"><div className="panel"><EnquiryWizard key={programme+campus+examInterest} origin="Admissions page" initialProgramme={programme} initialCampus={campus} initialExam={examInterest} onCreate={createEnquiry} hrefFor={hrefFor}/></div><aside className="admission-aside"><span className="eyebrow ink">YOUR NEXT CHAPTER</span><h2>Find the right learning pathway.</h2><p>Explore campus education, competitive examination preparation and online coaching at your pace.</p><a href={hrefFor('campuses')}>Explore campuses →</a><a href={hrefFor('free-centre')}>Try free learning →</a><a href={hrefFor('compare-programmes')}>Compare programmes →</a><a href={hrefFor('admission-faq')}>Admissions FAQs →</a><a href={hrefFor('programmes')}>Explore academic programmes →</a></aside></div></section>}
 {page==='exam'&&<section className="container section"><PageIntro tag="Assessment experience" title="Practice. Reflect. Improve." text="Free 12-question MPC practice assessment with a 15-minute active-session countdown. Not an official or syllabus-aligned mock exam."/><div className="panel exam">{submitted?<><h2>{score} / {questions.length} correct</h2><div className="exam-report"><div><small>Accuracy among attempted</small><strong>{Object.keys(answers).length?Math.round(score/Object.keys(answers).length*100)+'%':'—'}</strong></div><div><small>Unanswered</small><strong>{questions.length-Object.keys(answers).length}</strong></div><div><small>Active test time</small><strong>{Math.floor((900-seconds)/60)}m {(900-seconds)%60}s</strong></div></div><div className="exam-report">{['Mathematics','Physics','Chemistry'].map(subject=><div key={subject}><small>{subject}</small><strong>{questions.filter((q,i)=>q.subject===subject&&answers[i]===q.correct).length}/4</strong></div>)}</div>{questions.map((q,i)=><div className="review" key={q.q}><strong>{q.q}</strong><p>Your answer: {answers[i]===undefined?'Not answered':q.opts[answers[i]]}. Correct: {q.opts[q.correct]}.</p><p>{q.why}</p></div>)}<button className="btn primary" onClick={()=>{setAnswers({});setExamIndex(0);setSeconds(900);setReview([]);setSubmitted(false);}}>Try again</button></>:<><div className="exam-tools"><small>QUESTION {examIndex+1} OF {questions.length} · {Object.keys(answers).length} answered</small><strong aria-label="Time remaining">{Math.floor(seconds/60)}:{String(seconds%60).padStart(2,'0')}</strong></div><div className="question-nav">{questions.map((q,i)=><button type="button" key={q.q} className={'question-chip '+(i===examIndex?'current ':'')+(answers[i]!==undefined?'answered ':'')+(review.includes(i)?'flagged':'')} onClick={()=>setExamIndex(i)} aria-label={'Question '+(i+1)+(review.includes(i)?', marked for review':'')}>{i+1}</button>)}<button className="btn outline" onClick={()=>setReview(prev=>prev.includes(examIndex)?prev.filter(i=>i!==examIndex):[...prev,examIndex])}>{review.includes(examIndex)?'Clear review flag':'Mark for review'}</button></div><small>{questions[examIndex].subject}</small><h3>{questions[examIndex].q}</h3><fieldset><legend className="sr-only">Choose an answer</legend>{questions[examIndex].opts.map((opt,i)=><label className="option" key={opt}><input type="radio" name={'q'+examIndex} checked={answers[examIndex]===i} onChange={()=>setAnswers({...answers,[examIndex]:i})}/>{opt}</label>)}</fieldset><div className="actions"><button className="btn secondary" disabled={examIndex===0} onClick={()=>setExamIndex(examIndex-1)}>Previous</button>{examIndex<questions.length-1?<button className="btn primary" onClick={()=>setExamIndex(examIndex+1)}>Next →</button>:<button className="btn primary" onClick={()=>setSubmitted(true)}>Submit sample test</button>}</div></>}</div></section>}
 {(page==='management'||page==='platform'||page.startsWith('dashboard-'))&&<Dashboard key={role} admissionsBusiness={admissionsBusiness} setAdmissionsBusiness={setAdmissionsBusiness} demoLearnerId={demoLearnerId} setDemoLearnerId={setDemoLearnerId} section={section} page={role==='management'?'dashboard-admissions':role} leads={leads} setLeads={setLeads} learners={learners} setLearners={setLearners} hrefFor={hrefFor} freeEvents={freeEvents} recordFree={recordFree} tasks={tasks} setTasks={setTasks}/>}
 {page==='about'&&<section className="container section"><PageIntro tag="Our institution" title="Education with direction." text="Discover an educational community focused on academic preparation, curiosity and the confidence to pursue ambitious goals."/><div className="story-split"><img src="/media/classroom.jpg" width={740} height={493} alt="Students learning in a Sri Raama classroom"/><div><span className="eyebrow ink">OUR MOTTO</span><h2>Everything You Need to Succeed.</h2><p>Sri Raama brings together intermediate education and competitive examination preparation, with a focus on clear concepts, purposeful practice, academic guidance and student development. Its published academic strategy emphasises experienced educators, structured study resources, planned testing and mentoring.</p><div className="actions"><a className="btn primary" href={hrefFor('founder')}>Founder & leadership →</a><a className="btn outline" href={hrefFor('team')}>Academic team</a></div></div></div><div className="editorial-grid">{[['Academic direction','Explore the intermediate and competitive examination pathways.','programmes'],['Student experience','Discover student support and campus life.','support'],['Campus discovery','Find the location that fits your needs.','campuses']].map(([t,d,p])=><article className="editorial-card" key={p}><h3>{t}</h3><p>{d}</p><a href={hrefFor(p)}>Explore →</a></article>)}</div></section>}
 {page==='founder'&&<section className="container section"><PageIntro tag="Founder & leadership" title="The vision behind Sri Raama" text="A leadership philosophy centred on academic growth, healthy habits and the partnership between students, families and educators."/><div className="founder-layout"><figure className="founder-portrait"><img src="/media/founder.jpeg" width={1488} height={992} alt="Institution-supplied founder portrait"/><figcaption>V. Vijay Vardhan · Managing Director &amp; Founder</figcaption></figure><div><span className="eyebrow ink">LEADERSHIP PROFILE</span><h2>V. Vijay Vardhan</h2><p><strong>Managing Director &amp; Founder</strong></p><p>In his published message to parents, the founder emphasises developing the whole student, combining academic dedication with healthy habits, emotional development and encouragement. He recognises the sacrifices families make and advocates ongoing communication and a shared commitment to each student’s aspirations.</p><h3>Academic leadership</h3><p>The institution also introduces K. Hari Prasad as its Academic Director and competitive examination advisor, with education at IIT Bombay and IIM Lucknow.</p><p className="article-note">Adapted from the institution’s <a href="https://sriraama.in/about-us/" target="_blank" rel="noreferrer">published leadership profile</a>.</p><a href={hrefFor('about')} className="text-button">Explore our institution →</a></div></div><div className="quote-band"><small>INSTITUTIONAL MOTTO</small><h2>Everything You Need to Succeed.</h2></div></section>}
 {page==='resources'&&<section className="container section"><PageIntro tag="The parent journal" title="Informed choices. Stronger futures." text="Practical guidance for families navigating intermediate education, examination preparation and student wellbeing."/><JournalCards/><div className="final-cta"><div><h2>Have questions about admissions?</h2><a className="btn primary" href={hrefFor('admissions')}>Explore the admissions journey →</a></div></div></section>}
 {articles.filter(x=>x.id===page).map(x=><section className="container section article-page" key={x.id}><a className="text-button" href={hrefFor('resources')}>← Parent journal</a><PageIntro tag={x.category+' / '+x.read} title={x.title} text={x.summary}/><div className="article-layout"><article>{x.sections.map(([t,p])=><section key={t}><h2>{t}</h2><p>{p}</p></section>)}<p className="article-note">General educational guidance prepared for this showcase; not an official Sri Raama policy.</p></article><aside><h3>Keep exploring</h3>{articles.filter(a=>a.id!==x.id).map(a=><a key={a.id} href={hrefFor(a.id)}>{a.title} →</a>)}<a href={hrefFor('support')}>Student support →</a></aside></div></section>)}
 {page==='support'&&<section className="container section"><PageIntro tag="Student experience" title="Support for the journey ahead." text="Discover practical guidance on learning, wellbeing and future choices."/><div className="story-split"><img src="/media/mpc.jpg" width={740} height={493} alt="Classroom teaching at Sri Raama"/><div className="study-list">{supportTopics.map(x=><a key={x.id} href={hrefFor(x.id)}><small>{x.tag}</small><h3>{x.title} <span>↗</span></h3><p>{x.intro}</p></a>)}</div></div><div className="actions"><a className="btn primary" href={hrefFor('life')}>Explore campus life →</a><a className="btn outline" href={hrefFor('student')}>Student workspace</a></div></section>}
 {supportTopics.filter(x=>x.id===page).map(x=><section className="container section article-page" key={x.id}><a className="text-button" href={hrefFor('support')}>← Student support</a><PageIntro tag={x.tag} title={x.title} text={x.intro}/><div className="article-layout"><article>{x.items.map(([t,p])=><section key={t}><h2>{t}</h2><p>{p}</p></section>)}<p className="article-note">General guidance; actual institutional services and contacts are pending confirmation.</p></article><aside><h3>More student resources</h3>{supportTopics.filter(a=>a.id!==x.id).map(a=><a key={a.id} href={hrefFor(a.id)}>{a.title} →</a>)}<a href={hrefFor('resources')}>Parent journal →</a></aside></div></section>)}
 {page==='life'&&<section className="container section"><PageIntro tag="Campus life" title="Learning beyond the timetable." text="Explore the classroom experience and the proposed space for student activities and campus information."/><div className="life-gallery"><figure><img src="/media/classroom.jpg" width={740} height={493} alt="Students working at classroom desks"/><figcaption>Classroom learning</figcaption></figure><figure><img src="/media/mpc.jpg" width={740} height={493} alt="Teacher leading a classroom lesson"/><figcaption>Teaching and learning</figcaption></figure></div><div className="editorial-grid">{[['Student support','Explore practical learning and wellbeing guidance.','support'],['Campus visits','Explore illustrative location information.','campuses'],['Achievements','Celebrate student effort through supplied historical posters.','achievements']].map(([t,d,p])=><article className="editorial-card" key={p}><h3>{t}</h3><p>{d}</p><a href={hrefFor(p)}>Explore →</a></article>)}</div></section>}
 {(page==='achievements'||page.startsWith('results-'))&&<ResultsArchive page={page} hrefFor={hrefFor}/>}
 {page==='student'&&<section className="container section"><PageIntro tag="Student workspace" title="Your learning journey." text="Illustrative student workspace. No login or real student information."/><div className="stats dashboard">{[['Sample lessons completed','6 / 10'],['Practice sets','3'],['Next activity','Assessment']].map(([l,v])=><div key={l}><strong>{v}</strong><span>{l}</span></div>)}</div><div className="panel"><h3>Next step: practice and review</h3><p>Try the sample assessment and read explanations for each question.</p><a className="btn primary" href={hrefFor('exam')}>Start sample assessment →</a></div></section>}
 {examKeys.includes(page)&&<ExamLanding page={page} hrefFor={hrefFor} onEnquire={()=>{setProgramme(page==='neet'?'BiPC':page==='eapcet'?'MPC':'MPC');setExamInterest(page==='jee'?'JEE':page==='neet'?'NEET-UG':page==='eapcet'?'TG EAPCET':'BITSAT');navigate('admissions')}}/>}
 {academicDetails.filter(p=>p[0]===page&&!examKeys.includes(page)).map(([key,title,sub,desc,photo])=><section className="container section" key={key}><a className="text-button" href={hrefFor('programmes')}>← All academic programmes</a><PageIntro tag={sub} title={title+' pathway'} text={desc}/>{photo&&<img className="detail-photo" src={'/media/'+photo+'.jpg'} width={740} height={493} alt="Sri Raama classroom reference photograph"/>}<div className="cards">{['Learning approach','Practice and feedback','Admissions guidance'].map((t,i)=><article className="tile" key={t}><h3>{t}</h3><p>{['Proposed concept lessons and subject-specific activities.','Regular practice and clear explanations for independent improvement.','Confirm eligibility, programme availability, duration, schedule and fees with authorised staff.'][i]}</p></article>)}</div>{coaching.some(x=>x.exam===page)&&<div className="editorial-grid">{coaching.filter(x=>x.exam===page).map(x=><article className="editorial-card" key={x.id}><h3>{x.title}</h3><p>{x.intro}</p><a href={hrefFor(x.id)}>Explore course →</a></article>)}</div>}<div className="actions"><a className="btn primary" href={hrefFor('admissions')}>Explore admissions →</a><a className="btn outline" href={hrefFor('approach')}>Our educational approach</a><a className="btn outline" href={hrefFor('team')}>Academic team</a></div></section>)}
 {campuses.filter(x=>x.id===page).map(x=><section className="container section" key={x.id}><a className="text-button" href={hrefFor('campuses')}>← All campuses</a><PageIntro tag={x.mode+' / Hyderabad'} title={x.name} text={x.intro}/><div className="campus-profile"><div><span className="eyebrow ink">LOCATION</span><h2>{x.area}</h2><p>{x.address}</p><p className="article-note">Address as published on the original Sri Raama contact page; confirm before travel.</p><button className="btn primary" onClick={()=>{setCampus(x.name);navigate('admissions');}}>Explore admissions →</button></div><aside><h3>Plan your visit</h3><p>Ask about current programmes, class schedules, student support, fees and eligibility. For residential options, confirm accommodation details and supervision.</p><a className="text-button" href={hrefFor('campus-checklist')}>Read the campus visit checklist →</a></aside></div><div className="editorial-grid">{[['Academics','Explore the institution-wide academic pathways; campus-specific offerings require confirmation.','programmes'],['Teaching & learning','Discover the proposed educational approach.','approach'],['Student experience','Explore student guidance and wellbeing resources.','support'],['Parent partnership','Find practical guidance and questions to ask.','parent-support']].map(([t,d,p])=><article className="editorial-card" key={p}><h3>{t}</h3><p>{d}</p><a href={hrefFor(p)}>Explore →</a></article>)}</div><div className="article-note">Source: <a href="https://sriraama.in/contact-us/" target="_blank" rel="noreferrer">Original contact page</a>. Campus-specific facilities, programme allocations and photographs have not been verified.</div></section>)}
 {page==='approach'&&<section className="container section"><PageIntro tag="Education at Sri Raama" title="Learn with understanding. Grow with purpose." text="The institution’s published emphasis on concept clarity, guided preparation, mentoring and planned assessment inspires this proposed learning framework."/><div className="story-split"><img src="/media/mpc.jpg" width={740} height={493} alt="Classroom instruction at Sri Raama"/><div className="study-list">{methods.map(x=><a key={x.id} href={hrefFor(x.id)}><small>{x.tag}</small><h3>{x.title} <span>↗</span></h3><p>{x.intro}</p></a>)}</div></div></section>}
 {methods.filter(x=>x.id===page).map(x=><section className="container section article-page" key={x.id}><a className="text-button" href={hrefFor('approach')}>← Our approach</a><PageIntro tag={x.tag} title={x.title} text={x.intro}/><div className="article-layout"><article>{x.items.map(([t,p])=><section key={t}><h2>{t}</h2><p>{p}</p></section>)}<p className="article-note">Proposed methodology for this demonstration; not an audited statement of current Sri Raama practices.</p></article><aside><h3>Explore our approach</h3>{methods.filter(a=>a.id!==x.id).map(a=><a key={a.id} href={hrefFor(a.id)}>{a.title} →</a>)}<a href={hrefFor('resources')}>Parent journal →</a></aside></div></section>)}
 {page==='team'&&<section className="container section"><PageIntro tag="People & learning" title="Meet the academic team" text="Explore the academic disciplines and mentoring roles that support students on their learning journey."/><div className="editorial-grid">{faculty.map(x=><article className="editorial-card" key={x.id}><small>Academic department</small><h3>{x.title}</h3><p>{x.subjects}</p><a href={hrefFor(x.id)}>Explore role →</a></article>)}</div><a className="btn primary" href={hrefFor('founder')}>Founder & leadership →</a></section>}
 {faculty.filter(x=>x.id===page).map(x=><section className="container section" key={x.id}><a className="text-button" href={hrefFor('team')}>← Academic team</a><PageIntro tag="Academic department" title={x.title} text={x.subjects}/><div className="story-split"><div className="portrait-placeholder"><span>{x.title}</span></div><div><h2>Teaching with clarity</h2><p>Explore the subject knowledge, guided practice and academic mentoring relevant to these learning pathways. Individual staff profiles can be added following institutional approval.</p><a href={hrefFor('teaching-methodology')} className="text-button">Explore the teaching approach →</a></div></div><div className="actions"><a className="btn primary" href={hrefFor('programmes')}>Explore courses →</a></div></section>)}
 {coaching.filter(x=>x.id===page).map(x=><section className="container section" key={x.id}><a className="text-button" href={hrefFor(x.exam)}>← Examination overview</a><PageIntro tag={x.mode+' preparation / Coaching'} title={x.title} text={x.intro}/><div className="editorial-grid">{(x.mode==='Long-term'?[['Concept development','Build foundations and connect concepts across topics.'],['Progressive practice','Move from guided exercises to mixed and timed assessments.']]:[['Focused revision','Identify high-priority gaps and revise core concepts.'],['Timed practice','Work through timed exercises and review errors.']]).map(([t,d])=><article key={t} className="editorial-card"><h3>{t}</h3><p>{d}</p></article>)}</div><div className="panel"><h3>Course information</h3><p>Confirm actual duration, eligibility, fees, available locations and the latest examination pattern before enrolment.</p><a className="btn primary" href={hrefFor('admissions')}>Explore admissions →</a><a href={hrefFor('team')}>Meet the academic team →</a></div></section>)}
 </main><footer><div className="container footer-inner"><div className="footer-brand"><img src="/media/logo.jpg" width={300} height={108} alt="Sri Raama Educational Institutions"/><p>Everything You Need to Succeed.</p></div>{[['Discover',[['About','about'],['Founder','founder'],['Academic team','team'],['Campuses','campuses'],['Campus life','life'],['Careers','careers'],['Alumni','alumni'],['Partnerships','partnerships']]],['Learn',[['Academics','programmes'],['Compare programmes','compare-programmes'],['Free formula library','formula-library'],['Our educational approach','approach'],['Achievements','achievements'],['Online Academy','academy'],['Sample assessment','exam']]],['Connect',[['Admissions','admissions'],['Admissions FAQs','admission-faq'],['Campus selection','campus-guide'],['Digital opportunities','opportunities'],['Parent support','parent-support'],['Parent journal','resources'],['Student support','support'],['Student workspace','student']]]].map(([heading,links])=><div className="footer-column" key={heading as string}><h3>{heading as string}</h3>{(links as string[][]).map(([t,p])=><a key={p} href={hrefFor(p)}>{t}</a>)}</div>)}</div><div className="container footer-bottom"><span>Independent website showcase · No live applications or payments.</span><a href={hrefFor('platform')}>Explore Digital Platform ↗</a></div></footer><ContactLayer hrefFor={hrefFor} onCreate={createEnquiry} programme={programme} campus={campus} exam={examInterest}/></div>;
}
function PageIntro({tag,title,text}:{tag:string,title:string,text:string}){return <><span className="eyebrow ink">{tag}</span><h1 className="page-title">{title}</h1><p className="intro">{text}</p></>;}

function JournalCards({limit=articles.length}:{limit?:number}){return <div className="journal-grid">{articles.slice(0,limit).map((x,i)=><article key={x.id}><a href={hrefFor(x.id)}><div className={'journal-art journal-'+i}><span>{x.category}</span><b>{['01','02','03','04'][i]}</b><svg viewBox="0 0 110 75" aria-hidden="true"><path d="M5 63L34 22 55 50 77 9 105 63" fill="none" stroke="currentColor" strokeWidth="2"/><circle cx="34" cy="22" r="5" fill="currentColor"/><circle cx="77" cy="9" r="5" fill="currentColor"/></svg></div><div className="journal-text"><small>{x.category} · {x.read}</small><h3>{x.title}</h3><p>{x.summary}</p><strong>Read article →</strong></div></a></article>)}</div>}
