    import { Component, OnInit, AfterViewInit, inject } from '@angular/core';
    import { CommonModule } from '@angular/common';
    import { ActivatedRoute, Router } from '@angular/router';
    import { FormsModule } from '@angular/forms';
    import { Chart, registerables } from 'chart.js';

    Chart.register(...registerables);

    @Component({
    selector: 'app-survey-result',
    standalone: true,
    imports: [CommonModule, FormsModule],
    templateUrl: './survey-result.component.html',
    styleUrl: './survey-result.component.scss',
    })
    export class SurveyResultComponent implements OnInit, AfterViewInit {
    private route = inject(ActivatedRoute);
    private router = inject(Router);

    surveyId: string | null = null;
    surveyResult: any = null;

    // Modal 控制狀態
    isModalOpen: boolean = false;
    step: number = 1;        // 1=詢問, 2=填寫, 3=完成
    userEmail: string = '';
    isSubscribed: boolean = false;

    ngOnInit(): void {
        this.surveyId = this.route.snapshot.paramMap.get('surveyId');
        this.loadSurveyResult();
    }

    ngAfterViewInit(): void {
        setTimeout(() => {
        this.initQ1Chart();
        }, 100);
    }

    loadSurveyResult(): void {
        // 同步 SurveyService 中的題目內容
        this.surveyResult = {
        title: '87世紀遊戲主機／平台市場調查',
        totalResponses: 1187,
        stats: {
            // Q2: 您選擇遊戲平台時重視哪些因素？（可複選）
            q2: [
            { label: '遊戲陣容與獨佔作品', percent: 72.4, count: 859 },
            { label: '主機效能與畫面表現', percent: 61.5, count: 731 },
            { label: '訂閱制服務 (如 Game Pass)', percent: 45.8, count: 544 },
            { label: '周邊硬體與擴充支援性', percent: 20.3, count: 241 }
            ],
            // Q3: 您是否願意嘗試支援 VR / AR 的遊戲主機？
            q3: [
            { label: '非常願意', percent: 15.2, count: 180 },
            { label: '視價格與內容而定', percent: 42.1, count: 500 },
            { label: '目前已擁有相關設備', percent: 8.4, count: 100 },
            { label: '暫時沒有興趣', percent: 21.3, count: 253 },
            { label: '完全不考慮 (容易暈眩/不便)', percent: 13.0, count: 154 }
            ],
            // Q4: 您最常遊玩的遊戲類型為？（可複選）
            q4: [
            { label: '動作冒險', percent: 68.1, count: 808 },
            { label: '角色扮演（RPG）', percent: 59.2, count: 703 },
            { label: '第一人稱射擊 / 電競競技', percent: 42.5, count: 504 },
            { label: '模擬經營 / 策略益智', percent: 25.4, count: 301 }
            ],
        },
        };
    }

   initQ1Chart(): void {
    const canvas = document.getElementById('q1PieChart') as HTMLCanvasElement;
    if (!canvas) return;

    // 計算總數，用來換算百分比
    const dataPoints = [445, 285, 210, 147, 100];
    const total = dataPoints.reduce((a, b) => a + b, 0);

    new Chart(canvas, {
      type: 'doughnut',
      data: {
        labels: ['行動裝置', 'PS', 'Switch', 'Xbox', 'PC'],
        datasets: [
          {
            data: dataPoints,
            backgroundColor: ['#a55eea', '#6366f1', '#ff4757', '#22c55e', '#ffa502'],
            borderWidth: 2,           // 增加一點邊框感，浮動時更明顯
            borderColor: '#ffffff',
            hoverOffset: 20,          // 【關鍵】滑鼠移入時，該區塊會向外彈出 20px
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        cutout: '55%',
        layout: {
          padding: 20 // 因為有 hoverOffset，增加內距防止圖表彈出畫布邊界
        },
        plugins: { 
          legend: { display: false },
          tooltip: {
            backgroundColor: 'rgba(0, 0, 0, 0.8)',
            padding: 12,
            callbacks: {
              // 【關鍵】自定義顯示單位
              label: (context) => {
                const value = context.parsed; // 數值
                const percentage = ((value / total) * 100).toFixed(1); // 計算百分比
                return ` 投票人數: ${value} 人 (${percentage}%)`;
              }
            }
          }
        },
        // 增加動畫平滑度
        animation: {
          animateRotate: true,
          animateScale: true
        }
      },
    });
  }

    handleSubscribe(): void {
        if (this.userEmail && this.userEmail.includes('@')) {
        this.step = 3;
        this.isSubscribed = true;
        setTimeout(() => {
            this.closeModal();
        }, 2000);
        }
    }

    closeModal(): void {
        this.isModalOpen = false;
        setTimeout(() => {
        this.step = 1;
        this.userEmail = '';
        }, 300);
    }

    goBack(): void {
        this.router.navigate(['/surveys']);
    }
    }