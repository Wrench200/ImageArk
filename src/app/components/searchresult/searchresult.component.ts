import { query } from '@angular/animations';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { ImageserviceService } from '../../services/imageservice.service';
import { Image } from '../../interfaces/image-interface';
import { CommonModule } from '@angular/common';
import { FooterComponent } from '../footer/footer.component';
import { SmbannerComponent } from '../smbanner/smbanner.component';
import { ProfileimagePipe } from '../../interfaces/profileimage.pipe';
import { FormsModule } from '@angular/forms';

@Component({
  standalone: true,
  imports: [CommonModule, RouterModule, FooterComponent, SmbannerComponent, ProfileimagePipe, FormsModule],
  selector: 'app-searchresult',
  templateUrl: './searchresult.component.html',
  styleUrls: ['./searchresult.component.scss']
})
export class SearchresultComponent implements OnInit {
searchterm: any;
  ngOnInit(): void {
    this.getImages(this.query)
    this.activeroute.params.subscribe(routeParams => {
      this.getImages(this.query)
    });
  }
  query!: string
  imageList: Image[] = [];
  isLoading: boolean = false;
  imagesPerPage: number = 20;
  imagesPerPage40: number = 20
  currentPage: number = 1;
  totalPages: number = 0;
  loaded: boolean = false;
  
  constructor(public activeroute: ActivatedRoute, public imageservice: ImageserviceService, private router: Router) {
    this.activeroute.queryParams.subscribe(params => {
      this.query = params['query']
     

    })
  }
  getImages(query:string) {
    this.imageList = []
    this.isLoading = true;

    this.imageservice.getImages(query, this.imagesPerPage, this.currentPage).subscribe({
      next: (resultsData) => {

        if (resultsData.hits.length == 0) {

          this.isLoading = false;
          this.imageservice.setError('Oops, we could not find any results for "' + this.query + '"')
          return;
        }

        this.isLoading = false;
        this.totalPages = this.calculatePages(resultsData.totalHits);
        this.imageList = resultsData.hits;
        console.log();




      },
      error: (error) => {
        this.isLoading = false;
        this.imageservice.setError('oops something went wrong');
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

    this.getImages(this.query)

  }
  loaded2() {
    this.loaded = true;
  }
  getimage2(term: string) {
    this.router.navigate(['/Result'], {
      queryParams: { query: this.searchterm }

    })
    this.activeroute.params.subscribe(routeParams => {
      this.getImages(term)
    });
  }
}
