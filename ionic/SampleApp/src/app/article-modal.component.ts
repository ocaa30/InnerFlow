import { Component, Input, inject } from '@angular/core';
import { ModalController, IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';

interface ModalData {
  title: string;
  summary?: string;
  fullContent?: string;
  content?: string;
  readTime?: string;
  image?: string;
}

@Component({
  selector: 'app-article-modal',
  template: `
    <ion-header class="ion-no-border">
      <ion-toolbar color="transparent" style="position: absolute; top: 0; width: 100%; z-index: 10;">
        <ion-buttons slot="start">
          <ion-button (click)="close()" class="glass-btn">
            <ion-icon name="arrow-back" color="dark"></ion-icon>
          </ion-button>
        </ion-buttons>
      </ion-toolbar>
    </ion-header>

    <ion-content [fullscreen]="true" class="article-content">
      <div class="hero-image" [style.background-image]="data.image ? 'url(' + data.image + ')' : 'linear-gradient(135deg, var(--ion-color-primary), var(--ion-color-secondary))'">
        <div class="overlay"></div>
      </div>
      
      <div class="content-body glass-card">
        <div class="header-pill" *ngIf="data.readTime">
          <ion-icon name="time-outline"></ion-icon> {{ data.readTime }}
        </div>
        
        <h1 class="article-title">{{ data.title }}</h1>
        
        <div class="article-text" [innerHTML]="formatContent(data.fullContent || data.summary || data.content)"></div>
      </div>
    </ion-content>
  `,
  styles: [`
    .glass-btn {
      --background: rgba(255,255,255,0.7);
      --border-radius: 50%;
      backdrop-filter: blur(10px);
      width: 44px;
      height: 44px;
      margin: 8px;
    }
    
    .article-content {
      --background: var(--bg-gradient, linear-gradient(135deg, #fce4ec 0%, #f3e5f5 100%));
    }

    .hero-image {
      width: 100%;
      height: 35vh;
      background-size: cover;
      background-position: center;
      position: relative;
    }

    .overlay {
      position: absolute;
      bottom: 0;
      width: 100%;
      height: 50%;
      background: linear-gradient(to bottom, transparent, rgba(0,0,0,0.1));
    }

    .content-body {
      margin: -40px 16px 30px 16px;
      padding: 24px 20px;
      position: relative;
      z-index: 5;
      background: rgba(255, 255, 255, 0.8) !important;
      min-height: 50vh;
    }

    .header-pill {
      display: inline-flex;
      align-items: center;
      gap: 6px;
      background: rgba(255, 64, 129, 0.1);
      color: var(--ion-color-primary);
      padding: 6px 12px;
      border-radius: 20px;
      font-size: 0.85rem;
      font-weight: 600;
      margin-bottom: 16px;
    }

    .article-title {
      font-family: 'Inter', sans-serif;
      font-weight: 800;
      font-size: 1.6rem;
      color: var(--ion-color-dark);
      margin-top: 0;
      margin-bottom: 20px;
      line-height: 1.3;
    }

    .article-text {
      font-size: 1.05rem;
      color: #444;
      line-height: 1.7;
    }

    /* Target inner HTML paragraph spacing */
    ::ng-deep .article-text p {
      margin-bottom: 16px;
    }
  `],
  standalone: true,
  imports: [IonicModule, CommonModule]
})
export class ArticleModalComponent {
  private modalCtrl = inject(ModalController);
  @Input() data!: ModalData;

  formatContent(text: string | undefined): string {
    if (!text) return '';
    // Konversi newline (\n) menjadi tag paragraf untuk data sederhana
    const paragraphs = text.split('\n\n').filter(p => p.trim() !== '');
    return paragraphs.map(p => `<p>${p.replace(/\n/g, '<br>')}</p>`).join('');
  }

  close() {
    this.modalCtrl.dismiss();
  }
}
