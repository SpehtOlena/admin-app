import { useState } from 'react';
import './Body.css';
import { Button, Col, Layout } from 'antd';
import { useEffect } from 'react';
import axios from 'axios';
import Posts from '../../pages/Posts/Posts.js';
import AddPost from '../../pages/AddPost/AddPost.js';
import Profile from '../../pages/Profile/Profile.js';
import UserMenu from '../UserMenu/UserMenu.js';


const { Header, Footer, Content } = Layout;


const Body = ({ activeUser, setActiveUser }) => {
	const [activePage, setActivePage] = useState(null);
	const [posts, setPosts] = useState([]);
	useEffect(() => {
		axios
			.get('http://localhost:3000/posts')
			.then((res) => setPosts(res.data))
	}, [])
	const menuItems = [
		{
			label: "Posts",
			component: <Posts posts={posts} setPosts={setPosts} activeUser={activeUser} />
		},
		{
			label: "Add Posts",
			component: <AddPost activeUser={activeUser} posts={posts} setPosts={setPosts} />
		},
		{
			label: "Profile",
			component: <Profile activeUser={activeUser} setActiveUser={setActiveUser} />
		}
	]
	return (
		<Layout style={{ width: '100vw', minHeight: '100vh' }}>
			<Header style={{ color: "white", display: "flex", flexDirection: "row", justifyContent: "space-between", alignContent: "center", alignItems: "center" }}>
				<h1 onClick={() => setActivePage(<Profile activeUser={activeUser} setActiveUser={setActiveUser} />)} style={{ fontSize: 28, cursor: 'pointer' }}>{activeUser.username.toUpperCase()}</h1>
				<UserMenu menuItems={menuItems} setActivePage={setActivePage} activePage={activePage} />
				<Button onClick={() => setActiveUser(null)} danger type='primary'>Exit</Button>
			</Header>
			<Content style={{ padding: '20px 30px' }}>
				{activePage}</Content>
			<Footer className={'footer'}>
				<Col>
					© 2024 Copyright: me).com
				</Col>
				<Col>
					Active user: {activeUser.username.toUpperCase()}
				</Col>
			</Footer>
		</Layout>
	)
}
export default Body