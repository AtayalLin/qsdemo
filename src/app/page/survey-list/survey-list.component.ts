import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';

interface Survey {
  [x: string]: any;
  id: number;
  title: string;
  type: string;
  startDate: string;
  endDate: string;
  participants: number; // 填答人數
  publishStatus: '已發佈' | '草稿'; // 發布狀態
}
@Component({
  selector: 'app-survey-list',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule],
  templateUrl: './survey-list.component.html',
  styleUrl: './survey-list.component.scss',
})
export class SurveyListComponent {
  searchText = '';
  searchType = ''; // 新增：類型篩選
  searchStatus = ''; // 新增：狀態篩選

  surveys: Survey[] = [
    {
      id: 1,
      title: '使用者滿意度調查',
      type: '滿意度',
      startDate: '2025-01-01',
      endDate: '2025-01-31',
      participants: 120,
      publishStatus: '已發佈',
    },
    {
      id: 2,
      title: '新功能回饋問卷',
      type: '回饋',
      startDate: '2024-12-01',
      endDate: '2024-12-31',
      participants: 45,
      publishStatus: '草稿',
    },
  ];

  filteredSurveys: Survey[] = [...this.surveys];

  trackById(index: number, item: Survey) {
    return item.id;
  }

  onSearch() {
    const val = this.searchText.trim().toLowerCase();
    if (!val) {
      this.filteredSurveys = [...this.surveys];
      return;
    }
    this.filteredSurveys = this.surveys.filter((s) =>
      s.title.toLowerCase().includes(val)
    );
  }

  startSurvey(id: number) {
    console.log('開始填寫問卷', id);
  }

  editSurvey(id: number) {
    console.log('編輯問卷', id);
  }

  deleteSurvey(id: number) {
    console.log('刪除問卷', id);
  }

  goToAdmin() {
    console.log('點擊登入後台');
  }
}
