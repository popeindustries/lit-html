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
      renderToBuffer(result).then((buffer) => {
        controller.enqueue(buffer);
        controller.close();
      });
    }
  });
}

/**
 * lit-html-server API parity
 * @param {import('lit-html').TemplateResult} result
 * @returns {Promise<Uint8Array>}
 */
export async function renderToBuffer(result) {
  if (typeof TextEncoder === 'undefined') {
    throw Error('TextEncoder not supported on this platform');
  }
  return new TextEncoder().encode(await renderToString(result));
}

/**
 * lit-html-server API parity
 * @param {import('lit-html').TemplateResult} result
 * @returns {Promise<string>} html string
 */
export function renderToString(result) {
  render(result, RENDER_ELEMENT);
  const htmlString = RENDER_ELEMENT.innerHTML;
  return Promise.resolve(htmlString);
}
