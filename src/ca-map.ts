import { LitElement, css, html } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import Map from './assets/eu.svg?raw';
import {unsafeHTML} from 'lit/directives/unsafe-html.js';
import countries from './countries';
import './ca-select-level';

@customElement('ca-map')
export class CaMap extends LitElement {
  @property({ attribute: false })
  private selectedCountry: string | null = null;

  @property({ attribute: false, type: Object })
  private position: { x: number, y: number } | null = null;

  render() {
    return html`
      <div class="ca-map__map">
        ${unsafeHTML(Map)}
      </div>
      <ca-select-level 
        country="${this.selectedCountry}" 
        position="${JSON.stringify(this.position)}" />
    `
  }

  protected firstUpdated(): void {
    this.renderRoot.addEventListener('click', () => {
      this.selectedCountry = null;
      this.position = null;
    });

    for (const country of Object.keys(countries)) {
      let el = this.renderRoot.querySelector(`#${country}`);
      if (!el) {
        throw new Error(`Country not found: ${country}`);
      }
      el.addEventListener('click', (e) => {
        e.stopPropagation();
        this.selectedCountry = country;

        const target = e.target as SVGPathElement;
        const position = target.getBoundingClientRect();
        this.position = {
          y: position.top + window.scrollY + position.height / 2,
          x: position.left + window.scrollX + position.width / 2,
        };
      });
    }
  }

  static styles = css`
    :host {
      width: 100%;
      height: 100%;
      margin: 0 auto;
    }
    
    .ca-map__map {
      max-width: 100vw;
      max-height: 100vh;
      margin: 0 auto;
      display: flex;
      flex-direction: column;
    }
  `
}

declare global {
  interface HTMLElementTagNameMap {
    'ca-map': CaMap,
  }
}
