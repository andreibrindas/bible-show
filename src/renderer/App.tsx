/* eslint-disable jsx-a11y/anchor-is-valid */
import { MemoryRouter as Router, Routes, Route } from 'react-router-dom';
import { useState } from 'react';

import icon from '../../assets/icon.svg';
import './App.css';

function Hello() {
  const [verses, setVerses] = useState<any>();
  const loadBible = () => {
    window.electron.ipcRenderer.sendMessage('bible:load');

    window.electron.ipcRenderer.on('send-bible', (result) => {
      console.log(result);
      setVerses(result);
    });
  };

  console.log('verses from state', verses);

  return (
    <div>
      <h1>Bible Show</h1>
      <div className="Hello">
        <a target="_blank" rel="noreferrer">
          <button type="button" onClick={loadBible}>
            <span role="img" aria-label="books">
              📚
            </span>
            Load Bible
          </button>
        </a>
        <a
          href="https://github.com/sponsors/electron-react-boilerplate"
          target="_blank"
          rel="noreferrer"
        >
          <button type="button">
            <span role="img" aria-label="folded hands">
              🙏
            </span>
            Donate
          </button>
          yuha
        </a>
      </div>
      <ul style={{ overflow: 'scroll', height: '200px' }}>
        {verses?.map((verse: any) => (
          <li key={verse.id}>
            {verse.verset} - {verse.text}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Hello />} />
      </Routes>
    </Router>
  );
}
