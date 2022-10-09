import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-page-title-game',
  templateUrl: './page-title-game.component.html',
  styleUrls: ['./page-title-game.component.css']
})
export class PageTitleGameComponent implements OnInit {
  @Input()
  titre:any;

  @Input()
  back: any;
  @Input()
  url: any;
  dt: any;
  constructor(private route: ActivatedRoute,
    private router: Router) {
    this.dt = localStorage.getItem("DEVICE_TYPE");
   }

  ngOnInit(): void {
  }

  reloadComponent() {
    location.reload();
  }

}
