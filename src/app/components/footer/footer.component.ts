import { Component } from '@angular/core';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.scss'
})
export class FooterComponent {
  get_date(): number {
    const date = new Date()
    const year = date.getUTCFullYear()
    return year
  }
}
