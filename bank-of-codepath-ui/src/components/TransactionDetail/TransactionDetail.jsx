import axios from "axios"
import * as React from "react"
import {useState, useEffect} from 'react'
import {useParams} from 'react-router-dom'
//import { useEffect } from "react/cjs/react.production.min"
import { formatAmount, formatDate } from "../../utils/format"
import "./TransactionDetail.css"

export default function TransactionDetail() {
  const [hasFetched, setHasFetched] = useState(false);
  const [transaction, setTransaction] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  let {transactionId} = useParams();

  useEffect(() => {
    async function fetchTransactionById() {
      setIsLoading(true);
      setHasFetched(false);
      axios.get("http://localhost:3001/bank/transactions/"+transactionId).then((response) => {
        if(response) {
          setTransaction(response.data.transaction);
        }
      }).catch((error) => {
        setError(error.message);
      });
      setIsLoading(false);
      setHasFetched(true);
    }
    fetchTransactionById();
  }, [transactionId]
  );

  return (
    <div className="transaction-detail">
      <TransactionCard transaction={transaction} transactionId={transactionId} isLoading={isLoading} hasFetched={hasFetched}/>
    </div>
  )
}

export function TransactionCard({ transaction = {}, transactionId = null, isLoading, hasFetched }) {
  console.log("card props", transaction, transactionId);
  return (
    <div className="transaction-card card">
      {hasFetched ? <div><div className="card-header">
        <h3>Transaction #{transactionId}</h3>
        <p className="category">{transaction.category}</p>
      </div>

      <div className="card-content">
        <p className="description">{transaction.description}</p>
      </div>

      <div className="card-footer">
        <p className={`amount ${transaction.amount < 0 ? "minus" : ""}`}>{formatAmount(transaction.amount)}</p>
        <p className="date">{formatDate(transaction.postedAt)}</p>
      </div></div> : null}
    </div>
    
  )
}
