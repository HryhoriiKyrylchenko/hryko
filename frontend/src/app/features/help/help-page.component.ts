import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslocoPipe } from '@jsverse/transloco';
import { HelpPageService } from '../../core/services/help-page.service';

@Component({
  selector: 'app-faq-page',
  standalone: true,
  imports: [CommonModule, TranslocoPipe],
  templateUrl: './help-page.component.html',
  styleUrls: ['./help-page.component.scss']
})
export class HelpPageComponent {
  private helpPageService = inject(HelpPageService);

  readonly page$ = this.helpPageService.getFaqPage();
}
