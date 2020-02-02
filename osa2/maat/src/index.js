import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';

const dataURL = 'https://restcountries.eu/rest/v2/all';

const Country = ({country}) => {
    return (
        <div>
            <h2>{country.name}</h2>
            <div>
                capital {country.capital} <br />
                population {country.population}
            </div>
            <div>
                <h3>Languages</h3>
                <ul>
                    {country.languages.map(lang =>
                        <li key={lang.name}>{lang.name}</li>
                    )}
                </ul>
            </div>
            <div>
                <img src={country.flag}
                    alt={country.name}
                    width='20%'
                    height='20%'
                />
            </div>
        </div>
    );
};

const FilteredList = ({filtered}) => {
    if (filtered.length > 10) {
        return (
            <div>
                Too many matches, specify another filter
            </div>
        );
    } else if (filtered.length === 0) {
        return (
            <div>
                No countries match your filter
            </div>
        );
    } else if (filtered.length > 1) {   // 2-10 countries
        return (
            <div>
                {filtered.map(country => <div key={country.name}>{country.name}</div>)}
            </div>
        );
    } else {    // 1 country
        return <div></div>;
    }
};

const App = () => {
    const [search, setSearch] = useState('');
    const [data, setData] = useState([]);

    const handleSearch = event => {
        setSearch(event.target.value);
    };

    useEffect(() => {
        axios
            .get(dataURL)
            .then(result => {
                setData(result.data);
            });
    }, []);

    const filtered = data.filter(rec => {
        return rec.name.toLowerCase().includes(search.toLowerCase());
    });

    const len = filtered.length;

    return (
        <div>
            find countries
            <input value={search} onChange={handleSearch} />
            {search.length > 0 && <FilteredList filtered={filtered} />}
            {len === 1 && <Country country={filtered[0]} />}
        </div>
    );
};

ReactDOM.render(<App />, document.getElementById('root'));
