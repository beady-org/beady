/** @beady-module */
import { globalFiltersFieldMatchers } from "@spreadsheet/global_filters/plugins/global_filters_core_plugin";
import { checkFilterFieldMatching } from "@spreadsheet/global_filters/helpers";
import { CommandResult } from "../../o_spreadsheet/cancelled_reason";
import { Domain } from "@web/core/domain";
import { BeadyCorePlugin } from "@spreadsheet/plugins";
import { _t } from "@web/core/l10n/translation";

/**
 * @typedef {Object} Chart
 * @property {Object} fieldMatching
 *
 * @typedef {import("@spreadsheet").FieldMatching} FieldMatching
 */

const CHART_PLACEHOLDER_DISPLAY_NAME = {
    beady_bar: _t("Beady Bar Chart"),
    beady_line: _t("Beady Line Chart"),
    beady_pie: _t("Beady Pie Chart"),
};

export class BeadyChartCorePlugin extends BeadyCorePlugin {
    static getters = /** @type {const} */ ([
        "getBeadyChartIds",
        "getChartFieldMatch",
        "getBeadyChartDisplayName",
        "getBeadyChartFieldMatching",
    ]);

    constructor(config) {
        super(config);

        /** @type {Object.<string, Chart>} */
        this.charts = {};

        globalFiltersFieldMatchers["chart"] = {
            getIds: () => this.getters.getBeadyChartIds(),
            getDisplayName: (chartId) => this.getters.getBeadyChartDisplayName(chartId),
            getFieldMatching: (chartId, filterId) =>
                this.getBeadyChartFieldMatching(chartId, filterId),
            getModel: (chartId) =>
                this.getters.getChart(chartId).getDefinitionForDataSource().metaData.resModel,
        };
    }

    allowDispatch(cmd) {
        switch (cmd.type) {
            case "ADD_GLOBAL_FILTER":
            case "EDIT_GLOBAL_FILTER":
                if (cmd.chart) {
                    return checkFilterFieldMatching(cmd.chart);
                }
        }
        return CommandResult.Success;
    }

    /**
     * Handle a spreadsheet command
     *
     * @param {Object} cmd Command
     */
    handle(cmd) {
        switch (cmd.type) {
            case "CREATE_CHART": {
                switch (cmd.definition.type) {
                    case "beady_pie":
                    case "beady_bar":
                    case "beady_line":
                        this._addBeadyChart(cmd.id);
                        break;
                }
                break;
            }
            case "DELETE_FIGURE": {
                const charts = { ...this.charts };
                delete charts[cmd.id];
                this.history.update("charts", charts);
                break;
            }
            case "REMOVE_GLOBAL_FILTER":
                this._onFilterDeletion(cmd.id);
                break;
            case "ADD_GLOBAL_FILTER":
            case "EDIT_GLOBAL_FILTER":
                if (cmd.chart) {
                    this._setBeadyChartFieldMatching(cmd.filter.id, cmd.chart);
                }
                break;
        }
    }

    // -------------------------------------------------------------------------
    // Getters
    // -------------------------------------------------------------------------

    /**
     * Get all the beady chart ids
     * @returns {Array<string>}
     */
    getBeadyChartIds() {
        return Object.keys(this.charts);
    }

    /**
     * @param {string} chartId
     * @returns {string}
     */
    getChartFieldMatch(chartId) {
        return this.charts[chartId].fieldMatching;
    }

    /**
     *
     * @param {string} chartId
     * @returns {string}
     */
    getBeadyChartDisplayName(chartId) {
        const { title, type } = this.getters.getChart(chartId);
        const name = title.text || CHART_PLACEHOLDER_DISPLAY_NAME[type];
        return `(#${this.getBeadyChartIds().indexOf(chartId) + 1}) ${name}`;
    }

    /**
     * Import the charts
     *
     * @param {Object} data
     */
    import(data) {
        for (const sheet of data.sheets) {
            if (sheet.figures) {
                for (const figure of sheet.figures) {
                    if (figure.tag === "chart" && figure.data.type.startsWith("beady_")) {
                        this._addBeadyChart(figure.id, figure.data.fieldMatching);
                    }
                }
            }
        }
    }
    /**
     * Export the chart
     *
     * @param {Object} data
     */
    export(data) {
        for (const sheet of data.sheets) {
            if (sheet.figures) {
                for (const figure of sheet.figures) {
                    if (figure.tag === "chart" && figure.data.type.startsWith("beady_")) {
                        figure.data.fieldMatching = this.getChartFieldMatch(figure.id);
                        figure.data.searchParams.domain = new Domain(
                            figure.data.searchParams.domain
                        ).toJson();
                    }
                }
            }
        }
    }
    // -------------------------------------------------------------------------
    // Private
    // -------------------------------------------------------------------------

    /**
     * Get the current beadyChartFieldMatching of a chart
     *
     * @param {string} chartId
     * @param {string} filterId
     */
    getBeadyChartFieldMatching(chartId, filterId) {
        return this.charts[chartId].fieldMatching[filterId];
    }

    /**
     * Sets the current beadyChartFieldMatching of a chart
     *
     * @param {string} filterId
     * @param {Record<string,FieldMatching>} chartFieldMatches
     */
    _setBeadyChartFieldMatching(filterId, chartFieldMatches) {
        const charts = { ...this.charts };
        for (const [chartId, fieldMatch] of Object.entries(chartFieldMatches)) {
            charts[chartId].fieldMatching[filterId] = fieldMatch;
        }
        this.history.update("charts", charts);
    }

    _onFilterDeletion(filterId) {
        const charts = { ...this.charts };
        for (const chartId in charts) {
            this.history.update("charts", chartId, "fieldMatching", filterId, undefined);
        }
    }

    /**
     * @param {string} chartId
     * @param {Object} fieldMatching
     */
    _addBeadyChart(chartId, fieldMatching = undefined) {
        const charts = { ...this.charts };
        if (!fieldMatching) {
            const model = this.getters.getChartDefinition(chartId).metaData.resModel;
            fieldMatching = this.getters.getFieldMatchingForModel(model);
        }
        charts[chartId] = {
            fieldMatching,
        };
        this.history.update("charts", charts);
    }
}
