import { Component, OnInit } from '@angular/core';
import { LoaderService } from '../_Services/loader.service';
import { Subscription } from 'rxjs';
import { LoaderState } from './loader';

@Component({
  selector: "app-loader",
  templateUrl: "./loader.component.html",
  styleUrls: ["./loader.component.css"],
})
export class LoaderComponent implements OnInit {
  private subscription: Subscription = new Subscription;
  show: boolean = false;
  constructor(private loaderService: LoaderService) {}
  ngOnInit() {
    this.subscription = this.loaderService.loaderState.subscribe(
      (state: LoaderState) => {
        this.setState(state);
      }
    );
  }
  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  setState(state: any) {
    this.show = state.show;
    if (this.show) setTimeout(() => { this.show = false; }, 15000);
  }
}
