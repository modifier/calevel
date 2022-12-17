import { LitElement, css, html } from "lit";
import { customElement, property } from "lit/decorators.js";
import labels from "../../data/labels";
import { LocaleController } from "../../controllers/locale-controller";

/**
 * A heading with the level that user has.
 */
@customElement("ca-level-label")
export class CaLevelLabel extends LitElement {
  private locale = new LocaleController(this);

  /**
   * The level to show.
   */
  @property()
  level: number = 0;

  render() {
    return html`<h1>
      ${this.locale.t(labels.mainLabel).replace("{}", this.level.toString())}
    </h1>`;
  }

  static styles = css`
    :host {
      display: block;
    }

    h1 {
      margin: 0;
    }

    @media (max-width: 40rem) {
      h1 {
        font-size: 1.5rem;
      }
    }
  `;
}

declare global {
  interface HTMLElementTagNameMap {
    "ca-level-label": CaLevelLabel;
  }
}
