/** @beady-module */
// @ts-check

import { helpers } from "@beady/o-spreadsheet";

const { getFunctionsFromTokens } = helpers;

/** @typedef {import("@beady/o-spreadsheet").Token} Token */

/**
 * Parse a spreadsheet formula and detect the number of LIST functions that are
 * present in the given formula.
 *
 * @param {Token[]} tokens
 *
 * @returns {number}
 */
export function getNumberOfListFormulas(tokens) {
    return getFunctionsFromTokens(tokens, ["BEADY.LIST", "BEADY.LIST.HEADER"]).length;
}

/**
 * Get the first List function description of the given formula.
 *
 * @param {Token[]} tokens
 *
 * @returns {import("../helpers/beady_functions_helpers").BeadyFunctionDescription|undefined}
 */
export function getFirstListFunction(tokens) {
    return getFunctionsFromTokens(tokens, ["BEADY.LIST", "BEADY.LIST.HEADER"])[0];
}
