import { css, html, LitElement } from "lit";
import { customElement, property } from "lit/decorators.js";
import shareIcon from "../../assets/share-icon.svg?raw";
import undoIcon from "../../assets/undo-icon.svg?raw";
import saveIcon from "../../assets/save-icon.svg?raw";
import copyIcon from "../../assets/copy-icon.svg?raw";
import tickIcon from "../../assets/tick-icon.svg?raw";
import { unsafeHTML } from "lit/directives/unsafe-html.js";
import telegramIcon from "../../assets/telegram-icon.svg?raw";
import homeIcon from "../../assets/home-icon.svg?raw";
import githubIcon from "../../assets/github-icon.svg?raw";
import enFlag from "flag-icons/flags/4x3/gb.svg?raw";
import ruFlag from "flag-icons/flags/4x3/ru.svg?raw";
import uzFlag from "flag-icons/flags/4x3/uz.svg?raw";

export type IconName = keyof typeof CaIcon.mapping;

/**
 * An icon.
 */
@customElement("ca-icon")
export default class CaIcon extends LitElement {
  @property()
  name!: IconName;

  static mapping: Record<string, string> = {
    undo: undoIcon,
    share: shareIcon,
    save: saveIcon,
    copy: copyIcon,
    tick: tickIcon,
    telegram: telegramIcon,
    home: homeIcon,
    github: githubIcon,
    enFlag: enFlag,
    ruFlag: ruFlag,
    uzFlag: uzFlag,
  };

  render() {
    if (!CaIcon.mapping[this.name]) {
      throw new Error(`Icon does not exist: ${this.name}`);
    }

    return html` <span>${unsafeHTML(CaIcon.mapping[this.name])}</span> `;
  }

  static styles = css`
    :host {
      height: 1em;
    }

    span {
      display: inline-block;
      height: 1em;
    }

    svg {
      height: 1em;
    }
  `;
}
