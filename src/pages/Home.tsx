import Search from '../components/Search';
import SearchResults from '../components/SearchResults';
import { useState } from 'react';

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
        <div style={{ margin: 'auto', display: 'flex', alignItems: 'center', flexDirection: 'column', width: '80%'}}>
            <Search onSearch={handleSearch}/>
            <SearchResults results={searchResults}/>
        </div>
    );
}

export default Home;