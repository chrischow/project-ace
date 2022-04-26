# ROKR

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

- ReactRouterDOM v5.2.0: This exports `useHistory`. v5.0.0 does not. Remember to amend the URL for the source map in the final line of the ReactRouter v5.2.0 file.

## Build Stages

### Stage 1: ROKR-Dev to ROKR
Use `npm run package` to run the PS script to do the below conversion. Steps done:
- [x] .js files in component and utils are parsed to comment out import lines and export lines with `//**RAVEN* ... */`
- [x] first line added `//**RAVEN**filename={...}` for subsequent joining into AllComponent.txt
- [ ] Combine into one AllComponent.txt. Need to figure out how to determine order.

~~Copy contents of the following:~~ 
1. Styles: `index.css`
2. Utils:
    - updateCircleProgress to `txt` folder
    - fakeData to `components` folder (to be processed using Babel)
    - queryData to `components` folder
    - processData to `components` folder
2. All components
3. Others:
    - Configs and main components from `App.js` to `index.html`. Remember to make any imports **synchronous**.

After moving over:
- Remember to remove imports and exports of JS functions/objects
- ~~Extract any React/ReactDOM/ReactRouterDOM functions e.g. `useHistory = ReactRouterDOM.useHistory`~~ [No longer necessary? since the imports are {} into current scope.]

### Stage 2: Into the Shithole
If CRUD functions for dev and production are named identically, you may want to dump all components into a single file. You must consolidate them **in order of dependency**. In bash:

```bash
cat fakeData.txt processData.txt queryData.txt Brand.txt Intro.txt Navbar.txt ProgressCard.txt HomeCards.txt ProgressBar.txt Home.txt Icons.txt Modal.txt ObjectiveForm.txt ObjectiveForm2.txt KRForm.txt KRForm2.txt UpdatesForm.txt OKRCollapse.txt Tabs.txt TeamOKRs.txt Team.txt Timeline.txt Directory.txt > AllComponents.txt
```

In Command Prompt:

```cmd
Type fakeData.txt processData.txt queryData.txt Brand.txt Intro.txt Navbar.txt ProgressCard.txt HomeCards.txt ProgressBar.txt Home.txt Icons.txt Modal.txt ObjectiveForm.txt ObjectiveForm2.txt KRForm.txt KRForm2.txt UpdatesForm.txt OKRCollapse.txt Tabs.txt TeamOKRs.txt Team.txt Timeline.txt Directory.txt > AllComponents.txt
```

1. Update CRUD functions:
    - Home: All Objectives and Key Results in `Home`
    - Team:
        - Read specific team's Objectives and Key Results in `TeamPage`
        - Read specific KR's updates in `KRModal`
    - ObjectiveForm:
        - Read specific Objective in `ObjectiveForm`
        - Update specific Objective in `ObjectiveForm`
    - KRForm:
        - Read specific KR in `KRForm`
        - Read specific team's objective in `KRForm`
        - Update specific KR in `KRForm`
    - UpdatesForm:
        - Read specific KR in `UpdatesForm`
        - Read specific team's Updates in `UpdatesForm`
        - Update specific Update in `UpdatesForm`
        - Create specific Update in `UpdatesForm`
        - Delete specific Update in `UpdatesForm`
    - Directory:
        - Read all KRs in `DirectoryPage`
2. (Optional) Open `index-precompile.html` and save all scripts in the `<head>` tag to a duplicate file `index.html`:
    - This puts all scripts into a single file, akin to what `create-react-app` is doing with `bundle.js`
    - Remove all AJAX calls to request and load dependencies

## Other Considerations

##### Why write your utils functions in ES5?
When you want to test individual functions in the IE11 console, ES6 code will not work. However, now with React-dev-console, it's possible to test ES6 functions in Chrome/Edge. I may switch over to ES6 syntax once React-dev-console proves to be stable.