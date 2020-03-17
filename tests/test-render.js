// @ts-nocheck

/**
 * Tests are based on @popeindustries/lit-html-server browser tests
 */

import { asyncTests } from './test-render-async';
import { attributeTests } from './test-render-attributes';
import { syncTests } from './test-render-text';

describe('Browser template render', () => {
  syncTests();
  asyncTests();
  attributeTests();
});
