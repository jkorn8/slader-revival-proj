import { Link } from "react-router-dom";
import "./SearchResults.css";

type SearchResultsProps = {
  results: string[];
}

const SearchResults: React.FC<SearchResultsProps> = ({ results }) => {
  return (
    <div className="results-list">
      {results.map((result, id) => {
        return (
          <Link to={`/textbook/0`} style={{textDecoration: 'none', color: 'black', fontFamily: 'Poppins, sans-serif'}}>
            <div key={id} className="search-result">
              {result}
            </div>
          </Link>
        );
      })}
    </div>
  );
};

export default SearchResults;