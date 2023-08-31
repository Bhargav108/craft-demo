import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const API_URL = "http://localhost:5000/api";

const handleAsyncAction = (state, action) => {
  state.loading = false;
  if (action.payload) {
    state.ideas = action.payload;
  } else {
    state.error = action.payload.message;
  }
};

export const createIdea = createAsyncThunk(
  "createIdea",
  async (data, { rejectWithValue }) => {
    console.log("data", data);
    try {
      const response = await fetch(`${API_URL}/ideas`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
      const result = await response.json();
      return result;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const getIdeas = createAsyncThunk(
  "getIdeas",
  async (_, { rejectWithValue }) => {
    try {
      const response = await fetch(`${API_URL}/ideas`);
      const result = await response.json();
      console.log(result);
      return result;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const getIdeaById = createAsyncThunk(
  "getIdeaById",
  async (data, { rejectWithValue }) => {
    try {
      const response = await fetch(`${API_URL}/ideas/${data.id}`);
      const result = await response.json();
      return result;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const deleteIdea = createAsyncThunk(
  "deleteIdea",
  async (id, { rejectWithValue }) => {
    try {
      const response = await fetch(`${API_URL}/ideas/${id}`, { method: "DELETE" });
      const result = await response.json();
      console.log(result);
      return result;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const updateIdea = createAsyncThunk(
  "updateIdea",
  async (data, { rejectWithValue }) => {
    console.log("updated data", data);
    try {
      const response = await fetch(`${API_URL}/ideas/${data.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data.payload),
      });
      const result = await response.json();
      return result;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const updateIdeaContentByReference = createAsyncThunk(
  "updateIdea",
  async (data, { rejectWithValue }) => {
    console.log("updated data", data);
    try {
      const response = await fetch(`${API_URL}/ideas//update-content/${data.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
      const result = await response.json();
      return result;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const ideaDetails = createSlice({
  name: "ideaDetails",
  initialState: {
    ideas: [],
    loading: false,
    error: null,
  },
  reducers: {
  },
  extraReducers: {
    [getIdeas.pending]: (state) => {
      state.loading = true;
    },
    [getIdeas.fulfilled]: handleAsyncAction,
    [getIdeas.rejected]: handleAsyncAction,
    [deleteIdea.pending]: (state) => {
      state.loading = true;
    },
    [deleteIdea.fulfilled]: (state, { payload }) => {
      state.loading = false;
      const { id } = payload;
      if (id) {
        state.ideas = state.ideas.filter((idea) => idea._id !== id);
      }
    },
    [deleteIdea.rejected]: handleAsyncAction,
  },
});



export default ideaDetails.reducer;
