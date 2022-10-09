import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-play-bor',
  templateUrl: './play-bor.component.html',
  styleUrls: ['./play-bor.component.css']
})
export class PlayBorComponent implements OnInit {
  @Input() selectedGame: any;
  @Input() modegame: any;
  @Input() montant: any;
  boules: any = [];
  pb: any = [];
  @Input() msgMontant: any;
  initBoule() {
    for (let i = 0; i < 100; i++) {
      if (i < 10) {
        this.boules.push('0' + i)
        } else {
         this.boules.push(i);
       }
    }
  }
  constructor() { }

  ngOnInit(): void {
    this.initBoule();
  }

  addOrRemoveBoule(b:any, i:any) {
    if (this.pb.length == 0) {
      this.pb.push(b);
    } else {
      let rem = false;
      for (let i = 0; i < this.pb.length; i++) {
        if (this.pb[i] == b) {
            rem = true;
            this.pb.splice(i, 1);
           break;
        }
      }
      if (!rem) {
        this.pb.push(b);
      }
    }
  }

  getBGC(b: any) {

    if (this.pb.length == 0) {
      return "#ffc107";
    }

    let rem = false;
    for (let i = 0; i < this.pb.length; i++) {
      if (this.pb[i] == b) {
          rem = true;
         break;
      }
    }
    if (!rem) {
      return "#ffc107";
    } else {
      return "#097f22";
    }
  }

  play() {
    if (this.pb.length>0) {
      this.playListBoule.emit(this.pb);
    }
  }

  cancel() {
    this.cEvent.emit();
  }

  @Output()
  playListBoule: EventEmitter<any> = new EventEmitter<any>();

  onChangeMontant(e: any) {
    this.ocmEvent.emit(e);
  }

  @Output()
  ocmEvent: EventEmitter<any> = new EventEmitter<any>();

  @Output()
  cEvent: EventEmitter<any> = new EventEmitter<any>();

}
