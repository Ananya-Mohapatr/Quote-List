import './App.css';
import { BrowserRouter, Route } from 'react-router-dom';
import LoginPage from './Components/LoginPage';
import QuoteListingPage from './Components/QuoteListingPage';
import QuoteCreationPage from './Components/QuoteCreationPage';
import { Redirect } from 'react-router-dom/cjs/react-router-dom.min';
function App() {
if(window.location.reload){
  localStorage.clear()
}
  return (
    <BrowserRouter>
      <Route exact path="/" component={LoginPage} />
      <Route  path="/quote-list" component={QuoteListingPage} />
      <Route path="/quote-create" component={QuoteCreationPage} />
      <Route path="*"><Redirect to='/'/></Route>

    </BrowserRouter>
  );
}

export default App;
