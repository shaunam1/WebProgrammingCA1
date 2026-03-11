import { Injectable } from '@angular/core';
import { signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { inject } from '@angular/core';
import { take } from 'rxjs';
import {MovieDetails} from './models/moviedetails.interface'
import { SearchResults } from './models/moviedetails.interface';
import { MovieResults } from './models/moviedetails.interface';

@Injectable({
  providedIn: 'root',
})
export class MovieapiService {

  public movie = signal<MovieDetails | null>(null);

  public movies = signal <MovieResults[]>([]);

  public currentTitle = "";

  public total = signal<string|undefined>("");
  public totalAsNumber = 0;
  public pageNumber = 0;
  public minPages = signal<number>(1);
  public maxPages = signal<number>(0);
   public currentPage = signal<number>(1);

  private _baseUrl="https://www.omdbapi.com/";
  private _apiKey="75384599";

  private _http=inject(HttpClient);

  getMovie(imdbID: string){
    const url = this._baseUrl + "?i=" + imdbID + "&apikey=" + this._apiKey;

    this._http.get<MovieDetails>(url)
    .pipe(take(1))
    .subscribe(data => {
      this.movie.set(data);
      console.log(this.movies());
    })

  }

  getMovies(title:string){
    const url = this._baseUrl + "?s=" + title + "&page=" + this.currentPage() + "&apikey=" + this._apiKey;


    this._http.get<SearchResults>(url)
    .pipe(
      take(1)
    )
    .subscribe(data => {
      this.movies.set(data.Search);
      this.total.set(data.totalResults);
      console.log(this.movies());
      console.log(this.total());
      this.currentTitle = title;

      this.totalAsNumber = Number(this.total());

    if (this.totalAsNumber %10 == 0){
      this.maxPages.set(this.totalAsNumber / 10);
    }
    else{
      this.maxPages.set((Math.trunc(this.totalAsNumber / 10) + 1));
      
      console.log(this.maxPages());
    }
    })
  }


  nextPage(){
    if (this.currentPage() < this.maxPages()){
      this.pageNumber = this.currentPage();
      this.currentPage.set(this.pageNumber + 1);
      console.log(this.currentPage);
      this.getMovies(this.currentTitle);
      document.documentElement.scrollTop = 0;
    }

  }

  previousPage(){
    if (this.currentPage() > this.minPages()){
      this.pageNumber = this.currentPage();
      this.currentPage.set(this.pageNumber - 1);
      this.getMovies(this.currentTitle);
      document.documentElement.scrollTop = 0;
    }
  }



}
