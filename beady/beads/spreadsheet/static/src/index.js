/** @beady-module */

/**
 * This file is meant to load the different subparts of the module
 * to guarantee their plugins are loaded in the right order
 *
 * dependency:
 *             other plugins
 *                   |
 *                  ...
 *                   |
 *                filters
 *                /\    \
 *               /  \    \
 *           pivot  list  Beady chart
 */

/** TODO: Introduce a position parameter to the plugin registry in order to load them in a specific order */
import * as spreadsheet from "@beady/o-spreadsheet";
const { corePluginRegistry, coreViewsPluginRegistry } = spreadsheet.registries;

import { GlobalFiltersCorePlugin, GlobalFiltersUIPlugin } from "@spreadsheet/global_filters/index";
import { PivotBeadyCorePlugin, PivotUIGlobalFilterPlugin } from "@spreadsheet/pivot/index"; // list depends on filter for its getters
import { ListCorePlugin, ListUIPlugin } from "@spreadsheet/list/index"; // pivot depends on filter for its getters
import {
    ChartBeadyMenuPlugin,
    BeadyChartCorePlugin,
    BeadyChartUIPlugin,
} from "@spreadsheet/chart/index"; // Beadychart depends on filter for its getters
import { PivotCoreGlobalFilterPlugin } from "./pivot/plugins/pivot_core_global_filter_plugin";
import { PivotBeadyUIPlugin } from "./pivot/plugins/pivot_beady_ui_plugin";

corePluginRegistry.add("BeadyGlobalFiltersCorePlugin", GlobalFiltersCorePlugin);
corePluginRegistry.add("PivotBeadyCorePlugin", PivotBeadyCorePlugin);
corePluginRegistry.add("BeadyPivotGlobalFiltersCorePlugin", PivotCoreGlobalFilterPlugin);
corePluginRegistry.add("BeadyListCorePlugin", ListCorePlugin);
corePluginRegistry.add("beadyChartCorePlugin", BeadyChartCorePlugin);
corePluginRegistry.add("chartBeadyMenuPlugin", ChartBeadyMenuPlugin);

coreViewsPluginRegistry.add("BeadyGlobalFiltersUIPlugin", GlobalFiltersUIPlugin);
coreViewsPluginRegistry.add("BeadyPivotGlobalFilterUIPlugin", PivotUIGlobalFilterPlugin);
coreViewsPluginRegistry.add("BeadyListUIPlugin", ListUIPlugin);
coreViewsPluginRegistry.add("beadyChartUIPlugin", BeadyChartUIPlugin);
coreViewsPluginRegistry.add("beadyPivotUIPlugin", PivotBeadyUIPlugin);
