import React, { useState } from 'react';

const Numbers = ({records}) => {
    return (
        <div>
            <h2>Numbers</h2>
            {records.map(record =>
                <div key={record.name}>{record.name} {record.number}</div>
            )}
        </div>
    );
};

const App = () => {
    const [ persons, setPersons] = useState([
        {
            name: 'Arto Hellas',
            number: '040-1231244'
        }
    ]);
    const [ newName, setNewName ] = useState('');
    const [ newNumber, setNewNumber ] = useState('');

    const addRecord = (event) => {
        event.preventDefault();

        if (persons.map(rec => rec.name).includes(newName)) {
            alert(`${newName} is already added to the phonebook`);
        } else {
            setPersons(persons.concat({name: newName, number: newNumber}));
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

    return (
        <div>
            <h2>Phonebook</h2>
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
                <Numbers records={persons} />
            </form>
        </div>
    );

};

export default App;
