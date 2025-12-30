import { Component, OnInit, inject } from '@angular/core'; // 修正這裡
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-survey-preview',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './survey-preview.component.html',
  styleUrl: './survey-preview.component.scss',
})
export class SurveyPreviewComponent implements OnInit {
  private router = inject(Router);

  previewData: any = null;
  showConfirmModal: boolean = false;
  showToast: boolean = false;

  private readonly displayMap: { [key: string]: string } = {
    ps: 'PlayStation 系列',
    xbox: 'Xbox 系列',
    switch: 'Nintendo Switch 1、2',
    pc: 'PC (桌上型/筆記型)',
    mobile: '行動裝置 (iOS/Android)',
    exclusive: '遊戲陣容與獨佔作品',
    performance: '主機效能與畫面表現',
    service: '訂閱制服務 (如 Game Pass)',
    hardware: '周邊硬體與擴充支援性',
    very: '非常願意',
    maybe: '視價格與內容而定',
    owned: '目前已擁有相關設備',
    no: '暫時沒有興趣',
    never: '完全不考慮 (容易暈眩/不便)',
    action: '動作冒險',
    rpg: '角色扮演（RPG）',
    fps: '第一人稱射擊 / 電競競技',
    sim: '模擬經營 / 策略益智',
  };

  ngOnInit(): void {
    this.previewData = history.state.data;

    if (!this.previewData) {
      alert('無預覽資料，將返回列表頁面');
      this.router.navigate(['/surveys']);
    }

    const navigation = window.history.state;
    if (navigation && navigation.data) {
      this.previewData = navigation.data;
      console.log('預覽頁收到的資料：', this.previewData);
    }
  }

  getDisplayValue(key: string): string {
    const rawValue = this.previewData?.[key];
    if (!rawValue || (Array.isArray(rawValue) && rawValue.length === 0))
      return '未填寫';
    if (Array.isArray(rawValue))
      return rawValue.map((val) => this.displayMap[val] || val).join('、');
    return this.displayMap[rawValue] || rawValue;
  }

  cancelAndBack(): void {
    const id = this.previewData?.id;
    if (id) {
      this.router.navigate(['/surveys', id, 'question'], {
        state: { data: this.previewData },
      });
    } else {
      this.router.navigate(['/surveys']);
    }
  }

  openSubmitModal(): void {
    this.showConfirmModal = true;
  }
  closeModal(): void {
    this.showConfirmModal = false;
  }

  finalSubmit(): void {
    this.showConfirmModal = false;
    this.showToast = true;
    setTimeout(() => {
      const id = this.previewData?.id || '6';
      this.router.navigate(['/surveys', id, 'result']);
    }, 1500);
  }
}
