import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslocoPipe } from '@jsverse/transloco';
import { AboutPageService } from '../../core/services/about-page.service';

@Component({
  selector: 'app-about',
  standalone: true,
  imports: [CommonModule, TranslocoPipe],
  templateUrl: './about.component.html',
  styleUrl: './about.component.scss'
})
export class AboutComponent {

  private aboutService = inject(AboutPageService);

  readonly page$ = this.aboutService.getPage();

}
