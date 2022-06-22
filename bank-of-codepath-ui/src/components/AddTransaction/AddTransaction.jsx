import * as React from "react"
import "./AddTransaction.css"

export default function AddTransaction(props) {
  
  function handleOnFormFieldChange(change) {
    //idek
    console.log("event handler", change.target.name);
    console.log("event value", change.target);
    props.setForm({...props.form, [change.target.name]: change.target.value});
  }

  return (
    <div className="add-transaction">
      <h2>Add Transaction</h2>

      <AddTransactionForm isCreating={props.isCreating} form={props.form} handleOnSubmit={props.handleOnSubmit} handleOnFormFieldChange={handleOnFormFieldChange}/>
    </div>
  )
}

export function AddTransactionForm(props) {
  console.log("form", props.form);
  return (
    <div className="form">
      <div className="fields">
        <div className="field">
          <label>Description</label>
          <input name="description" placeholder="description" type="text" value={props.form ? props.form.description : ""} onChange={props.handleOnFormFieldChange}/>
        </div>
        <div className="field">
          <label>Category</label>
          <input name="category" placeholder="category" type="text" value={props.form ? props.form.category : ""} onChange={props.handleOnFormFieldChange}/>
        </div>
        <div className="field half-flex">
          <label>Amount (USD)</label>
          <input name="amount" placeholder="0" type="number" value={props.form ? props.form.amount : 0} onChange={props.handleOnFormFieldChange}/>
        </div>

        <button className="btn add-transaction" type="submit" onClick={props.handleOnSubmit}>
          Add
        </button>
      </div>
    </div>
  )
}
