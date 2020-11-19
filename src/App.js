import React, { Component } from 'react';
import Person from './Person/Person';
import classes from './App.module.css';
//import ErrorBoundary from './ErrorBoundary/ErrorBoundary';

class App extends Component {
  state  = {
    persons: [
      { id: 'idhff', name: 'Max', age: 28 },
      { id: 'erout', name: 'Manu', age: 29 },
      { id: 'xsdf', name: 'Stephanie',  age: 26 }
    ],
  }

  nameChangedHandler = (event, id ) => {
    const personIndex = this.state.persons.findIndex( p => {
      return p.id === id;
    });

    const person = {
      ...this.state.persons[personIndex]
    };

    person.name = event.target.value;

    const persons = [...this.state.persons];
    persons[personIndex] = person;

    this.setState( {persons: persons } );
  }

  deletePersonHandler = (personIndex) => {
    const persons = [...this.state.persons];
    persons.splice(personIndex, 1);
    this.setState({persons: persons});
  }

  togglePersonsHandler = () => {
    const doesShow = this.state.showPersons;
    this.setState({showPersons: !doesShow});
  }
  
  render() {
    let persons = null;

    let btnClass = [classes.Button];

    if (this.state.showPersons) {
      persons = (
        <div>
          {this.state.persons.map((person, index) => {
            return <Person 
              key={person.id}
              click={() => this.deletePersonHandler(index)}
              name={person.name} 
              age={person.age}
              changed={(event) => this.nameChangedHandler(event,person.id)} />
          })}
        </div> 
      );
      btnClass.push(classes.Red);
    }

    const myClasses = [];

    if (this.state.persons.length <= 2 ) {
      myClasses.push(classes.red);
    }
    if (this.state.persons.length <= 1) {
      myClasses.push(classes.bold);
    }

    return (
      <div className={classes.App}>
        <h1>Hi, I am a React App!</h1>

        <p className={myClasses.join(' ')}> This is really working!</p>

        <button 
          className={btnClass.join(' ')}
          onClick= {this.togglePersonsHandler}>
            Switch Name
        </button> 

        {persons}
      </div>
    );
  }
}
export default App;