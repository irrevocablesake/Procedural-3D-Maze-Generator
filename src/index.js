import './index.css'
import { createRoot } from 'react-dom/client'
import LandingPage from './components/LandingPage';

const rootElement = document.getElementById( "root" );
const rootDOM = createRoot( rootElement );
rootDOM.render( <LandingPage /> );