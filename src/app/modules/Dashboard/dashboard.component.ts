import { Component } from '@angular/core';
import { CoinModel } from 'src/app/Models/coin.models';
import { debounceTime } from 'rxjs/operators';

import { CoinService } from 'src/app/Services/coin.service';

@Component({
  selector: 'dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class dashboard {
  coins: CoinModel[] = [];
  data: CoinModel[];
  config = {
    itemsPerPage: 10,
    currentPage: 1,
    totalItems: 0,
    color: '#ffffff',
  };

  searchResults: CoinModel[];
  spinner: boolean = false;
  isSearch: boolean = false;
  total: number;
  debounceTime: number = 0;
  search: string;
  /**
   *
   */
  constructor(private coinService: CoinService) {}
  ngOnInit(): void {
    this.spinner = true;
    this.Bring();
  }

  Bring(offset: number = 0, name: string = ''): void {
    var offs = offset.toString();
    this.coinService.getCoins('', offs).subscribe((response) => {
      let entries = Object.keys(response).map((r) => response[r]);
      if (this.coins.length == 0) this.coins = entries[0];
      else {
        this.coins = this.coins.concat(entries[0]);
      }
      this.config.totalItems = this.coins.length;
      this.spinner = false;
    });
  }

  handlePageChange(event): void {
    this.config.currentPage = event;
    let eigthty = this.config.totalItems * 0.8;
    if (
      this.config.currentPage * this.config.itemsPerPage >= eigthty &&
      !this.isSearch
    ) {
      this.spinner = true;
      this.Bring(this.config.totalItems);
    } else if (
      this.config.currentPage * this.config.itemsPerPage >= this.coins.length &&
      this.isSearch &&
      this.coins.length < this.total
    ) {
      this.spinner = true;
      this.bringByName(this.config.totalItems);
    }
  }

  filter() {
    this.spinner = true;
    this.isSearch = true;
    this.searchResults = [];
    this.total = 0;
    this.config.currentPage = 1;
    if (this.search.length > 0) {
      this.searchResults = [];
      this.spinner = true;
      this.bringByName();
    } else {
      this.searchResults = [];
      this.coins = this.data;
      this.config.totalItems = this.coins.length;
      this.isSearch = false;
    }
    this.spinner = false;
  }

  private bringByName(offset: number = 0) {
    var offs = offset.toString();
    this.coinService
      .getCoinByName(this.search, offs)
      .pipe(debounceTime(this.debounceTime))
      .subscribe((result) => {
        let entries = Object.keys(result).map((r) => result[r]);
        this.searchResults = this.searchResults.concat(entries[0]);
        this.total = entries.length;
        this.config.totalItems = this.searchResults.length;
        if (this.coins.length != this.searchResults.length) {
          this.coins = this.searchResults;
        }
        this.spinner = false;
      });
  }

  sort(selector: string) {
    if (selector.toLowerCase().includes('name')) {
      if (selector.toLowerCase().includes('ascending')) {
        this.coins.sort((a, b) => a.name.localeCompare(b.name));
      } else {
        this.coins.sort((a, b) => b.name.localeCompare(a.name));
      }
    }
    if (selector.toLowerCase().includes('ranking')) {
      if (selector.toLowerCase().includes('ascending')) {
        this.coins.sort((a, b) => {
          return a.rank - b.rank;
        });
      } else {
        this.coins.sort((a, b) => {
          return b.rank - a.rank;
        });
      }
    }
    if (selector.toLowerCase().includes('change')) {
      if (selector.toLowerCase().includes('ascending')) {
        this.coins.sort((a, b) => a.price - b.price);
      } else {
        this.coins.sort((a, b) => b.price - a.price);
      }
    }
  }

  onKey(search: any) {
    this.search = search.target.value;
    this.search = this.search.toLowerCase();
    this.filter();
  }
}
