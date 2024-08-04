import Search from '../components/Search';
import SearchResults from '../components/SearchResults';
import { useState } from 'react';
import './Home.css'

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

const Home = () => {
    const [ searchResults, setSearchResults ] = useState<string[]>([]);

    const handleSearch = (query: string) => {
        setSearchResults(textbooks.filter(title => 
            title.toLowerCase().includes(query.toLowerCase())
        ));
    };

    return (
        <div className='homePageContainer'>
            <div className='homePageTextContainer'>
                <text className='titleText'>MathLib</text>
            </div>
            <div className='homeSearchBarContainer'>
                <Search onSearch={handleSearch}/>
            </div>
            <SearchResults results={searchResults}/>
        </div>
    );
}

export default Home;