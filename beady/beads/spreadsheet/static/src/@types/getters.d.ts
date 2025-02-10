import { CorePlugin, Model, UID } from "@beady/o-spreadsheet";
import { ChartBeadyMenuPlugin, BeadyChartCorePlugin, BeadyChartUIPlugin } from "@spreadsheet/chart";
import { CurrencyPlugin } from "@spreadsheet/currency/plugins/currency";
import { AccountingPlugin } from "beads/spreadsheet_account/static/src/plugins/accounting_plugin";
import { GlobalFiltersCorePlugin, GlobalFiltersUIPlugin } from "@spreadsheet/global_filters";
import { ListCorePlugin, ListUIPlugin } from "@spreadsheet/list";
import { IrMenuPlugin } from "@spreadsheet/ir_ui_menu/ir_ui_menu_plugin";
import { PivotBeadyCorePlugin } from "@spreadsheet/pivot";
import { PivotCoreGlobalFilterPlugin } from "@spreadsheet/pivot/plugins/pivot_core_global_filter_plugin";

type Getters = Model["getters"];
type CoreGetters = CorePlugin["getters"];

/**
 * Union of all getter names of a plugin.
 *
 * e.g. With the following plugin
 * @example
 * class MyPlugin {
 *   static getters = [
 *     "getCell",
 *     "getCellValue",
 *   ] as const;
 *   getCell() { ... }
 *   getCellValue() { ... }
 * }
 * type Names = GetterNames<typeof MyPlugin>
 * // is equivalent to "getCell" | "getCellValue"
 */
type GetterNames<Plugin extends { getters: readonly string[] }> = Plugin["getters"][number];

/**
 * Extract getter methods from a plugin, based on its `getters` static array.
 * @example
 * class MyPlugin {
 *   static getters = [
 *     "getCell",
 *     "getCellValue",
 *   ] as const;
 *   getCell() { ... }
 *   getCellValue() { ... }
 * }
 * type MyPluginGetters = PluginGetters<typeof MyPlugin>;
 * // MyPluginGetters is equivalent to:
 * // {
 * //   getCell: () => ...,
 * //   getCellValue: () => ...,
 * // }
 */
type PluginGetters<Plugin extends { new (...args: unknown[]): any; getters: readonly string[] }> =
    Pick<InstanceType<Plugin>, GetterNames<Plugin>>;

declare module "@spreadsheet" {
    /**
     * Add getters from custom plugins defined in beady
     */

    interface BeadyCoreGetters extends CoreGetters {}
    interface BeadyCoreGetters extends PluginGetters<typeof GlobalFiltersCorePlugin> {}
    interface BeadyCoreGetters extends PluginGetters<typeof ListCorePlugin> {}
    interface BeadyCoreGetters extends PluginGetters<typeof BeadyChartCorePlugin> {}
    interface BeadyCoreGetters extends PluginGetters<typeof ChartBeadyMenuPlugin> {}
    interface BeadyCoreGetters extends PluginGetters<typeof IrMenuPlugin> {}
    interface BeadyCoreGetters extends PluginGetters<typeof PivotBeadyCorePlugin> {}
    interface BeadyCoreGetters extends PluginGetters<typeof PivotCoreGlobalFilterPlugin> {}

    interface BeadyGetters extends Getters {}
    interface BeadyGetters extends BeadyCoreGetters {}
    interface BeadyGetters extends PluginGetters<typeof GlobalFiltersUIPlugin> {}
    interface BeadyGetters extends PluginGetters<typeof ListUIPlugin> {}
    interface BeadyGetters extends PluginGetters<typeof BeadyChartUIPlugin> {}
    interface BeadyGetters extends PluginGetters<typeof CurrencyPlugin> {}
    interface BeadyGetters extends PluginGetters<typeof AccountingPlugin> {}
}
