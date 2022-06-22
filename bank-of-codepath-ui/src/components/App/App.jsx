import * as React from "react";
import {useState} from 'react';
import {BrowserRouter, Routes, Route} from 'react-router-dom';
import Navbar from "../Navbar/Navbar";
import Home from "../Home/Home";
import TransactionDetail from "../TransactionDetail/TransactionDetail.jsx";
import "./App.css";

export default function App() {
  const [isLoading, setIsLoading] = useState();
  const [transactions, setTransactions] = useState([]);
  const [transfers, setTransfers] = useState([]);
  const [error, setError] = useState();
  const [filterInputValue, setFilterInputValue] = useState("");
  const [newTransactionForm, setNewTransactionForm] = useState({category: "", description: "", amount: 0});
  const [isCreating, setIsCreating] = useState(false);

  return (
    <div className="app">
      <nav>
        <BrowserRouter>
            <Navbar filterInputValue={filterInputValue} setFilterInputValue={setFilterInputValue}/>
            <main>
              <Routes>
    const [isCreating, setIsCreating] = useState();
                <Route path="/" element={<Home newTransactionForm={newTransactionForm} setNewTransactionForm={setNewTransactionForm} isCreating={isCreating} setIsCreating={setIsCreating} isLoading={isLoading} setIsLoading={setIsLoading} transactions={transactions} setTransactions={setTransactions} transfers={transfers} setTransfers={setTransfers} error={error} setError={setError} filterInputValue={filterInputValue} setFilterInputValue={setFilterInputValue}/>}>
                </Route>
                <Route path="/transactions/:transactionId" element={<TransactionDetail/>}>
                </Route>
              </Routes>

            </main>
          
        </BrowserRouter>
      </nav>
      
      
    </div>
  )
}
