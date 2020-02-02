import React, { useState, useEffect } from 'react';
import personService from './services/persons.js';

const Filter = ({filter, handleFilterChange}) => {
    return (
        <div>
            filter shown with
            <input value={filter} onChange={handleFilterChange} />
        </div>
    );
};

const Record = ({record}) => {
    return (
        <div>{record.name} {record.number}</div>
    );
};

const Records = ({records}) => {
    return (
        <div>
            {records.map(record =>
                <Record key={record.name} record={record} />
            )}
        </div>
    );
};

const PersonForm =
    ({newName, handleNameChange, newNumber, handleNumberChange, addRecord}) => {
    return (
        <form>
            <div>
                name: <input value={newName} onChange={handleNameChange} />
            </div>
            <div>
                number: <input value={newNumber} onChange={handleNumberChange} />
            </div>
            <div>
                <button type="submit" onClick={addRecord}>add</button>
            </div>
        </form>
    );
};

const App = () => {
    const [ persons, setPersons ] = useState([]);
    const [ newName, setNewName ] = useState('');
    const [ newNumber, setNewNumber ] = useState('');
    const [ filter, setFilter ] = useState('');

    useEffect(() => {
        console.log('in effect');
        personService
            .getAll()
            .then(data => {
                console.log('got persons');
                setPersons(data);
            });
    }, []);
    console.log(persons.length, 'persons');

    const addRecord = (event) => {
        event.preventDefault();

        if (persons.map(rec => rec.name).includes(newName)) {
            alert(`${newName} is already added to the phonebook`);
        } else {
            const newRecord = { name: newName, number: newNumber };

            personService
                .create(newRecord)
                .then(returnedRecord => {
                    console.log('added', returnedRecord);
                    setPersons(persons.concat(returnedRecord));
                });
            setNewName('');
            setNewNumber('');
        }
    };

    const handleNameChange = (event) => {
        setNewName(event.target.value);
    };

    const handleNumberChange = (event) => {
        setNewNumber(event.target.value);
    };

    const handleFilterChange = (event) => {
        setFilter(event.target.value);
    };

    // just filter according to names
    const shownPersons = persons.filter(p =>
        p.name.toLowerCase().includes(filter.toLowerCase())
    );

    return (
        <div>
            <h2>Phonebook</h2>
            <Filter filter={filter} handleFilterChange={handleFilterChange} />
            <h3>Add new contact</h3>
            <PersonForm newName={newName}
                        handleNameChange={handleNameChange}
                        newNumber={newNumber}
                        handleNumberChange={handleNumberChange}
                        addRecord={addRecord}
            />
            <h3>Numbers</h3>
            <Records records={shownPersons} />
        </div>
    );

};

export default App;
