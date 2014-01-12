jquery.lazy.js
==============

Lazy-loaded images

## About

This plugin will lazy-load the `img` elements you call it upon. Images are then loaded and displayed once scrolled upon (and on page load if they are in the viewport). You **must** specify the images' sizes in either HTML or CSS for it to work properly.

## Usage

`$('img.lazy').lazy();`

## Build

Lazy is built using [Grunt](http://gruntjs.com/). Simply run `grunt` at the project root to run the source through JSHint and uglify it into the `dist` folder.