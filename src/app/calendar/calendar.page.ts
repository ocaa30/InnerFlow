import { Component, OnInit, inject } from '@angular/core';
import { CycleService } from '../services/cycle.service';
import { ModalController } from '@ionic/angular';
import { LogModalComponent } from '../log-modal.component';

import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.page.html',
  styleUrls: ['./calendar.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule]
})
export class CalendarPage implements OnInit {
  private cycleService = inject(CycleService);
  private modalCtrl = inject(ModalController);

  highlightedDates: any[] = [];
  selectedDate: string = new Date().toISOString();
  predictions: any;
  settings: any;

  ngOnInit() {
    this.loadCalendarData();
  }

  ionViewWillEnter() {
    this.loadCalendarData();
  }

  loadCalendarData() {
    this.predictions = this.cycleService.calculatePredictions();
    this.settings = this.cycleService.getSettings();
    this.highlightedDates = [];

    // Tambahkan prediksi masa subur
    const fertStart = new Date(this.predictions.fertilityStart);
    const fertEnd = new Date(this.predictions.fertilityEnd);
    
    for (let d = new Date(fertStart); d <= fertEnd; d.setDate(d.getDate() + 1)) {
      this.highlightedDates.push({
        date: d.toISOString().split('T')[0],
        textColor: '#ffffff',
        backgroundColor: 'var(--ion-color-success)',
      });
    }

    // Tambahkan diprediksi Haid
    const nextPeriod = new Date(this.predictions.nextPeriod);
    const settings = this.cycleService.getSettings();
    for (let i = 0; i < settings.periodLength; i++) {
        let pDate = new Date(nextPeriod);
        pDate.setDate(pDate.getDate() + i);
        this.highlightedDates.push({
            date: pDate.toISOString().split('T')[0],
            textColor: '#ffffff',
            backgroundColor: 'var(--ion-color-danger)',
        });
    }

    // Tambahkan indikator untuk hari yang punya catatan gejala
    const logs = this.cycleService.getLogs();
    for (const dateKey in logs) {
      if (logs.hasOwnProperty(dateKey)) {
        // Cek apakah hari ini sudah di-highlight (masa subur/haid)
        const isAlreadyHighlighted = this.highlightedDates.find(h => h.date === dateKey);
        if(!isAlreadyHighlighted) {
           // Highlight dengan ring warna biru jika cuma ada catatan
           this.highlightedDates.push({
             date: dateKey,
             textColor: '#ffffff',
             backgroundColor: 'var(--ion-color-primary)', // Warna catatan
           });
        }
      }
    }
  }

  async openLogModal(dateStr: string) {
    // Normalisasi dateStr ke YYYY-MM-DD
    const normDate = dateStr.split('T')[0];
    const modal = await this.modalCtrl.create({
      component: LogModalComponent,
      componentProps: {
        date: normDate
      },
      breakpoints: [0, 0.5, 0.85],
      initialBreakpoint: 0.85
    });
    
    modal.onDidDismiss().then(() => {
        // Refresh kalender setelah modal ditutup agar catatan baru muncul
        this.loadCalendarData();
    });

    await modal.present();
  }

  onDateChange(event: any) {
    this.selectedDate = event.detail.value;
  }
}
