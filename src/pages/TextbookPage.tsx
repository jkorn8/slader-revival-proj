import './TextbookPage.css';
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams, useSearchParams } from 'react-router-dom';
import Textbook from '../types/Textbook';
import { Accordion, AccordionDetails, AccordionSummary } from '@mui/material';
import { Add as PlusIcon } from '@mui/icons-material';
import ArrowForwardIosSharpIcon from '@mui/icons-material/ArrowForwardIosSharp';
import { textbookGet } from '../apiCalls/apiCalls';
import { Loading } from '../components/Loading';

const TextbookPage: React.FC = () => {
    const navigate = useNavigate();
    const { textbookId } = useParams();
    const [textbook, setTextbook] = useState<Textbook | undefined>();
    const [loadingTextbook, setLoadingTextbook] = useState<boolean>(true);
    const [loadingProblems, setLoadingProblems] = useState<boolean>(false);
    const [searchParams, setSearchParams] = useSearchParams();

    const [selectedChapter, setSelectedChapter] = useState<number>(getChapterOnLoad(searchParams.get('chapter')));
    const [selectedSection, setSelectedSection] = useState<number>(getSectionOnLoad(searchParams.get('section')));

    useEffect(() => {
        setLoadingTextbook(true);
        textbookGet(textbookId || '-1').then((textbook) => {
            setTextbook(textbook);
            setLoadingTextbook(false);
            if (selectedSection !== -1 && textbook !== undefined) {

            }
        }).catch((e) => {
            console.log(e);
            setTextbook(undefined);
            setLoadingTextbook(false);
        });
    }, []);
    if (loadingTextbook)
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
                            key={j}
                            sx={{ width: '100%', boxShadow: 'none', borderRadius: `${j === 0 ? '20px 20px 0 0' : j === textbook.sections[selectedChapter].length - 1 ? '0 0 20px 20px' : '0'}`, backgroundColor: '#D9D9D9', border: '1px solid #B9B9B9' }}
                            expanded={j === selectedSection}
                            onChange={() => handleSectionChange(j)}
                        >
                            <AccordionSummary
                                expandIcon={<ArrowForwardIosSharpIcon style={{ transform: 'rotate(90deg)', color: 'black', height: '20px', width: '20px' }} />}
                                aria-controls="panel2-content"
                                id={`accordion${j}-header`}
                                sx={{ height: '72px' }}
                            >
                                <h3>{section}</h3>
                            </AccordionSummary>
                            <AccordionDetails style={{ backgroundColor: 'white', display: 'flex', alignItems: 'center', flexDirection: 'column', padding: '30px 0px 30px 0px' }}>
                                <div style={{ padding: '5px 0 20px 0', display: 'flex', flexDirection: 'row', width: '80%', justifyContent: 'space-between', alignItems: 'center' }}>
                                    <h3 onClick={(e) => handleSolutionSelect(e, 1)}>Problem 1</h3>
                                    <h3 onClick={(e) => handleSolutionSelect(e, 2)}>Problem 2</h3>
                                    <h3 onClick={(e) => handleSolutionSelect(e, 3)}>Problem 3</h3>
                                    <h3 onClick={(e) => handleSolutionSelect(e, 4)}>Problem 4</h3>
                                    <h3 onClick={(e) => handleSolutionSelect(e, 5)}>Problem 5</h3>
                                </div>
                                <button
                                    style={{
                                        display: 'flex',
                                        flexDirection: 'row',
                                        alignItems: 'center',
                                        justifyContent: 'center'
                                    }}
                                    onClick={() => navigate(`/create/${textbookId}`, {
                                        state: {
                                            chapter: selectedChapter + 1,
                                            section: selectedSection + 1
                                        }
                                    })}
                                >
                                    <PlusIcon />&nbsp;Post a Solution
                                </button>
                            </AccordionDetails>
                        </Accordion>)}
                </div>
                <br />
            </div>
        </div>
    );
}

// TODO: Check pararms in URL for validity
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