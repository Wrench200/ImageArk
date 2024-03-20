import { SearchresultComponent } from './../searchresult/searchresult.component';

import { Router, RouterModule } from '@angular/router';
import { Component, HostListener } from '@angular/core';
import { ImageserviceService } from '../../services/imageservice.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';


@Component({
  selector: 'app-smbanner',
  standalone: true,
  imports: [CommonModule,RouterModule,FormsModule, SearchresultComponent ],
  templateUrl: './smbanner.component.html',
  styleUrl: './smbanner.component.scss'
})
export class SmbannerComponent {
  placeholdersStrings: string[] = [
    "Try something, like 'Kittens'",
    "Try something, like 'Puppies'",
    "Try something, like 'Forest'",
    "Try something, like 'Beaches'",
    "Try something, like 'Flags'",
    "Try something, like 'Flowers'",
    "Try something, like 'Romantic'",
    "Try something, like 'Sepia'",
    "Try something, like 'Nature'",
    "Try something, like 'Rome'",
    "Try something, like 'USA'",
    "Try something, like 'Cartoons'",
    "Try something, like 'LOL'",
  ];

  pickedText: string = this.placeholder()

  constructor(private imageservice: ImageserviceService,private router: Router) { }
  searchterm:string =''
 
  @HostListener('window:scroll', ['$event'])
  scroll() {
    let a = window.scrollY;
    let b = 310;
    if (a >= b) {
      return false

    } else {
      return true

    }
  }
  sendSearchInfo() {
    if (this.searchterm.length == 0) {
      this.imageservice.setError('Please add a search term')
      return;
    }

    this.router.navigate(['/Result'], {
      queryParams: { query: this.searchterm }
      
    })
    
    
    



  }

  placeholder() {
    return this.placeholdersStrings[Math.floor(Math.random() * this.placeholdersStrings.length)]
  }
 
}
