import { LitElement, css, html } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import Map from '../assets/eu.svg?raw';
import {unsafeHTML} from 'lit/directives/unsafe-html.js';
import countries from '../data/countries';
import './ca-select-level';
import levels from '../data/levels';
import {CaSelectEvent} from "./ca-select-level";
import '../components/ca-level-label';
import '../components/ca-legend';

@customElement('ca-map')
export class CaMap extends LitElement {
  @property({ attribute: false })
  private selectedCountry: string | null = null;

  @property({ attribute: false, type: Object })
  private position: { x: number, y: number } | null = null;

  @property({ attribute: false })
  private levelsByCountry: Record<string, number> = {};

  render() {
    const totalLevel = Object.values(this.levelsByCountry).reduce((n, a) => n + a, 0);

    return html`
      <ca-level-label level="${totalLevel}"></ca-level-label>
      <ca-legend></ca-legend>
      <div class="ca-map__map">
        ${unsafeHTML(Map)}
      </div>
      <ca-select-level 
        country="${this.selectedCountry}" 
        @change="${this.handleLevelChange}"
        position="${JSON.stringify(this.position)}" />
    `
  }

  protected firstUpdated(): void {
    this.renderRoot.addEventListener('click', () => {
      this.selectedCountry = null;
      this.position = null;
    });

    for (const country of Object.keys(countries)) {
      let elements = Array.from(this.renderRoot.querySelectorAll(`[data-country=${country}]`)) as SVGPathElement[];
      if (elements.length === 0) {
        throw new Error(`Country not found: ${country}`);
      }

      for (const element of elements) {
        element.addEventListener('click', (e: Event) => this.countryClickHandler(e, country));
      }
    }
  }

  private countryClickHandler(e: Event, country: string) {
    e.stopPropagation();
    this.selectedCountry = country;

    const target = e.target as SVGPathElement;
    const position = target.getBoundingClientRect();
    this.position = {
      y: position.top + window.scrollY + position.height / 2,
      x: position.left + window.scrollX + position.width / 2,
    };
  }

  private handleLevelChange({ detail: { name, country }}: CaSelectEvent) {
    const level = levels.find(level => level.name === name);
    const elements = Array.from(this.renderRoot.querySelectorAll(`[data-country=${country}]`)) as SVGPathElement[];

    for (const element of elements) {
      element.style.fill = level!.color;
    }

    this.levelsByCountry[country] = level!.level;
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
