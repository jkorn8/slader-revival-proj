import Search from '../components/Search';
import SearchResults from '../components/SearchResults';
import { useState } from 'react';

const textbooks = [
    "Apple",
    "Banana",
    "Orange",
    "Pineapple",
    "Grapes",
    "Strawberry",
    "Watermelon",
    "Mango",
  ];

export default function Home() {
    const [ searchResults, setSearchResults ] = useState([]);

    const handleSearch = (query) => {
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