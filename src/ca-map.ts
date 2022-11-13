import { LitElement, css, html } from 'lit';
import { customElement } from 'lit/decorators.js';
import Map from './assets/eu.svg?raw';
import {unsafeHTML} from 'lit/directives/unsafe-html.js';
import countries from './countries';

@customElement('ca-map')
export class CaMap extends LitElement {
  render() {
    return html`
      <div class="ca-map__map">
        ${unsafeHTML(Map)}
      </div>
    `
  }

  protected firstUpdated(): void {
    for (const country of Object.keys(countries)) {
      let el = this.renderRoot.querySelector(`#${country}`);
      if (!el) {
        throw new Error(`Country not found: ${country}`);
      }
      el.addEventListener('click', (e) => {
        (e.target as SVGPathElement).classList.toggle('country-red');
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
    }
    
    .country-red {
      fill: #f00;
    }
  `
}

declare global {
  interface HTMLElementTagNameMap {
    'ca-map': CaMap,
  }
}
