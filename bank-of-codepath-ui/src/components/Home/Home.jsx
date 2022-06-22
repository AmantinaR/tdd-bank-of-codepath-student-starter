import * as React from "react"
import axios from "axios";
import { useEffect, useState } from "react"
import AddTransaction from "../AddTransaction/AddTransaction"
import BankActivity from "../BankActivity/BankActivity"
import "./Home.css"

export default function Home(props) {
  function handleOnSubmitNewTransaction(event) {
    console.log(event.target);
    handleOnCreateTransaction();
  }
  async function handleOnCreateTransaction() {
    props.setIsCreating(true);
    //axios post to transactions endoint
    axios.post("http://localhost:3001/bank/transactions", {transaction: props.newTransactionForm}).then((response)=>{
      console.log("post response", response.data);
      props.setTransactions(transactions => [...transactions, response.data.transaction]);
      props.setNewTransactionForm({category: "", description:"", amount: ""});
      
    }).catch((error)=>{
      props.setError(error.message);
      props.setIsCreating(false);
    });
    props.setIsCreating(false);
  }


  let filteredTransactions = props.transactions;
  if (props.filterInputValue && props.transactions) {
    let newTransactions = filteredTransactions;
    //console.log(props.filterInputValue);
    //console.log(filteredTransactions);
    newTransactions = newTransactions.filter((transaction) => transaction.description.toLowerCase().includes(props.filterInputValue.toLowerCase()));
    //console.log(newTransactions);
    //setFilteredTransactions(newTransactions);
    filteredTransactions = newTransactions;
  }
  //const [filteredTransactions, setFilteredTransactions] = useState(props.transactions);
  
  useEffect(() => {
    //props.setIsLoading(true);
    //axios get for transactions and transfers
    axios.get("http://localhost:3001/bank/transactions").then((response)=>{
      console.log(response);
      props.setTransactions(response.data.transactions);
    }).catch((error)=>{
      console.log(error);
      props.setError(error.message);
      props.setIsLoading(false);
    })
    axios.get("http://localhost:3001/bank/transfers").then((response)=>{
      
      props.setTransfers(response.data.transfers);
      props.setIsLoading(false);
    }).catch((error)=>{
      console.log(error);
      props.setError(error.message);
    });
  }, []);
  return (
    <div className="home">
      <AddTransaction handleOnSubmit={handleOnSubmitNewTransaction} isCreating={props.isCreating} setIsCreating={props.setIsCreating} form={props.newTransactionForm} setForm={props.setNewTransactionForm}/>
      {props.isLoading ? <h1>Loading...</h1> : <BankActivity transactions={filteredTransactions} transfers={props.transfers}/>}
      {props.error ? <h2 className="error">{props.error}</h2> : null}
      
      
    </div>
  )
}
