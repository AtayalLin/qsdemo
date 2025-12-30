import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-survey-register',
  standalone: true,
  // 確保這裡導入了 CommonModule, FormsModule, RouterModule
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './survey-register.component.html',
  styleUrl: './survey-register.component.scss'
})
export class SurveyRegisterComponent {
  private router = inject(Router);

  showPassword = false;
  showConfirmPassword = false;
  // 表單資料模型
  regData = {
    account: '',
    name: '',
    password: '',
    confirmPassword: ''
  };

  // 執行註冊邏輯
  onRegister() {
    // 1. 基本密碼一致性檢查
    if (this.regData.password !== this.regData.confirmPassword) {
      alert('兩次輸入的密碼不一致！');
      return;
    }

    // 2. 模擬儲存到 LocalStorage
    const storedUsers = JSON.parse(localStorage.getItem('survey_users') || '[]');
    
    // 檢查帳號是否已存在
    const isExist = storedUsers.some((u: any) => u.account === this.regData.account);
    if (isExist) {
      alert('此帳號已被註冊！');
      return;
    }

    // 存入新使用者
    const newUser = {
      account: this.regData.account,
      name: this.regData.name,
      password: this.regData.password
    };
    storedUsers.push(newUser);
    localStorage.setItem('survey_users', JSON.stringify(storedUsers));

    alert('註冊成功！將為您跳轉至登入頁面。');

    // 3. 跳轉回首頁，並帶上參數讓首頁自動打開登入 Modal
    this.router.navigate(['/surveys'], { queryParams: { login: 'true' } });
  }

  // 返回列表頁
  goBack() {
    this.router.navigate(['/surveys']);
  }

  // 直接開啟登入（其實也是回到首頁並帶參數）
  goToLogin() {
    this.router.navigate(['/surveys'], { queryParams: { login: 'true' } });
  }
}