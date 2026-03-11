import { Routes } from '@angular/router';
import { Home } from './components/home/home';
import { Details } from './components/details/details';
import { About } from './components/about/about';

export const routes: Routes = [
    {path: '', component: Home},
    {path: 'about', component: About},
    {path: 'movie/:id', component:Details}
];


