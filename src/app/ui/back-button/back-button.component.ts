import { Component, Input } from '@angular/core';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'back-button',
  templateUrl: './back-button.component.html',
  styleUrls: ['./back-button.component.scss']
})
export class BackButtonComponent {
  public arrowIcon = faArrowLeft;
  @Input() link: string;
}
