import { Component } from '@angular/core';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss'],
  standalone: false,
})
export class Tab3Page {
  weightKg: number | null = null;
  heightM: number | null = null;
  bmi: number | null = null;
  bmiClassification: string = '';


  constructor() {}

  calculateBmi() {
    if (this.weightKg && this.heightM && this.weightKg > 0 && this.heightM > 0) {
      // Fórmula IMC: peso / (altura * altura)
      this.bmi = this.weightKg / (this.heightM * this.heightM);
      this.classifyBmi();
    } else {
      this.bmi = null;
      this.bmiClassification = '';
       // Poderia mostrar uma mensagem de erro se a validação falhar
    }
  }

  classifyBmi() {
    if (this.bmi === null) {
      this.bmiClassification = '';
      return;
    }

    if (this.bmi < 18.5) {
      this.bmiClassification = 'Abaixo do peso';
    } else if (this.bmi >= 18.5 && this.bmi <= 24.9) {
      this.bmiClassification = 'Peso normal';
    } else if (this.bmi >= 25 && this.bmi <= 29.9) {
      this.bmiClassification = 'Sobrepeso';
    } else if (this.bmi >= 30 && this.bmi <= 34.9) {
      this.bmiClassification = 'Obesidade Grau I';
    } else if (this.bmi >= 35 && this.bmi <= 39.9) {
      this.bmiClassification = 'Obesidade Grau II';
    } else { // >= 40
      this.bmiClassification = 'Obesidade Grau III (Mórbida)';
    }
  }

   // Função auxiliar para aplicar classes CSS com base na classificação
   getClassificationClass(): string {
       if (!this.bmiClassification) return '';
       const classification = this.bmiClassification.toLowerCase();
       if (classification.includes('abaixo do peso')) return 'classification-underweight';
       if (classification.includes('peso normal')) return 'classification-normal';
       if (classification.includes('sobrepeso')) return 'classification-overweight';
       if (classification.includes('obesidade grau i')) return 'classification-obese1';
       if (classification.includes('obesidade grau ii')) return 'classification-obese2';
       if (classification.includes('obesidade grau iii')) return 'classification-obese3';
       return '';
   }

}
