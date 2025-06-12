import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink, RouterModule } from '@angular/router';

@Component({
  selector: 'app-categories',
  imports: [RouterLink, CommonModule, FormsModule, RouterModule],
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.css'] // <-- FIXED HERE
})
export class CategoriesComponent implements OnInit {
  categories = [
    { name: 'DeFi', category_id: 'decentralized-finance-defi', headerName: 'DeFi' },
    { name: 'NFTs', category_id: 'non-fungible-tokens-nft', headerName: 'NFTs' },
    { name: 'Gaming', category_id: 'gaming', headerName: 'Gaming' },
    { name: 'Metaverse', category_id: 'metaverse' , headerName: 'Metaverse' },
    { name: 'Layer 2', category_id: 'layer-2', headerName: 'Layer 2' },
    { name: 'Stablecoins', category_id: 'stablecoins', headerName: 'Stablecoins' },
    { name: 'Privacy Coins', category_id: 'privacy-coins', headerName: 'Privacy Coins' },
    { name: 'Web3', category_id: 'web3', headerName: 'Web3' },
    { name: 'AI & ML', category_id: 'ai-big-data', headerName: 'AI & ML' },
    { name: 'Social Tokens', category_id: 'social-tokens', headerName: 'Social Tokens' },
    { name: 'Yield Farming', category_id: 'yield-farming', headerName: 'Yield Farming' },
    { name: 'DAO', category_id: 'decentralized-autonomous-organizations-dao', headerName: 'DAO' },
    { name: 'Cross-Chain', category_id: 'cross-chain-bridges', headerName: 'Cross-Chain' },
    { name: 'Others', category_id: 'others', headerName: 'Others' },
    // ...add more using real category_id from CoinGecko
  ];
  selectedCategory: string = 'All';

  goBack() {
    window.history.back();
  }

  ngOnInit(): void {
    console.log('Available categories:', this.categories);
  }

  onCategorySelect(category: string): void {
    this.selectedCategory = category;
    console.log(`Selected category: ${this.selectedCategory}`);
    // Implement logic to filter or display coins based on the selected category
  }

}
