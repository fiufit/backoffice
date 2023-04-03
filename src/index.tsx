import { BrowserRouter } from 'react-router-dom';
import React from 'react'
import ReactDOM from 'react-dom/client'
import App from 'App';
import 'bootstrap-icons/font/bootstrap-icons.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import './index.css'

const root = document.getElementById('root');
const rootClasses = root?.classList;
rootClasses?.add('d-flex');
rootClasses?.add('flex-column');
rootClasses?.add('w-100');

ReactDOM.createRoot(root as HTMLElement).render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>,
);