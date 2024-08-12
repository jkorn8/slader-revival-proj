import './SearchPage.css';
import { useState } from 'react';
import { useLocation, useNavigate, Location } from 'react-router-dom';
import Search from '../components/Search';
import SearchResults from '../components/SearchResults';

const textbooks: string[] = [
    "Apple",
    "Banana",
    "Orange",
    "Pineapple",
    "Grapes",
    "Strawberry",
    "Watermelon",
    "Mango",
];

const SearchPage: React.FC = () => {
    const location: Location = useLocation();
    const navigate = useNavigate();
    const searchParams: URLSearchParams = new URLSearchParams(location.search);
    const urlSearch: string = searchParams.get('query') || '';
    const urlSearchResults = textbooks.filter(title => 
        title.toLowerCase().includes(urlSearch.toLowerCase())
    );

    const [ searchResults, setSearchResults ] = useState<string[]>(textbooks.filter(title => 
        title.toLowerCase().includes(urlSearch.toLowerCase())
    ));
    const handleSearch = (query: string) => {
        setSearchResults(textbooks.filter(title => 
            title.toLowerCase().includes(query.toLowerCase())
        ));
    };

    const handleTextbookSelect = (e: React.SyntheticEvent<Element, Event>) => {
        navigate('/textbook/0');
    }

    return (
        <div>
            <div className='searchPageSearchBarContainer'>
                <Search onSearch={(query: string) => handleSearch(query)} startingValue={urlSearch}/>
            </div>
            <div className='searchResultsContainer'>
                <span className='resultsText'>{urlSearchResults.length} Results</span>
                {urlSearchResults.map((searchResult, id) => {
                    return (
                        <div key={id} className="searchResult" onClick={handleTextbookSelect}>
                            <img src={'https://picsum.photos/200/300'} alt={searchResult} height={120}></img>
                            <div className="searchResultTextContainer">
                                <span className='searchResultTextTitle'>{searchResult}</span>
                                <span className='searchResultText'>ISBN: 1234567890-12</span>
                                <span className='searchResultText'>Authors: JK Rowling</span>
                                <span className='searchResultText'>6th Edition</span>
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default SearchPage;