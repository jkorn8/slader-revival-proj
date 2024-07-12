import { useLocation, Location } from 'react-router-dom';
import '../App.css';
import textbooks from '../textbooks';
import Textbook from '../types/Textbook';
import { Typography, Accordion, AccordionDetails, AccordionSummary } from '@mui/material';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';

const TextbookPage: React.FC = () => {
    const textbook: Textbook = textbooks[0];

    const location: Location = useLocation();
    const searchParams: URLSearchParams = new URLSearchParams(location.search);
    const textbookName: string | null = searchParams.get('name');

    return (
        <div style={{display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column'}}>
            <div>
                <img src={'https://picsum.photos/200/300'} alt={textbook.title}></img>
            </div>
            <div>
                <h1>{textbook.title} - {textbookName}</h1>
            </div>
            <div>
                {textbook.chapters.map((chapter, index) => <Accordion>
                    <AccordionSummary
                        expandIcon={<ArrowDropDownIcon />}
                        aria-controls="panel2-content"
                        id={`accordion${index}-header`}
                    >
                        <Typography>{chapter}</Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                        {textbook.sections[index].map((section, index) => <Typography>{section}</Typography>)}
                    </AccordionDetails>
                </Accordion>)}
            </div>
        </div>
    );
}

export default TextbookPage;