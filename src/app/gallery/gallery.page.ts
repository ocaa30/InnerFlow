import { Component, AfterViewInit, ViewChild, ElementRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import Chart from 'chart.js/auto';

@Component({
  selector: 'app-gallery',
  templateUrl: './gallery.page.html',
  styleUrls: ['./gallery.page.scss'],
  standalone: true, // Pastikan ini true jika Anda menggunakan Ionic terbaru/Standalone Component
  imports: [IonicModule, CommonModule, FormsModule]
})
export class GalleryPage implements AfterViewInit {
  @ViewChild('lineCanvas') private lineCanvas!: ElementRef;
  @ViewChild('doughnutCanvas') private doughnutCanvas!: ElementRef;

  lineChart: any;
  doughnutChart: any;

  constructor() {}

  ngAfterViewInit() {
    this.createLineChart();
    this.createDoughnutChart();
  }

  createLineChart() {
    this.lineChart = new Chart(this.lineCanvas.nativeElement, {
      type: 'line',
      data: {
        labels: ['Okt', 'Nov', 'Des', 'Jan', 'Feb', 'Mar'],
        datasets: [
          {
            label: 'Durasi Siklus (Hari)',
            data: [28, 29, 28, 30, 27, 28],
            backgroundColor: 'rgba(255, 64, 129, 0.2)', // ion-color-primary
            borderColor: 'rgba(255, 64, 129, 1)',
            borderWidth: 2,
            pointBackgroundColor: 'rgba(156, 39, 176, 1)', // ion-color-secondary
            tension: 0.4, // smooth curves
            fill: true
          }
        ]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: { display: false }
        },
        scales: {
          y: {
            beginAtZero: false,
            min: 20,
            max: 35
          }
        }
      }
    });
  }

  createDoughnutChart() {
    this.doughnutChart = new Chart(this.doughnutCanvas.nativeElement, {
      type: 'doughnut',
      data: {
        labels: ['Pendarahan Ringan', 'Sedang', 'Berat'],
        datasets: [{
          data: [3, 10, 2],
          backgroundColor: [
            'rgba(255, 206, 86, 0.8)',
            'rgba(255, 64, 129, 0.8)',
            'rgba(156, 39, 176, 0.8)'
          ],
          borderWidth: 0
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        cutout: '70%',
      }
    });
  }
}