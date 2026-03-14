import {Component, ElementRef, HostListener, inject, OnInit} from '@angular/core';
import {Router, RouterLink, RouterLinkActive} from '@angular/router';
import { CommonModule } from '@angular/common';
import {LanguageSwitcherComponent} from '../../../shared/components/language-switcher/language-switcher.component';
import {TranslocoPipe} from '@jsverse/transloco';
import {BREAKPOINTS} from '../../constants/breakpoints';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, RouterLink, RouterLinkActive, LanguageSwitcherComponent, TranslocoPipe],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  private router = inject(Router);
  private elementRef = inject(ElementRef);
  private isMobile = false;
  mobileMenuOpen = false;
  topicsOpen = false;

  ngOnInit(): void {
    this.router.events.subscribe(() => {
      this.closeMenus();
    });
  }

  toggleMobileMenu() {
    this.mobileMenuOpen = !this.mobileMenuOpen;
  }

  toggleTopics() {
    this.topicsOpen = !this.topicsOpen;
  }

  closeMenus() {
    this.mobileMenuOpen = false;
    this.topicsOpen = false;
  }

  @HostListener('window:resize')
  onResize() {
    const mobile = window.innerWidth <= BREAKPOINTS.sm;

    if (!mobile && this.isMobile) {
      this.mobileMenuOpen = false;
      this.topicsOpen = false;
    }

    this.isMobile = mobile;
  }

  @HostListener('document:click', ['$event'])
  handleClickOutside(event: MouseEvent) {

    const clickedInside = this.elementRef.nativeElement.contains(event.target);

    if (!clickedInside) {
      this.mobileMenuOpen = false;
      this.topicsOpen = false;
    }

  }
}
