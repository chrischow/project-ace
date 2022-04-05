# ROKR

## ROKR-Dev to ROKR
Copy contents of the following:

1. Styles: `index.css`
2. Utils:
    - updateCircleProgress
    - fakeData
    - queryData
    - processData
2. Components:
    - Brand
    - Home
    - HomeCards
    - Icons
    - Navbar
    - OKRCollapse
    - ProgressBar
    - ProgressCard
    - Team
3. Others:
    - Configs and main components from `App.js` to `index.html`. Remember to make any imports **synchronous**.

After moving over:
- Remember to remove imports and exports of JS functions/objects
- Remember to add `React.` and `ReactRouterDOM.` to any functions imported from React and React-Router e.g.
    - `React.useEffect`
    - `React.useHistory`
- Current components that use `useHistory` / `useParams`:
    - Team
    - KRForm
    - ObjectiveForm
    - UpdatesForm

## Dependencies
From [Pluralsight](https://www.pluralsight.com/guides/using-react-router-with-cdn-links):

```html
<head>
    <meta charset='UTF-8'>
    <script src='https://unpkg.com/react@16.3.1/umd/react.production.min.js'></script>
    <script src='https://unpkg.com/react-dom@16.3.1/umd/react-dom.production.min.js'>    </script>
    <script src='https://unpkg.com/react-router-dom@5.0.0/umd/react-router-dom.min.js'></script>
    <script src='https://unpkg.com/babel-standalone@6.26.0/babel.js'></script>
</head>
```

- ReactRouter v5.2.0: This exports `useHistory`. v5.0.0 does not. Remember to amend the URL for the source map in the final line of the ReactRouter v5.2.0 file.