import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { deletePost } from 'store/slices/postSlice'

const Post = ({ post }) => {
	const { title, description, id } = post
	const navigate = useNavigate()
	const dispatch = useDispatch()

	const handleEdit = () => {
		navigate('/edit-post/' + id)
	}

	const handleDelete = () => {
		dispatch(deletePost(id))
	}

	return (
		<div className='post'>
			<h3>{title}</h3>
			<p>{description}</p>
			<button
				className='bg-secondary mt-2 text-light mr-2'
				onClick={handleEdit}
			>
				Edit
			</button>
			<button className='bg-dark mt-2 text-light' onClick={handleDelete}>
				Delete
			</button>
		</div>
	)
}

export default Post
