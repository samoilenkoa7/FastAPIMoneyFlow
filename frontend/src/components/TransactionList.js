import React from 'react';
import Transaction from "./Transaction";

const TransactionList = (props) => {

    let removeDeletedTransaction = (transactions_id => {
        props.setAllTransactions(props.allTransactions.filter((transaction) => transaction.id !== transactions_id))
    });

    return (
        <div className="all__transactions">
            {props.allTransactions.length ? (
                    <div className="transactions_tobreak">
                        {props.allTransactions.map((transaction) => {
                            return <Transaction transaction={transaction} key={transaction.id}
                                                checkLogin={props.checkLogin}
                                                removePost={removeDeletedTransaction}
                            />
                        })}
                    </div>
                )
                : (
                    <div>
                        <h1>No transactions yet</h1>
                    </div>
                )
            }

        </div>
    );
}

export default TransactionList;