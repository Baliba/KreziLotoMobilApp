import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-top-menu-game',
  templateUrl: './top-menu-game.component.html',
  styleUrls: ['./top-menu-game.component.css']
})
export class TopMenuGameComponent implements OnInit {
  @Input()
  titre:any;

  @Input()
  back: any;
  @Input()
  url: any;

  @Input()
  page: any;

  @Output()
  pageEventLGame: EventEmitter<any> = new EventEmitter<any>();

  constructor() { }

  ngOnInit(): void {
  }

  goBack() {
    var data = { page: 0, data: undefined };
    this.pageEventLGame.emit(data);
  }

}
