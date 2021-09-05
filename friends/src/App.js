import './App.css';
import { useState } from 'react';
import Login from './components/Login'
import Friends from './components/Friends'
import React from 'react'
import { BrowserRouter as Router, Route, } from 'react-router-dom'
import PrivateRoute from './components/PrivateRoute';

const initialFormValues = {
  username: '',
  password: ''
}

function App() {
  const [formValues, setFormValues] = useState(initialFormValues)
  const updateForm = (inputName, inputValue) => {
    setFormValues({
      ...formValues,
      [inputName]: inputValue
    })
  }
  return (
    <div className="App">
      <Router>
        <Route
          exact path='/'
          render={(props) => (
            <Login {...props} values={formValues} update={updateForm} />
          )}
        />
        <PrivateRoute path='/friends' component={Friends}/>
      </Router>
    </div>
  );
}

export default App;