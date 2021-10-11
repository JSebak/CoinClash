import { Component, OnInit } from '@angular/core';
import { CoinModel, NewsModel } from 'src/app/Models/coin.models';
import { CoinService } from 'src/app/Services/coin.service';

@Component({
  selector: 'news',
  templateUrl: './news.component.html',
  styleUrls: ['./news.component.css'],
})
export class NewsSection implements OnInit {
  news: NewsModel[] = [];
  coin = new CoinModel();

  constructor(private coinService: CoinService) {}
  ngOnInit(): void {
    this.getNews();
    this.getCoin('bitcoin');
  }

  getNews() {
    this.coinService.getNews().subscribe((result) => {
      let entries = Object.keys(result).map((r) => result[r]);
      this.news = entries[0];
    });
  }
  getCoin(coinId: string) {
    this.coinService.getCoinByName(coinId, '').subscribe((r) => {
      let entries = Object.keys(r).map((a) => r[a])[0];
      this.coin = entries[0];
    });
  }
}
