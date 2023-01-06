import React, {useState} from 'react';
import LoginButton from "./UI/LoginButton/LoginButton";
import LoginInput from "./UI/LoginInput/LoginInput";
import axios from "axios";

const CreateTransaction = (props) => {
    let date = new Date();
    const [transactionForm, setTransactionForm] = useState({amount: 0, description: '', kind: 'income',
        date: `${date.getFullYear()}-01-${date.getDate()}`
    })
    let addNewTransaction = () => {
        setTransactionForm({...transactionForm, date: `${date.getFullYear()}-01-${date.getDate()}`});
        props.checkLogin();
        console.log(transactionForm)
        axios.post("http://127.0.0.1:8000/operations", transactionForm).then(response => {
            props.setAllTransactions({...props.transactionsList, response})
        });
        setTransactionForm({amount: 0, description: '', kind: 'income',
            date: `${date.getFullYear()}-01-${date.getDate()}`
        });
    }

    return (
        <form className="create__transaction">
            <select name="kind" id="kind"
                    onChange={e => setTransactionForm({...transactionForm, kind: e.target.value})}>
                <option disabled value="Operation kind">Operation Kind</option>
                <option value="income">Income</option>
                <option value="outcome">Outcome</option>
            </select>
            <label htmlFor="amount">Amount</label>
            <LoginInput type="number" id="amount"
                        onChange={e => setTransactionForm({...transactionForm, amount: e.target.value})}/>
            <label htmlFor="description">Description</label>
            <LoginInput type="text" id="description"
                        onChange={e => setTransactionForm({...transactionForm, description: e.target.value})}/>
            <LoginButton buttonName="Add" type="button" onClick={() => addNewTransaction()}/>
        </form>
    );
};

export default CreateTransaction;