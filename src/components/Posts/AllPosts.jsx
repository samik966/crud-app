import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchPosts } from 'store/actions'
import Post from './Post'
import './Posts.scss'

const AllPosts = () => {
	const dispatch = useDispatch()
	const { loading, posts } = useSelector((state) => state.posts)

	useEffect(() => {
		dispatch(fetchPosts())
	}, []) // eslint-disable-line react-hooks/exhaustive-deps

	if (loading) {
		return <div>Loading...</div>
	}

	const renderPosts = () => {
		return posts.map((post) => <Post key={post.id} post={post} />)
	}

	return (
		<div className='all-posts'>
			<div className='post__container'>{renderPosts()}</div>
		</div>
	)
}

export default AllPosts
