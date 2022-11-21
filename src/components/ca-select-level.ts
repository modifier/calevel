import { LitElement, css, html } from "lit";
import { styleMap } from "lit-html/directives/style-map.js";
import { customElement, property } from "lit/decorators.js";
import levels from "../data/levels";
import { Locale } from "../data/locales";

type CaSelectDetail = { country: string; levelKey: string };

export class CaSelectEvent extends CustomEvent<CaSelectDetail> {}

@customElement("ca-select-level")
export class CaSelectLevel extends LitElement {
  @property()
  language!: Locale;

  @property()
  country: string | null = null;

  @property({ type: Object })
  position: { x: 0; y: 0 } | null = null;

  render() {
    const styles = {
      top: `${this.position?.y || 0}px`,
      left: `${this.position?.x || 0}px`,
      visibility: this.position ? "visible" : "hidden",
    };
    const levelsToSort = [ ...levels ];
    levelsToSort.sort((a, b) => a.position < b.position ? -1 : 1);

    return html`
      <div style=${styleMap(styles)}>
        <h2>${this.country}</h2>
        <ul>
          ${levelsToSort.map(({ key, text, color }) => {
            return html`<li
              @click="${this.handleClick}"
              data-key="${key}"
              style="--ca-level-color: ${color}"
            >
              ${text[this.language]}
            </li>`;
          })}
        </ul>
      </div>
    `;
  }

  private handleClick({ target }: MouseEvent) {
    const levelKey = (target as HTMLLIElement).dataset.key!;

    this.dispatchEvent(
      new CaSelectEvent("change", {
        bubbles: true,
        composed: true,
        detail: { levelKey, country: this.country! },
      })
    );
  }

  static styles = css`
    div {
      position: absolute;
      background: white;
      border-radius: 4px;
      border: 4px solid black;
      text-align: center;
      box-shadow: 3px 6px 0 rgb(0 0 0 / 10%);
      transform: translate(-50%, -50%);
    }

    h2 {
      margin: 0;
      padding: 4px 10px;
      line-height: 30px;
      font-weight: normal;
    }

    ul {
      margin: 0;
      padding: 0;
      list-style: none;
    }

    li {
      margin: 0;
      background-color: var(--ca-level-color);
      padding: 4px 10px;
      cursor: pointer;
    }
  `;
}

declare global {
  interface HTMLElementTagNameMap {
    "ca-select-level": CaSelectLevel;
  }
}
