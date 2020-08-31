import TransactionsRepository from '../repositories/TransactionsRepository';
import Transaction from '../models/Transaction';

interface Request {
  title: string;
  value: number;
  type: string;
}

class CreateTransactionService {
  private transactionsRepository: TransactionsRepository;

  constructor(transactionsRepository: TransactionsRepository) {
    this.transactionsRepository = transactionsRepository;
  }

  public execute({ title, value, type }: Request): Transaction {
    // Validação: Tipo precisa ser ou 'income' ou 'outcome'.
    if (type !== 'income' && type !== 'outcome') {
      throw Error('This transactions is not valid');
    }

    const { total } = this.transactionsRepository.getBalance();

    // Validação: Se do tipo 'outcome' valor precisa se maior que saldo.
    if (type === 'outcome' && value > total) {
      throw Error('The value of this transaction is not enougth');
    }
    // Requisição passou pelas validações então pode chamar método create.
    const transaction = this.transactionsRepository.create({
      title,
      value,
      type,
    });

    // Método create concluído, transaction criada.
    return transaction;
  }
}

export default CreateTransactionService;
