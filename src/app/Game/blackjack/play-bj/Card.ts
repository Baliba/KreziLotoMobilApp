export class Card {
 public number:Number;
 public  snumber:String;
 public color:Number;
 public scolor:String;
 public back:String;
 public visibility: Boolean;

constructor(i:number, j:number, b:String) {
  this.number = i;
  this.color  = j;
  this.back = b;
  this.snumber = this.setSNumberbyInt(i);
  this.scolor = this.setScolorbyInt(j);
  this.visibility = true;
}

  public setSNumberbyInt(i: number): String{
    let snumber = "";
  if(i==1) {
    snumber = "A";
  } else  if(i==11) {
    snumber = "J";
  } else  if(i==12) {
    snumber = "Q";
  } else  if(i==13) {
    snumber = "K";
  }else{
    snumber = i+"";
    }
    return snumber;
}

  public setScolorbyInt(j: number): String{
  let scolor = "";
  switch(j) {
  case 1 :
    scolor = "C";
    break;
  case 2 :
    scolor = "S";
    break;
  case 3 :
    scolor = "D";
    break;
  case 4 :
    scolor = "H";
    break;
    }
    return scolor;
}

   public  getName() {
   return this.snumber +""+ this.scolor;
  }
}
