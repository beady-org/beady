/** @beady-module */

import { BeadyCorePlugin } from "@spreadsheet/plugins";
import { coreTypes, helpers } from "@beady/o-spreadsheet";
import { omit } from "@web/core/utils/objects";
const { deepEquals } = helpers;

/** Plugin that link charts with Beady menus. It can contain either the Id of the beady menu, or its xml id. */
export class ChartBeadyMenuPlugin extends BeadyCorePlugin {
    static getters = /** @type {const} */ (["getChartBeadyMenu"]);
    constructor(config) {
        super(config);
        this.beadyMenuReference = {};
    }

    /**
     * Handle a spreadsheet command
     * @param {Object} cmd Command
     */
    handle(cmd) {
        switch (cmd.type) {
            case "LINK_BEADY_MENU_TO_CHART":
                this.history.update("beadyMenuReference", cmd.chartId, cmd.beadyMenuId);
                break;
            case "DELETE_FIGURE":
                this.history.update("beadyMenuReference", cmd.id, undefined);
                break;
            case "DUPLICATE_SHEET":
                this.updateOnDuplicateSheet(cmd.sheetId, cmd.sheetIdTo);
                break;
        }
    }

    updateOnDuplicateSheet(sheetIdFrom, sheetIdTo) {
        for (const oldChartId of this.getters.getChartIds(sheetIdFrom)) {
            if (!this.beadyMenuReference[oldChartId]) {
                continue;
            }
            const oldChartDefinition = this.getters.getChartDefinition(oldChartId);
            const oldFigure = this.getters.getFigure(sheetIdFrom, oldChartId);
            const newChartId = this.getters.getChartIds(sheetIdTo).find((newChartId) => {
                const newChartDefinition = this.getters.getChartDefinition(newChartId);
                const newFigure = this.getters.getFigure(sheetIdTo, newChartId);
                return (
                    deepEquals(oldChartDefinition, newChartDefinition) &&
                    deepEquals(omit(newFigure, "id"), omit(oldFigure, "id")) // compare size and position
                );
            });

            if (newChartId) {
                this.history.update(
                    "beadyMenuReference",
                    newChartId,
                    this.beadyMenuReference[oldChartId]
                );
            }
        }
    }

    /**
     * Get beady menu linked to the chart
     *
     * @param {string} chartId
     * @returns {object | undefined}
     */
    getChartBeadyMenu(chartId) {
        const menuId = this.beadyMenuReference[chartId];
        return menuId ? this.getters.getIrMenu(menuId) : undefined;
    }

    import(data) {
        if (data.chartBeadyMenusReferences) {
            this.beadyMenuReference = data.chartBeadyMenusReferences;
        }
    }

    export(data) {
        data.chartBeadyMenusReferences = this.beadyMenuReference;
    }
}

coreTypes.add("LINK_BEADY_MENU_TO_CHART");
