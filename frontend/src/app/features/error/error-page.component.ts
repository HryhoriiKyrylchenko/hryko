import {Component, inject, OnInit} from '@angular/core';
import { RouterLink } from '@angular/router';
import { TranslocoPipe } from '@jsverse/transloco';
import {Title} from '@angular/platform-browser';

@Component({
  selector: 'app-error-page',
  standalone: true,
  imports: [RouterLink, TranslocoPipe],
  templateUrl: './error-page.component.html',
  styleUrls: ['./error-page.component.scss']
})
export class ErrorPageComponent implements OnInit {
  private title = inject(Title);

  ngOnInit(): void {
    this.title.setTitle('404 — Page not found');
  }
}
