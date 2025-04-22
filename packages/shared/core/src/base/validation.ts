// Validation.ts

interface ValidationMessages {
  [key: string]: string;
}

export class Validation {
  private error: boolean = false;
  private msgsErrors: string[] = [];
  private formatMsgs: string = '<p>:message</p>';
  private _messages: ValidationMessages | string = '';
  private dataForm: { [key: string]: any } = {};

  public validate(rules: { [key: string]: string }, data: { [key: string]: any }, messages: ValidationMessages | string = ''): void {
    this._messages = messages;
    this.dataForm = data;

    for (const name in rules) {
      const val = data[name];
      const rulesV = rules[name]?.split('|');

      if (rulesV) {
        for (const ruleV of rulesV) {
          this.validRule(ruleV, name, val);
        }
      }
    }
  }

  private validRule(ruleStr: string, name: string, val: any): void {
    const rule: string[] = ruleStr.split(':');
    if (rule) {
      switch (rule['0']) {
        case 'required':
          this.required(name, val);
          break;
        case 'email':
          this.email(name, val);
          break;
        case 'min':
          this.minValue(name, val, parseInt(rule[1]!, 10));
          break;
        case 'max':
          this.maxValue(name, val, parseInt(rule[1]!, 10));
          break;
        case 'unique':
          const unique = rule[1]!.split(',');
          const table = unique[0];
          const col = unique[1] || '';
          const val2 = unique[2] || '';
          this.unique(name, val, table!, col, val2);
          break;
        case 'int':
          this.int(name, val);
          break;
        case 'string':
          this.string(name, val);
          break;
      }
    }
  }

  public hasError(): boolean {
    return this.error;
  }

  public messages(all: 'all' | null = null): string | string[] {
    if (this.msgsErrors.length > 0 && all === 'all') {
      return this.msgsErrors.join('');
    }
    return this.msgsErrors[0]!;
  }

  public setFormatMsgs(format: string): void {
    this.formatMsgs = format;
  }

  public getData(): { [key: string]: any } {
    return this.dataForm;
  }

  // Métodos de validação simulados
  private required(name: string, val: any): void {
    if (val === null || val === undefined || val === '') {
      this.addError(`${name} is required`);
    }
  }

  private email(name: string, val: any): void {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(val)) {
      this.addError(`${name} must be a valid email`);
    }
  }

  private minValue(name: string, val: any, min: number): void {
    if (val.length < min) {
      this.addError(`${name} must be at least ${min} characters`);
    }
  }

  private maxValue(name: string, val: any, max: number): void {
    if (val.length > max) {
      this.addError(`${name} must be at most ${max} characters`);
    }
  }

  private unique(name: string, val: any, table: string, col: string, val2: string): void {
    // Placeholder: simulação da verificação de unicidade (requer backend)
    // Em aplicação real, essa verificação seria feita com uma API.
    console.warn(`Unique validation is not implemented. Expected: ${table}, ${col}, ${val2}`);
  }

  private int(name: string, val: any): void {
    if (!Number.isInteger(Number(val))) {
      this.addError(`${name} must be an integer`);
    }
  }

  private string(name: string, val: any): void {
    if (typeof val !== 'string') {
      this.addError(`${name} must be a string`);
    }
  }

  private addError(message: string): void {
    this.error = true;
    this.msgsErrors.push(this.formatMsgs.replace(':message', message));
  }
}
