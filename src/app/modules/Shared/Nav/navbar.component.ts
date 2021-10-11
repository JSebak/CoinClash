import { Component, EventEmitter, Output } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class navbar {
  @Output() toSearch: EventEmitter<string> = new EventEmitter();
  search: string = '';
  /**
   *
   */
  constructor(private router: Router) {}

  redirect($event) {
    this.router.navigate([`/${$event}`]);
  }

  onKey(search: any) {
    this.search = search.target.value;
    this.toSearch.emit(this.search);
  }
}
