import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { GalleryPageRoutingModule } from './gallery-routing.module';
import { GalleryPage } from './gallery.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    GalleryPageRoutingModule,
    GalleryPage // Masukkan ke sini karena dia Standalone
  ],
  declarations: [] // KOSONGKAN INI, JANGAN ADA GalleryPage DI SINI
})
export class GalleryPageModule {}