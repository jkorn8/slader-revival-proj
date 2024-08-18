import './TextbookPage.css';
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams, useSearchParams } from 'react-router-dom';
import Textbook from '../types/Textbook';
import { Accordion, AccordionDetails, AccordionSummary } from '@mui/material';
import ArrowForwardIosSharpIcon from '@mui/icons-material/ArrowForwardIosSharp';
import { textbookGet } from '../apiCalls/apiCalls';
import { Loading } from '../components/Loading';

const TextbookPage: React.FC = () => {
    const navigate = useNavigate();
    const { textbookId } = useParams();
    const [ textbook, setTextbook ] = useState<Textbook | undefined>();
    const [ loading, setLoading ] = useState<boolean>(true);
    const [searchParams, setSearchParams] = useSearchParams();

    const [selectedChapter, setSelectedChapter] = useState<number>(getChapterOnLoad(searchParams.get('chapter')));
    const [selectedSection, setSelectedSection ] = useState<number>(getSectionOnLoad(searchParams.get('section')));

    useEffect(() => {
        setLoading(true);
        textbookGet(parseInt(textbookId || '-1')).then((textbook) => {
            setTextbook(textbook);
            setLoading(false);
        }).catch((e) => {
            console.log(e);
            setTextbook(undefined);
            setLoading(false);
        });
    }, []);
    if (loading)
        return <Loading />;

    if (textbook === undefined) 
        return <TextbookNotFound />;

    const handleChapterChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        // Handle state change
        const newChapter: number = parseInt(event.target.value);
        setSelectedChapter(newChapter);
        setSelectedSection(-1);
        // Handle URL search params change
        searchParams.set('chapter', (newChapter + 1).toString());
        searchParams.delete('section');
        setSearchParams(searchParams);
    }

    const handleSectionChange = (index: number) => {
        if (index === selectedSection) {
            setSelectedSection(-1);
            searchParams.delete('section');
        }
        else {
            setSelectedSection(index);
            searchParams.set('section', (index + 1).toString());
        }
        setSearchParams(searchParams);
    }

    const handleSolutionSelect = (event: React.MouseEvent<HTMLHeadingElement, MouseEvent>, problem: number) => {
        navigate(`/solutions/${textbook.textbookId}/${selectedChapter + 1}/${selectedSection + 1}/${problem}`);
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
                            <h3 onClick={(e) => handleSolutionSelect(e, 1)}>Testing 1 2 3</h3>
                        </AccordionDetails>
                    </Accordion>)}
                </div>
                <br/>
            </div>
        </div>
    );
}

const isValidInteger = (value: string) => {
    if (typeof value === 'undefined') return false;
    const parsed = parseInt(value, 10);
    return !isNaN(parsed) && Number.isInteger(parsed);
}

const getChapterOnLoad = (chapter: string | null) => {
    if (chapter === null) return 0;
    const parsed = parseInt(chapter, 10);
    if (isNaN(parsed) || !Number.isInteger(parsed)) return 0;
    return parsed - 1;
}

const getSectionOnLoad = (section: string | null) => {
    if (section === null) return -1;
    const parsed = parseInt(section, 10);
    if (isNaN(parsed) || !Number.isInteger(parsed)) return -1;
    return parsed - 1;
}

const TextbookNotFound: React.FC = () => {
    return (
        <div>
            <h1>Textbook Not Found</h1>
        </div>
    );
}

export default TextbookPage;