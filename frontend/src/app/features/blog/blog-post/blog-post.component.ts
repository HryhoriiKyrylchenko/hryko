import { Component, inject } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import {TranslocoModule, TranslocoService} from "@jsverse/transloco";
import {BlogService} from '../../../core/services/blog.service';
import {BlogPost} from '../../../core/models/blog-post.model';
import {MarkdownComponent} from 'ngx-markdown';
import {toSignal} from '@angular/core/rxjs-interop';
import {catchError, combineLatest, filter, of, startWith, switchMap} from 'rxjs';

@Component({
  selector: "app-blog-post",
  standalone: true,
  imports: [TranslocoModule, MarkdownComponent],
  templateUrl: "./blog-post.component.html",
  styleUrl: './blog-post.component.scss'
})
export class BlogPostComponent {
  private route = inject(ActivatedRoute);
  private blogService = inject(BlogService);
  private translocoService = inject(TranslocoService);

  private currentLang$ = this.translocoService.langChanges$.pipe(
    startWith(this.translocoService.getActiveLang())
  );

  post = toSignal(
    combineLatest([
      this.route.queryParamMap,
      this.currentLang$,
    ]).pipe(
      filter(([params]) => !!params.get('slug')),
      switchMap(([params, lang]) => {
        console.log('slug:', params.get('slug'), 'lang:', lang);
        return this.blogService.getPost(params.get('slug')!, lang ?? 'en').pipe(
          catchError((err) => {
            console.error('getPost error:', err);
            return of(null);
          })
        );
      })
    ),
    { initialValue: null as BlogPost | null }
  );
}
