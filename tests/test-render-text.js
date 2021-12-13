/* global chai */
// @ts-nocheck

import { getStream, renderToString } from './test-utils.js';
import { html as h, renderToStream } from '@popeindustries/lit-html';
import { until } from '@popeindustries/lit-html/directives/until.js';
const { expect } = chai;

export const syncTests = () =>
  describe('sync text', () => {
    it('should render a plain text template', async () => {
      const result = () => h`text`;
      const expected = 'text';
      expect(await renderToString(result())).to.equal(expected);
      expect(await getStream(renderToStream(result()))).to.equal(expected);
    });
    it('should render a template with text value', async () => {
      const result = () => h`${'text'}`;
      const expected = 'text';
      expect(await renderToString(result())).to.equal(expected);
      expect(await getStream(renderToStream(result()))).to.equal(expected);
    });
    it('should render a template with number value', async () => {
      const result = () => h`${1}`;
      const expected = '1';
      expect(await renderToString(result())).to.equal(expected);
      expect(await getStream(renderToStream(result()))).to.equal(expected);
    });
    it('should render a template with boolean value', async () => {
      const result = () => h`${true}`;
      const expected = 'true';
      expect(await renderToString(result())).to.equal(expected);
      expect(await getStream(renderToStream(result()))).to.equal(expected);
    });
    it('should render a template with null value', async () => {
      const result = () => h`${null}`;
      const expected = '';
      expect(await renderToString(result())).to.equal(expected);
      expect(await getStream(renderToStream(result()))).to.equal(expected);
    });
    it('should render a template with undefined value', async () => {
      const result = () => h`${undefined}`;
      const expected = '';
      expect(await renderToString(result())).to.equal(expected);
      expect(await getStream(renderToStream(result()))).to.equal(expected);
    });
    it('should render a template with array value', async () => {
      const result = () => h`${[1, 2, 3]}`;
      const expected = '123';
      expect(await renderToString(result())).to.equal(expected);
      expect(await getStream(renderToStream(result()))).to.equal(expected);
    });
    it('should render a template with deeply nested array value', async () => {
      const result = () => h`${[1, 2, [3, [4, 5]]]}`;
      const expected = '12345';
      expect(await renderToString(result())).to.equal(expected);
      expect(await getStream(renderToStream(result()))).to.equal(expected);
    });
    it('should render a template with sync iterator value', async () => {
      const array = ['hello ', 'there ', 'world', [", how's ", 'it ', 'going']];
      const result = () => h`Well ${array[Symbol.iterator]()}?`;
      const expected = "Well hello there world, how's it going?";
      expect(await renderToString(result())).to.equal(expected);
      expect(await getStream(renderToStream(result()))).to.equal(expected);
    });
    it('should render a template with nested template value', async () => {
      const result = () => h`some ${h`text`}`;
      const expected = 'some text';
      expect(await renderToString(result())).to.equal(expected);
      expect(await getStream(renderToStream(result()))).to.equal(expected);
    });
    it('should render a template with array of nested template values', async () => {
      const result = () => h`some ${[1, 2, 3].map((i) => h`${i}`)} text`;
      const expected = 'some 123 text';
      expect(await renderToString(result())).to.equal(expected);
      expect(await getStream(renderToStream(result()))).to.equal(expected);
    });
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
  });
