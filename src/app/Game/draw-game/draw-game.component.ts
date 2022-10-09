import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-draw-game',
  templateUrl: './draw-game.component.html',
  styleUrls: ['./draw-game.component.css']
})
export class DrawGameComponent implements OnInit {
  @Input() item: any;
  constructor() { }
  ngOnInit(): void {
  }

}
