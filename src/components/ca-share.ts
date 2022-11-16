import {html, LitElement } from "lit";
import { customElement, property } from "lit/decorators.js";
import {Language} from "../data/langs";
import html2canvas from "html2canvas";
import labels from "../data/labels";

@customElement('ca-share')
export default class CaShare extends LitElement {
  @property()
  private language!: Language;

  render() {
    return html`
      <div class="ca-share">
        <div class="canvas"></div>
        <button class="primary" @click="${this.handleSave}">${labels.savePicture[this.language]}</button>
        <button @click="${this.handleClose}">${labels.close[this.language]}</button>
      </div>
    `
  }

  protected firstUpdated(): void {
    let mapContainer = this.renderRoot.parentNode!.querySelector(".ca-map-container");
    html2canvas(mapContainer as HTMLDivElement).then(canvas => {
      this.renderRoot.querySelector('.canvas')!.appendChild(canvas);
    });
  }

  private handleSave() {
    const downloadLink = document.createElement('a');
    downloadLink.setAttribute('download', 'CentralAsia.png');
    const canvas = this.renderRoot.querySelector('canvas') as HTMLCanvasElement;
    canvas.toBlob(function(blob) {
      const url = URL.createObjectURL(blob as Blob);
      downloadLink.setAttribute('href', url);
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