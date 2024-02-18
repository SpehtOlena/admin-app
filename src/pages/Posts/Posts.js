import { useEffect } from 'react';
import './Posts.css';
import { Empty } from 'antd';
import axios from 'axios';
import PostCard from '../../components/PostCard/PostCard';

const Posts = ({ posts, setPosts, activeUser }) => {

	return (
		<div className={'posts-container'}>
			{
				!!posts.length ? posts.map((value, index) => <PostCard activeUser={activeUser} posts={posts} setPosts={setPosts} post={value} key={index}>{value}</PostCard>) : <Empty />
			}
		</div>
	)
}
export default Posts