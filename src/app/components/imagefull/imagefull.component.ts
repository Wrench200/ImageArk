
import { CommonModule } from '@angular/common';
import { Subscription } from 'rxjs';
import { Image } from '../../interfaces/image-interface';
import { SendimageService } from './../../services/sendimage.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-imagefull',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './imagefull.component.html',
  styleUrl: './imagefull.component.scss'
})
export class ImagefullComponent implements OnInit{
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
    pageURL:'',
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
  constructor(public Sendimage: SendimageService ,public activeroute : ActivatedRoute ) {
    

  
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
       
      }
    })
 }
}
