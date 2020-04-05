import React, { useState, useEffect } from "react";
// Libraries
import { Table, Button, Container, Row } from "reactstrap";
import TransactionModal from "../general/TransactionModal";
// Services
import TrnasactionServ from "../services/transaction.service";

const TransactionHistory = () => {
  const [transactions, setTransactions] = useState([]);
  const [headers, setHeaders] = useState([]);
  const [selectedTransaction, setSelectedTransaction] = useState();
  const [total, setTotal] = useState(0);

  const getTransactions = async () => {
    const tmp = await TrnasactionServ.getAllTransactions().catch(e => {
      alert(`Error: ${e || e.toString()}`); // eslint-disable-line
    });

    const elements = tmp.transactions;

    if (elements && elements.length) {
      setTransactions(elements);
      const hTmp = Object.keys(elements[0]).filter(
        header => header === "type" || header === "amount"
      );
      setHeaders(hTmp);
      setTotal(tmp.total);
    }
  };

  useEffect(() => {
    getTransactions();
  }, []);

  const openTransaction = transaction => {
    setSelectedTransaction(transaction);
  };

  return (
    <Container>
      {selectedTransaction && (
        <TransactionModal
          opened={!!selectedTransaction}
          transac={selectedTransaction}
          onClose={() => setSelectedTransaction()}
        />
      )}
      {transactions.length === 0 && <span>No transactions for this User</span>}
      <Table responsive>
        <thead>
          <tr>
            {headers.map(header => (
              <th key={header}>{header}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {transactions.map(elem => {
            return (
              <tr
                key={`${elem.id}`}
                style={{ cursor: "pointer" }}
                onClick={() => openTransaction(elem)}
              >
                {headers.map(header => (
                  <td key={`${elem.id}-${header}`}>{elem[header]}</td>
                ))}
              </tr>
            );
          })}
        </tbody>
      </Table>
      {total ? (
        <Row>
          <span>{`TOTAL: ${total}`}</span>
        </Row>
      ) : null}
      <Row style={{ paddingTop: "1em", justifyContent: "flex-end" }}>
        <Button onClick={getTransactions}>Get Transactions</Button>
      </Row>
    </Container>
  );
};

export default TransactionHistory;
