import { useLocation } from 'react-router-dom';
import '../App.css';
import textbooks from '../textbooks';
import { Typography, Accordion, AccordionDetails, AccordionSummary } from '@mui/material';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';

export default function Textbook() {
    const textbook = textbooks[0];

    const location = useLocation();
    const searchParams = new URLSearchParams(location.search);
    const textbookName = searchParams.get('name');

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