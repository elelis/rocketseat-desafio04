import {uuid} from 'uuidv4';
import Transaction from '../models/Transaction';

interface Balance {
  income: number;
  outcome: number;
  total: number;
}

interface CreateTransactionDTO{
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
    const balance = this.transactions
      .reduce((total, transaction)=>{
        switch(transaction.type){
          case 'income':
            total.income += transaction.value;
            break;
          case 'outcome':
            total.outcome += transaction.value;
            break;
          default:
            break;
        }
        total.total = total.income - total.outcome;
        return total;
      },
      {
        income: 0,
        outcome: 0,
        total: 0
      });

      if(balance.total < 0 )
        throw Error('Tá gastando, hein?!');
        

      return balance;
  }

  public create({title, type ,value}:CreateTransactionDTO): Transaction {
    const transaction:Transaction = { id:uuid(), title, type, value };

    this.transactions.push(transaction);

    return transaction
  }
}

export default TransactionsRepository;
