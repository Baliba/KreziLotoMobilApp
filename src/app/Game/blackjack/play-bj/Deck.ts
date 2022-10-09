import { Card } from "./Card";

export class Deck   {
 public cards:Array<Card> = [];

 constructor (a: number , v: number , nd: String){
	           // Card 1
	 for(let i = a  ; i<=v; i++ ) {
			  this.cards.push(new Card(i,1, nd));
			  this.cards.push(new Card(i,2, nd));
			  this.cards.push(new Card(i,3, nd));
			  this.cards.push(new Card(i,4, nd));
	  }
   }


  public getCards() : Array<Card> {
    return this.cards;
  }

  public  getUniqueCard(i:number): Card {
     return this.cards[i];
  }




}
