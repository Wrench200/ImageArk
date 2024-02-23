
import { CommonModule } from '@angular/common';
import { Subscription } from 'rxjs';
import { Image } from '../../interfaces/image-interface';
import { SendimageService } from './../../services/sendimage.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { ImageserviceService } from '../../services/imageservice.service';
import { SmbannerComponent } from '../smbanner/smbanner.component';
import { FooterComponent } from '../footer/footer.component';
import { ProfileimagePipe } from '../../interfaces/profileimage.pipe';

@Component({
  selector: 'app-imagefull',
  standalone: true,
  imports: [CommonModule, RouterModule,SmbannerComponent,FooterComponent,ProfileimagePipe],
  templateUrl: './imagefull.component.html',
  styleUrl: './imagefull.component.scss'
})
export class ImagefullComponent implements OnInit {
  imagelist: Image = {
    collections: 0,
    comments: 0,
    downloads: 0,
    id: 0,
    imageHeight: 0,
    imageSize: 0,
    imageWidth: 0,
    largeImageURL: '',
    likes: 0,
    pageURL: '',
    previewHeight: 0,
    previewURL: '',
    previewWidth: 0,
    tags: '',
    type: '',
    user: 'adad',
    userImageURL: 'ada',
    user_id: 0,
    views: 0,
    webformatHeight: 0,
    webformatURL: '',
    webformatWidth: 0,
  }
  // subscription: Subscription;
  imageid: string | null = null
  relatedList: Image[] = []

  isLoading: boolean = false;
  imagesPerPage: number = 20;
  imagesPerPage40: number = 20
  currentPage: number = 1;
  totalPages: number = 0;
  loaded: boolean = false;
  constructor(public Sendimage: SendimageService, public getimage: ImageserviceService, public activeroute: ActivatedRoute) {



  }
  getid() {
    this.activeroute.paramMap.subscribe(paramMap => {
      this.imageid = paramMap.get('id')


    })
  }

  ngOnInit(): void {
    this.getImage()
    
  }
  getImage() {
    this.getid()
    console.log(this.imageid);



    this.Sendimage.getimage(this.imageid).subscribe({
      next: (result) => {
        if (result.hits.length == 0) {
          this.Sendimage.setError('oops we could not find your image')
          return
        }
        this.imagelist = result.hits[0]


        this.getrelated(result.hits[0].tags)
      }
    })
  }
  getrelated(tags: string) {
    this.relatedList = []
    this.isLoading = true;
console.log(tags);

    this.getimage.getImages(tags, this.imagesPerPage, this.currentPage).subscribe({
      next: (resultsData) => {

        if (resultsData.hits.length == 0) {

          this.isLoading = false;
          this.getimage.setError('Oops, we could not find any results for "' + tags + '"')
          return;
        }

        this.isLoading = false;
        this.totalPages = this.calculatePages(resultsData.totalHits);
        this.relatedList = resultsData.hits;
        




      },
      error: (error) => {
        this.isLoading = false;
        this.getimage.setError('oops something went wrong');
      }
    });

  }

  calculatePages(total: number) {
    return Math.ceil(total / this.imagesPerPage)
  }
  movePage(number: number) {
  
    if (this.currentPage + number < 1 || this.currentPage + number > this.totalPages) {
      return
    }
    this.currentPage = this.currentPage + number;
  
    this.getrelated(this.imagelist.tags)
  
  }
  loaded2() {
    this.loaded = true;
  }
}


