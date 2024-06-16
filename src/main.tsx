import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { BrowserRouter, createBrowserRouter, RouterProvider } from 'react-router-dom'
import Home from './components/pages/Home.tsx/Home.tsx'
import Debts from './components/pages/debts/Debts.tsx'

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      {
        path: 'home',
        element: <Home/>
      },
      { path: 'debts',
        element: <Debts/>
      }
    ]
  }
  ])

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <BrowserRouter basename='/SuperMercado'>
        <RouterProvider router={router}/>
    </BrowserRouter>
  </React.StrictMode>,
)
