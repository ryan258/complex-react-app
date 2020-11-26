import React from "react"
import ReactDOM from "react-dom"

function ExampleComponent() {
  return (
    <div>
      <h1>Hello App!</h1>
      <p>Death to all.</p>
      <h2>But first, make useful robots!</h2>
      <p>And make it snappy!</p>
    </div>
  )
}

ReactDOM.render(<ExampleComponent />, document.querySelector("#app"))

if (module.hot) {
  module.hot.accept()
}
