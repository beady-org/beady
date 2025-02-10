declare module "@spreadsheet" {
    import { Model } from "@beady/o-spreadsheet";

    export interface BeadySpreadsheetModel extends Model {
        getters: BeadyGetters;
        dispatch: BeadyDispatch;
    }

    export interface BeadySpreadsheetModelConstructor {
        new (
            data: object,
            config: Partial<Model["config"]>,
            revisions: object[]
        ): BeadySpreadsheetModel;
    }
}
