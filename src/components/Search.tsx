import { useState } from 'react';
import { SearchIcon } from '../icons/icons';
import './Search.css';

type SearchProps = {
    onSearch: (query: string) => void;
    onFocus?: () => void;
    startingValue?: string;
}

const Search: React.FC<SearchProps> = ({ onSearch, onFocus = () => {}, startingValue = ''})  => {
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

export default Search;