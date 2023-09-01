import React, { useState } from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import Statement from './Statement.jsx';
import Withdraw from './Withdraw.jsx';
import Transfer from './Transfer.jsx';
import './index.css'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import Deposit from './Deposit.jsx';

const router = () => {
  return createBrowserRouter([
    {
      path: "/",
      element: (
        <App />
      )
    },
    {
      path: "/statement",
      element: (
        <Statement />
      )
    },
    {
      path: "/withdraw",
      element: (
        <Withdraw />
      )
    },
    {
      path: "/transfer",
      element: (
        <Transfer />
      )
    },
    {
      path: "/deposit",
      element: (
        <Deposit />
      )
    }
  ])
} 

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router()}/>
  </React.StrictMode>,
)
