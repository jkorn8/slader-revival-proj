import React, { useState } from "react";
import '../App.css';

export default function ProblemSelect (){
  const [accordionOpen, setAccordionOpen] = useState(false);

  return (
    <div style={{ paddingTop: '0.5rem', paddingBottom: '0.5rem' }}>
        <div style={{display: 'flex', justifyContent: 'space-between', width: '100%' }} onClick={() => setAccordionOpen(!accordionOpen)}>
            <span>This is the title</span>
            {accordionOpen ? <span>+</span> : <span>-</span>}
        </div>
        <div className={`drawer ${accordionOpen ? 'visible' : 'hidden'}`}>
            <div>
                This is the drawer
            </div>
        </div>
    </div>
  );
};