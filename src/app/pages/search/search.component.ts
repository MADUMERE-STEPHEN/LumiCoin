import { Component } from '@angular/core';
import { CryptoService } from '../../services/crypto.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-search',
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './search.component.html',
  styleUrl: './search.component.css'
})
export class SearchComponent {
  searchTerm: string = '';
  searchResults: any[] = [];
  searching: boolean = false;

  constructor(private cryptoService: CryptoService) {}

  onSearch() {
    if (!this.searchTerm.trim()) {
      this.searchResults = [];
      return;
    }
    this.searching = true;
    this.cryptoService.getSearchResults(this.searchTerm).subscribe({
      next: (res: any) => {
        this.searchResults = res.coins || [];
        this.searching = false;
      },
      error: () => {
        this.searchResults = [];
        this.searching = false;
      }
    });
  }

  
  goBack(): void {
    window.history.back();
  }
}

