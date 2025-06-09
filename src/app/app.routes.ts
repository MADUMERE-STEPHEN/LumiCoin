import { Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { CoinDetailsComponent } from './pages/coin-details/coin-details.component';
import { CategoriesComponent } from './pages/categories/categories.component';
import { CategoryDetailComponent } from './pages/category-detail/category-detail.component';
import { ExchangesComponent } from './pages/exchanges/exchanges.component';
import { ExchangesDetailComponent } from './pages/exchanges-detail/exchanges-detail.component';
import { SearchComponent } from './pages/search/search.component';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'coin/:id', component: CoinDetailsComponent },
  { path: 'categories', component: CategoriesComponent },
  { path: 'categories/:id', component: CategoryDetailComponent },
  { path: 'exchanges', component: ExchangesComponent },
  { path: 'exchange/:id', component: ExchangesDetailComponent },
  { path: 'search', component: SearchComponent }
  // ...add more as needed
];
