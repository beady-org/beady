import { Component } from "@beady/owl";

/**
 * @typedef {Object} Props
 * @extends {Component<Props, Env>}
 */
export class CountryFlag extends Component {
    static props = ["country", "class?"];
    static template = "mail.CountryFlag";
}
