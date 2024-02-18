import { Button, Form, Input, Row, Avatar, Col, Typography } from 'antd';
import { UserOutlined } from '@ant-design/icons';
import './Profile.css'
import axios from 'axios';

const Profile = ({ activeUser, setActiveUser }) => {
	const onFinish = (values) => {
		axios
			.put(`http://localhost:3000/users/${activeUser.id}`, values)
			.then((res) => setActiveUser(res.data))
			.catch((error) => {
				console.log(error);
			})
	};
	const onFinishFailed = (errorInfo) => {
		console.log('Failed:', errorInfo);
	};
	return (
		<div className={'profile-container'}>
			<Col span={6} className={'profile-main'}>
				<Row>
					{
						activeUser.photo ?
							<Avatar shape={'square'} size={250} src={activeUser.photo} alt={activeUser.username} />
							:
							<Avatar shape={'square'} size={250} icon={<UserOutlined />} />

					}
				</Row>
				<Row>
					<Typography.Title level={5}>
						{activeUser.username.toUpperCase()}
					</Typography.Title>
				</Row>
			</Col>
			<Col span={16}>
				<Form
					className={'profile_form'}
					name="profile_form"
					initialValues={activeUser}

					style={{
						maxWidth: 800,
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
						<Input addonAfter={'url'} />
					</Form.Item>

					<Form.Item
						style={{ textAlign: "right" }}
					>
						<Button type="primary" htmlType="submit">
							Edit
						</Button>
					</Form.Item>
				</Form>
			</Col>

		</div>
	)
}
export default Profile