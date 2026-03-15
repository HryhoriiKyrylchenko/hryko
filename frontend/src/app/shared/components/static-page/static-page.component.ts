import {Component, inject} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import {TranslocoPipe} from '@jsverse/transloco';
import {PageData, PageService} from '../../../core/services/page.service';
import {map, Observable, switchMap} from 'rxjs';
import {AsyncPipe} from '@angular/common';

@Component({
  selector: 'app-static-page',
  templateUrl: './static-page.component.html',
  imports: [
    TranslocoPipe,
    AsyncPipe
  ],
  styleUrls: ['./static-page.component.scss']
})
export class StaticPageComponent {
  private route = inject(ActivatedRoute);
  private pageService = inject(PageService);

  readonly pageData$: Observable<PageData> = this.route.data.pipe(
    switchMap(data => {
      const page = data['page'] as 'cookies' | 'terms' | 'privacy' | 'contact';
      return this.pageService.getPage(page);
    })
  );

  readonly keyTitle$ = this.route.data.pipe(
    map(data => `${data['page'] as 'cookies' | 'terms' | 'privacy' | 'contact'}.page_title`)
  );
}
