import { useEffect, useState } from 'react';
import { Col, Avatar, Row, Typography, Divider, Button, Input } from 'antd';
import { UserOutlined, MessageOutlined, EllipsisOutlined, FileAddOutlined } from '@ant-design/icons';
import './PostCard.css';
import axios from 'axios';
import Comment from '../Comment/Comment';

const PostCard = ({ post, activeUser, posts, setPosts }) => {
	const [user, setUser] = useState(null);
	const [showComments, setShowComments] = useState(false);
	const [showAddComments, setShowAddComments] = useState(false);
	const [commentInitialValue, setCommentInitialValue] = useState(null);
	useEffect(() => {
		axios
			.get(`http://localhost:3000/users/${post.userId}`)
			.then((res) => setUser(res.data))
			.catch((error) => { console.log(error); })
	})
	const handleAddPostComment = () => {
		axios
			.put(`http://localhost:3000/posts/${post.id}`, {
				...post, comments: [...post.comments, {
					body: commentInitialValue,
					idUser: activeUser.id,
					photoUser: activeUser.photo || null,
					username: activeUser.username
				}]
			})
			.then((res) => setPosts(posts.map((value, index) => {
				if (value.id === post.id) {
					return res.data
				} else {
					return value
				}
			})))
			.then(() => {
				setCommentInitialValue('')
				setShowAddComments(false)
			})
	}
	return (
		<>
			{
				!!user &&
				<div className={'post-card-container'}>
					<Col span={6}>
						{
							user.photo ?
								<Avatar size={64} src={user.photo} alt={user.username} />
								:
								<Avatar size={48} icon={<UserOutlined />} />

						}
					</Col>
					<Col span={16}>
						<Row className={'post-username'}>
							{user.username}
						</Row>
						<Row>
							<Typography.Title level={4} className={'post-title'}>{post.title}</Typography.Title>
						</Row>
						<Divider />
						<Row>
							<Typography className={'post-body'}>
								{post.body}
							</Typography>
						</Row>
						{
							showComments &&
							<>
								<Divider />
								{
									!!post.comments.length ?
										<Row>
											<ul className={'comments-container'}>
												{
													post.comments.map((value, index) => (
														<li key={index}>
															<Comment comment={value} />
														</li>
													))
												}
											</ul>
										</Row> :
										<div className={'no-comments'}>No Comments yet!</div>
								}

							</>
						}
						{
							showAddComments &&
							<>
								<Divider />
								<Row justify={'end'}>
									<Input.TextArea autoSize={{
										minRows: 1,
										maxRows: 10,
									}} onChange={(e) => { setCommentInitialValue(e.target.value) }}
										value={commentInitialValue} />
									<Button onClick={handleAddPostComment} icon={<FileAddOutlined />} type={'text'} />
								</Row>
							</>
						}
						<Divider />
						<Row justify={'end'}>
							<Button onClick={() => setShowAddComments(!showAddComments)} type={'text'} icon={<MessageOutlined />} />
							<Button onClick={() => setShowComments(!showComments)} type={'text'} icon={<EllipsisOutlined />} />
						</Row>
					</Col>
				</div >
			}
		</>

	)
}
export default PostCard