import { TemplateResult as A } from 'lit-html';
import { TemplateResult as B } from '@popeindustries/lit-html-server';

type TemplateResult = A & B;

export * from 'lit-html';
export { renderToBuffer, renderToStream, renderToString } from '@popeindustries/lit-html-server';

export function html(strings: TemplateStringsArray, ...values: Array<unknown>): TemplateResult;
export function svg(strings: TemplateStringsArray, ...values: Array<unknown>): TemplateResult;
