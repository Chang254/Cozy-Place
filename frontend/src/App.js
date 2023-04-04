//Imports from libraries
import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AlgosContextProvider } from './context/AlgoContext';
import { TreesContextProvider } from './context/TreesContext';

//pages & components
import Home from './pages/Home';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Algorithms from './pages/Algorithms';
import Scratch from './pages/Scratch';
import Garden from './pages/Garden';
import Music from './pages/Music';
import WithNav from './components/WithNav';
import WithoutNav from './components/WithoutNav';

// React router is used to render different page components when links are activated (this is a single paged app, but it makes it feel multi-paged)
// React router outlet components are wrapping all routes to indicate if the page should render a navbar (outlet components render their children)
function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <div className = "pages">
          <Routes>
            <Route element = {<WithoutNav />}>
              <Route
                path = "/"
                element = {<Login/>}
              />
            </Route>
            <Route element = {<WithoutNav />}>
              <Route
                path = "/signup"
                element = {<Signup />}
              />
            </Route>
            <Route element = {<WithNav />}>
              <Route
                path = "/home"
                element = {<Home />}
              />
            </Route>
            <Route element = {<WithNav />}>
              <Route
                path = "/algorithms"
                element = {
                  <AlgosContextProvider>
                    <Algorithms/>
                  </AlgosContextProvider>
                }
              />
            </Route>
            <Route element = {<WithNav />}>
              <Route
                path = "/scratch"
                element = {<Scratch />}
              />
            </Route>
            <Route element = {<WithNav />}>
              <Route
                path = "/garden"
                element = {
                  <TreesContextProvider>
                    <Garden />
                  </TreesContextProvider>
                }
              />
            </Route>
            <Route element = {<WithNav />}>
              <Route
                path = "/music"
                element = {<Music />}
              />
            </Route>
          </Routes>
        </div>
      </BrowserRouter>
    </div>
  );
}
 
export default App;
