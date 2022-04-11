# Project Ace
Project Ace is about making the most of terrible IT infrastructure.

The environment:

- JScript (`.js`) files are banned
- Zero open source tech
- No backend runtimes: Python, Node.js

This project makes full use of the limited approved software, namely:

- SharePoint
- Chrome / IE11

## Resources
- How to pass props to route component: [link](https://learnwithparam.com/blog/how-to-pass-props-in-react-router/)
- Use of `HashRouter` when deploying to GH Pages: [link](https://www.freecodecamp.org/news/deploy-a-react-app-to-github-pages/)
- Had a nested object that couldn't access `this.setState` from the top-level component class. Turns out that you need to define the update function in the top-level component class using an arrow function to access the `this` keyword: [link](https://sebhastian.com/this-setstate-is-not-a-function/)
- Strangely, adding a key when mapping components to an array will stop bootstrap animations
- You don't need to ship source maps: [link](https://dev.to/oyetoket/is-it-safe-to-ship-javascript-source-maps-to-production-34p8)

To-do:
- App:
    - Test whether we should be using `Routes` or `Switch`
    - Change `BrowserRouter` variable to `HashRouter`
- Home:
    - Use props for teams and progress
    - Change fake data: team overall progress should be in `teamProgressData`
