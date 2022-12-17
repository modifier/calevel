import { html, LitElement } from "lit";
import { customElement, property } from "lit/decorators.js";
import html2canvas from "html2canvas";
import labels from "../../data/labels";
import { encodeState } from "../../utils/state-encoder";
import { LocaleController } from "../../controllers/locale-controller";
import "../atoms/ca-code";

/**
 * A full-screen modal which allows user to download and share their country status or share a link with their results.
 */
@customElement("ca-share")
export default class CaShare extends LitElement {
  private locale = new LocaleController(this);

  @property({ type: Object })
  private levelsByCountry!: Record<string, string>;

  render() {
    return html`
      <div class="ca-share">
        <div>
          <p>${this.locale.t(labels.shareTextBefore)}</p>
          <ca-code code="${this.shareUrl}"></ca-code>
          <p>${this.locale.t(labels.shareTextAfter)}</p>
        </div>
        <div class="canvas"></div>
        <div class="share-buttons">
          <button class="primary large" @click="${this.handleSave}">
            <ca-icon name="save"></ca-icon>
            ${this.locale.t(labels.savePicture)}
          </button>
          <button @click="${this.handleClose}">
            ${this.locale.t(labels.close)}
          </button>
        </div>
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
