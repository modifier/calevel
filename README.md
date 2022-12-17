# Central Asia Level

Preview: https://ca.modya.me/

This project is built on top of Lit and uses Vite for operation. The application is accessible in Russian, English and Uzbek.

Using Lit as a main library for development was a poor decision. It gave me experience with Web Components but it should
rather be used for building small independent components, not an entire application. Consider this to be a warning for
whoever thinks this could be good decision.

## Description

As a user, you can select places in Central Asia which you've visited and see your overall Level.
The level is calculated based on the number of places where you've been and the quality of stay, e.g. living somewhere
is gives you more points than traveling there or passing by.

You can share the results with your friends who will see the exact level and places.

## Forking the application

You can fork the application to make a map of another place in the world. Most of the data that you'd want to change sits
under `/src/data` folder:

* /src/data/locales.ts - The list of languages.
* /src/data/countries.ts - The list of territories and their names in different languages.
* /src/data/levels.ts - The list of levels.
* /src/data/labels.ts - The list of various labels and their translations.

If you don't want to change the app's functionality and only aim to put another map, then changing data under /src/data
and the map should be sufficient. Also, you may want to change /src/components/atoms/ca-icon.ts to add additional
icons of other languages.

### Updating map

The map sits under /src/assets/map.svg. I drew this map in Inkscape, but you can use any other SVG editor.

A few moments that you should know before drawing your own map:

* All `<path>`s of the territories must have `data-country` attribute which must correspond to the `key` property
in the list of countries. If there are enclaves, they must have the same `data-country` property.
* All `<text>`s with the territory names must have `data-country-name` attribute in order to be translated.
The attribute must correspond to the `key` property in the list of countries, just like in the case with `<path>`s.
* If the `<text>` can be wrapped in some translations, you may have several text tags with the same `data-country-name`.
In this case, text will be wrapped according to their appearance in the DOM. The translation thus must have `\n` in the
label, see `/src/data/countries.ts` and the example of `Oskemen`.

### Updating index.html

And don't forget to update the rootmost `index.html`, which is an entrypoint of the application. You may want to update
the `lang` attribute, change the `<title>` and the description (`<meta>`), as well as the favicon. Everything else may 
remain the same.