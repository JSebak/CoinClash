import { EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { Component } from '@angular/core';
import { MDBModalRef, MDBModalService } from 'angular-bootstrap-md';
import { CoinModel } from 'src/app/Models/coin.models';
// import { CharacterService } from 'src/app/Services/character.service';
// import { FavoritesList } from '../../Favorites/favoritesList.component';
// import { ComicClass } from '../comic/comics';

@Component({
  selector: 'characterCard',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.css'],
})
export class Card implements OnInit {
  @Input() public coin: CoinModel = new CoinModel();
  //@Input() public comicId!: number;
  // @Output() coinIdChange: EventEmitter<number> = new EventEmitter();
  // @Input() public index: number;

  // @ViewChild('comicModal', { static: true }) public contentModal;
  @ViewChild('characterModal', { static: true }) public charactModal;
  // @ViewChild('favList', { static: true }) public favList: FavoritesList;

  id: string = '0';
  title: string = '';
  rank: number = 1;
  description: string = '';
  icon: string = '';
  // comics: ComicSummary[] = [new ComicSummary()];
  // comicToShow: ComicSummary;
  // theComic: ComicClass = new ComicClass();
  name: string;
  spinner: boolean = false;

  isSeeMore: boolean = false;
  isReadMore: boolean = false;
  favorite: boolean = false;
  priceVariation: number;
  avaliability: number;

  constructor(
    // private characterService: CharacterService,
    private modalService: MDBModalService
  ) {}

  ngOnInit(): void {
    this.spinner = true;
    this.loadCoin();
  }
  // ngOnChanges(changes) {
  //   if (this.index < 1) {
  //     if (
  //       changes.comicId.currentValue != undefined &&
  //       changes.comicId.currentValue > 0 &&
  //       !this.spinner
  //     ) {
  //       this.openFavoriteComic(this.comicId);
  //       this.comicId = -1;
  //       this.coinIdChange.emit(this.comicId);
  //     }
  //   }
  // }

  loadCoin(): void {
    this.id = this.coin.id;
    this.title = this.coin.name;
    this.icon = this.coin.icon;
    this.rank = this.coin.rank;
    this.priceVariation = this.coin.priceChange1h;
    this.avaliability =
      this.coin.totalSupply != 0 && this.coin.availableSupply != undefined
        ? this.coin.availableSupply / this.coin.totalSupply
        : -1;
    this.spinner = false;
  }

  // getComic(item: ComicSummary) {
  //   this.spinner = true;
  //   this.comicToShow = item;
  //   this.characterService
  //     .getComic((this.comicToShow.resourceURI || '').toString())
  //     .subscribe((result) => {
  //       let temp = result.data?.results[0];
  //       this.theComic = {
  //         id: temp.id,
  //         title: temp.title,
  //         prices: temp.prices,
  //         thumbnail: temp.thumbnail,
  //         description: temp.description,
  //       };
  //       this.comicThumbnail = `${this.theComic.thumbnail.path}.${this.theComic.thumbnail.extension}`;
  //       this.favorite = this.characterService.list.includes(
  //         Number(this.theComic.id)
  //       );
  //     });
  //   this.contentModal.show();
  //   this.spinner = false;
  // }
  // openFavoriteComic(id: number) {
  //   const comicId = {
  //     resourceURI: `http://gateway.marvel.com/v1/public/comics/${id}`,
  //     name: '',
  //   };
  //   this.getComic(comicId);
  // }

  // addFavorite(id: number) {
  //   this.characterService.addFav(id);
  //   this.favorite = true;
  // }
  // removeFavorite(id: number) {
  //   this.characterService.removeFav(id);
  //   this.favorite = false;
  // }
  showText() {
    this.charactModal.show();
  }
  closeModal() {
    // this.contentModal.hide();
    this.charactModal.hide();
    this.isReadMore = false;
  }
  readMore() {
    this.isReadMore = !this.isReadMore;
  }
  search() {
    window.location.href = `https://marvel.fandom.com/es/wiki/Especial:Buscar?query=${this.title}&scope=internal&navigationSearch=true`;
  }
}
