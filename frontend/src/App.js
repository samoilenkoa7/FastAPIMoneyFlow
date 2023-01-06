import React, {useState} from 'react';
import axios from "axios";
import LoginForm from "./components/LoginForm";
import TransactionList from "./components/TransactionList";
import Header from "./components/UI/header/Header";
import CreateTransaction from "./components/CreateTransaction";
import classes from './components/UI/SearchInput/SearchInput.module.css'
import SearchInput from "./components/UI/SearchInput/SearchInput";

const App = () => {

    const [loginFormVisibility, setLoginFormVisibility] = useState({'display': 'none'});
    const [allTransactions, setAllTransactions] = useState([]);
    const [createTransactionForm, setCreateTransactionForm] = useState(false);



    let checkLogin = () => {
        if (!window.localStorage.getItem('Authorization')) {
            setLoginFormVisibility({'display': 'flex'});
        } else {
            axios.defaults.headers.common['Authorization'] = window.localStorage.getItem('Authorization')
        }
    }

    const [transactionById, setTransactionById] = useState([]);
    const [searchInputVisibility, setSearchInputVisibility] = useState(false);

    let getOperationById = (operation_id) => {
        console.log(transactionById);
        console.log(operation_id);

        if (allTransactions.length)
            setTransactionById(allTransactions.filter(trans => trans.id === Number(operation_id)))
        else {
            checkLogin();
            axios.get(`http://127.0.0.1:8000/operations/${operation_id}`).then(r => {
                setTransactionById([r.data])
            }).catch(err => setTransactionById([]))
        }
    }


    return (
        <div>
            <Header checkLogin={checkLogin} setAllTransactions={setAllTransactions}
                    setLoginFormVisibility={setLoginFormVisibility} transactionsList={allTransactions}
                    setCreateTransactionForm={setCreateTransactionForm} createTransactionForm={createTransactionForm}
                    searchInputVisibility={searchInputVisibility} setSearchInputVisibility={setSearchInputVisibility}
                    setTransactionById={setTransactionById}
            />
            <LoginForm visible={loginFormVisibility} changeVisibile={setLoginFormVisibility}/>
            <main>
                <div className="transaction">
                    <TransactionList allTransactions={allTransactions}
                                     checkLogin={checkLogin} setAllTransactions={setAllTransactions}
                                     setLoginFormVisibility={setLoginFormVisibility}/>
                </div><br/>
                <div className="create-transaction">
                    {createTransactionForm && <CreateTransaction checkLogin={checkLogin}
                                                                 setAllTransactions={setAllTransactions}
                                                                 transactionsList={allTransactions}
                                                                 setLoginFormVisibility={setLoginFormVisibility}/>}

                </div>
                <div>
                    {searchInputVisibility && <SearchInput
                        onClick={e => {
                            let externalDiv = e.target.closest('div');
                            let operation_id = externalDiv.getElementsByClassName(classes.mySearchInput)[0].value;
                            getOperationById(operation_id)}}
                    />}

                </div>
                {transactionById.length ?
                    <TransactionList allTransactions={transactionById}
                                     checkLogin={checkLogin} setAllTransactions={setAllTransactions}
                                     setLoginFormVisibility={setLoginFormVisibility}/>
                    : (
                        <div>
                            <h2>No such transactions</h2>
                        </div>
                    )
                }
            </main>
        </div>
    );
};

export default App;