import './App.css';
import {BrowserRouter, Route, Switch} from 'react-router-dom';
import LandingPage from './Components/LandingPage/LandingPage.jsx';
import Home from './Components/Home/Home.jsx';
import Detail from "./Components/Detail/Detail.jsx";
import CreateDog from "./Components/CreateDog/CreateDog.jsx"
import Error404 from "./Components/Error404/Error404.jsx"


function App() {
  return (
    <BrowserRouter>
        <div className="App">
			    <Switch>
            <Route exact path = "/" component = {LandingPage}/>
            <Route  exact path = '/home' component = {Home}/>
            <Route exact path = "/dogs/create" component = {CreateDog}/>
            <Route path = "/dogs/:id" component = {Detail}/>
            <Route path='*' component={Error404} />
			  </Switch>
		  </div>   
    </BrowserRouter>
  );
}

export default App;