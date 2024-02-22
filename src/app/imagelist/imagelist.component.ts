import { SendimageService } from './../services/sendimage.service';
import { ImageserviceService } from '../services/imageservice.service';
import { AfterViewChecked, Component, HostListener, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Image } from '../interfaces/image-interface';
import { CommonModule, LocationStrategy } from '@angular/common';
import { BannerComponent } from '../components/banner/banner.component';
import { FooterComponent } from '../components/footer/footer.component';
import { Router, RouterModule } from '@angular/router';
import { SmbannerComponent } from '../components/smbanner/smbanner.component';
@Component({
  selector: 'app-imagelist',
  standalone: true,
  imports: [CommonModule, BannerComponent, FooterComponent,RouterModule],
  templateUrl: './imagelist.component.html',
  styleUrl: './imagelist.component.scss'
})
export class ImagelistComponent implements OnInit {
  loaded: boolean = false;
  tags: string[] = ['Kittens', 'Puppies', 'Forest', 'Beaches', 'Flags', 'Flowers', 'Romantic', 'Nature', 'Rome', 'Cartoons']
  subscription: Subscription;
  searchTerm: string = "";
  imageList: Image[] = [];
  isLoading: boolean = false;
  imagesPerPage: number = 20;
  imagesPerPage40: number = 20
  currentPage: number = 1;
  totalPages: number = 0;
  constructor(public imageservice: ImageserviceService, public Sendimage: SendimageService, public router: Router, private location: LocationStrategy) {
    this.subscription = this.imageservice.getSearchTerm().subscribe(data => {
      this.totalPages = 1
      this.searchTerm = data;
      this.getImages()
    })
   

  }
 
  loaded2() {
    this.loaded = true;
}

  openimage(id: number) {
    if (id != 0 && id != undefined) {
      this.Sendimage.sendImageInfo(id)
    
      this.router.navigate(['/imagefull'])
    }
    this.Sendimage.setError('image not found')
   
  
  }




  ngOnInit(): void {

    // this.imageservice.getAllPosts("").subscribe({
    //   next: (posts) => {
    //     this.image2 = posts.hits;
    //     console.log(posts);


    //   },
    //   error: (error) => {
    //     this.errorMessage = error;
    //   },
    // });
    this.getImages()
this.loaded = false

  }

  getImages() {
    this.imageList = []
    this.isLoading = true;
    this.loaded = false
    this.imageservice.getImages(this.searchTerm, this.imagesPerPage, this.currentPage).subscribe({
      next: (resultsData) => {

        if (resultsData.hits.length == 0) {
          
          this.isLoading = false;
          this.imageservice.setError('Oops, we could not find any results for "' + this.searchTerm + '"')
          return;
        }
       
        this.isLoading = false;
        this.totalPages = this.calculatePages(resultsData.totalHits);
        this.imageList = resultsData.hits;
       
        
        

      },
      error: (error) => {
        this.isLoading = false;
        this.imageservice.setError('oops something went wrong');
      }
    });

  }
  @HostListener('window:scroll', ['$event'])
  scroll() {
    let a = window.scrollY;
    let b = 500;
    if (a >= b) {
      return false

    } else {
      return true

    }
  }
  
  searchFromTag(tag: any) {
    this.router.navigate(['/Result'], {
      queryParams: { query: tag }

    })
  }

  calculatePages(total: number) {
    return Math.ceil(total / this.imagesPerPage)
  }

  movePage(number: number) {

    if (this.currentPage + number < 1 || this.currentPage + number > this.totalPages) {
      return
    }
    this.currentPage = this.currentPage + number;

    this.getImages()

  }

}
