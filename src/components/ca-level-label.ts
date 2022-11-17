import { LitElement, css, html } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import labels from "../data/labels";
import {Locale} from "../data/locales";

@customElement('ca-level-label')
export class CaLevelLabel extends LitElement {
  @property()
  language!: Locale;

  @property()
  level: number = 0;

  render() {
    return html`<h1>${labels.mainLabel[this.language]} ${this.level}</h1>`;
  }

  static styles = css`
    h1 {
      position: absolute;
      top: 30vh;
      left: 200px;
      margin: 0;
    }
  `;
}

declare global {
  interface HTMLElementTagNameMap {
    'ca-level-label': CaLevelLabel,
  }
}