/// <reference types="vite/client" />
import React from 'react';
import {createRoot,hydrateRoot} from 'react-dom/client';
import {App,readPage} from './App';
import './styles.css';
const root=document.getElementById('root')!;
const node=<React.StrictMode><App initialPage={readPage(location.pathname)}/></React.StrictMode>;
if(root.hasChildNodes()&&!import.meta.env.DEV)hydrateRoot(root,node);else createRoot(root).render(node);
