import axios from 'axios'
import * as TYPES from './types'

const isLoading = (loading) => {
	return {
		type: TYPES.LOADING,
		payload: { loading }
	}
}

// const setPosts = (data) => {
//   return {
//     type: getType(TYPES.SET_POSTS),
//     payload: data
//   }
// }
// const setSinglePost = (data) => {
//   return {
//     type: getType(TYPES.SET_SINGLE_POST),
//     payload: data
//   }
// }

// const fetchPost = (data) => {
//   return {
//     type: getType(TYPES.FETCH_SINGLE_POST),
//     payload: data
//   }
// }

// const addPost = (data) => {
//   return {
//     type: getType(TYPES.ADD_POST),
//     payload: data
//   }
// }

// const deletePost = (id) => {
//   return {
//     type: getType(TYPES.DELETE_POST),
//     payload: id
//   }
// }

// const updatePost = (data) => {
//   return {
//     type: getType(TYPES.UPDATE_POST),
//     payload: data
//   }
// }

// const failedToLoadPosts = (message) => {
//   return {
//     type: getType(TYPES.FETCH_POSTS, 'end'),
//     payload: { loading: false, message}
//   }
// }

axios.defaults.baseURL = 'http://localhost:3001'

const setAllPost = (data) => {
	return {
		type: TYPES.FETCH_POSTS,
		payload: { posts: data }
	}
}

const setSinglePost = (data) => {
	return {
		type: TYPES.FETCH_SINGLE_POST,
		payload: { post: data }
	}
}

const setNewPost = (data) => {
	return {
		type: TYPES.ADD_POST,
		payload: { post: data }
	}
}

const deletePost = (id) => {
	return {
		type: TYPES.DELETE_POST,
		payload: { id }
	}
}

const updatePost = (data) => {
	return {
		type: TYPES.UPDATE_POST,
		payload: { post: data }
	}
}

// API ACTIONS
export const fetchPosts = () => {
	return async (dispatch) => {
		try {
			dispatch(isLoading(true))
			const { data } = await axios('/posts')
			dispatch(setAllPost(data))
			dispatch(isLoading(false))
		} catch (error) {
			dispatch(isLoading(false))
		}
	}
}

export const fetchSinglePost = (id) => {
	return async (dispatch) => {
		try {
			dispatch(isLoading(true))
			const { data } = await axios(`/posts/${id}`)
			dispatch(setSinglePost(data))
			dispatch(isLoading(false))
		} catch (error) {
			dispatch(isLoading(false))
		}
	}
}

export const addPost = (formData) => {
	return async (dispatch) => {
		try {
			dispatch(isLoading(true))
			const { data } = await axios.post('/posts', formData)
			dispatch(setNewPost(data))
			dispatch(isLoading(false))
		} catch (error) {
			dispatch(isLoading(false))
		}
	}
}

export const deleteSinglePost = (id) => {
	return async (dispatch) => {
		try {
			dispatch(isLoading(true))
			await axios.delete(`/posts/${id}`)
			dispatch(deletePost(id))
			dispatch(isLoading(false))
		} catch (error) {
			dispatch(isLoading(false))
		}
	}
}

export const updateSinglePost = (formData) => {
	return async (dispatch) => {
		try {
			dispatch(isLoading(true))
			const { data } = await axios.put(`/posts/${formData.id}`, formData)
			dispatch(updatePost(data))
			dispatch(isLoading(false))
		} catch (error) {
			dispatch(isLoading(false))
		}
	}
}

// export const deletePosts = (data) => apiAction({
//   type: TYPES.API,
//   url: '/posts',
//   method: 'DELETE',
//   params: data,
//   onSuccess: deletePost,
//   onFailure: () => ({ type: getType(TYPES.DELETE_POST, 'error') }),
//   actionType: TYPES.DELETE_POST
// })

// export const updatePosts = (data) => apiAction({
//   type: TYPES.API,
//   url: '/posts',
//   method: 'PUT',
//   params: data.id,
//   data,
//   onSuccess: updatePost,
//   onFailure: () => ({ type: getType(TYPES.UPDATE_POST, 'error') }),
//   actionType: TYPES.UPDATE_POST
// })

// export const fetchSinglePost = (data) => apiAction({
//   type: TYPES.API,
//   url: '/posts',
//   params: data,
//   onSuccess: setSinglePost,
//   onFailure: () => ({ type: getType(TYPES.FETCH_SINGLE_POST, 'error') }),
//   actionType: TYPES.FETCH_SINGLE_POST
// })
