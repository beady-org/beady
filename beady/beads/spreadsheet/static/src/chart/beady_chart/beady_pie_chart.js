/** @beady-module */

import * as spreadsheet from "@beady/o-spreadsheet";
import { _t } from "@web/core/l10n/translation";
import { BeadyChart } from "./beady_chart";

const { chartRegistry } = spreadsheet.registries;

const { getDefaultChartJsRuntime, chartFontColor, ColorGenerator, formatTickValue } =
    spreadsheet.helpers;

chartRegistry.add("beady_pie", {
    match: (type) => type === "beady_pie",
    createChart: (definition, sheetId, getters) => new BeadyChart(definition, sheetId, getters),
    getChartRuntime: createBeadyChartRuntime,
    validateChartDefinition: (validator, definition) =>
        BeadyChart.validateChartDefinition(validator, definition),
    transformDefinition: (definition) => BeadyChart.transformDefinition(definition),
    getChartDefinitionFromContextCreation: () => BeadyChart.getDefinitionFromContextCreation(),
    name: _t("Pie"),
});

function createBeadyChartRuntime(chart, getters) {
    const background = chart.background || "#FFFFFF";
    const { datasets, labels } = chart.dataSource.getData();
    const locale = getters.getLocale();
    const chartJsConfig = getPieConfiguration(chart, labels, locale);
    chartJsConfig.options = {
        ...chartJsConfig.options,
        ...getters.getChartDatasetActionCallbacks(chart),
    };
    const dataSetsLength = Math.max(0, ...datasets.map((ds) => ds?.data?.length ?? 0));
    const colors = new ColorGenerator(dataSetsLength);
    for (const { label, data } of datasets) {
        const backgroundColor = getPieColors(colors, datasets);
        const dataset = {
            label,
            data,
            borderColor: "#FFFFFF",
            backgroundColor,
            hoverOffset: 30,
        };
        chartJsConfig.data.datasets.push(dataset);
    }
    return { background, chartJsConfig };
}

function getPieConfiguration(chart, labels, locale) {
    const color = chartFontColor(chart.background);
    const config = getDefaultChartJsRuntime(chart, labels, color, { locale });
    config.type = chart.type.replace("beady_", "");
    const legend = {
        ...config.options.legend,
        display: chart.legendPosition !== "none",
        labels: { color },
    };
    legend.position = chart.legendPosition;
    config.options.plugins = config.options.plugins || {};
    config.options.plugins.legend = legend;
    config.options.layout = {
        padding: { left: 20, right: 20, top: chart.title ? 10 : 25, bottom: 10 },
    };
    config.options.plugins.tooltip = {
        callbacks: {
            title: function (tooltipItem) {
                return tooltipItem.label;
            },
        },
    };

    config.options.plugins.chartShowValuesPlugin = {
        showValues: chart.showValues,
        callback: formatTickValue({ locale }),
    };
    return config;
}

function getPieColors(colors, dataSetsValues) {
    const pieColors = [];
    const maxLength = Math.max(...dataSetsValues.map((ds) => ds.data.length));
    for (let i = 0; i <= maxLength; i++) {
        pieColors.push(colors.next());
    }

    return pieColors;
}
