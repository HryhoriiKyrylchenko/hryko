import {Component, inject, OnInit, signal} from "@angular/core";
import {ActivatedRoute, RouterLink} from "@angular/router";
import {TranslocoModule, TranslocoService} from "@jsverse/transloco";
import {BlogService} from '../../../core/services/blog.service';
import {BlogPostMeta} from '../../../core/models/blog-post.model';
import {toObservable, toSignal} from '@angular/core/rxjs-interop';
import {combineLatest, switchMap} from 'rxjs';

@Component({
  selector: "app-blog-list",
  standalone: true,
  imports: [RouterLink, TranslocoModule],
  templateUrl: "./blog-list.component.html",
  styleUrl: './blog-list.component.scss'
})
export class BlogListComponent implements OnInit  {
  private translocoService = inject(TranslocoService);
  private blogService = inject(BlogService);
  private route = inject(ActivatedRoute);

  category = signal<string | undefined>(undefined);

  private currentLang = toSignal(this.translocoService.langChanges$, {
    initialValue: this.translocoService.getActiveLang()
  });

  private posts$ = combineLatest([
    toObservable(this.category),
    toObservable(this.currentLang),
  ]).pipe(
    switchMap(([category, lang]) =>
      this.blogService.getPostsByLang(category, lang ?? 'en')
    )
  );

  posts = toSignal(this.posts$, { initialValue: [] as BlogPostMeta[] });

  ngOnInit(): void {
    this.route.queryParamMap.subscribe(params => {
      const categoryParam = params.get('category');
      this.category.set(categoryParam || undefined);
    });
  }
}
