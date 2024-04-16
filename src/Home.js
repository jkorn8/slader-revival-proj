import Search from './components/Search';
import './App.css';
import { useState } from 'react';
import { Link } from 'react-router-dom';

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
        <div>
            <div className="TitleBar">
                <span>Test</span>
            </div>
            <Search onSearch={handleSearch}/>
            <ul>
                {searchResults.map((result, index) => (
                    <li key={index}>
                        <Link to={`/textbook?name=${result}`}>{result}</Link>
                    </li>
                ))}
            </ul>
        </div>
    );
}