import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { HomePage } from './home.page'; // Import komponennya

import { HomePageRoutingModule } from './home-routing.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    HomePageRoutingModule,
    HomePage // <--- PINDAHKAN KE SINI KARENA STANDALONE
  ],
  declarations: [] // <--- KOSONGKAN INI
})
export class HomePageModule {}