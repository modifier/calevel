import { LitElement, css, html, nothing } from "lit";
import { customElement, state } from "lit/decorators.js";
import "./ca-select-level";
import levels from "../data/levels";
import { CaSelectEvent } from "./ca-select-level";
import "../components/ca-level-label";
import "../components/ca-legend";
import "../components/ca-map";
import "../components/ca-lang-picker";
import "../components/ca-share";
import "../components/ca-shared";
import { Locale } from "../data/locales";
import labels from "../data/labels";
import { getDefaultLocale } from "../utils/locale";
import { getSavedCountries, getSharedState } from "../utils/state-encoder";

@customElement("ca-app")
export class CaApp extends LitElement {
  @state()
  private storedLevelsByCountry: Record<string, string> | null = null;

  @state()
  private savedBeforeSharingLevelsByCountry: Record<string, string> | null =
    null;

  @state()
  private language: Locale;

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

    this.language = getDefaultLocale();
    this._levelsByCountry = getSavedCountries();
    const sharedState = getSharedState();
    if (sharedState) {
      this.savedBeforeSharingLevelsByCountry = this.levelsByCountry;
      this._levelsByCountry = sharedState;
      document.body.classList.add("backdrop");
    }
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
        <ca-level-label
          language="${this.language}"
          level="${totalLevel}"
        ></ca-level-label>
        <ca-legend language="${this.language}"></ca-legend>
        <ca-map
          language="${this.language}"
          levelsByCountry="${JSON.stringify(this.levelsByCountry)}"
          @change="${this.handleLevelChange}"
        ></ca-map>
      </div>
      <nav>
        ${isDirty
          ? html`<button class="reset" @click="${this.handleReset}">
              ${labels.reset[this.language]}
            </button>`
          : nothing}
        ${this.storedLevelsByCountry
          ? html`<button @click="${this.handleRestore}">
              ${labels.restore[this.language]}
            </button>`
          : nothing}
        <ca-lang-picker
          language="${this.language}"
          @selectLang="${this.handleLanguageChange}"
        ></ca-lang-picker>
        <button class="primary" @click="${this.handleShare}">
          ${labels.share[this.language]}
        </button>
      </nav>
      ${this.sharing
        ? html`<ca-share
            language="${this.language}"
            @close="${this.handleCloseShare}"
            levelsByCountry="${JSON.stringify(this.levelsByCountry)}"
          ></ca-share>`
        : nothing}
      ${this.savedBeforeSharingLevelsByCountry
        ? html`<ca-shared
            language="${this.language}"
            @close="${this.handleCloseShared}"
          ></ca-shared>`
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

  private handleLanguageChange({
    detail: { lang },
  }: CustomEvent<{ lang: Locale }>) {
    this.language = lang;
    localStorage.setItem("lang", lang);
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
    document.body.classList.add("backdrop");
  }

  private handleCloseShare() {
    this.sharing = false;
    document.body.classList.remove("backdrop");
  }

  private handleCloseShared() {
    this._levelsByCountry = this.savedBeforeSharingLevelsByCountry || {};
    this.savedBeforeSharingLevelsByCountry = null;
    document.body.classList.remove("backdrop");
    window.history.pushState({}, document.title, "/");
  }

  static styles = css`
    :host {
      width: 100%;
      height: 100%;
      margin: 0 auto;
    }

    .ca-map-container--sharing {
      width: 800px;
      height: 600px;
      background-color: rgb(215, 199, 182);
    }

    button {
      background-color: #fff;
      box-shadow: 0 0 0 2px #111;
      border: 0;
      border-radius: 3px;
      padding: 6px 8px;
    }

    button.primary {
      padding-inline: 16px;
      background-color: #ffb;
    }

    nav {
      position: absolute;
      bottom: 0;
      right: 0;
      padding: 1em;
      display: flex;
      flex-direction: row;
      gap: 16px;
    }

    .ca-share {
      position: fixed;
      inset: 0 0 0 0;
      background-color: white;
      display: flex;
      align-items: center;
      justify-content: center;
      flex-direction: column;
      gap: 16px;
      padding: 16px;
      overflow: auto;
    }

    .canvas {
      flex: 0 1 auto;
      max-height: 480px;
      max-width: 100%;
    }

    .canvas canvas {
      width: auto !important;
      height: auto !important;
      max-width: 100%;
      max-height: 100%;
      box-shadow: 0 5px 20px rgb(0 0 0 / 10%);
    }

    code {
      background-color: #eee;
      font-family: Consolas, monospace;
      border-radius: 4px;
      width: 100%;
      box-shadow: -1px -1px 1px inset rgb(0 0 0 / 10%);
      font-size: 0.9em;
      padding: 4px 8px;
      margin: 1em 0;
      display: inline-block;
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
