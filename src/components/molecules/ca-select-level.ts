import { LitElement, css, html } from "lit";
import { styleMap } from "lit-html/directives/style-map.js";
import { customElement, property } from "lit/decorators.js";
import levels from "../../data/levels";
import { LocaleController } from "../../controllers/locale-controller";
import { countries } from "../../data/countries";
import { PropertyValues } from "@lit/reactive-element";

type CaSelectDetail = { country: string; levelKey: string };

export class CaSelectEvent extends CustomEvent<CaSelectDetail> {}

/**
 * A level picker. When user chooses a level, it gets updated.
 */
@customElement("ca-select-level")
export class CaSelectLevel extends LitElement {
  private locale = new LocaleController(this);

  /**
   * Territory which level is about to be updated.
   */
  @property()
  country: string | null = null;

  /**
   * Position of the dropdown in the document.
   */
  @property({ type: Object })
  position: { x: 0; y: 0 } | null = null;

  firstUpdated(_changedProperties: PropertyValues): void {
    super.firstUpdated(_changedProperties);

    window.addEventListener("resize", () => this.updateSize());
    this.updateSize();
  }

  protected update(changedProperties: PropertyValues): void {
    super.update(changedProperties);
    this.updateSize();
  }

  disconnectedCallback(): void {
    super.disconnectedCallback();
    window.removeEventListener("resize", () => this.updateSize());
  }

  updateSize() {
    let div = this.renderRoot.querySelector("div");
    if (!div) {
      return;
    }
    const width = div.offsetWidth;
    const height = div.offsetHeight;
    div.style.setProperty("--ih", `${height}px`);
    div.style.setProperty("--iw", `${width}px`);
  }

  render() {
    const styles = {
      "--top": `${this.position?.y || 0}px`,
      "--left": `${this.position?.x || 0}px`,
      visibility: this.position ? "visible" : "hidden",
    };
    const levelsToSort = [...levels.filter((item) => !item.hidden)];
    levelsToSort.sort((a, b) => (a.position < b.position ? -1 : 1));

    return html`
      <div style=${styleMap(styles)}>
        <h2>
          ${this.country
            ? this.locale.t(countries[this.country])
            : "Усть-Каменогорск"}
        </h2>
        <ul>
          ${levelsToSort.map(({ key, text, color }) => {
            let label = this.locale.t(text);
            return html`<li
              @click="${this.handleClick}"
              data-key="${key}"
              style="--ca-level-color: ${color}"
              role="button"
              tabindex="0"
              aria-label="${label}"
            >
              ${label}
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
      border: 0.25em solid black;
      text-align: center;
      box-shadow: 3px 6px 0 rgb(0 0 0 / 10%);
      top: min(
        max(0px, calc(var(--top) - 0.5 * var(--ih))),
        calc(100 * var(--vh) - var(--ih) - 1rem)
      );
      left: min(
        max(0px, calc(var(--left) - 0.5 * var(--iw))),
        calc(100 * var(--vw) - var(--iw) - 1rem)
      );
      z-index: 1;
    }

    @media screen and (max-width: 48rem) {
      div {
        width: max-content;
        font-size: 0.9rem;
      }
    }

    h2 {
      margin: 0;
      padding: 0.25em 0.5em;
      line-height: 1.5em;
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
      padding: 0.25em 0.5em;
      cursor: pointer;
    }
  `;
}

declare global {
  interface HTMLElementTagNameMap {
    "ca-select-level": CaSelectLevel;
  }
}
