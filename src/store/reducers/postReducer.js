import * as TYPES from '../actions/types'

const initialState = {
	posts: [],
	post: {},
	loading: true,
}

const postReducer = (state = initialState, { type, payload }) => {
	switch (type) {
		case TYPES.LOADING:
			return {
				...state,
				loading: payload.loading
			}
		case TYPES.FETCH_POSTS:
			return {
				...state,
				posts: payload.posts,
			}
		case TYPES.FETCH_SINGLE_POST:
			return {
				...state,
				post: payload.post,
			}
		case TYPES.ADD_POST:
			return {
				...state,
				posts: [...state.posts, payload.post]
			}
		case TYPES.DELETE_POST:
			return {
				...state,
				posts: state.posts.filter(post => post.id !== payload.id)
			}
		case TYPES.UPDATE_POST:
			return {
				...state,
				posts: state.posts.map(post => post.id === payload.post.id ? payload.post : post)
			}

		default:
			return state
	}
}

export default postReducer
