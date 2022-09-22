import './App.css';
import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import LandingPage from './components/Landing Page/landingPage';
import Home from './components/Home/Home';
import RecipesDetails from './components/CardsDetails/Details';
import CreateRecipe from './components/Formulario de creacion/Created';

function App() {

  return (
    <>
    <BrowserRouter>
    <Switch>
      
      <Route exact path='/' component={LandingPage}/>
      <Route exact path= '/home' component={Home}/>
      <Route exact path= '/recipes/:id' component={RecipesDetails}/>
      <Route exact path= '/createRecipes' component={CreateRecipe}/>
      </Switch>
      </BrowserRouter>
    </>
  );
}

export default App;
