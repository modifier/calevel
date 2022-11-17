import { css, html, LitElement, PropertyValues } from "lit";
import { customElement, property } from "lit/decorators.js";
import { unsafeHTML } from "lit/directives/unsafe-html.js";
import Map from "../assets/eu.svg?raw";
import { countries } from "../data/countries";
import levels from "../data/levels";
import { Locale } from "../data/locales";

@customElement("ca-map")
export default class CaMap extends LitElement {
  @property()
  language!: Locale;

  @property({ type: Object })
  private levelsByCountry: Record<string, string> = {};

  @property({ attribute: false })
  private selectedCountry: string | null = null;

  @property({ attribute: false, type: Object })
  private position: { x: number; y: number } | null = null;

  render() {
    return html`
      <div>${unsafeHTML(Map)}</div>
      <ca-select-level
        language="${this.language}"
        country="${this.selectedCountry}"
        position="${JSON.stringify(this.position)}"
      ></ca-select-level>
    `;
  }

  protected firstUpdated() {
    document.body.addEventListener("click", () => {
      this.selectedCountry = null;
      this.position = null;
    });

    for (const country of Object.keys(countries)) {
      let elements = Array.from(
        this.renderRoot.querySelectorAll(`[data-country=${country}]`)
      ) as SVGPathElement[];
      if (elements.length === 0) {
        throw new Error(`Country not found: ${country}`);
      }

      for (const element of elements) {
        element.addEventListener("click", (e: Event) =>
          this.countryClickHandler(e, country)
        );
      }
    }
  }

  protected updated(changedProperties: PropertyValues): void {
    if (changedProperties.has("levelsByCountry")) {
      this.updateCountryColors();
    }

    if (
      changedProperties.has("levelsByCountry") ||
      changedProperties.has("language")
    ) {
      this.updateCountryLabels();
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

  private updateCountryLabels() {
    for (const [countryKey, countryName] of Object.entries(countries)) {
      const element = this.renderRoot.querySelector(
        `[data-country-name=${countryKey}]`
      ) as SVGPathElement;
      element.innerHTML = countryName[this.language];
    }
  }

  private updateCountryColors() {
    for (const country of Object.keys(countries)) {
      const level = levels.find(
        (level) => level.key === (this.levelsByCountry[country] || "default")
      );
      const elements = Array.from(
        this.renderRoot.querySelectorAll(`[data-country=${country}]`)
      ) as SVGPathElement[];

      for (const element of elements) {
        element.style.fill = level!.color;
      }
    }
  }

  static styles = css`
    div {
      max-width: 100vw;
      max-height: 100vh;
      margin: 0 auto;
      display: flex;
      flex-direction: column;
    }
  `;
}
