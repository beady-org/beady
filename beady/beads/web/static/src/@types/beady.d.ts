interface BeadyModuleErrors {
    cycle?: string | null;
    failed?: Set<string>;
    missing?: Set<string>;
    unloaded?: Set<string>;
}

interface BeadyModuleFactory {
    deps: string[];
    fn: BeadyModuleFactoryFn;
    ignoreMissingDeps: boolean;
}

class BeadyModuleLoader {
    bus: EventTarget;
    checkErrorProm: Promise<void> | null;
    /**
     * Mapping [name => factory]
     */
    factories: Map<string, BeadyModuleFactory>;
    /**
     * Names of failed modules
     */
    failed: Set<string>;
    /**
     * Names of modules waiting to be started
     */
    jobs: Set<string>;
    /**
     * Mapping [name => module]
     */
    modules: Map<string, BeadyModule>;

    constructor(root?: HTMLElement);

    addJob: (name: string) => void;

    define: (
        name: string,
        deps: string[],
        factory: BeadyModuleFactoryFn,
        lazy?: boolean
    ) => BeadyModule;

    findErrors: (jobs?: Iterable<string>) => BeadyModuleErrors;

    findJob: () => string | null;

    reportErrors: (errors: BeadyModuleErrors) => Promise<void>;

    sortFactories: () => void;

    startModule: (name: string) => BeadyModule;

    startModules: () => void;
}

type BeadyModule = Record<string, any>;

type BeadyModuleFactoryFn = (require: (dependency: string) => BeadyModule) => BeadyModule;

declare const beady: {
    csrf_token: string;
    debug: string;
    define: BeadyModuleLoader["define"];
    loader: BeadyModuleLoader;
};
