import './TextbookPage.css';
import { useState } from 'react';
import { useLocation, Location } from 'react-router-dom';
import textbooks from '../textbooks';
import Textbook from '../types/Textbook';
import { Typography, Accordion, AccordionDetails, AccordionSummary } from '@mui/material';
import ArrowForwardIosSharpIcon from '@mui/icons-material/ArrowForwardIosSharp';

const TextbookPage: React.FC = () => {
    const textbook: Textbook = textbooks[0];

    const location: Location = useLocation();
    const searchParams: URLSearchParams = new URLSearchParams(location.search);
    const textbookName: string | null = searchParams.get('name');

    const [selectedChapter, setSelectedChapter] = useState<number>(0);
    const [selectedSection, setSelectedSection ] = useState<number>(-1);

    const handleChapterChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setSelectedChapter(parseInt(event.target.value));
        setSelectedSection(-1);
    }

    const handleSectionChange = (index: number) => {
        if (index === selectedSection) setSelectedSection(-1);
        else setSelectedSection(index);
    }

    return (
        <div className='textbookPageContainer'>
            <div className='textbookContainer'>
                <h1>Harry Potter and the Half-Blood Prince</h1>
                <img src={'https://picsum.photos/200/300'} alt={textbook.title} height={280} style={{ margin: '30px' }}></img>
                <h3>ISBN: {textbook.ISBNs[0]}</h3>
                <h3>Authors: {textbook.authors}</h3>
                <h3>6th Edition</h3>
            </div>
            <div className='answerSelectContainer'>
                <div className='chapterSelectContainer'>
                    <select
                        value={selectedChapter}
                        onChange={handleChapterChange}
                    >
                        {textbook.chapters.map((chapter, i) => <option value={i}>{chapter}</option>)}
                    </select>
                </div>
                <div className='sectionSelectContainer'>
                    {textbook.sections[selectedChapter].map((section, j) => 
                    <Accordion 
                        disableGutters={true}
                        square={true}
                        sx={{ width: '100%', boxShadow: 'none', borderRadius: `${ j === 0 ? '20px 20px 0 0' : j === textbook.sections[selectedChapter].length - 1 ? '0 0 20px 20px' : '0'}`, backgroundColor: '#D9D9D9', border: '1px solid #B9B9B9' }}
                        expanded={j === selectedSection}
                        onChange={() => handleSectionChange(j)}
                    >
                        <AccordionSummary
                            expandIcon={<ArrowForwardIosSharpIcon style={{ transform: 'rotate(90deg)', color: 'black', height: '20px', width: '20px' }} />}
                            aria-controls="panel2-content"
                            id={`accordion${j}-header`}
                            sx={{ height: '72px'}}
                        >
                            <h3>{section}</h3>
                        </AccordionSummary>
                        <AccordionDetails style={{ backgroundColor: 'white'}}>
                            <h3>Testing 1 2 3</h3>
                        </AccordionDetails>
                    </Accordion>)}
                </div>
            </div>
        </div>
    );
}

export default TextbookPage;