import React from "react"
import ReactDOM from "react-dom"
import { BrowserRouter, Switch, Route } from "react-router-dom"
// My Components
import About from "./components/About"
import Footer from "./components/Footer"
import Header from "./components/Header"
import HomeGuest from "./components/HomeGuest"
import Terms from "./components/Terms"

function Main() {
  return (
    <BrowserRouter>
      <Header />

      <Switch>
        <Route path="/" exact>
          <HomeGuest />
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
  )
}

ReactDOM.render(<Main />, document.querySelector("#app"))

if (module.hot) {
  module.hot.accept()
}
