import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

export interface Question {
  id: number;
  title: string;
  type: 'single' | 'multiple' | 'text';
  options?: string[];
  cssClass?: string; // 用來保存你原本 HTML 裡的特定顏色 Class
}

export interface Survey {
  id: number;
  title: string;
  type: string;
  startDate: string;
  endDate: string;
  participants: number;
  publishStatus: '已發佈' | '已儲存尚未發佈' | '草稿';
  questions?: Question[]; // 新增題目陣列
}

@Injectable({
  providedIn: 'root',
})
export class SurveyService {
  private surveySubmission = {
    userInfo: {
      name: '',
      phone: '',
      email: '',
    },
    answers: [],
  };

  setUserInfo(info: any) {
    this.surveySubmission.userInfo = info;
  }
  getUserInfo() {
    return this.surveySubmission.userInfo;
  }

  private surveys: Survey[] = [
    // ... 前面 1-5 筆保持不變
    {
      id: 6,
      title: '87世紀遊戲主機／平台市場調查',
      type: '市場調查',
      startDate: '8033-11-25',
      endDate: '8033-12-31',
      participants: 1200,
      publishStatus: '已發佈',
      questions: [
        {
          id: 1,
          title: '您目前最常使用的遊戲平台為？',
          type: 'single',
          options: [
            'PlayStation 系列',
            'Xbox 系列',
            'Nintendo Switch 1、2',
            'PC (桌上型/筆記型)',
            '行動裝置 (iOS/Android)',
          ],
        },
        {
          id: 2,
          title: '您選擇遊戲平台時重視哪些因素？（可複選）',
          type: 'multiple',
          options: [
            '遊戲陣容與獨佔作品',
            '主機效能與畫面表現',
            '訂閱制服務 (如 Game Pass)',
            '周邊硬體與擴充支援性',
          ],
        },
        {
          id: 3,
          title: '您是否願意嘗試支援 VR / AR 的遊戲主機？',
          type: 'single',
          options: [
            '非常願意',
            '視價格與內容而定',
            '目前已擁有相關設備',
            '暫時沒有興趣',
            '完全不考慮 (容易暈眩/不便)',
          ],
        },
        {
          id: 4,
          title: '您最常遊玩的遊戲類型為？（可複選）',
          type: 'multiple',
          options: [
            '動作冒險',
            '角色扮演（RPG）',
            '第一人稱射擊 / 電競競技',
            '模擬經營 / 策略益智',
          ],
        },
        {
          id: 5,
          title: '您對未來遊戲主機或平台有什麼期待或建議？',
          type: 'text',
        },
      ],
    },
  ];

  getSurveys(): Observable<Survey[]> {
    return of(this.surveys);
  }
  getSurveyById(id: number): Observable<Survey | undefined> {
    const found = this.surveys.find((s) => s.id === id);
    return of(found);
  }
}

// ---參考用，為後端串接
// export class SurveyService {
//   private currentAnswers: any = {}; // 暫存使用者在問題頁選的答案

//   constructor(private http: HttpClient) {}

//   // 1. 給列表頁用
//   getSurveys() {
//     return this.http.get('/api/surveys');
//   }

//   // 2. 給問題頁用
//   getSurveyDetail(id: string) {
//     return this.http.get(`/api/surveys/${id}`);
//   }

//   // 3. 暫存/讀取預覽答案 (純前端交換)
//   saveTempAnswers(answers: any) { this.currentAnswers = answers; }
//   getTempAnswers() { return this.currentAnswers; }

//   // 4. 給預覽頁最後送出用
//   postFinalAnswers(payload: any) {
//     return this.http.post('/api/responses', payload);
//   }

//   // 5. 給結果頁看統計用
//   getStatistics(id: string) {
//     return this.http.get(`/api/surveys/${id}/stats`);
//   }
// }
