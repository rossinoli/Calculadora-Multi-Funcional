import { Component, } from '@angular/core';

@Component({
  selector: 'app-tab5',
  templateUrl: './tab5.page.html',
  styleUrls: ['./tab5.page.scss'],
  standalone: false,
})
export class Tab5Page  {
  principal: number | null = null;
  rate: number | null = null;
  ratePeriod: 'month' | 'year' = 'month';
  time: number | null = null;
  timePeriod: 'months' | 'years' = 'months';

  interest: number | null = null;
  totalAmount: number | null = null;

  constructor() { }

   calculateInterest() {
    if (this.principal === null || this.principal <= 0 ||
        this.rate === null || this.rate < 0 || // Taxa 0 é válida, mas não negativa
        this.time === null || this.time <= 0) {
      this.interest = null;
      this.totalAmount = null;
      return;
    }

 
    let monthlyRate = this.rate / 100; 
    if (this.ratePeriod === 'year') {
      monthlyRate = monthlyRate / 12; 
    }

    let timeInMonths = this.time;
    if (this.timePeriod === 'years') {
      timeInMonths = this.time * 12; 
    }

    this.interest = this.principal * monthlyRate * timeInMonths;

    this.totalAmount = this.principal + this.interest;
  }

}
