import { useState } from 'react';
import { SearchIcon } from '../icons/icons';
import './Search.css';
import { useNavigate } from 'react-router-dom';

type SearchProps = {
    onSearch: (query: string) => void;
    onFocus?: () => void;
    startingValue?: string;
}

const Search: React.FC<SearchProps> = ({ onSearch, onFocus = () => {}, startingValue = ''})  => {
    const navigate = useNavigate();

    const [ query, setQuery ] = useState(startingValue);
    
    const handleIsEnterPressed = (event: React.KeyboardEvent<HTMLInputElement>) => {
        if (event.key === 'Enter') {
            navigate('/search?query=' + query);
        }
    };

    return (
        <div className='searchBarContainer'>
            <div className='bar'>
                <div className='searchBarIconContainer'>
                    <SearchIcon />
                </div>
                <input
                    type='text' 
                    placeholder='Find your textbook...' 
                    value={query}
                    onFocus={onFocus}
                    onChange={(event) => {
                        setQuery(event.target.value);
                        onSearch(event.target.value);
                    }}
                    onKeyDown={handleIsEnterPressed}/>
            </div>
        </div>
    );
}

export default Search;