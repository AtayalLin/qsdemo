import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-survey-result',
  imports: [CommonModule, ],
  templateUrl: './survey-result.component.html',
  styleUrl: './survey-result.component.scss'
})
export class SurveyResultComponent {
  constructor(private route: ActivatedRoute) {}

}
