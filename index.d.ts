declare module '@popeindustries/lit-html' {
  export * from 'lit-html';
  export {
    renderToBuffer,
    renderToStream,
    renderToString
  } from '@popeindustries/lit-html/browser/index.js';
}

declare module '@popeindustries/lit-html/directives/async-append.js' {
  export { asyncAppend } from 'lit-html/directives/async-append.js';
}

declare module '@popeindustries/lit-html/directives/async-replace.js' {
  export { asyncReplace } from 'lit-html/directives/async-replace.js';
}

declare module '@popeindustries/lit-html/directives/cache.js' {
  export { cache } from 'lit-html/directives/cache.js';
}

declare module '@popeindustries/lit-html/directives/class-map.js' {
  export { classMap } from 'lit-html/directives/class-map.js';
}

declare module '@popeindustries/lit-html/directives/guard.js' {
  export { guard } from 'lit-html/directives/guard.js';
}

declare module '@popeindustries/lit-html/directives/if-defined.js' {
  export { ifDefined } from 'lit-html/directives/if-defined.js';
}

declare module '@popeindustries/lit-html/directives/repeat.js' {
  export { repeat } from 'lit-html/directives/repeat.js';
}

declare module '@popeindustries/lit-html/directives/style-map.js' {
  export { styleMap } from 'lit-html/directives/style-map.js';
}

declare module '@popeindustries/lit-html/directives/unsafe-html.js' {
  export { unsafeHTML } from 'lit-html/directives/unsafe-html.js';
}

declare module '@popeindustries/lit-html/directives/until.js' {
  export { until } from 'lit-html/directives/until.js';
}
