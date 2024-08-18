import './Solutions.css';
import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { MathJaxContext, MathJax } from 'better-react-mathjax';

const ps1Hagrid = 'data:image/jpeg;base64,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';
const latexExample = `The well known Pythagorean theorem \\(x^2 + y^2 = z^2\\) was 
proved to be invalid for other exponents. 
Meaning the next equation has no integer solutions:

\\[ x^n + y^n = z^n \\]`;

const Solutions = () => {
    const { textbookId, chapter, section, problem } = useParams();
    const navigate = useNavigate();

    const handleChapterClicked = () => {
        navigate(`/textbook/${textbookId}?chapter=${chapter}`);
    }

    const handleSectionClicked = () => {
        navigate(`/textbook/${textbookId}?chapter=${chapter}&section=${section}`);
    }

    if (validateParams(textbookId || '', chapter || '', section || '', problem || '')){};
    // TODO: move styles to the css file
    // TODO: implement the solution rating system
    // TODO: select new solution button
    return (
        <div className='solutionsContainer'>
            <h1 className='solutionTextbookTitle'>Harry Potter and the Half Blood Prince</h1>
            <div className='chapterAndSectionContainer'>
                <h2 className='solutionLink' onClick={handleChapterClicked}>Chapter {chapter}</h2>
                <h2>&nbsp;{'>'}&nbsp;</h2>
                <h2 className='solutionLink' onClick={handleSectionClicked}>Section {section}</h2>
            </div>
            <h3 className='solutionProblem'>Problem {problem}</h3>
            <div className='singleSolutionContainer'>
                <div className='solutionTitleContainer'>
                    <div className='solutionUserContainer' style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start', width: '100%', paddingLeft: '30px'}}>
                        <img src={ps1Hagrid} height='64px' width='64px' style={{ borderRadius: '180px'}}></img>
                        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', justifyContent: 'center', height: '64px', marginLeft: '10px'}}>
                            <span className='userNameText'>Hagrid</span>
                            <span className='solnCreatedText'>Solution Created: 7/31/2000</span>
                        </div>
                    </div>
                    <button>Rate this Solution</button>
                </div>
                <MathJaxContext>
                    <div className='solutionBodyContainer'>
                        <MathJax>{latexExample}{latexExample}{latexExample}</MathJax>
                    </div>
                </MathJaxContext>
            </div>
        </div>
    )
}

const validateParams = (textbookId: string, chapter: string, section: string, problem: string) => {
    return true;
}

export default Solutions;