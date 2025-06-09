import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { RouterOutlet } from '@angular/router';
import { NavbarComponent } from './components/navbar/navbar.component';
import { HeroComponent } from './components/hero/hero.component';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { HomeComponent } from './components/home/home.component';
import { NewsComponent } from './components/news/news.component';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Title, Meta } from '@angular/platform-browser';


@Component({
  selector: 'app-root',
  imports: [RouterOutlet, NavbarComponent,HomeComponent, NewsComponent, FormsModule, CommonModule],
  standalone: true,
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  schemas: [CUSTOM_ELEMENTS_SCHEMA], // Add this to allow custom elements
})
export class AppComponent implements  OnInit{
  title = 'LumiCoin';

  constructor(private router: Router, private titles: Title, private meta: Meta) {
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    });
  }



  ngOnInit() {
  this.titles.setTitle('LumiCoin – Live Crypto Prices & Market Data');
  this.meta.updateTag({ name: 'description', content: 'Track trending coins, top gainers, and losers with live data from CoinGecko on LumiCoin.' });
  this.meta.addTags([
  { name: 'keywords', content: 'Crypto, Cryptocurrency, Bitcoin, Ethereum, Coin Tracker, CoinGecko, LumiCoin' },
  { name: 'author', content: 'Stephen JR' },
  { name: 'robots', content: 'index, follow' },
  { name: 'theme-color', content: '#0d0d0d' }
]);

}
    alertMessage: string = '';
  alertType: 'error' | 'info' = 'error';



  showAlert(message: string, type: 'error' | 'info' = 'error') {
    this.alertMessage = message;
    this.alertType = type;
    setTimeout(() => this.closeAlert(), 5000); // Auto-close after 5s
  }

  closeAlert() {
    this.alertMessage = '';
  }
}
