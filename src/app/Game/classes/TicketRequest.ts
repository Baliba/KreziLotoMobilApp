export class TicketRequest {
         lots: RBoule[] = [];
	       id_game :    number | undefined;
         coupon: string;
         assure: boolean | undefined;
        public constructor( lots: RBoule[], id_game:any, coupon: string, a: boolean) {
          this.lots = lots;
          this.id_game = id_game;
          this.coupon = coupon;
          this.assure = a;
        }
}

export class RBoule {
     public  id: number | undefined;
	   public  id_mg :number ;
	   public  code_mg: String ;
	   public  lot: String ;
     public  montant: number = 0;
     public win: String;
     public max_sell: number | undefined ;
      public constructor(lot: String,m:number, idm:number, cm:String, win:string) {
        this.lot = lot;
        this.montant = m;
        this.id_mg = idm;
        this.code_mg = cm;
        this.win = win;
      }

}
