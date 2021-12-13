/* global chai */
// @ts-nocheck

import { createAsyncIterable, getStream, renderToString } from './test-utils.js';
import { html as h, renderToStream } from '@popeindustries/lit-html';
import { asyncAppend } from '@popeindustries/lit-html/directives/async-append.js';
import { until } from '@popeindustries/lit-html/directives/until.js';
const { expect } = chai;

export const asyncTests = () =>
  describe('async text', () => {
    describe('promise', () => {
      it('should render a template with Promise value', async () => {
        const result = () => h`${until(Promise.resolve('some'))} text`;
        const expected = ' text';
        expect(await renderToString(result())).to.equal(expected);
        expect(await getStream(renderToStream(result()))).to.equal(expected);
      });
      it('should render a template with Promise template value', async () => {
        const result = () => h`${until(Promise.resolve(h`some`))} text`;
        const expected = ' text';
        expect(await renderToString(result())).to.equal(expected);
        expect(await getStream(renderToStream(result()))).to.equal(expected);
      });
      it('should render an empty template with Promise errors', async () => {
        const result = () => h`${until(Promise.reject(Error('this is an expected error')))}`;
        const html = await renderToString(result());
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
        const html = await renderToString(result());
        expect(html).to.equal('');

        const html2 = await getStream(renderToStream(result()));
        expect(html2).to.equal('');
      });
      it('should render a template with deeply nested sync/async templates', async () => {
        const data = { title: 'title', body: 'this is body text' };
        const nestedVeryDeep = async () => ['and ', "don't ", 'forget ', ['this']];
        const nestedDeep = async () => h`<div>this too ${until(nestedVeryDeep())}</div>`;
        const nested = async (body) => h`<div>${body} ${until(nestedDeep())}</div>`;
        const result = () => h`<main><h1>${data.title}</h1>${until(nested(data.body))}</main>`;
        const expected = '<main><h1>title</h1></main>';
        expect(await getStream(renderToStream(result()))).to.equal(expected);
        expect(await renderToString(result())).to.equal(expected);
      });
    });
    describe('AsyncIterator value', async () => {
      it('should render a template with AsyncIterator value', async () => {
        const result = () =>
          h`${asyncAppend(createAsyncIterable(['some', ' renderToString']))} text`;
        const expected = ' text';
        expect(await renderToString(result())).to.equal(expected);
        expect(await getStream(renderToStream(result()))).to.equal(expected);
      });
      it('should render a template with AsyncIterator template value', async () => {
        const result = () => h`${asyncAppend(createAsyncIterable([h`some`, h` async`]))} text`;
        const expected = ' text';
        expect(await renderToString(result())).to.equal(expected);
        expect(await getStream(renderToStream(result()))).to.equal(expected);
      });
    });
  });
