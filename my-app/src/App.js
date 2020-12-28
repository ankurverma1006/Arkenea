import logo from './logo.svg';
import './App.css';
import { Route, Link, BrowserRouter as Router, Switch } from "react-router-dom";
import User from './User';
import Detail from './Detail'

function App() {
  return (
    <div className="App">
   <Router>
        <div>         
          <Switch>
            <Route exact path="/" component={User} /> 
            <Route exact path="/detail" component={Detail} />           
          </Switch>
        </div>
      </Router>
    </div>
  );
}

export default App;
