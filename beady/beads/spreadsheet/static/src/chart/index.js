/** @beady-module */

import * as spreadsheet from "@beady/o-spreadsheet";

const { chartComponentRegistry } = spreadsheet.registries;
const { ChartJsComponent } = spreadsheet.components;

chartComponentRegistry.add("beady_bar", ChartJsComponent);
chartComponentRegistry.add("beady_line", ChartJsComponent);
chartComponentRegistry.add("beady_pie", ChartJsComponent);

import { BeadyChartCorePlugin } from "./plugins/beady_chart_core_plugin";
import { ChartBeadyMenuPlugin } from "./plugins/chart_beady_menu_plugin";
import { BeadyChartUIPlugin } from "./plugins/beady_chart_ui_plugin";

export { BeadyChartCorePlugin, ChartBeadyMenuPlugin, BeadyChartUIPlugin };
