import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { RBoule, TicketRequest } from '../classes/TicketRequest';
import { AppService } from '../../_Services/app.service';
import { of } from 'rxjs';
import { first } from 'rxjs/operators';
import { environment } from 'src/environments/environment.prod';
import { AuthenticationService } from 'src/app/_Services/Authentification.service';
import { BaseComponent } from '../../BaseComponent';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent extends BaseComponent implements OnInit {
  @Input() user: any;
  @Input() toDay: any;
  @Input() gameSettings: any;
  @Input() games: any;
  @Input() selectedGame: any;
  tools = 0;
  wtools = 0;
  modegame: any;
  boule: any;
  montant: any;
  carts: RBoule[] = [];
  VB = false;
  msgBoule: any;
  msgMontant: any;
  maxNum = 0;
  max_win = 0;
  coupon = "";
  ticket = false;
  see = false;
  mpay = -1;
  pass: number = 0.03;
  constructor(private app: AppService, private auth: AuthenticationService) {
    super();
    this.user = this.auth.currentUserValue;
  }
  pop(st: boolean, m: number) {
    this.see = st;
    this.mpay = m;
    this.ass = false;
  }

  popNow() {
    this.see = false;
    this.mpay = -1;
  }

  setMaxWin() {
    this. max_win = 0;
    for (let c of this.carts) {
      this.max_win += this.getMaxMGWin(c.win, c.montant);
    }
  }
  getMaxMGWin(win: any , montant: number) {
    let sold = 0;
    if (win! + "") {
      let vw = win.split("/");
      let nw = parseFloat(vw[0].split("=")[1]);
      sold = montant * nw;
    }
    return sold;
  }

  getToolsPanel(no:string) {
    switch (no) {
      case "BOR":
        this.tools = 1;
      break;
      case "3CH":
        this.tools = 2;
      break;
      case "MAR":
        this.tools = 3;
      break;
      case "4CH1":
        this.tools = 4;
      break;
      case "4CH2":
        this.tools = 5;
      break;
      case "4CH3":
        this.tools = 7;
        break;
      case "5CH1":
        this.tools = 8;
      break;
      case "5CH2":
        this.tools = 9;
      break;
      case "5CH3":
        this.tools = 10;
      break;
    }
    this.wtools = this.tools;
  }


  getCartStorageName(): string {
    return "GAME_CART_" + this.selectedGame.gamemaster.no;
  }
  clearCarts() {
    this.carts = [];
    localStorage.setItem(this.getCartStorageName(),JSON.stringify(this.carts));
  }
  ngOnInit(): void {
    const cart:any  = localStorage.getItem(this.getCartStorageName());
    if (cart!="" && cart!= undefined) {
       this.carts = JSON.parse(cart);
       this.setMaxWin();
    }
  }

  onChange(mg: any) {
    this.maxNum = this.getMax();
    this.validator();
  }

  checkMaskBoule() {
  }
  getMax() {
    var m = this.modegame.max_num;
    var n = "1";
    for (var i = 0; i < m; i++) {
      n += "0";
    }
    var nn = parseInt(n) - 1;
    return nn;
  }

  checkSizeBoule() : Boolean{
    this.msgBoule = undefined;
    try {
      if (this.boule != "") {
        if (this.modegame.max_num != this.boule.length) {
          this.msgBoule = "li ka gen " + this.modegame.max_num + " chif ladan";
          return false;
        }
      } else {
          this.msgBoule = "li ka gen " + this.modegame.max_num + " chif ladan";
          return false;
      }
      return true;
     } catch (error) {
       this.msgBoule = "li ka gen " + this.modegame.max_num + " chif ladan";
       //console.log(error);
        return false;
     }
  }

  checkMontant() {
    this.msgMontant= undefined;
    if (this.modegame.max_sell < this.montant) {
      this.msgMontant = "kob la pa dwe plis ke "+this.modegame.max_sell+"G";
      return false;
    }
    if (this.modegame.min_sell > this.montant) {
        this.msgMontant = "Kob la dwe pi piti ke " + this.modegame.min_sell + " G";
        return false;
    }
    return true;
  }

  onChangeBoule(e: any) {
    this.validator();
  }
  onChangeMontant(e: any) {
    this.validator();
  }

  onChangeMontantAd(e: any) {
    this.montant = parseInt(e.target.value);
    this.validator();
  }

  validator() {
    this.VB = false;
    if (!this.checkSizeBoule()) {
        return;
    }
    if (!this.checkMontant()) {
       return;
    }
    if (!this.checkIsNumber() ) {
      return;
    }
    this.VB = true;
  }

  checkIsNumber() : boolean {
    this.msgMontant = undefined;
    this.msgBoule   = undefined;
    var reg = /^-?\d+\.?\d*$/;
    if (!reg.test(this.boule)) {
      this.msgBoule = "Chif selman pou mete";
      return false;
    }
    if (!reg.test(this.montant)) {
      this.msgMontant = "Chif selman pou mete";
      return false;
    }
    return true;
  }
  add = true;
  addOrEditTicket() {
    if (!this.edit) {
      if (this.add) {
        this.add = false;
        this.checkBouleExistOrAddNew();
      }
    } else {
      if (this.add) {
        this.add = false;
        this.checkBouleExistOrEdit();
      }
    }
  }

  checkBouleExistOrEdit() {
    let nb = this.setBouleWithMask();
    let p = this.montant;
    this.carts[this.posItem].lot = nb;
    this.carts[this.posItem].montant = p;
    this.carts[this.posItem].code_mg = this.modegame.code;
    this.carts[this.posItem].id_mg = this.modegame.id;
    this.saveCarts();
    this.cleanBoule();
    this.closeEdit();
  }

  checkBouleExistOrAddNew() {
    let nb = this.setBouleWithMask();
    let p = this.montant;
    for (let i = 0; i < this.carts.length; i++) {
      // console.log(this.modegame);
       if (this.carts[i].lot==nb && this.carts[i].code_mg==this.modegame.code) {
           this.carts[i].montant += p;
           this.cleanBoule();
           this.saveCarts();
           return;
        }
    }

    let rb = new RBoule(nb, parseInt(p), this.modegame.id, this.modegame.code, this.modegame.win);
    this.carts.push(rb);
    this.cleanBoule();
    this.saveCarts()
  }
  cleanBoule() {
    this.boule = "";
  }
  saveCarts() {
    this.add = true;
    this.VB = false;
    localStorage.setItem(this.getCartStorageName(), JSON.stringify(this.carts));
    this.setMaxWin();
    this.closeAlert();
  }
  setBouleWithMask(): String  {
    if (this.modegame.mask!="") {
      return this.boule.slice(0,this.modegame.pas) +this.modegame.mask+ this.boule.slice(this.modegame.pas);
    }
    return this.boule;
  }

  delItemFromCart(i: number) {
    if(confirm("Eskew vle retire boul sa vre?")){
       this.carts.splice(i, 1);
       this.saveCarts();
    }
  }

  edit = false;
  cLot:any = undefined;
  posItem = -1;

  editItemFromCart(i: number) {
    this.cLot = this.carts[i];
    this.setModeGame();
    this.edit = true;
    this.add = true;
    this.montant = this.cLot.montant;
    this.posItem = i;
    this.VB = true;
    this.boule = this.setBouleWithMaskEdit(this.cLot.lot);
  }

  closeEdit() {
    this.edit = false;
    this.add = true;
    this.modegame = undefined;
    this.cLot = undefined;
    this.posItem = -1;
  }

  setModeGame() {
    this.selectedGame.modegames.forEach((e:any) => {
      if (e.id == this.cLot.id_mg) {
          this.modegame = e;
      }
    });
  }



  setBouleWithMaskEdit(b:any): String  {
    if (this.modegame.mask!="") {
      return b.replace(this.modegame.mask, "").trim();
    }
    return b;
  }

  getTotalCarts(): number{
    let total = 0;
    this.carts.forEach((e)=>{
      total += (e.montant)? e.montant : 0;
    });
    return total;
  }

  getpriTotalFichla() {
    let total = this.getTotalCarts();
     return (this.ass) ? total * (1 + this.pass) : total;
  }


  async saveToUser(amount: any, pay:number) {
    if (pay == 1) {
      this.user.hcompte = parseInt(this.user.compte);
      this.user.compte -= parseInt(amount);
    } else {
      this.user.hbonus = parseInt(this.user.bonus);
      this.user.bonus -= parseInt(amount);
    }
    await this.auth.setUserData(this.user)
  }
  cleanMontant() {
    this.montant = "";
    this.validator();
  }
  bloading = false;
  ass : boolean = false;
  pay(i: number) {
    if (!this.bloading) {
      this.bloading = true;
      this.closeAlert();
      if(this.coupon!="" && this.coupon!=undefined) {
        this.coupon  = this.coupon.toLowerCase().trim();
      }
      var a = this.ass;
      let data = new TicketRequest(this.carts, this.selectedGame.id, this.coupon, a);
      this.popNow();
      this.app.setData(`${environment.apiUrl}addTicketClient/${i}`, data)
        .pipe(first())
        .subscribe(
          (data) => {
            if (!data.crash) {
              this.saveToUser(this.getTotalCarts(), i);
              this.clearCarts();
              this.setAlert('alert-info alert-login', data.message);
            } else {
              if (data.code==201) {
                this.setErrorMessage(data.data);
              }else{
                this.setAlertDanger(data.message, 1);
              }
            }
            this.bloading = false;
          },
          (error) => {
            this.bloading = false;
            this.setAlertDanger(error, 1);
          }
        );
    }
  }
  setErrorMessage(data: any) {
    let msg = "<ul>";
    for (let r of data.rb) {
      if (r.can_play <= 0) {
          msg += "<li>("+r.code_mg+") "+r.lot + " fèmen.</li>";
      } else {
          msg += "<li>Ou ka jwe ("+r.code_mg+") "+r.lot + " selman pou "+r.can_play+" G.</li>";
      }
    }
    msg += "</ul>";
    this.setAlertDanger(msg, 1);
  }

  @Output()
  pageEventCart: EventEmitter<any> = new EventEmitter<any>();

  @Output()
  quitCartEvent: EventEmitter<any> = new EventEmitter<any>();

  quitCart() {
    this.selectedGame = undefined;
    this.games = 0;
    const dataCart = { page: 0, data: undefined };
    //localStorage.setItem('PAGE', JSON.stringify(dataCart));
    this.pageEventCart.emit(dataCart);
  }

  playListBoule(bs: any) {

    for (let i = 0; i < bs.length; i++) {
         this.boule = bs[i];
         this.checkBouleExistOrAddNew();
    }
    this.canceltools();

  }

  canceltools() {
    this.tools = 0;
  }


}


