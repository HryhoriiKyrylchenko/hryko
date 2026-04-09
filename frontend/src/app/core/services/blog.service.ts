import {inject, Injectable} from '@angular/core';
import {BlogPost, BlogPostMeta} from "../models/blog-post.model";
import {map, Observable, shareReplay, switchMap} from "rxjs";
import {HttpClient} from '@angular/common/http';
import fm from 'front-matter';
import {marked} from 'marked';

@Injectable({ providedIn: 'root' })
export class BlogService {
  private http = inject(HttpClient);

  private postsCache$ = this.http.get<BlogPostMeta[]>('/assets/generated/blog-index.json').pipe(
    shareReplay(1)
  );

  getPosts(): Observable<BlogPostMeta[]> {
    return this.postsCache$;
  }

  getPostsByLang(category: string | undefined, lang: string): Observable<BlogPostMeta[]> {
    return this.getPosts().pipe(
      map(posts => {
        let filtered = posts.filter(p => p.lang === lang);

        if (category) {
          filtered = filtered.filter(p => p.categories.includes(category));
        }

        return filtered;
      })
    );
  }

  getPost(slug: string, lang: string): Observable<BlogPost> {
    return this.postsCache$.pipe(
      map(posts => {
        const meta = posts.find(p => p.slug === slug && p.lang === lang);
        if (!meta) {
          throw new Error(`Post not found: ${slug} in ${lang}`);
        }
        return meta;
      }),
      switchMap(meta => {
        const assetPath = `/assets/content/${meta.path}`;
        return this.http.get(assetPath, { responseType: 'text' }).pipe(
          switchMap(async raw => {
            const { body: content, attributes: data } = fm<Record<string, any>>(raw);
            const parsedContent = await marked.parse(content);

            return {
              ...meta,
              content: parsedContent,
              ...data
            } as BlogPost;
          })
        );
      })
    );
  }
}
