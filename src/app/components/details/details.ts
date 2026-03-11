import { Component, input } from '@angular/core';
import { inject } from '@angular/core';
import { MovieapiService } from '../../movieapi-service';

@Component({
  selector: 'app-details',
  imports: [],
  templateUrl: './details.html',
  styleUrl: './details.css',
})
export class Details {
  movieService=inject(MovieapiService);

  protected id = input.required<string>();

  ngOnInit(){
    let movieID=this.id();
    this.movieService.getMovie(movieID);
  }
}
