import React, { useState, useReducer } from "react"
import ReactDOM from "react-dom"
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
import ExampleContext from "./ExampleContext"

function Main() {
  const initialState = {
    loggedIn: Boolean(localStorage.getItem("complexappToken")),
    flashMessages: []
  }
  function ourReducer(state, action) {
    switch (action.type) {
      // cases to take what action to return a new state value based on the previous one
      case "login":
        return { loggedIn: true, flashMessages: state.flashMessages }
      case "logout":
        return { loggedIn: false, flashMessages: state.flashMessages }
      case "flashMessage":
        return { loggedIn: state.loggedIn, flashMessages: state.flashMessages.concat(action.value) }
    }
  }

  const [state, dispatch] = useReducer(ourReducer, initialState)

  // dispatch({type: "login"})
  // dispatch({type: "logout"})
  // dispatch({type: "flashMessage", value: ...})

  const [loggedIn, setLoggedIn] = useState(Boolean(localStorage.getItem("complexappToken")))
  const [flashMessages, setFlashMessages] = useState([])

  function addFlashMessage(msg) {
    setFlashMessages((prev) => prev.concat(msg))
  }

  return (
    <ExampleContext.Provider value={{ addFlashMessage, setLoggedIn }}>
      <BrowserRouter>
        <FlashMessages messages={flashMessages} />
        <Header loggedIn={loggedIn} />

        <Switch>
          <Route path="/" exact>
            {loggedIn ? <Home /> : <HomeGuest />}
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
    </ExampleContext.Provider>
  )
}

ReactDOM.render(<Main />, document.querySelector("#app"))

if (module.hot) {
  module.hot.accept()
}
