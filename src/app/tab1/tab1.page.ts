import { Component } from '@angular/core';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss'],
  standalone: false,
})
export class Tab1Page {
  displayValue: string = '0';
  firstOperand: number | null = null;
  operator: string | null = null;
  waitingForSecondOperand: boolean = false;



  constructor() {}

  appendNumber(num: string) {
    if (this.waitingForSecondOperand) {
      this.displayValue = num;
      this.waitingForSecondOperand = false;
    } else {
      this.displayValue = this.displayValue === '0' ? num : this.displayValue + num;
    }
  }

  appendDecimal() {
    if (this.waitingForSecondOperand) {
       this.displayValue = '0.';
       this.waitingForSecondOperand = false;
       return;
    }
    // Previne múltiplos pontos decimais
    if (!this.displayValue.includes('.')) {
      this.displayValue += '.';
    }
  }

  appendOperator(op: string) {
    const inputValue = parseFloat(this.displayValue);

    // Se já existe um operador e estamos esperando o segundo operando,
    // permite trocar o operador (ex: 5 * - + 3 -> 5 + 3)
    if (this.operator && this.waitingForSecondOperand) {
        this.operator = op;
        return;
    }

    // Se já temos um primeiro operando, calcula antes de definir o novo operador
    if (this.firstOperand !== null && this.operator) {
       const result = this.performCalculation();
       this.displayValue = String(result);
       this.firstOperand = result;
    } else {
         this.firstOperand = inputValue;
    }

    this.operator = op;
    this.waitingForSecondOperand = true;
  }

  calculate() {
    if (this.firstOperand === null || this.operator === null || this.waitingForSecondOperand) {
      // Se não há operação pendente ou o segundo operando não foi inserido ainda
      // (ex: usuário pressiona '=' logo após um operador), não faz nada ou apenas reseta.
      // Aqui vamos optar por não fazer nada ou exibir o valor atual.
      return;
    }

    const result = this.performCalculation();
    this.displayValue = String(result);
    // Reseta para permitir novas operações ou continuar com o resultado
    this.firstOperand = null; // Ou pode definir como 'result' para continuar a cadeia
    this.operator = null;
    this.waitingForSecondOperand = false;
  }

  private performCalculation(): number {
    const secondOperand = parseFloat(this.displayValue);
     if (this.firstOperand === null || this.operator === null) {
         return secondOperand; // Ou 0, ou lançar erro
     }

    switch (this.operator) {
      case '+':
        return this.firstOperand + secondOperand;
      case '-':
        return this.firstOperand - secondOperand;
      case '*':
        return this.firstOperand * secondOperand;
      case '/':
        if (secondOperand === 0) {
             console.error("Divisão por zero!");
             // Poderia mostrar um alerta para o usuário
             this.clear(); // Limpa em caso de erro
             return NaN; // Retorna 'Não é um Número'
        }
        return this.firstOperand / secondOperand;
      default:
         return secondOperand; // Caso sem operador válido
    }
  }

  clear() {
    this.displayValue = '0';
    this.firstOperand = null;
    this.operator = null;
    this.waitingForSecondOperand = false;
  }
}


