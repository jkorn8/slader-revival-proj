import { ButtonGroup, Button } from '@mui/material'
import { useState } from 'react';
import Latex from 'react-latex-next';
import 'katex/dist/katex.min.css';

const testLatex = `\subsection{How to write Mathematics}

\LaTeX{} is great at typesetting mathematics. Let \(X_1, X_2, \ldots, X_n\) be a sequence of independent and identically distributed random variables with \(\text{E}[X_i] = \mu\) and \(\text{Var}[X_i] = \sigma^2 < \infty\), and let
\[S_n = \frac{X_1 + X_2 + \cdots + X_n}{n}
      = \frac{1}{n}\sum_{i}^{n} X_i\]
denote their mean. Then as \(n\) approaches infinity, the random variables \(\sqrt{n}(S_n - \mu)\) converge in distribution to a normal \(\mathcal{N}(0, \sigma^2)\).` 

export default function AnswerCreate() {

    // Should eventually be 3 different options to choose from for an editor:
    // - Built in LaTeX editor
    // - Step by step with keyboard input on left and math equation on the right
    // - Screenshots of work

    return (
        <div style={{ height: '100vh', width: '100vw', display: 'flex', alignItems: 'center', flexDirection: 'column' }}>
            <div style={{ padding: '20px', alignItems: 'center', justifyContent: 'center'}}>
                <ButtonGroup variant="contained" aria-label="Basic button group">
                    <Button>LaTeX Editor</Button>
                    <Button>Step by Step</Button>
                    <Button>Upload Screenshots</Button>
                </ButtonGroup>
            </div>
            <LaTeXEditor />
        </div>
    )
}

const LaTeXEditor = () => {

    const [latex, setLatex] = useState(testLatex);

    return (
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', width: '85vw' }}>
            <div style={{ backgroundColor: 'red', width: '40vw', height: '80vh'}}>
                <textarea style={{ width: '100%', height: '100%', resize: 'none'}} value={latex} onChange={(e) => setLatex(e.target.value)}></textarea>
            </div>
            <div style={{ backgroundColor: '', width: '40vw', height: '80vh'}}>   
                <Latex>{latex}</Latex>
            </div>
        </div>
    )
}
