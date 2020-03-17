/* eslint no-constant-condition:0 no-async-promise-executor:0 */

import { renderToString as rts } from '../index';

// needed as lit-html pre- and postfixes DOM with `<!---->`
function removeComments(htmlString) {
  return htmlString.replace(/<!---->/g, '');
}

export async function renderToString(template) {
  return removeComments(await rts(template));
}

export async function* createAsyncIterable(syncIterable) {
  for (const elem of syncIterable) {
    yield elem;
  }
}

export function getStream(stream) {
  const decoder = new TextDecoder();

  return new Promise(async (resolve, reject) => {
    const reader = stream.getReader();
    let result = '';

    while (true) {
      try {
        const { done, value } = await reader.read();

        if (done) {
          return resolve(removeComments(result));
        }

        result += decoder.decode(value);
      } catch (err) {
        return reject(err);
      }
    }
  });
}
