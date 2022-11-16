import { LitElement, css, html } from 'lit';
import { customElement, state } from 'lit/decorators.js';
import './ca-select-level';
import levels from '../data/levels';
import {CaSelectEvent} from "./ca-select-level";
import '../components/ca-level-label';
import '../components/ca-legend';
import '../components/ca-map';
import '../components/ca-lang-picker';
import languages from "../data/langs";

@customElement('ca-app')
export class CaApp extends LitElement {
  @state()
  private storedLevelsByCountry: Record<string, string> | null = null;

  @state()
  private language: keyof typeof languages = 'en';

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
      <ca-level-label level="${totalLevel}"></ca-level-label>
      <ca-legend></ca-legend>
      <ca-map levelsByCountry="${JSON.stringify(this.levelsByCountry)}" @change="${this.handleLevelChange}"></ca-map>
      <nav>
        ${isDirty ? html`<button @click="${this.handleReset}">Reset</button>` : ''}
        ${this.storedLevelsByCountry ? html`<button @click="${this.handleRestore}">Restore</button>` : ''}
        <ca-lang-picker language="${this.language}" @selectLang="${this.handleLanguageChange}"></ca-lang-picker>
      </nav>
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

  private handleLanguageChange({ detail: { lang }}: CustomEvent<{ lang: keyof typeof languages}>) {
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

  static styles = css`
    :host {
      width: 100%;
      height: 100%;
      margin: 0 auto;
    }
    
    button {
      background-color: #ffb;
      box-shadow: 0 0 0 2px #111;
      border: 0;
      border-radius: 3px;
      padding: 6px 8px;
    }
    
    nav {
      position: absolute;
      bottom: 0;
      right: 0;
      padding: 1em;
    }
  `
}

declare global {
  interface HTMLElementTagNameMap {
    'ca-map': CaApp,
  }
}
