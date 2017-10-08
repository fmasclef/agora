/**
 * This is your PReact app  bootloader.  It will  make sure  your Sass files are
 * compiled into CSS at build time (thanks to webpack and import statement).  At
 * runtime, your PReact app will replace the content of div #app once loaded, so
 * the loader animation will disapear automagically.
 */

import { h, render } from 'preact'
import App from './app.preact'
import '../sass/app.sass'

let
  container = document.getElementById('app'),
  app = <App />

render(app, container, container.lastChild)
