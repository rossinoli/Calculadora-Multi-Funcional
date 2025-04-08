import { Component } from '@angular/core';

@Component({
  selector: 'app-tab4',
  templateUrl: './tab4.page.html',
  styleUrls: ['./tab4.page.scss'],
  standalone: false,
})
export class Tab4Page{
  inputValue: number | null = null;
  fromUnit: 'C' | 'F' | 'K' = 'C';
  toUnit: 'C' | 'F' | 'K' = 'F';
  result: number | null = null;

  constructor() { }

  convert() {
    if (this.inputValue === null) {
      this.result = null;
      return;
    }

    const value = this.inputValue;

    if (this.fromUnit === this.toUnit) {
      this.result = value;
      return;
    }

    // Converter para Celsius primeiro (como base)
    let valueInCelsius: number;
    switch (this.fromUnit) {
      case 'F':
        valueInCelsius = (value - 32) * 5 / 9;
        break;
      case 'K':
        valueInCelsius = value - 273.15;
        break;
      default: // 'C'
        valueInCelsius = value;
        break;
    }

    // Converter de Celsius para a unidade de destino
    switch (this.toUnit) {
      case 'F':
        this.result = (valueInCelsius * 9 / 5) + 32;
        break;
      case 'K':
        this.result = valueInCelsius + 273.15;
        break;
      default: // 'C'
        this.result = valueInCelsius;
        break;
    }
  }

}
