import { SpreadsheetChildEnv as SSChildEnv } from "@beady/o-spreadsheet";
import { Services } from "services";

declare module "@spreadsheet" {
    import { Model } from "@beady/o-spreadsheet";

    export interface SpreadsheetChildEnv extends SSChildEnv {
        model: BeadySpreadsheetModel;
        services: Services;
    }
}
