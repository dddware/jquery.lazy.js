jquery.lazy.js
==============

Lazy-loaded images

## About

This plugin will lazy-load the `img` elements you call it upon, wrapping them in \div\s to preserve the space they will occupy and fill it with a loading spinner animation. Images are loaded and displayed once scrolled upon (and on page load if they are in the viewport).

## Usage

`$('.im-so').lazy();`

## Build

Lazy is built using [Grunt](http://gruntjs.com/). Simply run `grunt` at the project root to run the source through JSHint and uglify it into the `dist` folder.