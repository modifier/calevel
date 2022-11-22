import { LitElement, css, html } from "lit";
import { customElement, property } from "lit/decorators.js";
import labels from "../data/labels";
import { LocaleController } from "../controllers/locale-controller";

@customElement("ca-level-label")
export class CaLevelLabel extends LitElement {
  private locale = new LocaleController(this);

  @property()
  level: number = 0;

  render() {
    return html`<h1>${this.locale.t(labels.mainLabel)} ${this.level}</h1>`;
  }

  static styles = css`
    h1 {
      position: absolute;
      top: 0;
      right: 0;
      padding: 1em;
      margin: 0 auto;
    }
  `;
}

declare global {
  interface HTMLElementTagNameMap {
    "ca-level-label": CaLevelLabel;
  }
}
