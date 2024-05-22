import { Link } from "react-router-dom";
import "./SearchResults.css";

const SearchResults = ({ results }) => {
  return (
    <div className="results-list">
      {results.map((result, id) => {
        return (
          <Link to={`/textbook?name=${result}`} style={{textDecoration: 'none', color: 'black'}}>
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