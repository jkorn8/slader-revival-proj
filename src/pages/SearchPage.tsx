import './SearchPage.css';
import { useEffect, useState } from 'react';
import { useLocation, useNavigate, Location } from 'react-router-dom';
import Search from '../components/Search';
import Textbook from '../types/Textbook';
import { textbookSearch } from '../apiCalls/apiCalls';
import { Loading } from '../components/Loading';

const SearchPage: React.FC = () => {
    const location: Location = useLocation();
    const navigate = useNavigate();
    const searchParams: URLSearchParams = new URLSearchParams(location.search);
    const urlSearch: string = searchParams.get('query') || '';

    const [ searchResults, setSearchResults ] = useState<Textbook[]>([]);   // Results from the initial search 
    const [ queryResults, setQueryResults ] = useState<Textbook[]>([]);     // Results for the search bar autocomplete
    const [ loading, setLoading ] = useState<boolean>(false);

    useEffect(() => {
        setLoading(true);
        textbookSearch(urlSearch).then((textbooks) => {
            setSearchResults(textbooks);
        }).catch((e) => {
            console.log(e);
            setSearchResults([]);
        }).finally(() => setLoading(false));
    }, [ urlSearch ]);

    const handleQuery = (query: string) => {
        textbookSearch(query).then((textbooks) => {
            setQueryResults(textbooks);
        });
    };

    const handleTextbookSelect = (id: string) => {
        navigate(`/textbook/${id}`);
    };

    return (
        <div>
            <div className='searchPageSearchBarContainer'>
                <Search onSearch={handleQuery} results={queryResults} startingValue={urlSearch}/>
            </div>
            {loading ? <Loading/> : 
                <div className='searchResultsContainer'>
                    <span className='resultsText'>{searchResults.length} Results</span>
                    {searchResults.map((searchResult, id) => {
                        return (
                            <div key={id} className="searchResult" onClick={() => handleTextbookSelect(searchResult.textbookId)}>
                                <img src={'https://picsum.photos/200/300'} alt={searchResult.title} height={120}></img>
                                <div className="searchResultTextContainer">
                                    <span className='searchResultTextTitle'>{searchResult.title}</span>
                                    <span className='searchResultText'>ISBN: {searchResult.ISBNs.join(', ')}</span>
                                    <span className='searchResultText'>Authors: {searchResult.authors}</span>
                                    <span className='searchResultText'>Edition: Coming Soon!</span>
                                </div>
                            </div>
                        );
                    })}
                </div>
            }
        </div>
    );
};

export default SearchPage;