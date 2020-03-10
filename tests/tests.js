/* global chai */
/* eslint no-constant-condition:0 no-async-promise-executor:0 */
// @ts-nocheck

/**
 * Tests are based on @popeindustries/lit-html-server browser tests
 */

import { html as h, renderToStream, renderToString as rts } from '../index';
import { asyncAppend } from '../directives/async-append.js';
import { until } from '../directives/until';
const { expect } = chai;

// needed as lit-html pre- and postfixes DOM with `<!---->`
function removeComments(htmlString) {
  return htmlString.replace(/<!---->/g, '');
}

function renderToString(template) {
  return removeComments(rts(template));
}
async function* createAsyncIterable(syncIterable) {
  for (const elem of syncIterable) {
    yield elem;
  }
}

function getStream(stream) {
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

describe('Browser template render', () => {
  describe('text', () => {
    it('should render a plain text template', async () => {
      const result = () => h`text`;
      const expected = 'text';
      expect(renderToString(result())).to.equal(expected);
      expect(await getStream(renderToStream(result()))).to.equal(expected);
    });
    it('should render a template with text value', async () => {
      const result = () => h`${'text'}`;
      const expected = 'text';
      expect(renderToString(result())).to.equal(expected);
      expect(await getStream(renderToStream(result()))).to.equal(expected);
    });
    it('should render a template with number value', async () => {
      const result = () => h`${1}`;
      const expected = '1';
      expect(renderToString(result())).to.equal(expected);
      expect(await getStream(renderToStream(result()))).to.equal(expected);
    });
    it('should render a template with boolean value', async () => {
      const result = () => h`${true}`;
      const expected = 'true';
      expect(renderToString(result())).to.equal(expected);
      expect(await getStream(renderToStream(result()))).to.equal(expected);
    });
    it('should render a template with null value', async () => {
      const result = () => h`${null}`;
      const expected = '';
      expect(renderToString(result())).to.equal(expected);
      expect(await getStream(renderToStream(result()))).to.equal(expected);
    });
    it('should render a template with undefined value', async () => {
      const result = () => h`${undefined}`;
      const expected = '';
      expect(renderToString(result())).to.equal(expected);
      expect(await getStream(renderToStream(result()))).to.equal(expected);
    });
    it('should render a template with array value', async () => {
      const result = () => h`${[1, 2, 3]}`;
      const expected = '123';
      expect(renderToString(result())).to.equal(expected);
      expect(await getStream(renderToStream(result()))).to.equal(expected);
    });
    it('should render a template with deeply nested array value', async () => {
      const result = () => h`${[1, 2, [3, [4, 5]]]}`;
      const expected = '12345';
      expect(renderToString(result())).to.equal(expected);
      expect(await getStream(renderToStream(result()))).to.equal(expected);
    });
    it('should render a template with sync iterator value', async () => {
      const array = ['hello ', 'there ', 'world', [", how's ", 'it ', 'going']];
      const result = () => h`Well ${array[Symbol.iterator]()}?`;
      const expected = "Well hello there world, how's it going?";
      expect(renderToString(result())).to.equal(expected);
      expect(await getStream(renderToStream(result()))).to.equal(expected);
    });
    it('should render a template with nested template value', async () => {
      const result = () => h`some ${h`text`}`;
      const expected = 'some text';
      expect(renderToString(result())).to.equal(expected);
      expect(await getStream(renderToStream(result()))).to.equal(expected);
    });
    it('should render a template with array of nested template values', async () => {
      const result = () => h`some ${[1, 2, 3].map((i) => h`${i}`)} text`;
      const expected = 'some 123 text';
      expect(renderToString(result())).to.equal(expected);
      expect(await getStream(renderToStream(result()))).to.equal(expected);
    });
    it('should render a template with Promise value', async () => {
      const result = () => h`${until(Promise.resolve('some'))} text`;
      const expectedFirstString = ' text';
      const expectedSecondString = 'some text';
      expect(renderToString(result())).to.equal(expectedFirstString);
      await Promise.resolve();
      expect(renderToString(result())).to.equal(expectedSecondString);
    });
    it('should stream render a template with Promise value', async () => {
      const result = () => h`${until(Promise.resolve('some'))} text`;
      const expectedFirstString = 'some text';
      const expectedSecondString = 'some text';
      expect(await getStream(renderToStream(result()))).to.equal(expectedFirstString);
      expect(await getStream(renderToStream(result()))).to.equal(expectedSecondString);
    });
    it('should render a template with Promise template value', async () => {
      const result = () => h`${until(Promise.resolve(h`some`))} text`;
      const expected = 'some text';
      expect(renderToString(result())).to.equal(expected);
      expect(await getStream(renderToStream(result()))).to.equal(expected);
    });
    it('should render an empty template with Promise errors', async () => {
      const result = () => h`${until(Promise.reject(Error('this is an expected error')))}`;
      const html = renderToString(result());
      expect(html).to.equal('');

      const html2 = await getStream(renderToStream(result()));
      expect(html2).to.equal('');
    });
    it('should render a empty template with Promises that throw errors', async () => {
      const result = () =>
        h`${until(
          new Promise(() => {
            throw Error('this is an expected error');
          })
        )}`;
      const html = renderToString(result());
      expect(html).to.equal('');

      const html2 = await getStream(renderToStream(result()));
      expect(html2).to.equal('');
    });
    it('should render a template with AsyncIterator value', async () => {
      const result = () => h`${asyncAppend(createAsyncIterable(['some', ' async']))} text`;
      const expected = ' text';
      expect(renderToString(result())).to.equal(expected);
      expect(await getStream(renderToStream(result()))).to.equal(expected);
    });
    it('should render a template with AsyncIterator template value', async () => {
      const result = () => h`${asyncAppend(createAsyncIterable([h`some`, h` async`]))} text`;
      const expected = 'some async text';
      expect(renderToString(result())).to.equal(expected);
      expect(await getStream(renderToStream(result()))).to.equal(expected);
    });
    it('should render a template with deeply nested sync/async templates', async () => {
      const data = { title: 'title', body: 'this is body text' };
      const nestedVeryDeep = async () => ['and ', "don't ", 'forget ', ['this']];
      const nestedDeep = async () => h`<div>this too ${until(nestedVeryDeep())}</div>`;
      const nested = async (body) => h`<div>${body} ${until(nestedDeep())}</div>`;
      const result = () => h`<main><h1>${data.title}</h1>${until(nested(data.body))}</main>`;

      const expectedFirstString = '<main><h1>title</h1></main>';
      const expectedSecondString =
        "<main><h1>title</h1><div>this is body text <div>this too and don't forget this</div></div></main>";

      expect(await getStream(renderToStream(result()))).to.equal(expectedFirstString);
      expect(await getStream(renderToStream(result()))).to.equal(expectedSecondString);
    });

    it('should render a template with deeply nested sync/async templates', async () => {
      const data = { title: 'title', body: 'this is body text' };
      const nestedVeryDeep = async () => ['and ', "don't ", 'forget ', ['this']];
      const nestedDeep = async () => h`<div>this too ${until(nestedVeryDeep())}</div>`;
      const nested = async (body) => h`<div>${body} ${until(nestedDeep())}</div>`;
      const result = () =>
        h`<main data-string><h1>${data.title}</h1>${until(nested(data.body))}</main>`;

      const expectedFirstString = '<main data-string=""><h1>title</h1></main>';
      const expectedSecondString =
        '<main data-string=""><h1>title</h1><div>this is body text <div>this too and don\'t forget this</div></div></main>';
      expect(renderToString(result())).to.equal(expectedFirstString);
      await Promise.resolve();
      await Promise.resolve();
      await Promise.resolve();
      expect(renderToString(result())).to.equal(expectedSecondString);
    });
  });

  describe('attributes', () => {
    it('should render a template with quoted text attribute', async () => {
      const value = 'text';
      const result = () => h`<div a="${value}"></div>`;
      const expected = '<div a="text"></div>';
      expect(renderToString(result())).to.equal(expected);
      expect(await getStream(renderToStream(result()))).to.equal(expected);
    });
    it('should render a template with quoted array attribute', async () => {
      const value = [1, 2, 3];
      const result = () => h`<div a="${value}"></div>`;
      const expected = '<div a="123"></div>';
      expect(renderToString(result())).to.equal(expected);
      expect(await getStream(renderToStream(result()))).to.equal(expected);
    });
    it('should render a template with unquoted attribute', async () => {
      const value = 'text';
      const result = () => h`<div a=${value}></div>`;
      const expected = '<div a="text"></div>';
      expect(renderToString(result())).to.equal(expected);
      expect(await getStream(renderToStream(result()))).to.equal(expected);
    });
    it('should render a template with quoted attribute and extra whitespace', async () => {
      const value = 'text';
      const result = () => h`<div a = " ${value} "></div>`;
      const expected = '<div a=" text "></div>';
      expect(renderToString(result())).to.equal(expected);
      expect(await getStream(renderToStream(result()))).to.equal(expected);
    });
    it('should render a template with quoted attribute and extra strings', async () => {
      const value = 'text';
      const result = () => h`<div a="some ${value}"></div>`;
      const expected = '<div a="some text"></div>';
      expect(renderToString(result())).to.equal(expected);
      expect(await getStream(renderToStream(result()))).to.equal(expected);
    });
    it('should render a template with quoted attribute and multiple strings/values', async () => {
      const value = 'text';
      const result = () => h`<div a="this is ${'some'} ${value}">${'node'}</div>`;
      const expected = '<div a="this is some text">node</div>';
      expect(renderToString(result())).to.equal(expected);
      expect(await getStream(renderToStream(result()))).to.equal(expected);
    });
    it('should render a template with boolean attribute', async () => {
      const value = true;
      const result = () => h`<div ?a="${value}"></div>`;
      const expected = '<div a=""></div>';
      expect(renderToString(result())).to.equal(expected);
      expect(await getStream(renderToStream(result()))).to.equal(expected);
    });
    it('should render a template with event attribute', async () => {
      const result = () => h`<div @a="${'some event'}"></div>`;
      const expected = '<div></div>';
      expect(renderToString(result())).to.equal(expected);
      expect(await getStream(renderToStream(result()))).to.equal(expected);
    });
    it('should render a template with property attribute', async () => {
      const result = () => h`<div .a="${'some prop'}"></div>`;
      const expected = '<div></div>';
      expect(renderToString(result())).to.equal(expected);
      expect(await getStream(renderToStream(result()))).to.equal(expected);
    });
  });
});
