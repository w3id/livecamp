# livecamp
Repo for https://livecamp.wwwid.org

## Setup For Development
1. Install all dependencies `npm install`
2. Run development server `npm run dev`

# Deployment
1. Make sure Firebase hosting already setup
2. Build app `npm run build`
3. Deploy `npm run deploy`


This web app is using Roll up as a bundler, and it's only bundle the app to ES6 module. For development server it's use superstatic but you need to call `npm run dev` to use it because it's need Rollup to serve the code.

App structure:
1. Directory `src` is all you need to work with
2. Once it build it or call `npm run dev` it will serve all those source from `dist` directory with auto build everytime you save your changes.
3. All pages are in `src/routes` directory.
4. Template file for layout  is `src/t-shell.js`, you can find router setup also there if you want to add new a page or route.