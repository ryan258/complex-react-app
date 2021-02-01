# Leveling Up the State Game

## Context

Context looks up the component tree and finds the nearest ancestor using the specified context provider. So it doesn't matter how many component layers deep you are.

### Basic setup

1. Create a context file in the app root - import and use createContext export
2. In main import that Context file and wrap everything in the file that you want to give access to in `<ContextName.Provider value={anythingYouWantToPassToChildren}>`

### Use The Context

After "Providing" the context to the App we can now consume it.
So we'll go into a component where we want to use some context and:

1. Add `import {..., useContext} from 'react'`
2. Import the context we want to use
3. Use useContext(whichContextToUse)
4. Then you can remove props. from what you were accessing

## useReducer

Another way of working with state in React, it's like a cousin of `useState()`.
Why 2 ways? When to use one vs the other?

### When to `useReducer()` over `useState()?`

When you have **complex state** logic that:

- involves multiple sub-values
- when next state depends on the previous one

`useReducer()` lets you optimize for performance for components that trigger deep updates because you can pass **dispatch** down instead of callbacks.

- both return a piece of state and something you can call to update state
- difference is that the function useState gives us is quite simple, you call it and whatever value you pass into it will be the new state
- - we pass the `useReducer()` two things

### `useReducer()` in Action!

1. In main file<br>`import {..., useReducer } from 'react'` and a variable for our reducer function and variable for our initial state
2. Use it in the main function <br>`const [state, dispatch] = useReducer`
3. Declare it<br>`const [state, dispatch] = useReducer(ourReducer, initialState)`

Now we can use dispatch to do all sorts of things

With dispatch() you're just saying what you want to do, but not having to spell out exactly how it gets done.

That's where the reducer function comes into play

So it's in the function where you detail where how the state data should change given the action

Anytime you call dispatch()<br>
Action is whatever is passed inside the dispatch is what gets passed along to our reducer function

So we dispatch a command to make an action

The logic lives in the reducer function, usually you'll use a switch statement in here and then outline the different cases.

The idea is that we have this one super convenient thing, dispatch, that we can pass down to children components.

We could set the value of our Context.Provider to be our dispatch, then in any child component all we have to do is call dispatch and not have to thinkk about how things get done and just request that they happen with dispatch thats to the reducer function taking care of all the details.

### What is `useReducer()` really doing?

- when we call it we give it an initial state and a function
- in return it gives us a state and a dispatch

so we have just 2 things that can power our whole application

- with context we would have to pass in a ton of different values and our application would only grow in complexity
- but with use reducer, all we'd ever have to pass into the Context.Provider is our overall state object and our dispatch. Just 2 things can allow for infinite actions and changes to state

## useReducer() + Context = Power

As complexity grows, being able to define all complex logic in one place and not having to cater to state elsewhere, just dispatching actions care free is awesome.

- Anytime a context value updates children components consuming the context will rerender to make sure they have the updated info
- not all components are going to need access to a global state, some may just need access to the global dispatch
- the way around it is to have 2 context providers in the JSX
- that way components can choose what contexts they consume and watch for changes

## What is Immer?

We never want to directly mutate or change our state, give it a new value, object and it will update updating the app's state for you. Useful with complexity because things will get more complicated and that's where Immer comes into play.

Immer make it incredibly easy to play with objects in an immutable fashion.

We want to update the state of our app in a different way with ourReducer...

Immer will give us a draft of state, then we can modify and mutate that draft

Install Immer package
`$ npm install immer use-immer`

Then instead of React's `useReducer()` we use `useImmerReducer()`

Then in ourReducer() we can change each case to directly modify the single piece of state

## Moving Side Effects into useEffect: Using & Storing Data

When you log in, the server sends back 3 piece of information:

- xxxToken
- xxxUsername
- xxxAvatar

Then we're storing these in the local storage.
Problem is that we're saving all this from too many different files.
This can lead to bugs, etc as complexity grows.

So we'll do all our loading and saving to local storage takes place from only our Main.js file.

We want to also keep our reducer pure a free of side effects and only working with reactish things/state.

So we do this side effect things in a useEffect

# Actually Building the App

## Profile Screen

### useParams()

We get this from react-route-dom module

`import {useParams} from 'react-router-dom'`

Use params returns an object that could have many different properties, so we destructure the ones we want.

`const {userName} = useParams()`

It's good to use with useEffect() so it only runs one, but if you're making something like an Axios call you can't do an async/await on it. You have to create one inside it.
