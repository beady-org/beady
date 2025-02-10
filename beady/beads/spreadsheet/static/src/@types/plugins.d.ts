declare module "@spreadsheet" {
    import { CommandResult, CorePlugin, UIPlugin } from "@beady/o-spreadsheet";
    import { CommandResult as CR } from "@spreadsheet/o_spreadsheet/cancelled_reason";
    type BeadyCommandResult = CommandResult | typeof CR;

    export interface BeadyCorePlugin extends CorePlugin {
        getters: BeadyCoreGetters;
        dispatch: BeadyCoreDispatch;
        allowDispatch(command: AllCoreCommand): string | string[];
        beforeHandle(command: AllCoreCommand): void;
        handle(command: AllCoreCommand): void;
    }

    export interface BeadyCorePluginConstructor {
        new (config: unknown): BeadyCorePlugin;
    }

    export interface BeadyUIPlugin extends UIPlugin {
        getters: BeadyGetters;
        dispatch: BeadyDispatch;
        allowDispatch(command: AllCommand): string | string[];
        beforeHandle(command: AllCommand): void;
        handle(command: AllCommand): void;
    }

    export interface BeadyUIPluginConstructor {
        new (config: unknown): BeadyUIPlugin;
    }
}
