import { useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'
import {
	addPost,
	fetchSinglePost,
	updateSinglePost
} from 'store/actions/postActions'

const AddPost = () => {
	const { loading, post } = useSelector((state) => state.posts)
	const [state, setState] = useState({ title: '', description: '' })
	const { title, description } = state
	const dispatch = useDispatch()
	const navigate = useNavigate()
	const { id } = useParams()
	const dispatchAction = !id ? addPost : updateSinglePost
	const text = !id ? 'Add Post' : 'Update Post'
	const isSubmitted = useRef(false)
	useEffect(() => {
		if (id) {
			dispatch(fetchSinglePost(id))
		} else {
			setState({ title: '', description: '' })
		}
	}, [id]) // eslint-disable-line react-hooks/exhaustive-deps

	useEffect(() => {
		if (!loading) {
			setState({ title: post.title ?? '', description: post.description ?? '' })
		}
	}, [loading]) // eslint-disable-line react-hooks/exhaustive-deps

	useEffect(() => {
		if (isSubmitted.current) {
			navigate('/')
		}
	}, [isSubmitted.current]) // eslint-disable-line react-hooks/exhaustive-deps

	const handleChange = (e, key) => {
		setState({ ...state, [key]: e.target.value })
	}

	const handleSubmit = (e) => {
		e.preventDefault()
		const formData = { title, description }
		if (id) {
			formData.id = id
		}
		if (title && description) {
			dispatch(dispatchAction(formData))
			isSubmitted.current = true
			setState({ title: '', description: '' })
		}
	}

	return (
		<div className='add-post'>
			<h1>{text}</h1>
			<div className='card'>
				<form method='POST'>
					<div className='form-group'>
						<label className='form-label' htmlFor='title'>
							Title
						</label>
						<input
							type='text'
							className='form-control'
							id='title'
							placeholder='Title'
							value={title}
							onChange={(e) => handleChange(e, 'title')}
						/>
					</div>
					<div className='form-group'>
						<label className='form-label' htmlFor='description'>
							Description
						</label>
						<textarea
							className='form-control'
							id='description'
							rows='3'
							placeholder='Description'
							value={description}
							onChange={(e) => handleChange(e, 'description')}
						></textarea>
					</div>
					<button
						onClick={handleSubmit}
						type='submit'
						className='bg-secondary text-light py-2 px-5'
					>
						{text}
					</button>
				</form>
			</div>
		</div>
	)
}

export default AddPost
