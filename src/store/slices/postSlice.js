import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'
axios.defaults.baseURL = 'http://localhost:3001'
const initialState = {
  posts: [],
  post: {},
  loading: true
}

export const fetchAllPosts = createAsyncThunk(
	'posts/fetchAllPosts',
	async () => {
		try {
			const { data } = await axios.get('/posts')
			return { posts: data }
		} catch (error) {
			return error
		}
	}
)

export const fetchPostById = createAsyncThunk(
  'posts/fetchPostById',
  async (id, thunkAPI) => {
    try {
      const { data } = await axios(`/posts/${id}`)
      return { post: data }
    } catch (error) {
      return error
    }
  }
)

export const createPost = createAsyncThunk(
  'posts/createPost',
  async (formData, thunkAPI) => {
    try {
      const { data } = await axios.post('/posts', formData)
      return { post: data }
    } catch (error) {
      return error
    }
  }
)

export const updatePost = createAsyncThunk(
  'posts/updatePost',
  async (formData, thunkAPI) => {
    try {
      const { data } = await axios.put(`/posts/${formData.id}`, formData)
      return { post: data }
    } catch (error) {
      return error
    }
  }
)

export const deletePost = createAsyncThunk(
  'posts/deletePost',
  async (id, thunkAPI) => {
    try {
      await axios.delete(`/posts/${id}`)
      return { id }
    } catch (error) {
      return error
    }
  }
)


const postSlice = createSlice({
  name: 'posts',
  initialState,

  reducer: {
  },

	extraReducers: (builder) => {
    builder.addCase(fetchAllPosts.pending, (state) => {
      state.loading = true
    })
		builder.addCase(fetchAllPosts.fulfilled, (state, action) => {
      state.posts = action.payload.posts
      state.loading = false
		})

    builder.addCase(fetchPostById.pending, (state) => {
      state.loading = true
    })
    builder.addCase(fetchPostById.fulfilled, (state, action) => {
      state.post = action.payload.post
      state.loading = false
    })

    builder.addCase(createPost.pending, (state) => {
      state.loading = true
    })
    builder.addCase(createPost.fulfilled, (state, action) => {
      state.posts.push(action.payload.post)
      state.loading = false
    })

    builder.addCase(updatePost.pending, (state) => {
      state.loading = true
    })
    builder.addCase(updatePost.fulfilled, (state, action) => {
      state.posts = state.posts.map(post => post.id === action.payload.post.id ? action.payload.post : post)
      state.loading = false
    })

    builder.addCase(deletePost.pending, (state) => {
      state.loading = true
    })
    builder.addCase(deletePost.fulfilled, (state, action) => {
      state.posts = state.posts.filter(post => post.id !== action.payload.id)
      state.loading = false
    })
	},
})

export default postSlice.reducer
