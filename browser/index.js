/* global window */
/* global ReadableStream */
import { render } from 'lit-html';
export * from 'lit-html';

/**
 * lit-html-server API parity
 * @param {import('lit-html').TemplateResult} result
 * @returns {ReadableStream}
 */
export function renderToStream(result /*options*/) {
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
export async function renderToBuffer(result /*options*/) {
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
export function renderToString(result /*options*/) {
  const renderElement = window.document.createElement('div');
  render(result, renderElement);
  const htmlString = renderElement.innerHTML;
  return Promise.resolve(htmlString);
}
