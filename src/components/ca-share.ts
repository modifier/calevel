import { html, LitElement } from "lit";
import { customElement, property } from "lit/decorators.js";
import { Locale } from "../data/locales";
import html2canvas from "html2canvas";
import labels from "../data/labels";
import { encodeState } from "../utils/state-encoder";
import saveIcon from "../assets/save-icon.svg";

@customElement("ca-share")
export default class CaShare extends LitElement {
  @property()
  private language!: Locale;

  @property({ type: Object })
  private levelsByCountry!: Record<string, string>;

  render() {
    return html`
      <div class="ca-share">
        <div>
          <p>${labels.shareTextBefore[this.language]}</p>
          <code>${this.shareUrl}</code>
          <p>${labels.shareTextAfter[this.language]}</p>
        </div>
        <div class="canvas"></div>
        <button class="primary large" @click="${this.handleSave}">
          <img src="${saveIcon}" alt="Save icon" />
          ${labels.savePicture[this.language]}
        </button>
        <button @click="${this.handleClose}">
          ${labels.close[this.language]}
        </button>
      </div>
    `;
  }

  get shareUrl() {
    return `${document.location.origin}${
      document.location.pathname
    }?code=${this.getCode()}`;
  }

  private getCode() {
    return encodeState(this.levelsByCountry);
  }

  protected firstUpdated(): void {
    let mapContainer =
      this.renderRoot.parentNode!.querySelector(".ca-map-container");
    html2canvas(mapContainer as HTMLDivElement).then((canvas) => {
      this.renderRoot.querySelector(".canvas")!.appendChild(canvas);
    });
  }

  private handleSave() {
    const downloadLink = document.createElement("a");
    downloadLink.setAttribute("download", "CentralAsia.png");
    const canvas = this.renderRoot.querySelector("canvas") as HTMLCanvasElement;
    canvas.toBlob(function (blob) {
      const url = URL.createObjectURL(blob as Blob);
      downloadLink.setAttribute("href", url);
      downloadLink.click();
    });
  }

  private handleClose() {
    this.dispatchEvent(new CustomEvent("close"));
  }

  protected createRenderRoot(): Element | ShadowRoot {
    return this;
  }
}
