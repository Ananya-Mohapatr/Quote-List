import './App.css';
import { BrowserRouter, Route } from 'react-router-dom'
import LoginPage from './Components/LoginPage';
import QuoteListingPage  from './Components/QuoteListingPage';
import QuoteCreationPage from './Components/QuoteCreationPage';
function App() {
  return (
    <BrowserRouter>
    <Route exact path = '/' component={LoginPage}/>
    <Route  path = '/quote-list' component={QuoteListingPage}/>
    <Route  path = '/quote-create' component={QuoteCreationPage}/>
    </BrowserRouter>
  );
}

export default App;
