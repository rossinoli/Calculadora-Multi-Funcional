import { Component } from '@angular/core';

interface Currency {
  code: string;
  name: string;
}

interface ExchangeRates {
  [key: string]: number; 
}


@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss'],
  standalone: false,
})
export class Tab2Page {
    amount: number | null = 1;
    fromCurrency: string = 'USD';
    toCurrency: string = 'BRL';
    convertedAmount: number | null = null;
  
    currencies: Currency[] = [
      { code: 'USD', name: 'Dólar Americano' },
      { code: 'BRL', name: 'Real Brasileiro' },
      { code: 'EUR', name: 'Euro' },
      { code: 'GBP', name: 'Libra Esterlina' },
      { code: 'JPY', name: 'Iene Japonês' },
    ];
  
    // --- DADOS ESTÁTICOS (Exemplo) ---
    staticExchangeRates: ExchangeRates = {
      'USD': 1.0,
      'BRL': 5.15, // 1 USD = 5.15 BRL (Exemplo)
      'EUR': 0.92, // 1 USD = 0.92 EUR (Exemplo)
      'GBP': 0.80, // 1 USD = 0.80 GBP (Exemplo)
      'JPY': 150.5, // 1 USD = 150.5 JPY (Exemplo)
    };
  


  constructor() {
    this.convert();
  }

  convert() {
    if (this.amount === null || this.amount < 0 || !this.fromCurrency || !this.toCurrency) {
      this.convertedAmount = null;
      return;
    }

    const rateFrom = this.staticExchangeRates[this.fromCurrency];
    const rateTo = this.staticExchangeRates[this.toCurrency];

    if (rateFrom && rateTo) {
      const amountInBase = this.amount / rateFrom;
      this.convertedAmount = amountInBase * rateTo;
    } else {
      console.error('Taxa de câmbio não encontrada para as moedas selecionadas.');
      this.convertedAmount = null;
    }
  }

}
