import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface FaqQuestion {
  q: string;
  a: string;
  open?: boolean;
}

export interface FaqSection {
  title: string;
  questions: FaqQuestion[];
}

export interface FaqPageData {
  page_title: string;
  page_description: string;
  sections: FaqSection[];
}

@Injectable({ providedIn: 'root' })
export class HelpPageService {
  private http = inject(HttpClient);
  private readonly faqUrl = 'assets/pages/help.json';

  getFaqPage(): Observable<FaqPageData> {
    return this.http.get<FaqPageData>(this.faqUrl);
  }
}
