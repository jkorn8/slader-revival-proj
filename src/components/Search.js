import { useState } from 'react';

export default function Search({ onSearch }) {
    const [ query, setQuery ] = useState('');

    return (
        <div className="TextbookSearch">
            <input 
                type='text' 
                className='TextbookSearch' 
                placeholder='Find your textbook' 
                value={query}
                onChange={(event) => {
                    setQuery(event.target.value);
                    onSearch(event.target.value);
                }}/>
        </div>
    );
}