import { useState } from 'react';
import { SearchIcon } from '../icons/icons';
import './Search.css';
import { useNavigate } from 'react-router-dom';
import Textbook from '../types/Textbook';

type SearchProps = {
    onSearch: (query: string) => void;
    results: Textbook[];
    startingValue?: string;
}

const Search: React.FC<SearchProps> = ({ onSearch, startingValue = '', results }) => {
    const navigate = useNavigate();

    const [query, setQuery] = useState(startingValue);
    const [isFocused, setFocused] = useState(false);

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
                    onFocus={() => setFocused(true)}
                    onBlur={async () => setFocused(false)}
                    onChange={(event) => {
                        setQuery(event.target.value);
                        onSearch(event.target.value);
                    }}
                    onKeyDown={handleIsEnterPressed} />
            </div>
            {isFocused && results.length > 0 && query.length > 0 ? (
                <div className="results-list">
                    {results.map((result, i) =>
                        <div
                            className="search-result"
                            key={i}
                            onMouseDown={() => navigate(`/textbook/${result.textbookId}`)}
                            >
                            {result.title}
                        </div>
                    )}
                </div>) : null}
        </div>
    );
}

export default Search;