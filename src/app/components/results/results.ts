import { Component } from '@angular/core';
import { inject } from '@angular/core';
import { MovieapiService } from '../../movieapi-service';
import {RouterLink } from '@angular/router';

@Component({
  selector: 'app-results',
  imports: [  RouterLink],
  templateUrl: './results.html',
  styleUrl: './results.css',
})
export class Results {
  movieService=inject(MovieapiService);

  protected previousPage(){
    this.movieService.previousPage();

  }

  protected nextPage(){
    this.movieService.nextPage();

  }
}


