declare module '@popeindustries/lit-html' {
  import { TemplateResult } from '@popeindustries/lit-html-server';

  export * from '@popeindustries/lit-html-server';
  export function render(result: unknown, container?: any, options?: any): void;
}
