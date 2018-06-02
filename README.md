# agora

A fast enough PReact app boilerplate & serve engine

agora has been designed as a ready-to-use PReact webapp development boilerplate
as well as a fast Express.js powered server.

## Setup

One should `git fork` this reposiroty, then `git clone`. In order to benefit of
future updates, you should add a second remote, often called **upstream** you'll
rebase from.

So, your setup scheme should look like:

    $ git clone https://github.com/<repo>/<project>.git
    $ git remote add upstream https://github.com/fmasclef/agora.git

Each time you want to update, **git rebase** from upstream/master:

    $ git fetch upstream
    $ git rebase upstream/master

## Development boilerplate

In development mode, you'll require a *lot* of dependencies. These are defined
as *DevDependencies* in the *package.json* file. So, go on with npm the usual
way:

    $ NODE_ENV=development npm i

You're development environment is ready. You can start writing your PReact app.
Head to `app/js` and start writting your `App.preact.js` and its components.

Webpack provides *hot module reloading* thru its embeded webserver. Start this
development server using:

    $ npm run app

Customize your app's stylesheet by adding Sass formated files in `app/sass`. The
`app/sass/app.saas` file is imported from the `app/js/bootlader.js` file. That
means it will produce the resulting `dist/app.css` file automatically. You do
**not** need to import your Sass files from each PReact component as long as the
`app.sass` file import them.

A default CSS3 loader is provided. You should see it while your app is loading.
You can customize or replace it by altering `app/sass/modules/app-loader.sass`.

## Build time

Once you're done with developing, package a production ready webapp:

    $ npm run build

Please note that the  `build:dev`  npm script  is available  when compiling  for
development. In that case, there's no SRI or minifying.

    $ npm run build:dev

This will populate your `dist` folder with various assets:

* *index.html* the app entry point
* *app.hash.js* your PReact webapp
* *app.hash.css* your PReact webapp stylesheet
* *favicon.ico* copied from the `images` asset folder
* *images* from the same source

All imports in *index.html* will use SRI. This might result in duplicate network
calls. This is the price of secuity as SRI is not, currently, compatble with
resource preloading.

Now, publish your app :)

    $ git add -A
    $ git commit -m '<whatever>'
    $ git push origin master

## Running a production server

The agora server must be configured a bit. Copy/paste the sample config file and
set the appropriate values.

    $ cp config/config.dist config/production.json
    $ vi config/production.json

The config file is quite self-explanatory...

Once configured you still need to install packages from the npm repository.
Anyway, you need way less packages than in development mode. Who cares of
*Babel* or even *Webpack* in production? You need *Express* and its related
component. Period. So go on with `npm i` in production flavor:

    $ NODE_ENV=production npm i

Now, you can start agora:

    $ npm run server

agora will serve files from the `dist` folder. Its default *GET /* route renders
the `index.html` file which loads your PReact webapp.
