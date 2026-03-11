import { Component } from '@angular/core';
import { inject } from '@angular/core';
import { MovieapiService } from '../../movieapi-service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-search',
  imports: [FormsModule],
  templateUrl: './search.html',
  styleUrl: './search.css',
})
export class Search {
  protected title: string="";
  protected movieapiservice = inject(MovieapiService);

  protected get(title:string){
    this.movieapiservice.getMovies(this.title);

    this.title='';
  }
}
