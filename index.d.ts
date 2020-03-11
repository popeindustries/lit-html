import { TemplateResult as A } from 'lit-html';
import { TemplateResult as B } from '@popeindustries/lit-html-server';

type TemplateResult = A & B;

export * from 'lit-html';

export function renderToStream(result: TemplateResult): import('stream').Readable | ReadableStream;
export function renderToBuffer(result: TemplateResult): Promise<Buffer | Uint8Array>;
export function renderToString(result: TemplateResult): Promise<string>;
export function html(strings: TemplateStringsArray, ...values: Array<unknown>): TemplateResult;
export function svg(strings: TemplateStringsArray, ...values: Array<unknown>): TemplateResult;
