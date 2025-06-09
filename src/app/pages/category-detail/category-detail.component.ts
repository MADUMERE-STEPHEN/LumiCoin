import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, ActivatedRoute } from '@angular/router';
import { CryptoService } from '../../services/crypto.service';

@Component({
  selector: 'app-category-detail',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './category-detail.component.html',
  styleUrls: ['./category-detail.component.css']
})
export class CategoryDetailComponent implements OnInit {
  categoryName: string = '';
  coins: any[] = [];
  // Add this property to fix the template error
  headerName: string = '';

  constructor(private route: ActivatedRoute, private crypto: CryptoService) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      this.categoryName = params.get('id') || 'Category';
      // Fetch coins for this category
      this.crypto.getCoinCategoryCoins(this.categoryName).subscribe({
        next: (res: any) => {
          this.coins = res || [];
          if (!this.coins.length) {
            // Optionally show a "No coins found" message
          }
        },
        error: (err) => {
          console.error('Error fetching coins for category:', err);
          this.coins = [];
          // Optionally show a "No coins found" message
        }
      });
    });
  }

  goBack(): void {
    window.history.back();
  }
}
