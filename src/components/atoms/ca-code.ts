import { css, html, LitElement } from "lit";
import { customElement, property, state } from "lit/decorators.js";

/**
 * A line of monospaced text with the ability to be copied.
 */
@customElement("ca-code")
export default class CaCode extends LitElement {
  /**
   * The text shown in the block of code.
   */
  @property()
  private code!: string;

  @state()
  private isCopied = false;

  render() {
    return html`
      <code>
        ${this.code}
        <button @click="${this.copyCode}">
          <ca-icon name="${this.isCopied ? "tick" : "copy"}"></ca-icon>
        </button>
      </code>
    `;
  }

  copyCode() {
    navigator.clipboard.writeText(this.code).then(() => {
      if (!this.isCopied) {
        setTimeout(() => (this.isCopied = false), 3000);
      }
      this.isCopied = true;
    });
  }

  static styles = css`
    code {
      background-color: #eee;
      font-family: Consolas, monospace;
      border-radius: 4px;
      max-width: 100%;
      box-shadow: -1px -1px 1px inset rgb(0 0 0 / 10%);
      font-size: 0.9em;
      padding: 4px 8px;
      margin: 1em 0;
      display: inline-flex;
      justify-content: space-between;
      align-items: center;
      gap: 0.5rem;
    }

    button {
      border: 0;
      padding: 0;
      cursor: pointer;
      display: flex;
      width: 1em;
      height: 1em;
    }
  `;
}
