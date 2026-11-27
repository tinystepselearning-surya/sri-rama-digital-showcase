import React,{useEffect,useRef,useState} from 'react';
import {campuses} from './institution';
type Item=[string,string];
type Group={id:string;label:string;sections:{title:string;links:Item[]}[]};
export const headerGroups:Group[]=[
{id:'about',label:'About',sections:[{title:'Our institution',links:[['about','About Sri Raama'],['founder','Founder & leadership'],['team','Academic team'],['approach','Educational approach'],['careers','Careers']]}]},
{id:'academics',label:'Academics',sections:[{title:'Intermediate education',links:[['programmes','All academic programmes'],['mpc','MPC'],['bipc','BiPC'],['mec','MEC'],['cec','CEC'],['compare-programmes','Compare streams']]},{title:'Competitive examinations',links:[['jee','JEE Main & Advanced'],['neet','NEET-UG'],['eapcet','TG EAPCET / EAMCET'],['bitsat','BITSAT']]}]},
{id:'campuses',label:'Campuses',sections:[{title:'Find your campus',links:[['campuses','All nine campuses'],['campus-guide','Campus selection guide'],...campuses.map(c=>[c.id,c.name] as Item)]}]},
{id:'results',label:'Results',sections:[{title:'Academic achievements',links:[['achievements','All results'],['results-jee','JEE results'],['results-neet','NEET results'],['results-eapcet','EAPCET results'],['results-bitsat','BITSAT results'],['results-ipe','Intermediate results']]}]},
{id:'online',label:'Online Academy',sections:[{title:'Structured online coaching',links:[['academy','All online programmes'],['online-annual','Annual coaching'],['online-crash','Crash courses'],['study-course-guide','Find your programme'],['student','Student workspace']]}]},
{id:'free',label:'Free Learning',sections:[{title:'Open learning resources',links:[['free-centre','Free Learning Centre'],['study-hub','Study materials'],['study-dpp','Daily practice sets'],['study-lab','Interactive concept lab'],['free-mocks','Mock tests'],['free-practice','Practice questions'],['free-flashcards','Revision flashcards'],['daily-challenge','Daily challenge'],['formula-library','Formula & concept library'],['chapter-revision','Chapter-wise revision']]}]},
{id:'resources',label:'Resources',sections:[{title:'Students & families',links:[['support','Student support'],['life','Campus life'],['parent-support','Parent support'],['resources','Parent journal'],['admission-faq','Admissions FAQs'],['alumni','Alumni & mentoring']]},{title:'Explore the digital showcase',links:[['platform','Digital Platform'],['opportunities','Digital opportunities'],['partnerships','Institutional partnerships']]}]}
];
export function InstitutionHeader({page,hrefFor}:{page:string;hrefFor:(id:string)=>string}){
 const [mobile,setMobile]=useState(false),[open,setOpen]=useState<string|null>(null);
 const root=useRef<HTMLElement>(null),toggle=useRef<HTMLButtonElement>(null);
 const close=()=>{setOpen(null);setMobile(false)};
 useEffect(()=>{setOpen(null);setMobile(false)},[page]);
 useEffect(()=>{const outside=(e:PointerEvent)=>{if(e.target instanceof Node&&!root.current?.contains(e.target)){setOpen(null);setMobile(false)}};document.addEventListener('pointerdown',outside);return()=>document.removeEventListener('pointerdown',outside)},[]);
 useEffect(()=>{const mq=window.matchMedia('(max-width: 1100px)');const reset=()=>{setOpen(null);setMobile(false)};mq.addEventListener('change',reset);return()=>mq.removeEventListener('change',reset)},[]);
 return <header ref={root} className="institution-header" onKeyDown={e=>{if(e.key==='Escape'){if(open){root.current?.querySelector<HTMLButtonElement>('#header-trigger-'+open)?.focus();setOpen(null)}else if(mobile){toggle.current?.focus();setMobile(false)}}}}>
 <div className="institution-header-inner"><a className="institution-brand" href={hrefFor('home')} aria-label="Sri Raama home" onClick={close}><img src="/media/logo.jpg" width={300} height={108} alt="Sri Raama Educational Institutions"/><span>Institutional website showcase</span></a>
 <nav id="institution-navigation" className={'institution-nav'+(mobile?' mobile-open':'')} aria-label="Main navigation">
 {headerGroups.map(g=>{const active=g.sections.some(section=>section.links.some(([id])=>id===page));return <div className={'institution-nav-group'+(g.sections.length>1?' wide':'')} key={g.id}><button type="button" id={'header-trigger-'+g.id} className={'institution-nav-trigger'+(active?' active':'')} aria-expanded={open===g.id} aria-controls={'header-panel-'+g.id} onClick={()=>setOpen(v=>v===g.id?null:g.id)}>{g.label}<svg viewBox="0 0 12 12" aria-hidden="true" width="12" height="12"><path d="M2.5 4.5 6 8l3.5-3.5" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg></button><div id={'header-panel-'+g.id} className="institution-dropdown" hidden={open!==g.id}>{g.sections.map(section=><div className="institution-dropdown-section" key={section.title}><div className="institution-dropdown-title">{section.title}</div>{section.links.map(([id,label])=><a href={hrefFor(id)} key={id} aria-current={page===id?'page':undefined} onClick={close}>{label}</a>)}</div>)}</div></div>})}
 <a className="btn primary institutional-mobile-admissions" href={hrefFor('admissions')} onClick={close}>Admissions ↗</a></nav>
 <a className="btn primary institutional-admissions" href={hrefFor('admissions')} onClick={close}>Admissions ↗</a>
 <button type="button" ref={toggle} className="institution-menu-toggle" aria-controls="institution-navigation" aria-expanded={mobile} onClick={()=>{setMobile(v=>!v);setOpen(null)}}><svg viewBox="0 0 24 24" width="21" height="21" aria-hidden="true"><path d={mobile?'M6 6l12 12M18 6 6 18':'M4 6h16M4 12h16M4 18h16'} stroke="currentColor" strokeWidth="1.8" fill="none" strokeLinecap="round"/></svg>{mobile?'Close':'Menu'}</button>
 </div></header>
}
