import { useState } from 'react';
import SearchIcon from '../icons/icons.js';
import './Search.css';

export default function Search({ onSearch, onFocus = () => {}, startingValue = ''}) {
    const [ query, setQuery ] = useState(startingValue);

    return (
        <div className='container'>
            <div className='bar'>
                <SearchIcon />
                <input
                    type='text' 
                    placeholder='Find your textbook...' 
                    value={query}
                    onFocus={onFocus}
                    onChange={(event) => {
                        setQuery(event.target.value);
                        onSearch(event.target.value);
                    }}/>
            </div>
        </div>
    );
}