import { html, LitElement } from "lit";
import { customElement } from "lit/decorators.js";
import html2canvas from "html2canvas";
import labels from "../../data/labels";
import { LocaleController } from "../../controllers/locale-controller";

/**
 * A full-screen modal which is shown when someone has shared a link with their results.
 */
@customElement("ca-shared")
export default class CaShare extends LitElement {
  private locale = new LocaleController(this);

  render() {
    return html`
      <div class="ca-share">
        <div>
          <p>${this.locale.t(labels.sharedText)}</p>
        </div>
        <div class="canvas"></div>
        <div class="share-buttons">
          <button class="primary large" @click="${this.handleClose}">
            ${this.locale.t(labels.drawOwn)}
          </button>
        </div>
        <nav>
          <ca-lang-picker></ca-lang-picker>
        </nav>
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
