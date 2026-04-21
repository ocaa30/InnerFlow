import { Component, Input, inject, OnInit } from '@angular/core';
import { ModalController, IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CycleService, DailyLog } from './services/cycle.service';

@Component({
  selector: 'app-log-modal',
  template: `
    <ion-header class="ion-no-border">
      <ion-toolbar>
        <ion-title class="title-main">Catat Harian</ion-title>
        <ion-buttons slot="end">
          <ion-button (click)="close()">
            <ion-icon name="close-circle" style="font-size: 28px; color: var(--ion-color-medium);"></ion-icon>
          </ion-button>
        </ion-buttons>
      </ion-toolbar>
    </ion-header>

    <ion-content class="ion-padding custom-modal-content">
      <div class="date-header">
        <ion-icon name="calendar-clear-outline"></ion-icon>
        <h3 class="subtitle-main" style="margin: 0;">{{ date | date:'fullDate' }}</h3>
      </div>
      
      <div class="log-section">
        <p class="section-label">
          <ion-icon name="water-outline" color="danger"></ion-icon>
          Aliran Haid
        </p>
        <div class="chips-container">
          <ion-chip [outline]="logData.flow !== 'Ringan'" (click)="logData.flow = 'Ringan'" color="danger">Ringan</ion-chip>
          <ion-chip [outline]="logData.flow !== 'Sedang'" (click)="logData.flow = 'Sedang'" color="danger">Sedang</ion-chip>
          <ion-chip [outline]="logData.flow !== 'Berat'" (click)="logData.flow = 'Berat'" color="danger">Berat</ion-chip>
        </div>
      </div>

      <div class="log-section">
        <p class="section-label">
          <ion-icon name="fitness-outline" color="primary"></ion-icon>
          Gejala Fisik
        </p>
        <div class="chips-container">
          <ion-chip [outline]="!hasSymptom('Kram')" (click)="toggleSymptom('Kram')" color="primary">Kram Perut</ion-chip>
          <ion-chip [outline]="!hasSymptom('Jerawat')" (click)="toggleSymptom('Jerawat')" color="primary">Jerawat</ion-chip>
          <ion-chip [outline]="!hasSymptom('Pusing')" (click)="toggleSymptom('Pusing')" color="primary">Pusing</ion-chip>
          <ion-chip [outline]="!hasSymptom('Kembung')" (click)="toggleSymptom('Kembung')" color="primary">Kembung</ion-chip>
          <ion-chip [outline]="!hasSymptom('Lelah')" (click)="toggleSymptom('Lelah')" color="primary">Lelah</ion-chip>
        </div>
      </div>

      <div class="log-section">
        <p class="section-label">
          <ion-icon name="happy-outline" color="tertiary"></ion-icon>
          Suasana Hati
        </p>
        <div class="chips-container">
          <ion-chip [outline]="logData.mood !== 'Senang'" (click)="logData.mood = 'Senang'" color="tertiary">😊 Senang</ion-chip>
          <ion-chip [outline]="logData.mood !== 'Sensitif'" (click)="logData.mood = 'Sensitif'" color="tertiary">🥺 Sensitif</ion-chip>
          <ion-chip [outline]="logData.mood !== 'Marah'" (click)="logData.mood = 'Marah'" color="tertiary">😠 Marah</ion-chip>
          <ion-chip [outline]="logData.mood !== 'Sedih'" (click)="logData.mood = 'Sedih'" color="tertiary">😢 Sedih</ion-chip>
        </div>
      </div>

      <div class="log-section">
        <p class="section-label">
          <ion-icon name="bed-outline" color="secondary"></ion-icon>
          Kualitas Tidur
        </p>
        <div class="chips-container">
          <ion-chip [outline]="logData.sleepQuality !== 'Buruk'" (click)="logData.sleepQuality = 'Buruk'" color="secondary">Buruk</ion-chip>
          <ion-chip [outline]="logData.sleepQuality !== 'Cukup'" (click)="logData.sleepQuality = 'Cukup'" color="secondary">Cukup</ion-chip>
          <ion-chip [outline]="logData.sleepQuality !== 'Sangat Baik'" (click)="logData.sleepQuality = 'Sangat Baik'" color="secondary">Sangat Baik</ion-chip>
        </div>
      </div>

      <div class="log-section">
        <p class="section-label">
          <ion-icon name="water" color="medium"></ion-icon>
          Cairan Serviks
        </p>
        <div class="chips-container">
          <ion-chip [outline]="logData.cervicalMucus !== 'Kering'" (click)="logData.cervicalMucus = 'Kering'" color="medium">Kering</ion-chip>
          <ion-chip [outline]="logData.cervicalMucus !== 'Lengket'" (click)="logData.cervicalMucus = 'Lengket'" color="medium">Lengket</ion-chip>
          <ion-chip [outline]="logData.cervicalMucus !== 'Putih Telur'" (click)="logData.cervicalMucus = 'Putih Telur'" color="medium">Putih Telur</ion-chip>
        </div>
      </div>

      <div class="log-section">
        <p class="section-label">
          <ion-icon name="heart-half-outline" color="danger"></ion-icon>
          Aktivitas Seksual
        </p>
        <div class="chips-container">
          <ion-chip [outline]="logData.intimacy !== 'Terlindungi'" (click)="logData.intimacy = 'Terlindungi'" color="danger">Terlindungi</ion-chip>
          <ion-chip [outline]="logData.intimacy !== 'Tidak Terlindungi'" (click)="logData.intimacy = 'Tidak Terlindungi'" color="danger">Tidak Terlindungi</ion-chip>
          <ion-chip [outline]="logData.intimacy !== 'Tidak Ada'" (click)="logData.intimacy = 'Tidak Ada'" color="danger">Tidak Ada</ion-chip>
        </div>
      </div>

      <div class="log-section">
        <p class="section-label">
          <ion-icon name="thermometer-outline" color="warning"></ion-icon>
          Suhu Basal Tubuh (BBT)
        </p>
        <div class="input-container">
          <ion-input type="number" [(ngModel)]="logData.basalTemperature" placeholder="Misal: 36.5" class="custom-input"></ion-input>
          <span class="unit">°C</span>
        </div>
      </div>
    </ion-content>

    <ion-footer class="ion-no-border">
      <div class="footer-container">
        <ion-button expand="block" class="action-btn" (click)="save()">
          <ion-icon name="checkmark-circle-outline" slot="start"></ion-icon>
          Simpan Catatan
        </ion-button>
      </div>
    </ion-footer>
  `,
  styles: [`
    .custom-modal-content { --background: #fcfcfc; }
    .date-header { display: flex; align-items: center; gap: 12px; margin-bottom: 24px; padding-bottom: 16px; border-bottom: 1px solid rgba(0,0,0,0.05); }
    .date-header ion-icon { font-size: 24px; color: var(--ion-color-primary); }
    
    .log-section { margin-bottom: 24px; background: white; padding: 16px; border-radius: 16px; box-shadow: 0 4px 12px rgba(0,0,0,0.02); }
    .section-label { font-weight: 600; color: var(--ion-color-dark); margin-top: 0; margin-bottom: 14px; display: flex; align-items: center; gap: 8px; font-size: 15px; }
    .section-label ion-icon { font-size: 20px; }
    
    .chips-container { display: flex; flex-wrap: wrap; gap: 10px; }
    ion-chip { border-radius: 12px; font-weight: 500; font-size: 14px; margin: 0; padding: 0 14px; height: 36px; }
    
    .input-container { display: flex; align-items: center; background: rgba(0,0,0,0.03); border-radius: 12px; padding: 0 16px; margin-top: 8px; }
    .custom-input { --padding-start: 0; font-weight: 500; }
    .unit { font-weight: 600; color: var(--ion-color-medium); margin-left: 8px; }
    
    .footer-container { padding: 16px 20px 24px 20px; background: white; box-shadow: 0 -4px 20px rgba(0,0,0,0.04); }
    .action-btn { --background: linear-gradient(135deg, var(--ion-color-tertiary), var(--ion-color-primary)); --border-radius: 100px; color: var(--ion-color-dark); font-weight: 600; height: 50px; margin: 0; }
  `],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule]
})
export class LogModalComponent implements OnInit {
  private modalCtrl = inject(ModalController);
  private cycleService = inject(CycleService);

  @Input() date!: string;
  logData: DailyLog = { date: '' };

  ngOnInit() {
    this.logData.date = this.date;
    const existingLog = this.cycleService.getLog(this.date);
    if(existingLog) {
      this.logData = { ...existingLog };
    }
    if(!this.logData.symptoms) this.logData.symptoms = [];
  }

  hasSymptom(s: string) {
    return this.logData.symptoms?.includes(s);
  }

  toggleSymptom(s: string) {
    if(!this.logData.symptoms) this.logData.symptoms = [];
    const idx = this.logData.symptoms.indexOf(s);
    if(idx > -1) {
      this.logData.symptoms.splice(idx, 1);
    } else {
      this.logData.symptoms.push(s);
    }
  }

  save() {
    this.cycleService.saveLog(this.date, this.logData);
    this.modalCtrl.dismiss({ saved: true });
  }

  close() {
    this.modalCtrl.dismiss();
  }
}
