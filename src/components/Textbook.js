import { useLocation } from 'react-router-dom';
import '../App.css';

export default function Textbook() {
    const textbook = {
        isbn: 1238150823750912,
        title: "Advanced Calculus",
        id: 0,
        image: ''
    }

    const location = useLocation();
    const searchParams = new URLSearchParams(location.search);
    const textbookName = searchParams.get('name');

    return (
        <div>
            <div>
                <img src={'https://picsum.photos/200/300'} alt={textbook.title}></img>
                <h1>{textbook.title} - {textbookName}</h1>
            </div>
            <div>
                
            </div>
            {/* Title here with textbook and title*/}
            {/* component to select an exercise here */}
        </div>
    );
}