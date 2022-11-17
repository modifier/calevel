import { LitElement, css, html } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import levels from "../data/levels";
import {Language} from "../data/langs";

@customElement('ca-legend')
export class CaLegend extends LitElement {
  @property()
  language!: Language;

  render() {
    return html`
      <div>
        <ul>
          ${levels.map(({ text, value, color }) => {
            return html`<li style="--ca-level-color: ${color}">
                <span>${text[this.language]}</span>
                <span>${value}pts</span>
              </li>`
          })}
        </ul>
      </div>
    `;
  }

  static styles = css`
    div {
      position: absolute;
      top: 50vh;
      left: 200px;
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
      padding: 4px 10px;
      cursor: pointer;
      display: flex;
      gap: 20px;
      justify-content: space-between;
    }
  `;
}