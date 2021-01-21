import React, { useState, useReducer } from "react"
import ReactDOM from "react-dom"
import { useImmerReducer } from "use-immer"
import { BrowserRouter, Switch, Route } from "react-router-dom"
import Axios from "axios"
Axios.defaults.baseURL = "http://localhost:8080"
// My Components
import About from "./components/About"
import CreatePost from "./components/CreatePost"
import Footer from "./components/Footer"
import Header from "./components/Header"
import Home from "./components/Home"
import HomeGuest from "./components/HomeGuest"
import Terms from "./components/Terms"
import ViewSinglePost from "./components/ViewSinglePost"
import FlashMessages from "./components/FlashMessages"
// Import Contexts
import DispatchContext from "./DispatchContext"
import StateContext from "./StateContext"

function Main() {
  const initialState = {
    loggedIn: Boolean(localStorage.getItem("complexappToken")),
    flashMessages: []
  }
  function ourReducer(draft, action) {
    switch (action.type) {
      // cases to take what action to return a new state value based on the previous one
      // return or break like in any switch/case statement, your preference
      case "login":
        draft.loggedIn = true
        return
      case "logout":
        draft.loggedIn = false
        return
      case "flashMessage":
        draft.flashMessages.push(action.value)
        return
    }
  }

  const [state, dispatch] = useImmerReducer(ourReducer, initialState)

  return (
    // React team recommends 1 provider for state and the other for the dispatch
    // <ExampleContext.Provider value={{ state, dispatch }}>
    <StateContext.Provider value={state}>
      <DispatchContext.Provider value={dispatch}>
        <BrowserRouter>
          <FlashMessages messages={state.flashMessages} />
          <Header />

          <Switch>
            <Route path="/" exact>
              {state.loggedIn ? <Home /> : <HomeGuest />}
            </Route>
            <Route path="/post/:id">
              <ViewSinglePost />
            </Route>
            <Route path="/create-post">
              <CreatePost />
            </Route>
            <Route path="/about-us">
              <About />
            </Route>
            <Route path="/terms">
              <Terms />
            </Route>
          </Switch>

          <Footer />
        </BrowserRouter>
        {/* </ExampleContext.Provider> */}
      </DispatchContext.Provider>
    </StateContext.Provider>
  )
}

ReactDOM.render(<Main />, document.querySelector("#app"))

if (module.hot) {
  module.hot.accept()
}
