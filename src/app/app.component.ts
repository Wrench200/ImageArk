import { BannerComponent } from './components/banner/banner.component';
import { ImagelistComponent } from './imagelist/imagelist.component';
import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { RouterModule } from '@angular/router';
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, ImagelistComponent, BannerComponent,],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'ImageArk';
}
