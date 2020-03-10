/* global window */
/* global ReadableStream */

import { render } from 'lit-html';
export * from 'lit-html';

const RENDER_ELEMENT = window.document.createElement('div');

/**
 * lit-html-server API parity
 * @param {import('lit-html').TemplateResult} result
 * @returns {ReadableStream}
 */
export function renderToStream(result) {
  if (typeof ReadableStream === 'undefined') {
    throw Error('ReadableStream not supported on this platform');
  }
  return new ReadableStream({
    start(controller) {
      controller.enqueue(renderToBuffer(result));
      controller.close();
    }
  });
}

/**
 * lit-html-server API parity
 * @param {import('lit-html').TemplateResult} result
 * @returns {Uint8Array}
 */
export function renderToBuffer(result) {
  if (typeof TextEncoder === 'undefined') {
    throw Error('TextEncoder not supported on this platform');
  }
  return new TextEncoder().encode(renderToString(result));
}

/**
 * lit-html-server API parity
 * @param {import('lit-html').TemplateResult} result
 * @returns {string} html string
 */
export function renderToString(result) {
  render(result, RENDER_ELEMENT);
  const htmlString = RENDER_ELEMENT.innerHTML;
  return htmlString;
}
