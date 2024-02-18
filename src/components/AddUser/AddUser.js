import axios from 'axios';
import { useEffect, useState } from 'react';
import './AddUser.css';
import { Button, Form, Input } from 'antd';

const AddUser = ({ activeUser, setActiveUser }) => {
	const [users, setUsers] = useState([]);
	useEffect(() => {
		axios
			.get('http://localhost:3000/users')
			.then((res) => setUsers(res.data))
	}, [])
	const onFinish = (values) => {
		const testUser = users.find((value) => value.username === values.username)
		if (!!testUser) {
			if (testUser.password === values.password) {
				setActiveUser(testUser)
			} else {
				console.log('error password')
			}
		} else {
			axios
				.post('http://localhost:3000/users', values)
				.then(res => setActiveUser(res.data))
		}
	};
	const onFinishFailed = (errorInfo) => {
		console.log('Failed:', errorInfo);
	};
	return (
		<Form
			name="basic"
			className={'add-user-container'}
			labelCol={{
				span: 8,
			}}
			wrapperCol={{
				span: 16,
			}}
			style={{
				maxWidth: 600,
			}}
			onFinish={onFinish}
			onFinishFailed={onFinishFailed}
			autoComplete="off"
		>
			<Form.Item
				label="Username"
				name="username"
				rules={[
					{
						required: true,
						message: 'Please input your username!',
					},
				]}
			>
				<Input />
			</Form.Item>

			<Form.Item
				label="Password"
				name="password"
				rules={[
					{
						required: true,
						message: 'Please input your password!',
					},
				]}
			>
				<Input.Password />
			</Form.Item>

			<Form.Item
				label="Photo"
				name="photo"
				rules={[
					{
						required: true,
						message: 'Please load your photo!',
					},
				]}
			>
				<Input />
			</Form.Item>

			<Form.Item
				wrapperCol={{
					offset: 8,
					span: 16,
				}}
			>
				<Button type="primary" htmlType="submit">
					Submit
				</Button>
			</Form.Item>
		</Form>
	)
}
export default AddUser