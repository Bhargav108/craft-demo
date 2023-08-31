import { configureStore } from '@reduxjs/toolkit';
import ideaDetails  from '../features/IdeaSlice';

export const store = configureStore({
  reducer: {
    ideas: ideaDetails
  },
});
