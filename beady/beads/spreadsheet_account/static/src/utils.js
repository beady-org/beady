/** @beady-module **/
// @ts-check

import { helpers } from "@beady/o-spreadsheet";

const { getFunctionsFromTokens } = helpers;

/**
 * @typedef {import("@beady/o-spreadsheet").Token} Token
 * @typedef  {import("@spreadsheet/helpers/beady_functions_helpers").BeadyFunctionDescription} BeadyFunctionDescription
 */

/**
 * @param {Token[]} tokens
 * @returns {number}
 */
export function getNumberOfAccountFormulas(tokens) {
    return getFunctionsFromTokens(tokens, ["ODOO.BALANCE", "ODOO.CREDIT", "ODOO.DEBIT"]).length;
}

/**
 * Get the first Account function description of the given formula.
 *
 * @param {Token[]} tokens
 * @returns {BeadyFunctionDescription | undefined}
 */
export function getFirstAccountFunction(tokens) {
    return getFunctionsFromTokens(tokens, ["ODOO.BALANCE", "ODOO.CREDIT", "ODOO.DEBIT"])[0];
}
