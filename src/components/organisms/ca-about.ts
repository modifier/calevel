import { css, html, LitElement } from "lit";
import { customElement, state } from "lit/decorators.js";
import labels from "../../data/labels";
import { LocaleController } from "../../controllers/locale-controller";
import { unsafeHTML } from "lit/directives/unsafe-html.js";

/**
 * A button which opens a dialog with the credits and links.
 */
@customElement("ca-about")
export default class CaAbout extends LitElement {
  private locale = new LocaleController(this);

  @state()
  isShown = false;

  render() {
    return html`
      <button class="show-dialog" @click="${this.showDialog}">?</button>
      <dialog>
        <div class="credits">
          <p>
            <strong>${this.locale.t(labels.author)}</strong>:
            ${this.locale.t(labels.me)}
            <a href="https://t.me/modifiertravels" target="_blank" tabindex="0"
              ><ca-icon name="telegram"></ca-icon
            ></a>
          </p>

          <p>
            <strong>${this.locale.t(labels.translation)}</strong>:
            ${this.locale.t(labels.umid)}
            <a href="https://t.me/gafurovumid" target="_blank" tabindex="0"
              ><ca-icon name="telegram"></ca-icon
            ></a>
          </p>
        </div>

        <div class="inspired">
          <p>
            ${unsafeHTML(
              this.locale.t(labels.inspiredBy).replace(
                "{}",
                `<a
                  tabindex="0"
                  href="https://tenpages.github.io/us-level/eu.html"
                  target="_blank"
                  >Europe Level</a
                >`
              )
            )}
          </p>
        </div>
        <div class="madein">
          <p>${this.locale.t(labels.madeInToshkent)}</p>
        </div>

        <p class="additional">
          <a tabindex="0" href="https://t.me/modifiertravels" target="_blank"
            ><ca-icon name="telegram"></ca-icon
          ></a>
          <a tabindex="0" href="https://modya.me" target="_blank"
            ><ca-icon name="home"></ca-icon
          ></a>
          <a tabindex="0" href="https://github.com/modifier" target="_blank"
            ><ca-icon name="github"></ca-icon
          ></a>
        </p>

        <div class="close">
          <button @click="${this.closeDialog}">
            ${this.locale.t(labels.close)}
          </button>
        </div>
      </dialog>
    `;
  }

  showDialog() {
    this.renderRoot.querySelector("dialog")!.showModal();
  }

  closeDialog() {
    this.renderRoot.querySelector("dialog")!.close();
  }

  static styles = css`
    .show-dialog {
      font-size: 1.3em;
      border-radius: 50%;
      width: 30px;
      height: 30px;
      background-color: rgb(128 128 128 / 50%);
      color: white;
      border: 0;
      box-shadow: rgb(0 0 0 / 50%) 0 0 5px 0;
      cursor: pointer;
      transition: 0.5s box-shadow;
      padding: 0;
    }

    .show-dialog:hover {
      box-shadow: rgb(0 0 0 / 75%) 0 0 10px 0;
    }

    button {
      color: black;
      background-color: #fff;
      box-shadow: 0 0 0 2px #111;
      border: 0;
      border-radius: 3px;
      padding: 6px 8px;
      cursor: pointer;
    }

    dialog[open] {
      min-width: 300px;
      display: flex;
      flex-direction: column;
      gap: 1em;
    }

    ::backdrop {
      background: rgb(0 0 0 / 30%);
    }

    .credits p + p {
      margin-top: 0.25em;
    }

    .additional {
      display: flex;
      gap: 0.5em;
      justify-content: center;
      font-size: 1.5em;
    }

    .close {
      align-self: center;
    }

    p {
      margin: 0;
    }

    a {
      color: rgb(142, 77, 255);
    }
  `;
}
