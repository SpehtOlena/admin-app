import './App.css'
import { useState } from 'react';
import { message, Layout, Menu } from 'antd';
import AddUser from './pages/AddUser/AddUser';
import UserList from './pages/UserList/UserList'

const { Header, Content, Footer } = Layout;
const items = [
	{
		key: 'UserList',
		label: 'User List'
	},
	{
		key: 'AddUser',
		label: 'Add User'
	},
]

function App() {
	const [activePage, setActivePage] = useState(<UserList />);

	const [messageApi, contextHolder] = message.useMessage();
	const success = (text) => {
		messageApi.open({
			type: 'success',
			content: text,
		});
	};

	function switchPages(page) {
		switch (page) {
			case 'AddUser': {
				return <AddUser setActivePage={setActivePage} success={success} />
			}
			case 'UserList': {
				return <UserList success={success} />
			}
		}
	}

	return (
		<>
			<Layout style={{ minHeight: "100vh" }}>
				<Header
					style={{
						display: 'flex',
						alignItems: 'center',
					}}
				>
					<div className="demo-logo" />
					<Menu
						onClick={(item) => {
							const page = switchPages(item.key)
							setActivePage(page)
						}}
						theme="dark"
						mode="horizontal"
						defaultSelectedKeys={['2']}
						items={items}
						style={{
							flex: 1,
							minWidth: 0,
						}}
					/>
				</Header>
				<Content
					style={{
						padding: '20px 48px',
					}}
				> {contextHolder}
					{activePage}
				</Content>
				<Footer
					style={{
						textAlign: 'center',
					}}
				>
					Ant Design ©{new Date().getFullYear()} Created by Ant UED
				</Footer>
			</Layout>



		</>

	)
}
export default App