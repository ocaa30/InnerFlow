import { Component, inject } from '@angular/core';
import { ToastController, ModalController } from '@ionic/angular';
import { ArticleModalComponent } from '../article-modal.component';

@Component({
  selector: 'app-education',
  templateUrl: './education.page.html',
  styleUrls: ['./education.page.scss'],
  standalone: false
})
export class EducationPage {
  private toastCtrl = inject(ToastController);
  private modalCtrl = inject(ModalController);

  selectedSegment: string = 'siklus';

  // Menstrual cycle phases
  cyclePhases = [
    {
      name: 'Fase Menstruasi',
      days: 'Hari 1-5',
      description: 'Dinding rahim luruh. Tubuh melepaskan darah dan jaringan. Biasanya terjadi kram perut dan penurunan energi.',
      tips: 'Istirahat cukup, hindari makanan terlalu asin, gunakan kompres hangat.',
      icon: 'water-outline',
      color: '#ff6b81'
    },
    {
      name: 'Fase Folikuler',
      days: 'Hari 6-13',
      description: 'Otak mengirim sinyal untuk memproduksi folikel. Energi mulai meningkat dan mood jadi lebih baik.',
      tips: 'Waktu yang tepat untuk olahraga kardio ringan dan memulai aktivitas baru.',
      icon: 'leaf-outline',
      color: '#2ed573'
    },
    {
      name: 'Fase Ovulasi',
      days: 'Hari 14',
      description: 'Sel telur matang dilepaskan. Tingkat energi dan libido berada di puncaknya.',
      tips: 'Masa paling subur. Baik untuk bersosialisasi dan aktivitas fisik intens.',
      icon: 'sunny-outline',
      color: '#ffa502'
    },
    {
      name: 'Fase Luteal',
      days: 'Hari 15-28',
      description: 'Persiapan rahim jika terjadi kehamilan. Jika tidak, tubuh akan memicu PMS (sindrom pramenstruasi).',
      tips: 'Fokus pada relaksasi, yoga, dan penuhi asupan nutrisi seimbang untuk mengurangi PMS.',
      icon: 'moon-outline',
      color: '#5352ed'
    }
  ];

  reproductiveHealthArticles = [
    {
      title: 'Menjaga Kebersihan Area Kewanitaan',
      summary: 'Cara yang benar dalam merawat dan membersihkan area kewanitaan untuk mencegah infeksi.',
      fullContent: 'Menjaga kebersihan area kewanitaan adalah kunci penting untuk kesehatan reproduksi.\n\nSangat disarankan untuk membasuh area dari arah depan ke belakang agar bakteri dari anus tidak masuk ke vagina. Gunakan air bersih dan sabun lembut yang tidak mengandung parfum kuat.\n\nHindari penggunaan *pantyliner* setiap hari karena dapat membuat area tersebut menjadi lembap dan rentan akan pertumbuhan jamur. Jangan lupa untuk selalu mengganti pakaian dalam jika sudah terasa lembap.',
      image: 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
      readTime: '3 min read'
    },
    {
      title: 'Mengenal Pemeriksaan Pap Smear',
      summary: 'Kapan sebaiknya wanita melakukan pap smear dan apa kegunaannya?',
      fullContent: 'Pap Smear adalah prosedur medis singkat dan sederhana yang dilakukan untuk menguji kelainan sel pada leher rahim (serviks) wanita.\n\n**Kenapa ini penting?**\nMelalui pap smear, sel-sel abnormal yang berpotensi berubah menjadi kanker dapat dideteksi sejak dini (fase pra-kanker). Menemukan sel reproduksi abnormal pada tahap ini akan memberi peluang dan persentase kesembuhan yang jauh lebih besar sebelum berkembang menjadi kanker serviks.\n\n**Kapan harus melakukannya?**\nSecara medis, setiap wanita sangat disarankan untuk mulai rutin melakukan tes pap smear sejak usia 21 tahun, atau segera setelah aktif secara seksual. Normalnya, lakukan pengulangan pemeriksaan setiap 3 tahun sekali, atau mengikuti anjuran spesifik dokter kandungan Anda.',
      image: 'https://images.unsplash.com/photo-1542840410-3092f99611a3?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
      readTime: '5 min read'
    },
    {
      title: 'Pentingnya Vaksin HPV',
      summary: 'Vaksin HPV sebagai langkah pencegahan utama kanker serviks yang sangat dianjurkan.',
      fullContent: 'Vaksin HPV *(Human Papillomavirus)* adalah benteng pertahanan paling efektif terhadap infeksi virus HPV. Virus ini diketahui menjadi dalang di balik hampir 95% dari seluruh kasus kanker serviks secara global.\n\n**Bagaimana Vaksin Ini Bekerja?**\nVaksin mengenalkan protein virus yang sudah mati ke dalam aliran darah, memicu sistem imun tubuh untuk spesifik memproduksi antibodi. Jika suatu hari tubuh terpapar virus HPV sungguhan, antibodi penjaga ini akan langsung bereaksi dan mencegah virus tersebut menginfeksi sel reproduksi.\n\n**Kapan Waktu Terbaik Untuk Vaksin?**\nPerlindungan vaksin tercapai pada tingkat paling maksimal jika diberikan **sebelum** seseorang pernah terpapar virus (yakni sebelum aktif secara seksual). Badan Kesehatan Dunia (WHO) menggalakkan vaksinasi ini pada rentang usia remaja (usia 9 hingga 14 tahun). Walau begitu, bagi perempuan dewasa yang belum mendapatkan vaksin, tetap sangat dianjurkan untuk segera divaksinasi menyusul konsultasi medis.',
      image: 'https://images.unsplash.com/photo-1579684385127-1ef15d508118?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
      readTime: '4 min read'
    }
  ];

  specialTips = [
    {
      title: 'Pereda Kram Alami',
      content: 'Minum seduhan jahe hangat atau teh chamomile dapat membantu menenangkan otot rahim dan meredakan kram saat menstruasi.',
      icon: 'cafe-outline'
    },
    {
      title: 'Nutrisi Menstruasi',
      content: 'Perbanyak konsumsi makanan kaya zat besi (bayam, daging merah) dan magnesium (cokelat hitam) untuk mengganti darah yang keluar.',
      icon: 'restaurant-outline'
    },
    {
      title: 'Kesehatan Mental',
      content: 'Fluktuasi hormon bisa memicu mood swing. Luangkan waktu untuk "me time", meditasi, atau aktivitas yang Anda senangi.',
      icon: 'accessibility-outline'
    }
  ];


  segmentChanged(event: any) {
    this.selectedSegment = event.detail.value;
  }

  async openArticle(article: any) {
    const modal = await this.modalCtrl.create({
      component: ArticleModalComponent,
      componentProps: { data: article }
    });
    return await modal.present();
  }

  async openTip(tip: any) {
    const modal = await this.modalCtrl.create({
      component: ArticleModalComponent,
      componentProps: { data: tip }
    });
    return await modal.present();
  }
}
