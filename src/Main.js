import { Button, Card, Col, Divider, Row, Space, Spin, Typography } from "antd";
import { useDispatch, useSelector } from "react-redux"
import { getPost, getPosts, getUser, getUsers } from "./redux/action";
import { useEffect } from "react";
import './Main.css'

const Main = () => {
	const dispatch = useDispatch();
	const counter = useSelector(state => state.counter.data);
	const users = useSelector(state => state.users.data);
	const user = useSelector(state => state.users.item);
	const posts = useSelector(state => state.posts.data);
	const post = useSelector(state => state.posts.item);
	const loadingUsers = useSelector(state => state.users.loading);
	const error = useSelector(state => state.users.error)

	useEffect(() => {
		dispatch(getUsers());
		dispatch(getPosts())
	}, [])

	return (
		<div>
			<Divider>USERS</Divider>
			<Row justify="space-between">
				<Col span={14} >
					<Space wrap size={'large'}>
						{
							loadingUsers ?
								<Spin /> :
								users.map((value, index) => <Card onClick={() => dispatch(getUser(value))} key={index} className={'user-card'}>
									<img src={value.photo} alt="" />
									<Typography.Title level={3}>{value.username.toUpperCase()}</Typography.Title>
								</Card>)
						}
						{
							!!error &&
							error.message
						}
					</Space>
				</Col>
				<Col span={9}>
					{
						!!user.id &&
						<Card className={'one-user-card'}>
							<img src={user.photo} alt="" />
							<Typography.Title level={1}>{user.username}</Typography.Title>
						</Card>
					}
				</Col>
			</Row >
			<Divider>POSTS</Divider>
			<Row justify={'space-between'}>
				<Col span={14}>
					<Space wrap size={'large'}>
						{
							posts.map((value, index) =>
								<Card onClick={() => dispatch(getPost(value))} key={index} className={'user-card'}>
									<Typography.Title>{value.title}</Typography.Title>
									<Typography.Text>{value.body}</Typography.Text>
								</Card>)
						}
					</Space>
				</Col>
				<Col span={9}>
					{
						!!post.id &&
						<Card className={'one-user-card'}>
							<Typography.Title level={1}>{post.title}</Typography.Title>
							<Typography.Text>{post.body}</Typography.Text>
						</Card>
					}
				</Col>
			</Row>
		</div>


	)
}
export default Main