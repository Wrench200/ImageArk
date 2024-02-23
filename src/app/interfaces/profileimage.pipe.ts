import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'profileimage',
  standalone: true
})
export class ProfileimagePipe implements PipeTransform {

  transform(value:string): string {
    if (value.length == 0) {
     return  "assets/arkprofile.png";
    } else {
      return value
   }
  }

}
