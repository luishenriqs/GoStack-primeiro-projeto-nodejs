import Transaction from '../models/Transaction';

interface Balance {
  income: number;
  outcome: number;
  total: number;
}
interface TransactionDTO {
  title: string;
  value: number;
  type: 'income' | 'outcome';
}

class TransactionsRepository {
  private transactions: Transaction[];

  constructor() {
    this.transactions = [];
  }

  public all(): Transaction[] {
    return this.transactions;
  }

  public getBalance(): Balance {
    // Filter retorna apenas o valor das transactions que atenderem a condição.
    const allIncome = this.transactions.filter(transaction => {
      if (transaction.type === 'income') {
        return transaction.value;
      }
    });
    // Filter retorna apenas o valor das transactions que atenderem a condição.
    const allOutcome = this.transactions.filter(transaction => {
      if (transaction.type === 'outcome') {
        return transaction.value;
      }
    });

    // Reduce retorna apenas um valor após varrer o array.
    const income = allIncome.reduce((prevVal, elem) => prevVal + elem.value, 0);
    const outcome = allOutcome.reduce(
      (prevVal, elem) => prevVal + elem.value,
      0,
    );

    const total = income - outcome;

    const balance = { income, outcome, total };

    return balance;
  }

  public create({ title, value, type }: TransactionDTO): Transaction {
    const transaction = new Transaction({ title, value, type });

    this.transactions.push(transaction);

    return transaction;
  }
}

export default TransactionsRepository;
