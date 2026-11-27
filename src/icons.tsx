import React from 'react';
export const iconNames=['pathways','study-plan','campus','wellbeing','chevron-down','chevron-left','chevron-right','menu','close','grid','message','assistant'] as const;
export type IconName=typeof iconNames[number];
export const journalIcons:Record<string,IconName>={'choose-stream':'pathways','exam-preparation':'study-plan','campus-checklist':'campus','supporting-teenagers':'wellbeing'};
export function Icon({name,className=''}:{name:IconName;className?:string}){
 const shapes:Record<IconName,React.ReactNode>={
 pathways:<><rect x="9" y="2" width="6" height="5" rx="1"/><path d="M12 7v5M4.5 16v-4h15v4M12 12v4"/><rect x="2" y="16" width="5" height="5" rx="1"/><rect x="9.5" y="16" width="5" height="5" rx="1"/><rect x="17" y="16" width="5" height="5" rx="1"/></>,
 'study-plan':<><rect x="3" y="4" width="18" height="17" rx="2"/><path d="M7 2v4M17 2v4M3 9h18M7 13l1.5 1.5L11 12M7 17l1.5 1.5L11 16M14 13h3M14 17h3"/></>,
 campus:<><path d="M2 9l10-6 10 6H2ZM4 9v12M20 9v12M2 21h20M9 21v-7h6v7M7 12h1M16 12h1"/><circle cx="12" cy="6.5" r=".6" fill="currentColor" stroke="none"/></>,
 wellbeing:<><path d="M20 10c0-4-5-5-8-1.5C9 5 4 6 4 10c0 4 8 9 8 9s8-5 8-9Z"/><path d="M2 4h4M4 2v4M18 3h4M20 1v4"/></>,
 'chevron-down':<path d="m6 9 6 6 6-6"/>,
 'chevron-left':<path d="m15 6-6 6 6 6"/>,
 'chevron-right':<path d="m9 6 6 6-6 6"/>,
 menu:<path d="M4 6h16M4 12h16M4 18h16"/>,
 close:<path d="m6 6 12 12M18 6 6 18"/>,
 grid:<><rect x="3" y="3" width="7" height="7" rx="1"/><rect x="14" y="3" width="7" height="7" rx="1"/><rect x="3" y="14" width="7" height="7" rx="1"/><rect x="14" y="14" width="7" height="7" rx="1"/></>,
 message:<><path d="M20 11.5a8 8 0 0 1-8 8c-1.3 0-2.5-.3-3.6-.8L4 20l1.2-4.3A8 8 0 1 1 20 11.5Z"/><path d="M9 8c.5 3 2 4.7 5 6l1.5-1.5"/></>,
 assistant:<><rect x="4" y="7" width="16" height="12" rx="4"/><path d="M12 3v4M8 15h8"/><circle cx="9" cy="11" r="1" fill="currentColor" stroke="none"/><circle cx="15" cy="11" r="1" fill="currentColor" stroke="none"/></>
 };
 return <svg data-icon={name} className={'ui-icon '+className} viewBox="0 0 24 24" width="24" height="24" aria-hidden="true" focusable="false" fill="none" stroke="currentColor" strokeWidth="1.65" strokeLinecap="round" strokeLinejoin="round">{shapes[name]}</svg>
}
