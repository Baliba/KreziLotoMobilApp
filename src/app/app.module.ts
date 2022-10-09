import { BrowserModule } from '@angular/platform-browser';
import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { AppComponent } from './app.component';
import { AlertComponent } from './popups/alert/alert.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { ErrorInterceptor } from './_helper/ErrorInterceptor';
import { JwtInterceptor } from './_helper/JWTInterceptor';
import { LoaderInterceptorService } from './_Services/loader-interceptor.service';
import { FormsModule } from '@angular/forms';
import { LayoutComponent } from './layout/layout.component';
import { LoaderComponent } from './loader/loader.component';
import { SitewebComponent } from './siteweb/siteweb.component';
import { MainComponent } from './Game/main/main.component';
import { LoginGameComponent } from './Game/login-game/login-game.component';
import { RegGameComponent } from './Game/reg-game/reg-game.component';
import { MenuComponent } from './Game/menu/menu.component';
import { GameComponent } from './Game/game/game.component';
import { CartComponent } from './Game/cart/cart.component';
import { DateInTextPipe } from './pipes/date-in-text.pipe';
import { DrawGameComponent } from './Game/draw-game/draw-game.component';
import { TicketMakerComponent } from './Game/ticket-maker/ticket-maker.component';
import { CommonModule, DatePipe } from '@angular/common';
import { ListGameComponent } from './Game/list-game/list-game.component';
import { HomeGameComponent } from './Game/home-game/home-game.component';
import { DepoComponent } from './Game/depo/depo.component';
import { FailComponent } from './Game/fail/fail.component';
import { ReturnComponent } from './Game/return/return.component';
import { ToolsGameComponent } from './Game/tools-game/tools-game.component';
import { AlertGameComponent } from './Game/alert-game/alert-game.component';
import { TicketGameComponent } from './Game/ticket-game/ticket-game.component';
import { DetailsTicketGameComponent } from './Game/details-ticket-game/details-ticket-game.component';
import { SoldShowerGameComponent } from './Game/sold-shower-game/sold-shower-game.component';
import { ConfGameComponent } from './Game/conf-game/conf-game.component';
import { DetNotGameComponent } from './Game/det-not-game/det-not-game.component';
import { NotGameComponent } from './Game/not-game/not-game.component';
import { AngularWeatherWidgetModule } from 'angular2-weather-widget';
import { PageTitleGameComponent } from './Game/page-title-game/page-title-game.component';
import { FooterMenuGameComponent } from './Game/footer-menu-game/footer-menu-game.component';
import { TopMenuGameComponent } from './Game/top-menu-game/top-menu-game.component';
import { ProfilGameComponent } from './Game/profil-game/profil-game.component';
import { CPassGameComponent } from './Game/c-pass-game/c-pass-game.component';
import { ConfigPayoutComponent } from './Game/config-payout/config-payout.component';
import { PayoutGameComponent } from './Game/payout-game/payout-game.component';
import { CPayoutComponent } from './Game/cpayout/cpayout.component';
import { PastPayoutComponent } from './Game/past-payout/past-payout.component';
import { HDepoGameComponent } from './Game/hdepo-game/hdepo-game.component';
import { HTicketGameComponent } from './Game/hticket-game/hticket-game.component';
import { HTirajGameComponent } from './Game/htiraj-game/htiraj-game.component';
import { DrawGameLineComponent } from './Game/draw-game-line/draw-game-line.component';
import { KenoGameComponent } from './Game/keno-game/keno-game.component';
import { TchalaGameComponent } from './Game/tchala-game/tchala-game.component';
import { PrensipGameComponent } from './Game/prensip-game/prensip-game.component';
import { LaguagePipe } from './laguage.pipe';
import { ValiderComponent } from './Game/valider/valider.component';
import { FPassComponent } from './Game/fpass/fpass.component';
import { AideComponent } from './Game/aide/aide.component';
import { TawkService } from './_Services/tawk.service';
import { ConnectionServiceModule } from 'ng-connection-service';
import { LazyLoadImageModule } from 'ng-lazyload-image';
import { SafePipe } from './Game/depo/SafePipe';
import { NoCreditComponent } from './Game/no-credit/no-credit.component';
import { SponsorComponent } from './Game/sponsor/sponsor.component';
import { PlayBorComponent } from './Game/play-bor/play-bor.component';
import { PlayBJComponent } from './Game/blackjack/play-bj/play-bj.component';
import { WelcomeComponent } from './Game/welcome/welcome.component';
import { ChangeTicketComponent } from './Game/change-ticket/change-ticket.component';
import { GameRoutingModule } from './routes/game-routing.module';
import { FloatComponent } from './Game/float/float.component';
import { KreziMilyonComponent } from './Game/krezi-milyon/krezi-milyon.component';
import { IonicModule } from '@ionic/angular';
@NgModule({
  declarations: [
    AppComponent,
    AlertComponent,
    LayoutComponent,
    LoaderComponent,
    SitewebComponent,
    MainComponent,
    LoginGameComponent,
    RegGameComponent,
    MenuComponent,
    GameComponent,
    CartComponent,
    DateInTextPipe,
    DrawGameComponent,
    TicketMakerComponent,
    ListGameComponent,
    HomeGameComponent,
    DepoComponent,
    FailComponent,
    ReturnComponent,
    ToolsGameComponent,
    AlertGameComponent,
    TicketGameComponent,
    DetailsTicketGameComponent,
    NotGameComponent,
    DetNotGameComponent,
    ProfilGameComponent,
    ConfGameComponent,
    SoldShowerGameComponent,
    PageTitleGameComponent,
    FooterMenuGameComponent,
    TopMenuGameComponent,
    CPassGameComponent,
    ConfigPayoutComponent,
    PayoutGameComponent,
    CPayoutComponent,
    PastPayoutComponent,
    HDepoGameComponent,
    HTicketGameComponent,
    HTirajGameComponent,
    DrawGameLineComponent,
    KenoGameComponent,
    TchalaGameComponent,
    PrensipGameComponent,
    LaguagePipe,
    ValiderComponent,
    FPassComponent,
    AideComponent,
    SafePipe,
    NoCreditComponent,
    SponsorComponent,
    PlayBorComponent,
    PlayBJComponent,
    WelcomeComponent,
    ChangeTicketComponent,
    FloatComponent,
    KreziMilyonComponent,
  ],
  imports: [
    BrowserModule,
    GameRoutingModule,
    FormsModule,
    HttpClientModule,
    CommonModule,
    AngularWeatherWidgetModule,
    ConnectionServiceModule,
    LazyLoadImageModule,
    IonicModule.forRoot()
  ],
  providers: [
    DatePipe,
    SafePipe,
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: LoaderInterceptorService,
      multi: true,
    },
    TawkService
   // {provide: LocationStrategy, useClass: HashLocationStrategy}
  ],
  exports:[
  ],
  bootstrap: [AppComponent],
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA,
    NO_ERRORS_SCHEMA
]
})
export class AppModule { }
