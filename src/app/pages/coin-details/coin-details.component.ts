import { Component, OnInit, AfterViewChecked, ViewChild, ElementRef } from '@angular/core';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { CryptoService } from '../../services/crypto.service';
import { CommonModule } from '@angular/common';
import { Location } from '@angular/common';
import { AlertService } from '../../services/alert.service';

@Component({
  selector: 'app-coin-details',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './coin-details.component.html',
  styleUrls: ['./coin-details.component.css']
})
export class CoinDetailsComponent implements OnInit, AfterViewChecked {
  coinId: string = '';
  coin: any = null;
  loading = true;
  chartData: number[] = [];
  chartLabels: string[] = [];
  chart: any = null;
  @ViewChild('coinChart') coinChartRef!: ElementRef<HTMLCanvasElement>;

  constructor(
    private route: ActivatedRoute,
    private crypto: CryptoService,
    private location: Location,
    private alertService: AlertService
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      this.coinId = params.get('id') || '';
      if (this.coinId) {
        this.loading = true;
        this.crypto.getCoinDetails(this.coinId).subscribe({
          next: (data) => {
            this.coin = data;
            this.loading = false;
          },
          error: (err) => {
            this.coin = null;
            this.loading = false;
            if (err.status === 429) {
              this.alertService.showAlert('Too Many Requests. Please wait and try again.', 'error');
            } else {
              this.alertService.showAlert('Something went wrong!', 'error');
            }
          }
        });
        // Fetch chart data (last 7 days)
        this.crypto.getCoinMarketChart(this.coinId, 'usd', 7).subscribe({
          next: (data: any) => {
            this.chartLabels = data.prices.map((p: any) =>
              new Date(p[0]).toLocaleDateString()
            );
            this.chartData = data.prices.map((p: any) => p[1]);
          },
          error: (err) => {
            if (err.status === 429) {
              this.alertService.showAlert('Too Many Requests. Please wait and try again.', 'error');
            } else {
              this.alertService.showAlert('Failed to load chart data.', 'error');
            }
          }
        });
      }
    });

    this.crypto.getTrending().subscribe({
      next: (res) => { /* ... */ },
      error: (err) => {
        if (err.status === 429) {
          this.alertService.showAlert('Too Many Requests. Please wait and try again.', 'error');
        } else {
          this.alertService.showAlert('Failed to load trending coins.', 'error');
        }
      }
    });
  }

  ngAfterViewChecked(): void {
    // Only render the chart if data and canvas are ready and it hasn't been rendered yet
    if (this.chartData.length && this.coinChartRef && !this.chart) {
      this.renderChart();
    }
  }

  renderChart() {
    const canvas = this.coinChartRef?.nativeElement;
    if (!canvas) return;
    if (this.chart) {
      this.chart.destroy();
    }
    // @ts-ignore
    this.chart = new window.Chart(canvas, {
      type: 'line',
      data: {
        labels: this.chartLabels,
        datasets: [{
          label: 'Price (USD)',
          data: this.chartData,
          borderColor: '#a259ff',
          backgroundColor: 'rgba(162,89,255,0.1)',
          fill: true,
          tension: 0.3
        }]
      },
      options: {
        responsive: true,
        plugins: {
          legend: { display: false }
        }
      }
    });
  }

  goBack() {
    this.location.back();
  }
}
