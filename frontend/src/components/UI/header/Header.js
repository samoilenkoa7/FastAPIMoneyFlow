import React from 'react';
import GetTransButton from "../GetTransButton/GetTransButton";
import axios from "axios";


const Header = (props) => {
    let getAllTransactions = () => {
        props.checkLogin();
        axios.get("http://127.0.0.1:8000/operations/").then(response => {
            props.setAllTransactions(response.data);
        }).catch(() => props.setLoginFormVisibility({'display': 'flex'}))
    }

    let createNewTransaction = () => {
        props.setCreateTransactionForm(!props.createTransactionForm)
    }

    let getOperationById = (operation_id) => {
        if (props.transactionsList.length)
            props.setTransactionById(props.transactionsList.filter(trans => trans.id === Number(operation_id)))
        else {
            props.checkLogin();
            axios.get(`http://127.0.0.1:8000/operations/${operation_id}`).then(r => {
                props.setTransactionById([r.data])
            }).catch(() => props.setTransactionById([]))
        }
    }

    return (
        <header>
            <div className="header__wrapper">
                <div className="header__items-list">
                    <div className="header-item">
                        <GetTransButton buttonName="Create transaction" onClick={() => createNewTransaction()} />
                    </div>
                    <div className="header-item">
                        {props.transactionsList.length ? <GetTransButton buttonName="Hide transactions" type="button"
                                                         onClick={() => props.setAllTransactions([])}/>
                            : <GetTransButton buttonName="Show transactions"
                            type="button" onClick={() => getAllTransactions()}> </GetTransButton>
                        }
                    </div>
                    <div className="header-item">
                        <GetTransButton buttonName="Search by ID" type="button"
                                        onClick={() => props.setSearchInputVisibility(!props.searchInputVisibility)}
                        />
                    </div>
                </div>
            </div>
        </header>
    );
};

export default Header;