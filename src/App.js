import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

import Navbar from './components/navbar.component';
import ExercisesList from './components/exercises-list.component';
import UsersList from './components/users-list.component';
import EditExercise from './components/edit-exercise.component';
import EditUser from './components/edit-user.component';
import CreateExercise from './components/create-exercise.component';
import CreateUser from './components/create-user.component';

function App() {
  return (
    <Router>
        <div className='container-fluid'>
          <Navbar />
          <br/>
            <Route path='/' exact component={ExercisesList} />
            <Route path='/users' component={UsersList} />
            <Route path='/edit-user/:id' component={EditUser} />
            <Route path='/edit/:id' component={EditExercise} />
            <Route path='/create' component={CreateExercise} />
            <Route path='/user' component={CreateUser} />
        </div>
    </Router>
  );
}

export default App;