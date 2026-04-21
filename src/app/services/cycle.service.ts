import { Injectable } from '@angular/core';

export interface DailyLog {
  date: string; // YYYY-MM-DD
  flow?: 'Ringan' | 'Sedang' | 'Berat';
  symptoms?: string[];
  mood?: string;
  intimacy?: 'Terlindungi' | 'Tidak Terlindungi' | 'Tidak Ada';
  cervicalMucus?: 'Kering' | 'Lengket' | 'Putih Telur';
  sleepQuality?: 'Buruk' | 'Cukup' | 'Sangat Baik';
  basalTemperature?: number;
}

export interface UserSettings {
  cycleLength: number; // Rata-rata siklus (misal 28 hari)
  periodLength: number; // Rata-rata lama haid (misal 5 hari)
  lastPeriodDate: string; // YYYY-MM-DD
}

@Injectable({
  providedIn: 'root'
})
export class CycleService {
  private STORAGE_KEY_LOGS = 'kalender_haid_logs';
  private STORAGE_KEY_SETTINGS = 'kalender_haid_settings';

  private defaultSettings: UserSettings = {
    cycleLength: 28,
    periodLength: 5,
    lastPeriodDate: new Date().toISOString().split('T')[0] // Default hari ini
  };

  constructor() { }

  getSettings(): UserSettings {
    const data = localStorage.getItem(this.STORAGE_KEY_SETTINGS);
    if (data) {
      return JSON.parse(data);
    }
    return this.defaultSettings;
  }

  saveSettings(settings: UserSettings) {
    localStorage.setItem(this.STORAGE_KEY_SETTINGS, JSON.stringify(settings));
  }

  getLogs(): Record<string, DailyLog> {
    const data = localStorage.getItem(this.STORAGE_KEY_LOGS);
    if (data) {
      return JSON.parse(data);
    }
    return {};
  }

  saveLog(date: string, log: DailyLog) {
    const logs = this.getLogs();
    logs[date] = log;
    localStorage.setItem(this.STORAGE_KEY_LOGS, JSON.stringify(logs));
  }

  getLog(date: string): DailyLog | null {
    const logs = this.getLogs();
    return logs[date] || null;
  }

  calculatePredictions() {
    const settings = this.getSettings();
    const lastDate = new Date(settings.lastPeriodDate);
    
    // Perkiraan Haid Berikutnya = Tanggal Terakhir + Siklus
    const nextPeriodDate = new Date(lastDate);
    nextPeriodDate.setDate(lastDate.getDate() + settings.cycleLength);

    // Ovulasi = Haid Berikutnya - 14 Hari
    const ovulationDate = new Date(nextPeriodDate);
    ovulationDate.setDate(nextPeriodDate.getDate() - 14);

    // Masa Subur = Ovulasi - 5 hari sampai Ovulasi + 1 hari
    const fertilityStart = new Date(ovulationDate);
    fertilityStart.setDate(ovulationDate.getDate() - 5);

    const fertilityEnd = new Date(ovulationDate);
    fertilityEnd.setDate(ovulationDate.getDate() + 1);

    return {
      nextPeriod: nextPeriodDate.toISOString().split('T')[0],
      ovulation: ovulationDate.toISOString().split('T')[0],
      fertilityStart: fertilityStart.toISOString().split('T')[0],
      fertilityEnd: fertilityEnd.toISOString().split('T')[0],
    };
  }
}
