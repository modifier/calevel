import { LitElement, css, html } from 'lit';
import { styleMap } from 'lit-html/directives/style-map.js';
import { customElement, property } from 'lit/decorators.js';
import levels from './levels';

@customElement('ca-select-level')
export class CaSelectLevel extends LitElement {
  @property()
  country: string | null = null;

  @property({ type: Object })
  position: { x: 0, y: 0 } | null = null;

  render() {
    if (!this.country) {
      return null;
    }

    const styles = {
      top: `${this.position?.y}px`,
      left: `${this.position?.x}px`,
      visibility: this.position ? 'visible' : 'hidden',
    };

    return html`
      <div style=${styleMap(styles)}>
        <h2>${this.country}</h2>
        <ul>
          ${levels.map(({ name, level, color }) => {
            return html`<li data-level="${level}" style="--ca-level-color: ${color}">${name}</li>`
          })}
        </ul>
      </div>
    `
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
    'ca-select-level': CaSelectLevel,
  }
}
