import { ReactiveController, ReactiveControllerHost } from "lit";
import { Locale } from "../data/locales";

export class LocaleController implements ReactiveController {
  host: ReactiveControllerHost;

  private static _locale: Locale;
  private static allHosts: ReactiveControllerHost[] = [];

  constructor(host: ReactiveControllerHost) {
    this.host = host;
    host.addController(this);
  }

  static setLocale(locale: Locale) {
    LocaleController._locale = locale;
    for (const host of LocaleController.allHosts) {
      host.requestUpdate();
    }
    localStorage.setItem("lang", locale);
    document.documentElement.setAttribute("lang", locale);
  }

  get locale(): Locale {
    return LocaleController._locale;
  }

  t(obj: Record<Locale, string>) {
    const locale = LocaleController._locale;

    return obj[locale];
  }

  hostConnected() {
    LocaleController.allHosts.push(this.host);
  }

  hostDisconnected() {
    LocaleController.allHosts = LocaleController.allHosts.filter(
      (host) => host !== this.host
    );
  }
}
