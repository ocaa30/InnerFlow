import { Component, NgZone } from '@angular/core';
import { Location } from '@angular/common';
import { Platform, AlertController } from '@ionic/angular';
import { App } from '@capacitor/app';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
  standalone: false,
})
export class AppComponent {
  constructor(
    private platform: Platform,
    private location: Location,
    private alertController: AlertController,
    private zone: NgZone
  ) {
    this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      // Mendengarkan event tombol back hardware di Android
      App.addListener('backButton', (data) => {
        // Menjalankan di dalam zone Angular agar navigasi dan UI update tersinkronisasi
        this.zone.run(() => {
          const path = window.location.pathname;

          // Jika berada di root/home atau history native tidak ada, tampilkan konfirmasi
          // Silakan sesuaikan '/' atau '/home' dengan rute utama di aplikasi Anda
          const isAtRoot = path === '/' || path === '/home' || path === '/tabs/tab1' || !data.canGoBack;
          
          if (isAtRoot) {
            this.showExitConfirm();
          } else {
            // Berada di sub-halaman, mundur satu langkah di history
            this.location.back();
          }
        });
      });
    });
  }

  async showExitConfirm() {
    const alert = await this.alertController.create({
      header: 'Konfirmasi Keluar',
      message: 'Apakah Anda yakin ingin menutup aplikasi?',
      buttons: [
        {
          text: 'Batal',
          role: 'cancel'
        },
        {
          text: 'Keluar',
          handler: () => {
             App.exitApp();
          }
        }
      ]
    });

    await alert.present();
  }
}
