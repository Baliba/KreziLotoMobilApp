import { Component, ElementRef, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { first } from 'rxjs/operators';
import { BaseComponent } from 'src/app/BaseComponent';
import { AppService } from 'src/app/_Services/app.service';
import { AuthenticationService } from 'src/app/_Services/Authentification.service';
import { environment } from 'src/environments/environment.prod';
import { Card } from './Card';
import { Deck } from './Deck';

@Component({
  selector: 'app-play-bj',
  templateUrl: './play-bj.component.html',
  styleUrls: ['./play-bj.component.css'],
  encapsulation: ViewEncapsulation.None,
})
export class PlayBJComponent extends BaseComponent implements OnInit {
  user: any;
  public sprites: any = new Array();
  public sounds: any = new Array();
  public audio : any= [
    { name: "place", src: "cardplace1.m4a" }
  ];
  public  imgs = ["default","gray_back","green_back","purple_back","yellow_back","crown"]
  public deck: any;
  config: any;
  game = true;
  state: any = 0;
  public per = 0;
  userbet: any = {
    bet_bj: 10,
    bet_sb: 0,
    type_sb: 0,
    sb: false
  };
  canPlay = false;
  gameState = 0;
  lgame = false;
  ready = false;
  bj: any;
  img: any;
  // @ViewChild('hand', {static: false}) hand!: ElementRef;
  // @ViewChild('hand', {static: false}) hand!: ElementRef;
  @ViewChild('huser', { static: false })
  huser!: ElementRef;
  @ViewChild('hdeal', { static: false })
  hdeal!: ElementRef;
  constructor(private app: AppService, private auth: AuthenticationService) {
    super();
    this.user = this.auth.currentUserValue;
  }

  getEI(id:string): HTMLElement {
   return  document.getElementById(id) as HTMLElement;
  }

  ngOnInit(): void {
    this.getConfig();
  }
  getDeck() {
    this.deck = new Deck(1, 13, "default.png");
    this.loadImg();
  }
  time: any;

  loadImg() {
    this.time = setTimeout(()=> {
      if (this.per < 100) {
        if (this.per<this.audio.length) {
            this.loadAudio();
        }
        if (this.per < 52) {
            this.pload();
           } else {
             let n = this.per - 52;
            if (n<this.imgs.length) {
                this.poload(this.imgs[n])
            }
          }
          this.per++;
          clearTimeout(this.time);
          this.loadImg();
       } else {

        this.loadingOver();
      }

    },5);
  }
  loadAudio() {
    let audio = new Audio();
    audio.src = "assets/media/"+this.audio[this.per].src;
    this.sounds[this.audio[this.per].name] = audio;
  }

  play(index: any) {
     this.sounds[index].play();
  }

  loadingOver() {
    this.state = 1;
  }

  public pload(): void {
    let card: Card = this.deck.getUniqueCard(this.per);
    this.sprites[card.snumber+""+card.scolor] = new Image();
    this.sprites[card.snumber +""+card.scolor].src = "assets/casino/" + card.snumber + "" + card.scolor + ".png";
  }

  public poload(name:string): void {
    this.sprites[name] = new Image();
    this.sprites[name].src = "assets/casino/" +name+ ".png";
  }

  getConfig(){
    this.app.getData(`${environment.apiUrl}game/blackjack/configUser`)
    .pipe(first())
    .subscribe(
    (data) => {
        if (!data.crash) {
           this.config = data.data;
           this.getDeck();
        } else {
          this.state = 100;
        }
       // console.log(data.data);
    },
      (error) => {
        console.log(error);
        this.state = 100;
    });
  }

  initGameBJ() {
    this.closeAlert();
    if (!this.lgame) {
      this.lgame = true;
      this.app.setData(`${environment.apiUrl}game/blackjack/initGameBJ`, this.userbet)
        .pipe(first())
        .subscribe(
          (data) => {
            if (!data.crash) {
              this.initPartGame(data.data);
            } else {
              this.setAlertDanger(data.message, 1);
            }
            this.lgame = false;

          },
          (error) => {
            this.setAlertDanger(error, 1);
            this.lgame = false;
          });
    }
  }


  async initPartGame(data: any) {
    this.bj = await data.bj;
    console.log(this.bj);
    this.gameState = 1;
    this.distribute();
  }

  idcard = 0;
  iucard = 0;
  init() {
    this.idcard = 0;
    this.iucard = 0;
    this.ready = false;
   }
  distribute() {
    this.distributeForDealer();
  }
  distributeForDealer() {
    this.time = setTimeout(() => {
      if (this.idcard == 0) {
          let cards = this.bj.deal_card;
          this.addCardToDeal(cards[this.idcard]);
          this.idcard++;
          this.distributeForDealer();
      } else if (this.idcard == 1) {
        let  c:Card = new Card(0, 0 ,this.bj.back);
        let img = this.sprites["default"];
        img.classList.add("card-back");
        this.play("place");
        this.hdeal.nativeElement.appendChild(img);
        this.idcard++;
        this.distributeForDealer();
      } else {
        clearTimeout(this.time);
        this.distributeForUser();
      }
    },200);
  }



  dealer_cards: any = [];
  user_cards: any = [];
  addCardToDeal(c: any) {
   let oc = this.setCard(c.card);
   let img = this.sprites[oc.getName()];
       img.classList.add("card");
    this.dealer_cards.push({
      index: c.index,
      card: c.card,
      icard: img,
      ocard:oc
    });
    this.play("place");
   this.hdeal.nativeElement.appendChild(img);
  }

  setCard(c: any) {
    let nc: Card = new Card(c.number, c.color, c.back);
    return nc;
  }

  distributeForUser() {
    this.time = setTimeout(() => {
      if (this.iucard < 2 ) {
          let cards = this.bj.user_card_a;
          this.addCardToUser(cards[this.iucard]);
          this.iucard++;
          this.distributeForDealer();
      } else {
        this.startGame();
        clearTimeout(this.time);
      }
    },200);
  }
  startGame() {
    this.ready = true;
    this.canPlay = true;
  }

  addCardToUser(c: any) {

    let oc = this.setCard(c.card);
    let img = this.sprites[oc.getName()];
    img.classList.add("card");

     this.user_cards.push({
       index: c.index,
       card: c.card,
       icard: img,
       ocard:oc
     });

    this.play("place");

    this.huser.nativeElement.appendChild(img);
  }

  stop() {
    this.canPlay = false;
    alert("test");
  }

  hit() {
    if (this.canPlay) {
      this.canPlay = false;
      this.app.getData(`${environment.apiUrl}game/blackjack/hit/${this.bj.id}`)
        .pipe(first())
        .subscribe(
          (data) => {
            console.log(data);
            this.canPlay = true;
          },
          (error) => {
            this.canPlay = true;
          });
    }
  }


  double() {
    this.canPlay = false;

  }

  getTotalPointForDealer(){
    let ss = [];
    let tt = 0;
    for (let i = 0; i < this.dealer_cards.length; i++) {
      let card = this.dealer_cards[i].card;
      if (card.number == 1) {
        tt += 1;
        ss.push(10);
       } else if (card.number>=10) {
         tt += 10;
        } else {
         tt += card.number;
       }
    }
    if (ss.length == 0) {
      return tt;
    } else {
      let ta = tt + "";
      for (let j = 0; j < ss.length; j++) {
        let i = tt + ss[j];
        if(i<=21){
          ta += "," + i;
        }
        tt += ss[j];
      }
      return ta;
    }
  }

  getTotalPointForUser() {
    let ss = [];
    let tt = 0;
    for (let i = 0; i < this.user_cards.length; i++) {
      let card = this.user_cards[i].card;
      if (card.number == 1) {
        tt += 1;
        ss.push(10);
       } else if (card.number>=10) {
         tt += 10;
        } else {
         tt += card.number;
       }
    }
    if (ss.length == 0) {
      return tt;
    } else {
      let ta = tt + "";
      for (let j = 0; j < ss.length; j++) {
        let i = tt + ss[j];
        if(i<=21){
          ta += "," + i;
        }
        tt += ss[j];
      }
      return ta;
    }

  }
  isEleven() {
    let tt = 0;
    for (let i = 0; i < this.user_cards.length; i++) {
      let card = this.user_cards[i].card;
      if (card.number == 1) {
         tt += 1;
       } else if (card.number>=10) {
         tt += 10;
        } else {
         tt += card.number;
       }
    }
    if (tt == 11) {
      return false;
    } else {
      return true;
    }
  }

}
