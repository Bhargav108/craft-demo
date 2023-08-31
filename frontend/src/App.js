import React from 'react';
import { Routes, Route } from 'react-router-dom'

import './App.css';

import Playground from './pages/playground/Playground';
import Header from './components/Header';
import Idea from './pages/idea/Idea'
import Dashboard from './components/Dashboard';
import CreateIdea from './pages/idea/CreateIdea';
import IdeaDetail from './pages/idea/IdeaDetail';


function App() {
  return (
    <>
        <Header />
        <div className='container'>
          <Routes>
            <Route path='/' element={<Dashboard />} />
            <Route path='/playground' element={<Playground />} />
            <Route path='/create/idea' element={<CreateIdea />} />
            <Route path='/idea' element={<Idea />} />
            <Route path='/idea/:id' element={<IdeaDetail />} />
          </Routes>
        </div>
    </>
  );
}

export default App;
