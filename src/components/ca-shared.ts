import { html, LitElement } from "lit";
import { customElement, property } from "lit/decorators.js";
import { Locale } from "../data/locales";
import html2canvas from "html2canvas";
import labels from "../data/labels";

@customElement("ca-shared")
export default class CaShare extends LitElement {
  @property()
  private language!: Locale;

  render() {
    return html`
      <div class="ca-share">
        <div>
          <p>${labels.sharedText[this.language]}</p>
        </div>
        <div class="canvas"></div>
        <button class="primary" @click="${this.handleClose}">
          ${labels.drawOwn[this.language]}
        </button>
      </div>
    `;
  }

  protected firstUpdated(): void {
    let mapContainer =
      this.renderRoot.parentNode!.querySelector(".ca-map-container");
    html2canvas(mapContainer as HTMLDivElement).then((canvas) => {
      this.renderRoot.querySelector(".canvas")!.appendChild(canvas);
    });
  }

  private handleClose() {
    this.dispatchEvent(new CustomEvent("close"));
  }

  protected createRenderRoot(): Element | ShadowRoot {
    return this;
  }
}
