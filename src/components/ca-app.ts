import { LitElement, css, html, nothing } from "lit";
import { customElement, state } from "lit/decorators.js";
import "./molecules/ca-select-level";
import levels from "../data/levels";
import { CaSelectEvent } from "./molecules/ca-select-level";
import "./atoms/ca-level-label";
import "./molecules/ca-legend";
import "./molecules/ca-map";
import "./molecules/ca-lang-picker";
import "./organisms/ca-share";
import "./organisms/ca-shared";
import "./organisms/ca-about";
import "./atoms/ca-icon";
import labels from "../data/labels";
import { getDefaultLocale } from "../utils/locale";
import { getSavedCountries, getSharedState } from "../utils/state-encoder";
import { LocaleController } from "../controllers/locale-controller";

/**
 * An application entrypoint - brings everything together.
 */
@customElement("ca-app")
export class CaApp extends LitElement {
  private locale = new LocaleController(this);

  @state()
  private storedLevelsByCountry: Record<string, string> | null = null;

  @state()
  private savedBeforeSharingLevelsByCountry: Record<string, string> | null =
    null;

  @state()
  private sharing = false;

  private _levelsByCountry: Record<string, string> = {};

  set levelsByCountry(val: Record<string, string>) {
    const oldVal = this._levelsByCountry;
    this._levelsByCountry = val;
    localStorage.setItem("countries", JSON.stringify(val));
    this.requestUpdate("levelsByCountry", oldVal);
  }

  @state()
  get levelsByCountry(): Record<string, string> {
    return this._levelsByCountry;
  }

  constructor() {
    super();

    LocaleController.setLocale(getDefaultLocale());
    this._levelsByCountry = getSavedCountries();
    const sharedState = getSharedState();
    if (sharedState) {
      this.savedBeforeSharingLevelsByCountry = this.levelsByCountry;
      this._levelsByCountry = sharedState;
      document.documentElement.classList.add("backdrop");
    }
  }

  connectedCallback(): void {
    super.connectedCallback();

    // solution from here: https://stackoverflow.com/questions/61264725/chrome-for-android-hides-address-bar-when-scrolling-expands-background-image-be
    this.updateVh();
    window.addEventListener("resize", this.updateVh);
  }

  disconnectedCallback(): void {
    super.disconnectedCallback();
    window.removeEventListener("resize", this.updateVh);
  }

  updateVh() {
    const vh = window.innerHeight * 0.01;
    const vw = window.innerWidth * 0.01;
    document.documentElement.style.setProperty("--vh", `${vh}px`);
    document.documentElement.style.setProperty("--vw", `${vw}px`);
  }

  render() {
    const totalLevel = Object.values(this.levelsByCountry).reduce((a, name) => {
      const level = levels.find((level) => level.key === name);
      return (level?.value || 0) + a;
    }, 0);

    const isDirty = Object.values(this.levelsByCountry).some(
      (level) => level !== "default"
    );

    const isShowingBackdrop =
      this.sharing || this.savedBeforeSharingLevelsByCountry;

    return html`
      <div
        class="ca-map-container ${isShowingBackdrop
          ? "ca-map-container--sharing"
          : ""}"
      >
        <ca-level-label level="${totalLevel}"></ca-level-label>
        <ca-map
          levelsByCountry="${JSON.stringify(this.levelsByCountry)}"
          @change="${this.handleLevelChange}"
        ></ca-map>
        <ca-legend></ca-legend>
      </div>
      <nav>
        <ca-about></ca-about>
        <div class="buttons">
          ${isDirty
            ? html`<button class="large" @click="${this.handleReset}">
                ${this.locale.t(labels.reset)}
              </button>`
            : nothing}
          ${this.storedLevelsByCountry
            ? html`<button class="large" @click="${this.handleRestore}">
                <ca-icon name="undo"></ca-icon>
                ${this.locale.t(labels.restore)}
              </button>`
            : nothing}
          <ca-lang-picker></ca-lang-picker>
          <button class="primary large" @click="${this.handleShare}">
            <ca-icon name="share"></ca-icon>
            ${this.locale.t(labels.share)}
          </button>
        </div>
      </nav>
      ${this.sharing
        ? html`<ca-share
            @close="${this.handleCloseShare}"
            levelsByCountry="${JSON.stringify(this.levelsByCountry)}"
          ></ca-share>`
        : nothing}
      ${this.savedBeforeSharingLevelsByCountry
        ? html`<ca-shared @close="${this.handleCloseShared}"></ca-shared>`
        : nothing}
    `;
  }

  private handleLevelChange({ detail: { levelKey, country } }: CaSelectEvent) {
    this.levelsByCountry = {
      ...this.levelsByCountry,
      [country]: levelKey,
    };

    if (levelKey !== "default") {
      this.storedLevelsByCountry = null;
    }
  }

  private handleReset() {
    this.storedLevelsByCountry = this.levelsByCountry;
    this.levelsByCountry = {};
  }

  private handleRestore() {
    this.levelsByCountry = this.storedLevelsByCountry || {};
    this.storedLevelsByCountry = null;
  }

  private handleShare() {
    this.sharing = true;
    document.documentElement.classList.add("backdrop");
  }

  private handleCloseShare() {
    this.sharing = false;
    document.documentElement.classList.remove("backdrop");
  }

  private handleCloseShared() {
    this._levelsByCountry = this.savedBeforeSharingLevelsByCountry || {};
    this.savedBeforeSharingLevelsByCountry = null;
    document.documentElement.classList.remove("backdrop");
    window.history.pushState({}, document.title, "/");
  }

  static styles = css`
    :host {
      width: 100%;
      height: 100%;
      margin: 0 auto;
      display: flex;
      flex-direction: column;
    }

    @media (max-aspect-ratio: 1/1), (max-width: 48rem) {
      :host {
        width: max-content;
      }
    }

    .ca-map-container {
      width: 100%;
      height: 100%;
      min-width: 100%;
      min-height: 100%;
      position: relative;
    }

    .ca-map-container--sharing {
      width: 800px;
      height: 600px;
      min-height: initial;
      min-width: initial;
      background-color: rgb(215, 199, 182);
    }

    ca-level-label {
      position: absolute;
      top: 0;
      right: 1rem;
      margin: 1rem 0;
    }

    ca-legend {
      position: absolute;
      top: 60%;
      right: 1rem;
    }

    ca-map {
      padding: 3em 1em;
      box-sizing: border-box;
      display: block;
      height: 100%;
      width: 100%;
    }

    @media (min-aspect-ratio: 2/1) {
      .ca-map-container:not(.ca-map-container--sharing) ca-legend {
        left: 2rem;
        right: initial;
      }
    }

    @media (max-aspect-ratio: 1/1), (max-width: 48rem) {
      .ca-map-container:not(.ca-map-container--sharing) ca-legend {
        position: sticky;
        top: auto;
        left: 0;
        right: 0;
        display: block;
      }
    }

    @media (max-aspect-ratio: 1/1), (max-width: 48rem) {
      .ca-map-container:not(.ca-map-container--sharing) ca-level-label {
        width: 100%;
        text-align: center;
        position: static;
        margin-bottom: 0;
      }

      .ca-map-container:not(.ca-map-container--sharing) {
        flex: 1 0 auto;
        height: auto;
        min-height: auto;
      }

      .ca-map-container:not(.ca-map-container--sharing) ca-map {
        padding: 1em;
        display: block;
        height: max-content;
      }
    }

    button {
      background-color: #fff;
      box-shadow: 0 0 0 2px #111;
      border: 0;
      border-radius: 3px;
      padding: 6px 8px;
      cursor: pointer;
      display: flex;
      flex-direction: row;
      gap: 0.25rem;
      align-items: center;
      width: 100%;
      justify-content: center;
      white-space: nowrap;
      color: black;
    }

    button.primary {
      padding-inline: 16px;
      background-color: #ffb;
    }

    button.large {
      font-size: 1.05rem;
      font-weight: 500;
      padding: 8px;
    }

    button img {
      height: 1em;
      vertical-align: middle;
    }

    .about {
      position: absolute;
      bottom: 1rem;
      left: 1rem;
    }

    nav {
      position: fixed;
      bottom: 0;
      right: 0;
      padding: 1rem;
      display: flex;
      flex-direction: row;
      justify-content: space-between;
      width: 100%;
      box-sizing: border-box;
      align-items: center;
      gap: 1rem;
    }

    nav .buttons {
      display: flex;
      flex-direction: row;
      gap: 1rem;
      align-items: stretch;
    }

    @media (max-aspect-ratio: 1/1), (max-width: 48rem) {
      nav {
        position: sticky;
        bottom: auto;
        left: 0;
        right: 0;
      }
      nav,
      nav .buttons {
        flex-direction: column-reverse;
      }
    }

    .share-buttons {
      flex: 1 0 auto;
      display: flex;
      flex-direction: column;
      gap: 1rem;
      justify-content: flex-end;
    }

    ca-share,
    ca-shared {
      display: block;
      position: fixed;
      background-color: white;
      width: 100vw;
      height: calc(100 * var(--vh));
      overflow: auto;
      top: 0;
      left: 0;
    }

    .ca-share {
      display: flex;
      align-items: center;
      justify-content: center;
      flex-direction: column;
      gap: 16px;
      padding: 1rem 1rem 3rem;
      box-sizing: border-box;
      width: 100%;
      min-height: 100%;
    }

    .ca-share nav {
      width: fit-content;
    }

    .canvas {
      flex: 0 1 auto;
      max-width: min(600px, 100%);
    }

    .canvas canvas {
      width: auto !important;
      height: auto !important;
      max-width: 100%;
      max-height: 100%;
      box-shadow: 0 5px 20px rgb(0 0 0 / 10%);
    }

    p {
      margin: 0;
    }
  `;
}

declare global {
  interface HTMLElementTagNameMap {
    "ca-map": CaApp;
  }
}
