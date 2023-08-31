import React, { useEffect, useState } from 'react';
import EmptyScreen from './EmptyScreen';
import IdeaCard from './IdeaCard';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getIdeas } from '../../features/IdeaSlice';

export default function Idea() {
  const dispatch = useDispatch();

  const [isLoading, setIsLoading] = useState(true);

  const { ideas } = useSelector((state) => state.ideas);

  useEffect(() => {
    dispatch(getIdeas())
      .then(() => {
        setIsLoading(false); 
      })
      .catch(() => {
        setIsLoading(false);
      });
  }, [dispatch]);

  return (
    <>
      {isLoading ? (
        <div className='loading-container'>Loading...</div>
      ) : ideas.length ? (
        <div>
          <div className='idea-add-button-wrapper'>
            <Link to='/create/idea'>
              <button className='btn'>Add Idea</button>
            </Link>
          </div>
          <div className='idea-list-wrapper'>
            {ideas.map((idea) => (
              <Link to={`/idea/${idea._id}`} key={idea._id}>
                <IdeaCard idea={idea} />
              </Link>
            ))}
          </div>
        </div>
      ) : (
        <div className='empty-screen-container'>
          <EmptyScreen />
        </div>
      )}
    </>
  );
}
