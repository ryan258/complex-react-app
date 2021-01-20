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
