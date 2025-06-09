import { Component, OnInit } from '@angular/core';
import { CryptoService } from '../../services/crypto.service';
import { CommonModule } from '@angular/common';
import { RouterLink, RouterModule } from '@angular/router';

@Component({
  selector: 'app-exchanges',
  standalone: true,
  imports: [CommonModule, RouterLink, RouterModule],
  templateUrl: './exchanges.component.html',
  styleUrls: ['./exchanges.component.css'] // <-- fix: should be styleUrls, not styleUrl
})
export class ExchangesComponent implements OnInit {
  exchanges: any[] = [];
  headerName: string = 'Exchanges';

  constructor(private cryptoService: CryptoService) {}

  ngOnInit(): void {
    this.fetchExchanges();
  }

  fetchExchanges(): void {
    this.cryptoService.getCoinExchangesList().subscribe({
      next: (data) => {
        this.exchanges = Array.isArray(data) ? data : [];
      },
      error: (error) => {
        console.error('Error fetching exchanges:', error);
        this.exchanges = [];
      }
    });
  }

  goBack(): void {
    window.history.back();
  }
}
