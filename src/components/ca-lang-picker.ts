import { css, html, LitElement } from "lit";
import { customElement, property, state } from "lit/decorators.js";
import { Locale, locales, localeIcons } from "../data/locales";

@customElement("ca-lang-picker")
export default class CaLangPicker extends LitElement {
  @property()
  private language!: Locale;

  @state()
  private isShown = false;

  render() {
    return html`
      <div class="picker">
        <div class="dropdown ${this.isShown ? "dropdown--shown" : ""}">
          <ul>
            ${Object.entries(locales).map(([key, name]) => {
              return html`<li
                data-lang="${key}"
                class="${this.language === key ? "selected-lang" : ""}"
                @click="${this.menuSelectHandler}"
              >
                <img src="${localeIcons[key as Locale]}" alt="Flag of ${name}" />
                ${name}
              </li>`;
            })}
          </ul>
        </div>
        <button @click="${this.menuDropHandler}">
          <img src="${localeIcons[this.language]}" alt="Flag of ${name}" />
          <span>${locales[this.language]}</span>
        </button>
      </div>
    `;
  }

  protected firstUpdated() {
    document.body.addEventListener("click", () => {
      this.isShown = false;
    });
  }

  private menuDropHandler(e: MouseEvent) {
    this.isShown = !this.isShown;
    e.stopPropagation();
  }

  private menuSelectHandler(e: MouseEvent) {
    e.stopPropagation();

    const item = e.target as HTMLLinkElement;
    const lang = item.dataset.lang as string;
    this.isShown = false;

    this.dispatchEvent(new CustomEvent("selectLang", { detail: { lang } }));
  }

  static styles = css`
    .picker {
      position: relative;
    }

    .dropdown {
      position: absolute;
      bottom: 40px;
      right: 50%;
      transform: translateX(50%);
      display: none;
    }

    .dropdown--shown {
      display: block;
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
    }
    
    button img {
      height: 1em;
    }

    ul {
      margin: 0;
      padding: 0;
      list-style: none;
      background-color: #fff;
      box-shadow: 0 0 0 2px #111;
      border-radius: 3px;
    }

    li {
      margin: 0;
      padding: 4px 10px;
      cursor: pointer;
      display: flex;
      flex-direction: row;
      gap: 0.5em;
      align-items: center;
    }
    
    li img {
      height: 1em;
    }

    li.selected-lang {
      background-color: #999;
      color: white;
    }
  `;
}
