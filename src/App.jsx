import React from 'react'
import logo from './logo.svg'
import './App.css'
import { FormHeader, FormContainer } from './components';
import { FormProvider } from './context';

function App() {

  return (
    <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
        </header>
        <main>
          <div className="container">
            <FormProvider>
              <FormHeader />
              <FormContainer />
            </FormProvider>
          </div>
        </main>
      </div>
  )
}

export default App
