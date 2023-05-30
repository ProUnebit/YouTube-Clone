import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './components/App';

import './index.scss';


const ROOT = createRoot(document.getElementById('app'));
ROOT.render(<App />)

const devMode = process.env.NODE_ENV === 'development';
if (devMode && module && module.hot) module.hot.accept();