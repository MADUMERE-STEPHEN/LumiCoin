import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CryptoService } from '../../services/crypto.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-exchanges-detail',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './exchanges-detail.component.html',
  styleUrls: ['./exchanges-detail.component.css']
})
export class ExchangesDetailComponent implements OnInit {
  exchangeId: string = '';
  exchange: any = null;
  headerName: string = 'Exchange Details';

  constructor(private route: ActivatedRoute, private cryptoService: CryptoService) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      this.exchangeId = params.get('id') || '';
      this.fetchExchangeDetails();
    });
  }

  fetchExchangeDetails(): void {
    if (this.exchangeId) {
      this.cryptoService.getCoinExchangeDetails(this.exchangeId).subscribe({
        next: (data) => {
          this.exchange = data;
        },
        error: (error) => {
          console.error('Error fetching exchange details:', error);
          this.exchange = null;
        }
      });
    }
  }

  goBack(): void {
    window.history.back();
  }
}
