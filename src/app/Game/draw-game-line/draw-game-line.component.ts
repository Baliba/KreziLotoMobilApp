import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-draw-game-line',
  templateUrl: './draw-game-line.component.html',
  styleUrls: ['./draw-game-line.component.css']
})
export class DrawGameLineComponent implements OnInit {

  @Input() item: any;
  constructor() { }
  ngOnInit(): void {
  }

}
