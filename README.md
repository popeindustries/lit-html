[![NPM Version](https://img.shields.io/npm/v/@popeindustries/lit-html.svg?style=flat)](https://npmjs.org/package/@popeindustries/lit-html)

# @popeindustries/lit-html

Seamlessly render the same **lit-html** templates on the server and in the browser. This project is a wrapper around [**lit-html**](https://polymer.github.io/lit-html/) and [**@popeindustries/lit-html-server**](https://github.com/popeindustries/lit-html-server) to handle import aliasing.

> Until there is a standard technique for establishing environment specific import aliases, this library uses the unoffical `package.json#browser` field, currently supported by all major bundler tools.

## Usage

Install with `npm/yarn`:

```bash
$ npm install --save @popeindustries/lit-html @popeindustries/lit-html-server lit-html
```

> `@popeindustries/lit-html-server` and `lit-html` are peer dependencies and must be installed separately

...write your **lit-html** template:

```js
import { html } from '@popeindustries/lit-html';
import { classMap } from '@popeindustries/lit-html/directives/class-map.js';

export function Body(data) {
  return html`
    <h1>${data.title}</h1>
    <p class="${classMap({ negative: data.invertedText })}">${data.text}</p>
  `;
}
```

...import the template file on the client:

```js
import { Body } from './body.js';
import { render } from '@popeindustries/lit-html';

render(Body({ title: 'hi!', text: 'some text', invertedText: false }), document.body);
```

...and import the same template file on the server:

```js
import { Body } from './body.js';
import { html, renderToStream } from '@popeindustries/lit-html';
import http from 'http';

http.createServer((request, response) => {
  const data = { title: 'hi!', text: 'some text', invertedText: false };

  response.writeHead(200);
  renderToStream(html`
    <!DOCTYPE html>
    <html lang="en">
      <head>
        <meta charset="UTF-8" />
      </head>
      <body>
        ${Body(data)}
      </body>
    </html>
  `).pipe(response);
});
```
