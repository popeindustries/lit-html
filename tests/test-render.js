// @ts-nocheck

/**
 * Tests are based on @popeindustries/lit-html-server browser tests
 */

import { asyncTests } from './test-render-async.js';
import { attributeTests } from './test-render-attributes.js';
import { syncTests } from './test-render-text.js';

describe('Browser template render', () => {
  syncTests();
  asyncTests();
  attributeTests();
});
