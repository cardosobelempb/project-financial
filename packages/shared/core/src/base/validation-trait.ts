// ValidationTrait.ts

export class ValidationTrait {
  protected error: boolean = false;
  protected msgsErrors: string[] = [];
  protected formatMsgs: string = '<p>:message</p>';
  protected messages_: Record<string, any> = {};

  protected required(name: string, val: any): boolean {
    if (val !== undefined && val !== null && val !== '') return true;

    this.error = true;
    const errorMsg = this.messages_?.[name]?.required ?? `O campo <b>${name}</b> precisa ser preenchido.`;
    this.msgsErrors.push(this.formatMsgs.replace(':message', errorMsg));
    return false;
  }

  protected minValue(name: string, val: any, qtd: number): boolean {
    if ((val ?? '').toString().length >= qtd) return true;

    this.error = true;
    const errorMsg = this.messages_?.[name]?.min ?? `O campo <b>${name}</b> precisa ter uma quantidade mínima de <b>${qtd}</b> caracteres`;
    this.msgsErrors.push(this.formatMsgs.replace(':message', errorMsg));
    return false;
  }

  protected maxValue(name: string, val: any, qtd: number): boolean {
    if ((val ?? '').toString().length <= qtd) return true;

    this.error = true;
    const errorMsg = this.messages_?.[name]?.max ?? `O campo <b>${name}</b> pode ter no máximo <b>${qtd}</b> caracteres`;
    this.msgsErrors.push(this.formatMsgs.replace(':message', errorMsg));
    return false;
  }

  protected unique(name: string, val: any, table: string, col: string, val2: string): boolean {
    // Esta função normalmente se conecta a um banco de dados.
    // Aqui vamos apenas simular e dar um aviso.
    console.warn(`Validação "unique" precisa ser implementada com backend. 
    Verificando: tabela=${table}, coluna=${col}, exceção ID=${val2}`);

    // Simulando sucesso (valor único)
    return true;
  }

  protected email(name: string, val: any): boolean {
    if (!val || /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val)) return true;

    this.error = true;
    const errorMsg = this.messages_?.[name]?.email ?? `O campo <b>${name}</b> é um e-mail inválido.`;
    this.msgsErrors.push(this.formatMsgs.replace(':message', errorMsg));
    return false;
  }

  protected string(name: string, val: any): boolean {
    if (!val || /^[A-Za-zÀ-ÿ\s]+$/.test(val)) return true;

    this.error = true;
    const errorMsg = this.messages_?.[name]?.string ?? `O campo <b>${name}</b> não é uma string válida.`;
    this.msgsErrors.push(this.formatMsgs.replace(':message', errorMsg));
    return false;
  }

  protected int(name: string, val: any): boolean {
    if (!val || Number.isInteger(Number(val))) return true;

    this.error = true;
    const errorMsg = this.messages_?.[name]?.int ?? `O campo <b>${name}</b> não é um inteiro válido.`;
    this.msgsErrors.push(this.formatMsgs.replace(':message', errorMsg));
    return false;
  }
}
