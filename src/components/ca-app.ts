import { LitElement, css, html, nothing } from 'lit';
import { customElement, state } from 'lit/decorators.js';
import './ca-select-level';
import levels from '../data/levels';
import {CaSelectEvent} from "./ca-select-level";
import '../components/ca-level-label';
import '../components/ca-legend';
import '../components/ca-map';
import '../components/ca-lang-picker';
import '../components/ca-share';
import {Language} from "../data/langs";
import labels from "../data/labels";

@customElement('ca-app')
export class CaApp extends LitElement {
  @state()
  private storedLevelsByCountry: Record<string, string> | null = null;

  @state()
  private language: Language = 'en';

  @state()
  private sharing = false;

  private _levelsByCountry: Record<string, string> = {};

  set levelsByCountry(val: Record<string, string>) {
    const oldVal = this._levelsByCountry;
    this._levelsByCountry = val;
    localStorage.setItem('countries', JSON.stringify(val));
    this.requestUpdate('levelsByCountry', oldVal);
  }

  @state()
  get levelsByCountry(): Record<string, string> {
    return this._levelsByCountry;
  }

  constructor() {
    super();

    const savedCountries = localStorage.getItem('countries');
    if (savedCountries) {
      try {
        this._levelsByCountry = JSON.parse(savedCountries);
      }
      catch (e) {}
    }
  }

  render() {
    const totalLevel = Object.values(this.levelsByCountry).reduce((a, name) => {
      const level  = levels.find(level => level.name === name);
      return (level?.level || 0) + a;
    }, 0);

    const isDirty = Object.values(this.levelsByCountry).some((level) => level !== 'default');

    return html`
      <div class="ca-map-container ${this.sharing ? 'ca-map-container--sharing' : ''}">
        <ca-level-label language="${this.language}" level="${totalLevel}"></ca-level-label>
        <ca-legend language="${this.language}"></ca-legend>
        <ca-map language="${this.language}"
          levelsByCountry="${JSON.stringify(this.levelsByCountry)}"
           @change="${this.handleLevelChange}"></ca-map>
      </div>
      <nav>
        ${isDirty ? html`<button class="reset" @click="${this.handleReset}">${labels.reset[this.language]}</button>` : nothing}
        ${this.storedLevelsByCountry ? 
          html`<button @click="${this.handleRestore}">${labels.restore[this.language]}</button>`
          : nothing}
        <ca-lang-picker language="${this.language}" @selectLang="${this.handleLanguageChange}"></ca-lang-picker>
        <button class="primary" @click="${this.handleShare}">${labels.share[this.language]}</button>
      </nav>
      ${this.sharing ? html`<ca-share @close="${this.handleCloseShare}" language="${this.language}"></ca-share>` : nothing}
    `
  }

  private handleLevelChange({ detail: { name, country }}: CaSelectEvent) {
    this.levelsByCountry = {
      ...this.levelsByCountry,
      [country]: name,
    };

    if (name !== 'default') {
      this.storedLevelsByCountry = null;
    }
  }

  private handleLanguageChange({ detail: { lang }}: CustomEvent<{ lang: Language}>) {
    this.language = lang;
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
  }

  private handleCloseShare() {
    this.sharing = false;
  }

  static styles = css`
    :host {
      width: 100%;
      height: 100%;
      margin: 0 auto;
    }
    
    .ca-map-container {
      background-color: rgb(215, 199, 182);
    }
    
    .ca-map-container--sharing {
      width: 800px;
      height: 600px;
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
    }
    
    .canvas {
      flex: 0 1 auto;
      height: 480px;
    }
    
    .canvas canvas {
      width: auto !important;
      height: auto !important;
      max-height: 100%; 
      box-shadow: 0 5px 20px rgb(0 0 0 / 10%);
    }
  `
}

declare global {
  interface HTMLElementTagNameMap {
    'ca-map': CaApp,
  }
}
