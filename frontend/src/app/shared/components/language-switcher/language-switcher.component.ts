import {
  Component,
  HostListener,
  inject,
  signal
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslocoService } from '@jsverse/transloco';
import {SUPPORTED_LANG_CODES, SUPPORTED_LANGUAGES, DEFAULT_LANG} from '../../../../config/languages.config';


@Component({
  selector: 'app-language-switcher',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './language-switcher.component.html',
  styleUrl: './language-switcher.component.scss'
})
export class LanguageSwitcherComponent {

  private transloco = inject(TranslocoService);

  languages = SUPPORTED_LANGUAGES;

  isOpen = signal(false);
  currentLang = signal(this.getInitialLang());

  constructor() {
    this.transloco.setActiveLang(this.currentLang());
    document.documentElement.lang = this.currentLang();
  }

  private getInitialLang(): string {

    const saved = localStorage.getItem('preferred-language');

    if (saved && SUPPORTED_LANG_CODES.includes(saved)) {
      return saved;
    }

    return DEFAULT_LANG;
  }

  toggleMenu() {
    this.isOpen.update(v => !v);
  }

  selectLanguage(code: string) {

    this.transloco.setActiveLang(code);
    this.currentLang.set(code);

    localStorage.setItem('preferred-language', code);
    document.documentElement.lang = code;

    this.isOpen.set(false);
  }

  isActive(code: string) {
    return this.currentLang() === code;
  }

  getLanguageName(code: string) {
    return this.languages.find(l => l.code === code)?.name ?? code;
  }

  @HostListener('document:click', ['$event'])
  closeOutside(event: MouseEvent) {

    const target = event.target as HTMLElement;

    if (!target.closest('.lang-switcher-container')) {
      this.isOpen.set(false);
    }
  }

}
