import { css, html, LitElement } from "lit";
import { customElement, state } from "lit/decorators.js";
import { Locale, locales, localeIcons } from "../../data/locales";
import { LocaleController } from "../../controllers/locale-controller";

/**
 * A language picker.
 */
@customElement("ca-lang-picker")
export default class CaLangPicker extends LitElement {
  private locale = new LocaleController(this);

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
                class="${this.locale.locale === key ? "selected-lang" : ""}"
                role="button"
                aria-label="${name}"
                tabindex="0"
                @click="${this.menuSelectHandler}"
              >
                <ca-icon name="${localeIcons[key as Locale]}"></ca-icon>
                ${name}
              </li>`;
            })}
          </ul>
        </div>
        <button @click="${this.menuDropHandler}">
          <ca-icon name="${this.locale.t(localeIcons)}"></ca-icon>
          <span>${locales[this.locale.locale]}</span>
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

    const item = (e.target as HTMLElement).closest("li") as HTMLLIElement;
    const lang = item.dataset.lang as string;
    this.isShown = false;

    LocaleController.setLocale(lang as Locale);
  }

  static styles = css`
    .picker {
      position: relative;
    }

    .dropdown {
      position: absolute;
      bottom: 50px;
      right: 50%;
      transform: translateX(50%);
      display: none;
    }

    .dropdown--shown {
      display: block;
    }

    button {
      color: black;
      background-color: #fff;
      box-shadow: 0 0 0 2px #111;
      border: 0;
      border-radius: 3px;
      padding: 8px;
      cursor: pointer;
      display: flex;
      flex-direction: row;
      gap: 0.25rem;
      align-items: center;
      font-size: 1.05rem;
      font-weight: 500;
      padding: 8px;
      width: 100%;
      box-sizing: border-box;
      justify-content: center;
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
