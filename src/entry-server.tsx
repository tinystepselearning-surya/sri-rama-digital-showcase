import React from 'react';
import {renderToString} from 'react-dom/server';
import {App,routes} from './App';
export {routes};
export const render=(page:string)=>renderToString(<App initialPage={page}/>);

export {initialLearners,annualFee,subjects,money} from './model';
export {initialLeads} from './dashboard';
export {ledgerFor,feeSummary} from './finance';

export {products,paidProducts} from './academy';
export {questions,flashcards} from './free-learning';

export {capacityRows,feePosition} from './campus-operations';

export {buildSampleTasks} from './demo-operations';

export {attendanceRate,assessmentRate,learnerScore,scheduledSessions,assessmentMaximum} from './model';
export {confirmedOnlineOrders,filterAdmissions,isOpenLead,isDueLead,campusStages,onlineStages,isDigital,courseKind} from './admissions-data';

export {learnerAssignments,assignmentDone,toggleAssignment} from './assignment-state';

export {taskDue,executiveActions,campusActionSummary,taskDefaults} from './operational-state';
export {counsellorNames,counsellorOf,matchesCounsellor,sortFollowups} from './admissions-data';

export {questionLevel,mockRows,questionReport} from './free-learning';

export {paperBank,selectPaper} from './learning';
export {revisionItems} from './revision-state';

export {executivePriorities,priorityOpen,addPriorityAction} from './executive-priorities';
