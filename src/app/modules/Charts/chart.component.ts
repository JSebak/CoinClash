import { Component, OnInit } from '@angular/core';
import * as Chart from 'chart.js';
import { timer } from 'rxjs';
import { concatMap } from 'rxjs/operators';
import { CoinModel } from 'src/app/Models/coin.models';
import { CoinService } from 'src/app/Services/coin.service';

@Component({
  selector: 'Chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.css'],
})
export class ChartComponent implements OnInit {
  coinId: string = 'bitcoin';
  coins: CoinModel[] = [];
  data: Array<number> = [];
  chart: Chart;
  spinner: boolean = false;

  /**
   *
   */
  constructor(private coinService: CoinService) {}

  ngOnInit(): void {
    this.spinner = true;
    this.getCoins();
    this.load('bitcoin');
    const canvas = <HTMLCanvasElement>document.getElementById('lineChart');
    const ctx = canvas.getContext('2d');
    var gradientFill = ctx.createLinearGradient(0, 0, 0, 290);
    gradientFill.addColorStop(0, 'rgba(186, 150, 53,1)');
    gradientFill.addColorStop(1, 'rgba(173, 53, 186, 0.1)');
    this.chart = new Chart(ctx, {
      type: 'line',
      data: {
        labels: [
          '00:00',
          '01:00',
          '02:00',
          '03:00',
          '04:00',
          '05:00',
          '06:00',
          '07:00',
          '08:00',
          '09:00',
          '10:00',
          '11:00',
          '12:00',
          '13:00',
          '14:00',
          '15:00',
          '16:00',
          '17:00',
          '18:00',
          '19:00',
          '20:00',
          '21:00',
          '22:00',
          '23:00',
        ],
        datasets: [
          {
            label: 'USD Value',
            data: [],
            backgroundColor: gradientFill,
            borderColor: ['#AD35BA'],
            borderWidth: 2,
            pointBorderColor: '#fff',
            pointBackgroundColor: 'rgbargba(186, 150, 53,0.1)',
          },
        ],
      },
      options: {
        responsive: true,
      },
    });
  }

  getCoins() {
    this.coinService.getCoins('', '0').subscribe((response) => {
      let entries = Object.keys(response).map((r) => response[r]);
      if (this.coins.length == 0) this.coins = entries[0];
      else {
        this.coins = this.coins.concat(entries[0]);
      }
      this.spinner = false;
    });
  }

  load(coinId: string) {
    this.spinner = true;
    this.getData('1m', coinId);
    this.coinId = coinId;
  }

  getData(period: string, coinId: string, typeOfData: string = 'CURRENCY') {
    timer(10)
      .pipe(concatMap((result) => this.coinService.getChart(period, coinId)))
      .subscribe((result) => {
        let entries = Object.keys(result).map((r) => result[r])[0];

        switch (typeOfData) {
          case '1':
            this.data = entries.map((r) => r[0]);
            break;

          case '2':
            this.data = entries.map((r) => r[1]);
            break;

          default:
            this.data = entries.map((r) => r[1]);
            break;
        }
        this.chart.data.datasets[0].data = this.data;
        this.chart.update();
        this.spinner = false;
      });
  }
}
