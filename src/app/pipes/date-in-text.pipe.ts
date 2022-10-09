import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'dateInText'
})
export class DateInTextPipe implements PipeTransform {
  mwa = [
    "",
    "Jan.",
    "Fev.",
    "Mas",
    "Avril",
    "me",
    "Jwen",
    "Jiyè",
    "daout",
    "Sept.",
    "Okt.",
    "Nov",
    "Des."
  ]
  transform(value: unknown, ...args: unknown[]): unknown {
    if (args[0]!=null){
      var ndate = this.formatDateNow(args[0]);
      ndate += (args[1] != undefined) ? " a " + this.formatHourNow(args[1]) : "";
      return ndate;
    }
    return "Jodya";
  }

  formatHourNow(h: any) {
    try {
      var ah = h.split(":");
      return ah[0] + "h"+ this.setMinut(ah[1]);
    } catch (error) {
      console.log(error);
      return h;
    }

  }

  setMinut(m: any) {

    if (m=="00") {
      return "";
    }
    return " "+m;
  }

  formatDateNow(h: any) {
    try {
      var ah = h.split("-");
      return ah[0] + " " + this.mwa[parseInt(ah[1])] +" "+ ah[2];
    } catch (error) {
      console.log(error);
      return h;
    }

  }

}
