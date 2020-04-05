const path = "http://localhost:3300/api/money-account"; // local path

export default class TransactionService {
  static getAllTransactions = async () => {
    let ret = {};
    const resAux = await fetch(`${path}/transactions/all`).catch(error => {
      ret = { error: error.message || error.toString() };
    });

    if (ret.error) {
      return ret;
    }

    const res = await resAux.json();

    return res;
  };
}
