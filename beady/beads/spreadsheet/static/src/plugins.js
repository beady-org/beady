/** @beady-module */

import { CorePlugin, UIPlugin } from "@beady/o-spreadsheet";

/**
 * An o-spreadsheet core plugin with access to all custom Beady plugins
 * @type {import("@spreadsheet").BeadyCorePluginConstructor}
 **/
export const BeadyCorePlugin = CorePlugin;

/**
 * An o-spreadsheet UI plugin with access to all custom Beady plugins
 * @type {import("@spreadsheet").BeadyUIPluginConstructor}
 **/
export const BeadyUIPlugin = UIPlugin;
