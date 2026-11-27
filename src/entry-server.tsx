import React from 'react';
import {renderToString} from 'react-dom/server';
import {App,routes} from './App';
export {routes};
export const render=(page:string)=>renderToString(<App initialPage={page}/>);
