/* global chai */
// @ts-nocheck

import { getStream, renderToString } from './test-utils.js';
import { html as h, renderToStream } from '@popeindustries/lit-html';
const { expect } = chai;

export const attributeTests = () =>
  describe('attributes', () => {
    it('should render a template with quoted text attribute', async () => {
      const value = 'text';
      const result = () => h`<div a="${value}"></div>`;
      const expected = '<div a="text"></div>';
      expect(await renderToString(result())).to.equal(expected);
      expect(await getStream(renderToStream(result()))).to.equal(expected);
    });
    it('should render a template with quoted array attribute', async () => {
      const value = [1, 2, 3];
      const result = () => h`<div a="${value}"></div>`;
      const expected = '<div a="123"></div>';
      expect(await renderToString(result())).to.equal(expected);
      expect(await getStream(renderToStream(result()))).to.equal(expected);
    });
    it('should render a template with unquoted attribute', async () => {
      const value = 'text';
      const result = () => h`<div a=${value}></div>`;
      const expected = '<div a="text"></div>';
      expect(await renderToString(result())).to.equal(expected);
      expect(await getStream(renderToStream(result()))).to.equal(expected);
    });
    it('should render a template with quoted attribute and extra whitespace', async () => {
      const value = 'text';
      const result = () => h`<div a = " ${value} "></div>`;
      const expected = '<div a=" text "></div>';
      expect(await renderToString(result())).to.equal(expected);
      expect(await getStream(renderToStream(result()))).to.equal(expected);
    });
    it('should render a template with quoted attribute and extra strings', async () => {
      const value = 'text';
      const result = () => h`<div a="some ${value}"></div>`;
      const expected = '<div a="some text"></div>';
      expect(await renderToString(result())).to.equal(expected);
      expect(await getStream(renderToStream(result()))).to.equal(expected);
    });
    it('should render a template with quoted attribute and multiple strings/values', async () => {
      const value = 'text';
      const result = () => h`<div a="this is ${'some'} ${value}">${'node'}</div>`;
      const expected = '<div a="this is some text">node</div>';
      expect(await renderToString(result())).to.equal(expected);
      expect(await getStream(renderToStream(result()))).to.equal(expected);
    });
    it('should render a template with boolean attribute', async () => {
      const value = true;
      const result = () => h`<div ?a="${value}"></div>`;
      const expected = '<div a=""></div>';
      expect(await renderToString(result())).to.equal(expected);
      expect(await getStream(renderToStream(result()))).to.equal(expected);
    });
    it('should render a template with event attribute', async () => {
      const result = () => h`<div @a="${'some event'}"></div>`;
      const expected = '<div></div>';
      expect(await renderToString(result())).to.equal(expected);
      expect(await getStream(renderToStream(result()))).to.equal(expected);
    });
    it('should render a template with property attribute', async () => {
      const result = () => h`<div .a="${'some prop'}"></div>`;
      const expected = '<div></div>';
      expect(await renderToString(result())).to.equal(expected);
      expect(await getStream(renderToStream(result()))).to.equal(expected);
    });
  });
