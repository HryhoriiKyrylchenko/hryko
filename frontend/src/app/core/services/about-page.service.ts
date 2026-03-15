import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { AboutPageData } from '../models/about-page.model';
import {ABOUT_PAGE_DATA} from '../../../assets/pages/about-page.data';

@Injectable({
  providedIn: 'root'
})
export class AboutPageService {
  getPage(): Observable<AboutPageData> {
    return of(ABOUT_PAGE_DATA);
  }
}
