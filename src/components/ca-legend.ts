import { LitElement, css, html } from "lit";
import { customElement, property } from "lit/decorators.js";
import levels from "../data/levels";
import { Locale } from "../data/locales";

@customElement("ca-legend")
export class CaLegend extends LitElement {
  @property()
  language!: Locale;

  render() {
    const levelsToSort = [...levels];
    levelsToSort.sort((a, b) => (a.position < b.position ? -1 : 1));

    return html`
      <div>
        <ul>
          ${levelsToSort.map(({ text, value, color }) => {
            return html`<li style="--ca-level-color: ${color}">
              <span>${text[this.language]}</span>
              <span>${value}pts</span>
            </li>`;
          })}
        </ul>
      </div>
    `;
  }

  static styles = css`
    div {
      position: absolute;
      top: 50vh;
      left: 50px;
      background: white;
      border-radius: 4px;
      border: 2px solid black;
    }

    ul {
      margin: 0;
      padding: 0;
      list-style: none;
    }

    li {
      margin: 0;
      background-color: var(--ca-level-color);
      padding: 0 5px;
      font-size: 0.8rem;
      display: flex;
      gap: 20px;
      justify-content: space-between;
    }
  `;
}
