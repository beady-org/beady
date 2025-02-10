import { Component } from "@beady/owl";

export class BeadyLogo extends Component {
    static template = "point_of_sale.BeadyLogo";
    static props = {
        class: { type: String, optional: true },
        style: { type: String, optional: true },
        monochrome: { type: Boolean, optional: true },
    };
    static defaultProps = {
        class: "",
        style: "",
        monochrome: false,
    };
}
