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
