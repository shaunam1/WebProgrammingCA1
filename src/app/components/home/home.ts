import { Component } from '@angular/core';
import { Results } from '../results/results';
import { Search } from '../search/search';

@Component({
  selector: 'app-home',
  imports: [Results, Search],
  templateUrl: './home.html',
  styleUrl: './home.css',
})
export class Home {}
