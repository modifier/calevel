import { css, html, LitElement, PropertyValues } from "lit";
import { customElement, property, state } from "lit/decorators.js";
import { unsafeHTML } from "lit/directives/unsafe-html.js";
import Map from "../../assets/map.svg?raw";
import { countries } from "../../data/countries";
import levels from "../../data/levels";
import { LocaleController } from "../../controllers/locale-controller";

/**
 * A map of the region and their labels.
 */
@customElement("ca-map")
export default class CaMap extends LitElement {
  private locale = new LocaleController(this);

  /**
   * The list of levels that user set for each territory. This is used to update background colors of each territory.
   */
  @property({ type: Object })
  private levelsByCountry: Record<string, string> = {};

  @state()
  private selectedCountry: string | null = null;

  @state()
  private position: { x: number; y: number } | null = null;

  render() {
    return html`
      <div>${unsafeHTML(Map)}</div>
      <ca-select-level
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
      // There may be enclaves so it's an array
      let elements = Array.from(
        this.renderRoot.querySelectorAll(`[data-country=${country}]`)
      ) as SVGPathElement[];
      if (elements.length === 0) {
        throw new Error(`Country not found: ${country}`);
      }

      for (const element of elements) {
        // @ts-ignore
        element.role = "button";
        element.tabIndex = 0;
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

    this.updateCountryLabels();
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
      const label = this.locale.t(countryName).split("\n");

      const countryLabels = this.renderRoot.querySelectorAll(
        `[data-country-name=${countryKey}]`
      ) as unknown as SVGTextElement[];
      for (let i = 0; i < countryLabels.length; i++) {
        countryLabels[i].innerHTML = label[i] || "";
      }

      let countries = Array.from(
        this.renderRoot.querySelectorAll(`[data-country=${countryKey}]`)
      ) as SVGPathElement[];
      for (const element of countries) {
        element.ariaLabel = label.join("");
      }
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
      max-width: 100%;
      max-height: 100%;
      margin: 0 auto;
      display: flex;
      flex-direction: column;
    }

    svg {
      height: 100%;
      width: 100%;
    }

    path:focus {
      stroke: #5e9ed6;
      stroke-width: 1px;
      outline: none;
      position: relative;
      z-index: 10;
    }
  `;
}
