import { LitElement, css, html } from "lit";
import { customElement } from "lit/decorators.js";
import levels from "../../data/levels";
import { LocaleController } from "../../controllers/locale-controller";

/**
 * A legend which represents the list of levels in the application.
 */
@customElement("ca-legend")
export class CaLegend extends LitElement {
  private locale = new LocaleController(this);

  render() {
    const levelsToSort = [...levels.filter((item) => !item.hidden)];
    levelsToSort.sort((a, b) => (a.position < b.position ? -1 : 1));

    return html`
      <div>
        <ul>
          ${levelsToSort.map(({ text, value, color }) => {
            return html`<li style="--ca-level-color: ${color}">
              <span>${this.locale.t(text)}</span>
              <span>${value}pts</span>
            </li>`;
          })}
        </ul>
      </div>
    `;
  }

  static styles = css`
    div {
      background: white;
      border-radius: 4px;
      border: 2px solid black;
      width: max-content;
      margin: 0 auto;
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
