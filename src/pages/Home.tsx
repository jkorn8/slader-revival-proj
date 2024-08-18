import Search from '../components/Search';
import { useState } from 'react';
import './Home.css'
import { textbookSearch } from '../apiCalls/apiCalls';
import Textbook from '../types/Textbook';

const Home = () => {
    const [ searchResults, setSearchResults ] = useState<Textbook[]>([]);

    const handleSearch = (query: string) => {
        textbookSearch(query).then((textbooks) => {
            setSearchResults(textbooks);
        });
    };

    return (
        <div className='homePageContainer'>
            <div className='homePageTextContainer'>
                <span className='titleText'>MathLib</span>
            </div>
            <div className='homeSearchBarContainer'>
                <Search onSearch={handleSearch} results={searchResults}/>
            </div>
        </div>
    );
}
    

export default Home;