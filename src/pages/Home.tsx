import Search from '../components/Search';
import { useState } from 'react';
import './Home.css'
import { textbookSearch } from '../apiCalls/apiCalls';
import Textbook from '../types/Textbook';

const Home = () => {
    const [ searchResults, setSearchResults ] = useState<Textbook[]>([]);

    const handleSearch = (query: string) => {
        textbookSearch(query).then((textbooks) => {
            setSearchResults(textbooks);
        });
    };

    return (
        <div className='homePageContainer'>
            <div className='homePageTextContainer'>
                <span className='titleText'>MathLib</span>
                <p className='heroSubtitle'>
                    Find step-by-step solutions for your math homework.
                </p>
            </div>
            <div className='homeSearchBarContainer'>
                <Search onSearch={handleSearch} results={searchResults}/>
            </div>
            
            <div className='landingContent'>
                <div className='featuresSection'>
                    <div className='featureCard'>
                        <span className='featureIcon'>📚</span>
                        <h3 className='featureTitle'>Comprehensive Textbook Coverage</h3>
                        <p className='featureDescription'>
                            Access solutions for thousands of math textbooks from major publishers. 
                            From algebra to calculus, we've got you covered.
                        </p>
                    </div>
                    
                    <div className='featureCard'>
                        <span className='featureIcon'>🔍</span>
                        <h3 className='featureTitle'>Smart Search & Discovery</h3>
                        <p className='featureDescription'>
                            Find exactly what you need with our intelligent search. 
                            Search by textbook, chapter, problem number, or even take a photo.
                        </p>
                    </div>
                    
                    <div className='featureCard'>
                        <span className='featureIcon'>👥</span>
                        <h3 className='featureTitle'>Community Solutions</h3>
                        <p className='featureDescription'>
                            Learn from step-by-step solutions created by students and educators. 
                            Multiple approaches to every problem.
                        </p>
                    </div>
                    
                    <div className='featureCard'>
                        <span className='featureIcon'>⚡</span>
                        <h3 className='featureTitle'>Instant Access</h3>
                        <p className='featureDescription'>
                            Get immediate help when you need it. No more waiting for office hours 
                            or struggling through problems alone.
                        </p>
                    </div>
                    
                    <div className='featureCard'>
                        <span className='featureIcon'>📱</span>
                        <h3 className='featureTitle'>Mobile Friendly</h3>
                        <p className='featureDescription'>
                            Study anywhere, anytime. Our responsive design works perfectly 
                            on all devices - desktop, tablet, or mobile.
                        </p>
                    </div>
                    
                    <div className='featureCard'>
                        <span className='featureIcon'>🎯</span>
                        <h3 className='featureTitle'>Study Smarter</h3>
                        <p className='featureDescription'>
                            Track your progress, save favorite solutions, and build your 
                            understanding with our comprehensive learning tools.
                        </p>
                    </div>
                </div>
                
                <div className='ctaSection'>
                    <h2 className='ctaTitle'>Ready to Ace Your Math Homework?</h2>
                    <p className='ctaDescription'>
                        Join thousands of students who are already using MathLib to improve their grades 
                        and understanding. Start exploring solutions today!
                    </p>
                    <a href="#search" className='ctaButton'>Start Searching Now</a>
                </div>
            </div>
        </div>
    );
}
    

export default Home;