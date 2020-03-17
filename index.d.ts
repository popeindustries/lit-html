import { TemplateResult as A } from 'lit-html';
import { TemplateResult as B, RenderOptions } from '@popeindustries/lit-html-server';

type TemplateResult = A & B;

export * from 'lit-html';

export function renderToStream(
  result: TemplateResult,
  options?: RenderOptions
): import('stream').Readable | ReadableStream;
export function renderToBuffer(
  result: TemplateResult,
  options?: RenderOptions
): Promise<Buffer | Uint8Array>;
export function renderToString(result: TemplateResult, options?: RenderOptions): Promise<string>;
export function html(strings: TemplateStringsArray, ...values: Array<unknown>): TemplateResult;
export function svg(strings: TemplateStringsArray, ...values: Array<unknown>): TemplateResult;
