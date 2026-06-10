import { Component, inject, OnInit } from '@angular/core';
import { ModalController, IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CycleService, UserSettings } from './services/cycle.service';

@Component({
  selector: 'app-profil-modal',
  template: `
    <ion-header class="ion-no-border">
      <ion-toolbar>
        <ion-title class="title-main">Pengaturan Profil</ion-title>
        <ion-buttons slot="end">
          <ion-button (click)="close()">
            <ion-icon name="close-circle" style="font-size: 28px; color: var(--ion-color-medium);"></ion-icon>
          </ion-button>
        </ion-buttons>
      </ion-toolbar>
    </ion-header>

    <ion-content class="ion-padding custom-modal-content">
      <div class="date-header">
        <ion-icon name="person-circle-outline"></ion-icon>
        <h3 class="subtitle-main" style="margin: 0;">Data Diri & Siklus</h3>
      </div>
      <p style="color: #666; font-size: 0.9rem; margin-bottom: 24px;">Guna memberikan prediksi haid yang akurat, mohon isi data rat-rata siklus Anda di sini.</p>
      
      <div class="log-section">
        <p class="section-label">
          <ion-icon name="water-outline" color="danger"></ion-icon>
          Tanggal Haid Terakhir
        </p>
        <div class="input-container" style="padding: 10px;">
          <ion-datetime-button datetime="lastPeriodDatetime"></ion-datetime-button>
          
          <ion-modal [keepContentsMounted]="true">
            <ng-template>
              <ion-datetime 
                id="lastPeriodDatetime"
                presentation="date"
                [(ngModel)]="settings.lastPeriodDate"
                [showDefaultButtons]="true">
              </ion-datetime>
            </ng-template>
          </ion-modal>
        </div>
      </div>

      <div class="log-section">
        <p class="section-label">
          <ion-icon name="sync-outline" color="primary"></ion-icon>
          Panjang Siklus (Hari)
        </p>
        <p style="font-size: 0.8rem; color:#888; margin-top:-8px; margin-bottom:8px">Jarak dari haid pertama ke haid bulan berikutnya.</p>
        <div class="input-container">
          <ion-input type="number" [(ngModel)]="settings.cycleLength" class="custom-input"></ion-input>
          <span class="unit">Hari</span>
        </div>
      </div>

      <div class="log-section">
        <p class="section-label">
          <ion-icon name="medical-outline" color="secondary"></ion-icon>
          Lama Pendarahan (Hari)
        </p>
        <div class="input-container">
          <ion-input type="number" [(ngModel)]="settings.periodLength" class="custom-input"></ion-input>
          <span class="unit">Hari</span>
        </div>
      </div>

    </ion-content>

    <ion-footer class="ion-no-border">
      <div class="footer-container">
        <ion-button expand="block" class="action-btn" (click)="save()">
          <ion-icon name="save-outline" slot="start"></ion-icon>
          Simpan Profil
        </ion-button>
      </div>
    </ion-footer>
  `,
  styles: [`
    .custom-modal-content { --background: #fcfcfc; }
    .date-header { display: flex; align-items: center; gap: 12px; margin-bottom: 10px; padding-bottom: 16px; border-bottom: 1px solid rgba(0,0,0,0.05); }
    .date-header ion-icon { font-size: 28px; color: var(--ion-color-primary); }
    
    .log-section { margin-bottom: 24px; background: white; padding: 16px; border-radius: 16px; box-shadow: 0 4px 12px rgba(0,0,0,0.02); }
    .section-label { font-weight: 700; color: var(--ion-color-dark); margin-top: 0; margin-bottom: 14px; display: flex; align-items: center; gap: 8px; font-size: 15px; }
    .section-label ion-icon { font-size: 20px; }
    
    .input-container { display: flex; align-items: center; background: rgba(0,0,0,0.03); border-radius: 12px; padding: 0 16px; margin-top: 8px; height: 50px;}
    .custom-input { --padding-start: 0; font-weight: 600; font-size: 1.1rem;}
    .unit { font-weight: 600; color: var(--ion-color-medium); margin-left: 8px; }
    
    .footer-container { padding: 16px 20px 24px 20px; background: white; box-shadow: 0 -4px 20px rgba(0,0,0,0.04); }
    .action-btn { --background: linear-gradient(135deg, var(--ion-color-primary), var(--ion-color-secondary)); --border-radius: 100px; color: white; font-weight: 600; height: 50px; margin: 0; }
  `],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule]
})
export class ProfilModalComponent implements OnInit {
  private modalCtrl = inject(ModalController);
  private cycleService = inject(CycleService);

  settings: UserSettings = {
    cycleLength: 28,
    periodLength: 5,
    lastPeriodDate: new Date().toISOString()
  };

  ngOnInit() {
    this.settings = { ...this.cycleService.getSettings() };
  }

  save() {
    // If the datetime component returns a timestamp rather than YYYY-MM-DD
    if (this.settings.lastPeriodDate.includes('T')) {
      this.settings.lastPeriodDate = this.settings.lastPeriodDate.split('T')[0];
    }
    
    this.cycleService.saveSettings(this.settings);
    this.modalCtrl.dismiss({ saved: true });
  }

  close() {
    this.modalCtrl.dismiss();
  }
}
