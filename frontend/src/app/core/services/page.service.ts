import {inject, Injectable} from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface PageSection {
  title: string;
  paragraphs: string[];
}

export interface PageData {
  sections: PageSection[];
}

@Injectable({ providedIn: 'root' })
export class PageService {
  private http = inject(HttpClient);

  getPage(page: 'cookies' | 'terms' | 'privacy' | 'contact'): Observable<PageData> {
    return this.http.get<PageData>(`assets/pages/${page}.json`);
  }
}
