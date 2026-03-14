import {AfterViewInit, Component, inject, PLATFORM_ID} from '@angular/core';
import {TranslocoService} from '@jsverse/transloco';
import {isPlatformBrowser} from '@angular/common';
import { first } from "rxjs";
import {RouterOutlet} from '@angular/router';
import {LoadingSpinnerComponent} from '../../../shared/components/loading-spinner/loading-spinner.component';
import {HeaderComponent} from '../../components/header/header.component';
import {FooterComponent} from '../../components/footer/footer.component';

@Component({
  selector: 'app-main-layout',
  standalone: true,
  imports: [
    RouterOutlet,
    LoadingSpinnerComponent,
    HeaderComponent,
    FooterComponent
  ],
  templateUrl: './main-layout.component.html',
  styleUrl: './main-layout.component.scss',
})
export class MainLayoutComponent  implements AfterViewInit {
  private transloco = inject(TranslocoService);
  private platformId = inject(PLATFORM_ID);

  ngAfterViewInit() {
    if (isPlatformBrowser(this.platformId)) {
      this.transloco.langChanges$.pipe(first()).subscribe(() => {
        document.querySelector('.app-root')?.classList.remove('lang-loading');
      });
    }
  }
}
