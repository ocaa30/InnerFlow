import { Component, OnInit, inject } from '@angular/core';
import { IonicModule, ModalController } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CycleService, UserSettings } from '../services/cycle.service';
import { LogModalComponent } from '../log-modal.component';
import { ProfilModalComponent } from '../profil-modal.component';

interface Predictions {
  nextPeriod: string;
  ovulation: string;
  fertilityStart: string;
  fertilityEnd: string;
}

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule]
})
export class HomePage implements OnInit {
  private cycleService = inject(CycleService);
  private modalCtrl = inject(ModalController);

  settings!: UserSettings;
  predictions!: Predictions;
  daysUntilPeriod: number = 0;
  cycleDay: number = 1;
  isFertile: boolean = false;
  ringProgress: number = 0;
  isLate: boolean = false;

  async openLogModal() {
    const todayStr = new Date().toISOString().split('T')[0];
    const modal = await this.modalCtrl.create({
      component: LogModalComponent,
      componentProps: { date: todayStr },
      breakpoints: [0, 0.6, 0.9],
      initialBreakpoint: 0.6
    });
    await modal.present();
  }

  async openProfilModal() {
    const modal = await this.modalCtrl.create({
      component: ProfilModalComponent,
      breakpoints: [0, 0.75, 1],
      initialBreakpoint: 0.75
    });
    
    await modal.present();
    
    const { data } = await modal.onWillDismiss();
    if (data?.saved) {
      this.loadData();
    }
  }

  ngOnInit() {
    this.loadData();
  }

  ionViewWillEnter() {
    this.loadData();
  }

  loadData() {
    this.settings = this.cycleService.getSettings();
    this.predictions = this.cycleService.calculatePredictions();
    
    const today = new Date();
    // Normalize time to midnight for accurate day calculation
    today.setHours(0, 0, 0, 0);

    const lastPeriod = new Date(this.settings.lastPeriodDate);
    lastPeriod.setHours(0, 0, 0, 0);

    const nextPeriod = new Date(this.predictions.nextPeriod);
    nextPeriod.setHours(0, 0, 0, 0);
    
    // Hitung hari siklus saat ini
    const diffTime = today.getTime() - lastPeriod.getTime();
    this.cycleDay = Math.floor(diffTime / (1000 * 60 * 60 * 24)) + 1; // +1 karena hari referensi
    
    // Hitung hari menuju haid berikutnya
    const diffNext = nextPeriod.getTime() - today.getTime();
    this.daysUntilPeriod = Math.ceil(diffNext / (1000 * 60 * 60 * 24));
    
    // Cek masa subur
    const fertStart = new Date(this.predictions.fertilityStart);
    fertStart.setHours(0,0,0,0);
    const fertEnd = new Date(this.predictions.fertilityEnd);
    fertEnd.setHours(0,0,0,0);
    
    if(today.getTime() >= fertStart.getTime() && today.getTime() <= fertEnd.getTime()) {
      this.isFertile = true;
    } else {
      this.isFertile = false;
    }

    // Hitung persentase cincin progres
    let rawProgress = (this.cycleDay / this.settings.cycleLength) * 100;
    this.ringProgress = Math.min(100, Math.max(0, rawProgress));
    
    // Status Terlambat
    this.isLate = this.daysUntilPeriod < 0;
    if (this.isLate) {
        this.ringProgress = 100; // Penuh jika terlambat
    }
  }

  // Helper untuk formatting UI lingkaran
  get strokeDashoffset() {
    const circumference = 2 * Math.PI * 120; // 120 adalah r=120 pada circle SVG
    return circumference - (this.ringProgress / 100) * circumference;
  }
}