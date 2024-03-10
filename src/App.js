import './App.css';
import { Breadcrumb, Layout, Menu } from 'antd';
import { HomeOutlined, ShoppingOutlined, UserOutlined, TeamOutlined } from '@ant-design/icons';
import { Link, Outlet, useLocation, useNavigate } from 'react-router-dom';
import { useEffect } from 'react';

const { Header, Content, Footer } = Layout;

const items = [
	{
		label: <Link to={'home'}>Home</Link>,
		key: 'home',
		icon: <HomeOutlined />,
	},
	{
		label: <Link to={'sale'}>Sale</Link>,
		key: 'sale',
		icon: <ShoppingOutlined />,
	},
	{
		label: <Link to={'profile'}>Profile</Link>,
		key: 'profile',
		icon: <UserOutlined />,
	},
	{
		label: <Link to={'users'}>Users</Link>,
		key: 'users',
		icon: <TeamOutlined />,
	}
]

const App = () => {

	const location = useLocation();
	const navigate = useNavigate();
	useEffect(() => {
		if (location.pathname === '/') {
			navigate('home')
		}
	}, [])
	const pathSnippets = location.pathname.split("/").filter((i) => i);

	const extraBreadcrumbItems = pathSnippets.map((value, index) => {
		const url = `/${pathSnippets.slice(0, index + 1).join("/")}`;
		return {
			key: url,
			title: <Link to={url}>{value}</Link>
		}
	});
	const breadcrumbItems = [
		{
			title: <Link to={"/"}>root</Link>,
			key: "home"
		},
	].concat(extraBreadcrumbItems)
	return (
		<Layout style={{ width: "100vw", minHeight: "100vh" }}>
			<Header
				style={{
					display: 'flex',
					alignItems: 'center',
				}}
			>
				<Menu
					defaultSelectedKeys={[location.pathname.split('/')[1]]}
					selectedKeys={[location.pathname.split('/')[1]]}
					mode="horizontal"
					items={items}
					theme='dark'
					style={{ width: "100%" }} />;
			</Header>
			<Content
				style={{
					padding: '20px 48px',
				}}
			>
				<Breadcrumb items={breadcrumbItems} />
				<Outlet />
			</Content>
			<Footer
				style={{
					textAlign: 'center',
					backgroundColor: '#001529',
					color: "#fff"
				}}
			>
				Ant Design ©{new Date().getFullYear()} Created by Ant UED
			</Footer>
		</Layout>
	)
}
export default App