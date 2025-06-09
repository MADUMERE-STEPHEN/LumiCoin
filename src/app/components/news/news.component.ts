import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-news',
  imports: [CommonModule],
  templateUrl: './news.component.html',
  styleUrls: ['./news.component.css'] // <-- fix typo: styleUrls not styleUrl
})
export class NewsComponent implements OnInit {
  news: any[] = [];
  selectedCategory: string = 'All';
  categories: string[] = [
    'All', 'DeFi', 'Exchange Tokens', 'NFTs', 'Smart Contract Platforms', 'Gaming', 'Metaverse', 'Layer 2', 'Stablecoins', 'Privacy Coins', 'Web3', 'AI & ML', 'Social Tokens', 'Yield Farming', 'DAO', 'Cross-Chain', 'Others'
  ];

  ngOnInit(): void {
    this.fetchNews();
  }

  fetchNews(): void {
    // Simulate fetching news articles with images, source, summary, and date
    this.news = [
      {
        title: 'Crypto Market Hits New Highs',
        category: 'DeFi',
        url: 'https://cryptonews.com/article1',
        image: 'https://img.freepik.com/free-photo/3d-rendering-financial-neon-bull_23-2151691846.jpg?ga=GA1.1.1747427212.1733684529&semt=ais_hybrid&w=740',
        source: 'CryptoNews',
        published_at: new Date(),
        summary: 'The crypto market reached new all-time highs today, led by DeFi tokens and increased institutional interest.'
      },
      {
        title: 'NFT Sales Surge in Q3 2023',
        category: 'NFTs',
        url: 'https://cryptonews.com/article2',
        image: 'https://img.freepik.com/free-vector/digital-nft-non-fungible-token-background_1017-41191.jpg?ga=GA1.1.1747427212.1733684529&semt=ais_hybrid&w=740',
        source: 'NFT Times',
        published_at: new Date(),
        summary: 'NFT sales volume surged by 200% in the third quarter of 2023, with new collections breaking records.'
      },
      {
        title: 'New Layer 2 Solutions Launched',
        category: 'Layer 2',
        url: 'https://cryptonews.com/article3',
        image: 'https://img.freepik.com/premium-vector/crypto-currency-metal-icon-ethereum-design_88343-10210.jpg?ga=GA1.1.1747427212.1733684529&semt=ais_hybrid&w=740',
        source: 'Blockchain Today',
        published_at: new Date(),
        summary: 'Several new Layer 2 scaling solutions have launched, promising faster and cheaper transactions for users.'
      }
      // Add more articles as needed
    ];
  }

  onCategorySelect(category: string): void {
    this.selectedCategory = category;
    // Implement logic to filter or display news based on the selected category
  }
}
