import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HeadGameComponent } from '../Game/head-game/head-game.component';

@NgModule({
  declarations: [HeadGameComponent],
  imports: [
    CommonModule
  ],
  exports: [HeadGameComponent]
})
export class HeaderGameModule { }