import {css, html, LitElement} from "lit";
import {customElement} from "lit/decorators.js";

@customElement('ca-button')
export class CaButton extends LitElement {
  render() {
    return html`
      <button>
        <slot></slot>
      </button>
    `;
  }

  static styles = css`
    button {
      background-color: #ffb;
      box-shadow: 0 0 0 2px #111;
      border: 0;
      border-radius: 3px;
      padding: 6px 8px;
    }
  `
}

declare global {
  interface HTMLElementTagNameMap {
    'ca-reset': CaButton,
  }
}
