/** @beady-module **/

import { Component } from "@beady/owl";

export class ImportBlockUI extends Component {
    static props = {
        message: { type: String, optional: true },
        blockComponent: { type: Object, optional: true },
    };
    static template = "base_import.BlockUI";
}
