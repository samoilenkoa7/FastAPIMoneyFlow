import React from 'react';
import {FiDelete} from "react-icons/fi";
import axios from "axios";

const Transaction = (props) => {
    let deleteTransaction = (operation_id) => {
        props.checkLogin();
        axios.delete(`http://127.0.0.1:8000/operations/delete/{id}/?operation_id=${operation_id}`).then(() => {
            alert(`Operation with id ${operation_id} was successfully deletes`);
            props.removePost(operation_id);
        })
    }

    return (
        <div className="all__transactions-wrapper" key={props.transaction.id}>
            <div className="transaction__wrapper">
                <div className="transaction-item">
                    <h3>{props.transaction.description}</h3>
                    <p><strong>${props.transaction.amount}</strong></p> <br/>
                    <p>Date: <br/>{props.transaction.date}</p>
                </div>
            </div>
            <div className="icon-wrapper">
                <FiDelete className='delete-icon' onClick={() => deleteTransaction(props.transaction.id)}/>
            </div>
        </div>
    );
};

export default Transaction;