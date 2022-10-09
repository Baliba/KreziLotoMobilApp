import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AideComponent } from '../Game/aide/aide.component';
import { AlertGameComponent } from '../Game/alert-game/alert-game.component';
import { PlayBJComponent } from '../Game/blackjack/play-bj/play-bj.component';
import { CPassGameComponent } from '../Game/c-pass-game/c-pass-game.component';
import { ChangeTicketComponent } from '../Game/change-ticket/change-ticket.component';
import { ConfigPayoutComponent } from '../Game/config-payout/config-payout.component';
import { CPayoutComponent } from '../Game/cpayout/cpayout.component';
import { DepoComponent } from '../Game/depo/depo.component';
import { DetailsTicketGameComponent } from '../Game/details-ticket-game/details-ticket-game.component';
import { FPassComponent } from '../Game/fpass/fpass.component';
import { GameComponent } from '../Game/game/game.component';
import { HDepoGameComponent } from '../Game/hdepo-game/hdepo-game.component';
import { HTicketGameComponent } from '../Game/hticket-game/hticket-game.component';
import { HTirajGameComponent } from '../Game/htiraj-game/htiraj-game.component';
import { KenoGameComponent } from '../Game/keno-game/keno-game.component';
import { KreziMilyonComponent } from '../Game/krezi-milyon/krezi-milyon.component';
import { LoginGameComponent } from '../Game/login-game/login-game.component';
import { NoCreditComponent } from '../Game/no-credit/no-credit.component';
import { NotGameComponent } from '../Game/not-game/not-game.component';
import { PastPayoutComponent } from '../Game/past-payout/past-payout.component';
import { PayoutGameComponent } from '../Game/payout-game/payout-game.component';
import { PrensipGameComponent } from '../Game/prensip-game/prensip-game.component';
import { ProfilGameComponent } from '../Game/profil-game/profil-game.component';
import { RegGameComponent } from '../Game/reg-game/reg-game.component';
import { SponsorComponent } from '../Game/sponsor/sponsor.component';
import { TchalaGameComponent } from '../Game/tchala-game/tchala-game.component';
import { TicketGameComponent } from '../Game/ticket-game/ticket-game.component';
import { ToolsGameComponent } from '../Game/tools-game/tools-game.component';
import { ValiderComponent } from '../Game/valider/valider.component';
import { WelcomeComponent } from '../Game/welcome/welcome.component';
import { AppGuardGuard as AppGuard } from './../_helper/app-guard.guard';

const routes: Routes = [
    {
    path: '',
    redirectTo: 'game/home',
    pathMatch: 'full',
    },
   {
    path: 'game/login',
    component: LoginGameComponent
   },
   {
    path: 'game/register',
    component: RegGameComponent
   },
   {
    path: 'game/register/:id',
    component: RegGameComponent
   },
   {
    path: 'game/home',
    component: GameComponent,
    canActivate: [AppGuard]
  },
  {
    path: 'game/home/:index',
    component: GameComponent,
    canActivate: [AppGuard]
  },
  {
    path: 'game/welcome',
    component: WelcomeComponent,
    canActivate: [AppGuard]
  },
  {
    path: 'game/changeTicket',
    component: ChangeTicketComponent,
    canActivate: [AppGuard]
   },
   {
    path: 'game/depot',
    component: DepoComponent,
    canActivate: [AppGuard]
  },
  {
    path: 'game/alert',
    component: AlertGameComponent
  },
  {
    path: 'game/fail',
    component: AlertGameComponent
  },
  {
    path: 'game/tools',
    component: ToolsGameComponent,
    canActivate: [AppGuard]
  },
  {
    path: 'game/ticket',
    component: TicketGameComponent,
    canActivate: [AppGuard]
  },
  {
    path: 'game/htiraj',
    component: HTirajGameComponent,
    canActivate: [AppGuard]
  },
  {
    path: 'game/keno',
    component: KenoGameComponent,
    canActivate: [AppGuard]
  },
  {
    path: 'game/tchala',
    component: TchalaGameComponent,
    canActivate: [AppGuard]
  },
  {
    path: 'game/prensip',
    component: PrensipGameComponent,
    canActivate: [AppGuard]
  },
  {
    path: 'game/hticket',
    component: HTicketGameComponent,
    canActivate: [AppGuard]
  },
  {
    path: 'game/ticket/:id',
    component: DetailsTicketGameComponent,
    canActivate: [AppGuard]
  },
  {
    path: 'game/notification',
    component: NotGameComponent,
    canActivate: [AppGuard]
  },
  {
    path: 'game/blackjack',
    component: PlayBJComponent,
    canActivate: [AppGuard]
  },
  {
    path: 'game/profil',
    component: ProfilGameComponent,
    canActivate: [AppGuard]
  },
  {
    path: 'game/cpass',
    component: CPassGameComponent,
    canActivate: [AppGuard]
  },
  {
    path: 'game/configPayout',
    component: ConfigPayoutComponent,
    canActivate: [AppGuard]
  },
  {
    path: 'game/payout',
    component: PayoutGameComponent,
    canActivate: [AppGuard]
  },
  {
    path: 'game/hretre',
    component: PastPayoutComponent,
    canActivate: [AppGuard]
  },
  {
    path: 'game/hdepo',
    component: HDepoGameComponent,
    canActivate: [AppGuard]
  },
  {
    path: 'game/cpayout',
    component: CPayoutComponent,
    canActivate: [AppGuard]
  },
  {
    path: 'game/valider',
    component: ValiderComponent,
    canActivate: [AppGuard]
  },
  {
    path: 'game/sponsor',
    component: SponsorComponent,
    canActivate: [AppGuard]
  },
  {
    path: 'game/krezimilyon',
    component: KreziMilyonComponent,
    canActivate: [AppGuard]
  },
  {
    path: 'game/fpass',
    component: FPassComponent
   },
   {
     path: 'game/nocredit',
     component: NoCreditComponent
   },
   {
    path: 'game/nocredit/:message',
    component: NoCreditComponent
   },
   {
    path: 'game/aide',
    component: AideComponent
   },
   {
    path: '**',
    component: LoginGameComponent,
   }
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class GameRoutingModule { }
