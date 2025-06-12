import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CryptoService } from '../../services/crypto.service';
import { CommonModule } from '@angular/common';
import { AlertService } from '../../services/alert.service'; // adjust path

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
  alertMessage: string = '';
  alertType: string = '';

  constructor(private route: ActivatedRoute, private cryptoService: CryptoService, private alertService: AlertService) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      this.exchangeId = params.get('id') || '';
      this.fetchExchangeDetails();
    });

    this.alertService.alert$.subscribe(alert => {
      this.alertMessage = alert.message;
      this.alertType = alert.type;
      setTimeout(() => this.closeAlert(), 5000);
    });

    // TEST: Show an alert on load
    this.alertService.showAlert('Test alert! If you see this, alerts work.', 'info');
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
          this.alertService.showAlert('Something went wrong!', 'error');
        }
      });
    }

    this.cryptoService.getTrending().subscribe({
      next: (res) => { /* ... */ },
      error: (err) => {
        this.alertService.showAlert('Failed to load trending coins.', 'error');
      }
    });
  }

  closeAlert() {
    this.alertMessage = '';
    this.alertType = '';
  }

  goBack(): void {
    window.history.back();
  }
}
