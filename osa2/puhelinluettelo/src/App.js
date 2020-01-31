import React, { useState } from 'react';

const Numbers = ({records}) => {
    return (
        <div>
            <h2>Numbers</h2>
            {records.map(record => <p key={record.name}>{record.name}</p>)}
        </div>
    );
};

const App = () => {
    const [ persons, setPersons] = useState([{ name: 'Arto Hellas' }]);
    const [ newName, setNewName ] = useState('');

    const addName = (event) => {
        event.preventDefault();

        if (persons.map(rec => rec.name).includes(newName)) {
            alert(`${newName} is already added to the phonebook`);
        } else {
            setPersons(persons.concat({name: newName}));
            setNewName('');
        }
    };

    const handleRecordChange = (event) => {
        setNewName(event.target.value);
    };

    return (
        <div>
            <h2>Phonebook</h2>
            <form>
                <div>
                    name: <input value={newName} onChange={handleRecordChange} />
                </div>
                <div>
                    <button type="submit" onClick={addName}>add</button>
                </div>
                <Numbers records={persons} />
            </form>
        </div>
    );

};

export default App;
