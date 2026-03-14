import {Component} from '@angular/core';
import {TranslocoPipe} from '@jsverse/transloco';
import {BackToTopComponent} from '../../../shared/components/back-to-top/back-to-top.component';
import {RouterLink} from '@angular/router';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [
    TranslocoPipe,
    BackToTopComponent,
    RouterLink
  ],
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent {
  currentYear = new Date().getFullYear();
}
