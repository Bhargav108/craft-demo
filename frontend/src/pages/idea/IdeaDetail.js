import React, { useEffect, useMemo, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom'; // Import useParams
import LibraryEditor from '../../components/editor/LibraryEditor';
import { useDispatch, useSelector } from 'react-redux';
import { getIdeaById, updateIdea, updateIdeaContentByReference } from '../../features/IdeaSlice';

export default function IdeaDetail() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { id } = useParams();

  const ideaFromStore = useSelector(state =>
    state.ideas.ideas.find(idea => idea._id === id)
  );

  const [idea, setIdea] = useState({});
  const [isEditable, setIsEditable] = useState(false);
  const [title, setTitle] = useState("");
  const [subTitle, setSubtitle] = useState("");
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(true);

  const setEditFlag = () => {
    if(isEditable) {
      updateIdeaAction()
    }
    setIsEditable(previousEditState => !previousEditState);
  };

  const updateContent = content => {
    setContent(content)
    console.log('content', content);
  };

  const updateIdeaData = (ideaData, isFulfilled) => {
    if(isFulfilled) {
      console.log('updatedIdea', ideaData)
      setIdea(ideaData);
      setTitle(ideaData.title)
      setSubtitle(ideaData['sub-title'])
      setContent(ideaData.content)
      setLoading(false);
    }
  }

  const updateIdeaAction = () => {
    setLoading(true)
    const payload = {
      title,
      'sub-title': subTitle,
      content
    }
    dispatch(updateIdea({
      id,
      payload
    })).then(updatedIdea => {
      console.log('updatedIdea', updatedIdea)
      updateIdeaData(updatedIdea.payload, updatedIdea.type === "updateIdea/fulfilled")
      setLoading(false)
    })
    .catch(error => {
      console.error('Error fetching idea:', error);
      setLoading(false);
    });
  }

  const editableContent = useMemo(() => (
    <LibraryEditor content={content} updateContent={updateContent} />
  ), [content]);

  useEffect(() => {
    console.log('ideaId', id)
    setLoading(true);

    if (!ideaFromStore) {
      dispatch(getIdeaById({ id }))
        .then(fetchedIdea => {
          console.log('fetchedIdea', fetchedIdea)
          updateIdeaData(fetchedIdea.payload, fetchedIdea.type === "getIdeaById/fulfilled")
          setLoading(false);
        })
        .catch(error => {
          console.error('Error fetching idea:', error);
          setLoading(false);
        });
    } else {
      setIdea(ideaFromStore);
      updateIdeaData(ideaFromStore, true)
      setLoading(false);
    }
  }, [dispatch, id, ideaFromStore]);

  const updateIdeaByReferenceAction = () => {
    setLoading(true)
    dispatch(updateIdeaContentByReference({
      id,
      content
    })).then(updatedIdea => {
      console.log('updatedIdea', updatedIdea)
      updateIdeaData(updatedIdea.payload, updatedIdea.type === "updateIdea/fulfilled")
      setIsEditable(previousEditState => !previousEditState);
      setLoading(false)
    })
    .catch(error => {
      console.error('Error fetching idea:', error);
      setIsEditable(previousEditState => !previousEditState);
      setLoading(false);
    });
  }

  const backAction = () => {
    navigate(-1)
  }

  return (
    <div className='idea-detail-wrapper'>
      {loading ? (
        <div className='loading-container'>Loading...</div>
      ) : (
        <>
          <div className='idea-detail-button-wrapper'>
            <button className='btn-secondary' onClick={() => backAction()}>Back</button>
          </div>
          <div className='idea-detail-container'>
            {
              !isEditable ? 
                <div className='idea-detail-header' contentEditable={isEditable}>
                  {idea.title}
                </div>
              :
                <input
                  type="text"
                  id="ideaTitle"
                  name="ideaTitle"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  required
                />
            }
            {
              !isEditable ? 
                <div
                  className='idea-detail-subtitle'
                >
                  {idea['sub-title']}
                </div>
              :
                <input
                  type="text"
                  id="ideaSubtitle"
                  name="ideaSubtitle"
                  value={subTitle}
                  onChange={(e) => setSubtitle(e.target.value)}
                  required
                />
            }
            {isEditable ? (
              editableContent
            ) : (
              <div
                dangerouslySetInnerHTML={{ __html: idea.content }}
                className='idea-detail-content'
              />
            )}
            <div className='btn-wrapper'>
              <button onClick={() => setEditFlag()} className='btn'>
                {isEditable ? 'Update' : 'Edit'}
              </button>
              {
                isEditable ?
                <button className='btn' onClick={() => updateIdeaByReferenceAction()}>Replace idea reference</button>
                : null
              }
            </div>
          </div>
        </>
      )}
    </div>
  );
}
