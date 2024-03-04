import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { axiosRequest } from '../../redux/actions';
import { Space, Form, Drawer, Button, Input, Row, Col, Popconfirm } from 'antd';
import UserCard from '../../components/UserCard/UserCard';
import { useForm } from "antd/es/form/Form";
import './UserList.css'

const UserList = ({ success }) => {
	const dispatch = useDispatch();
	const [form] = useForm();
	const userName = Form.useWatch('username', form);
	const users = useSelector(state => state.users.data);
	const [open, setOpen] = useState(false);
	const [activeUser, setActiveUser] = useState(null);
	const showDrawer = () => {
		setOpen(true);
	};
	const onClose = () => {
		setOpen(false);
	};
	const onFinish = (values) => {
		dispatch(axiosRequest({ ...values, id: activeUser.id }, 'users', 'put'))
		success(activeUser.username + ' is successfully edit!')
		onClose();
	};

	useEffect(() => {
		form.setFieldsValue(activeUser)
	}, [activeUser]);
	useEffect(() => {
		dispatch(axiosRequest('', 'users', ''))
	}, [<Drawer />])
	return (
		<>
			<Space wrap size={'middle'} align={'center'}>
				{
					users.map((value, index) =>
						<UserCard onClick={() => {
							setActiveUser(value)
							showDrawer()
						}}
							key={index}
							item={value} />)
				}
			</Space>
			{
				!!activeUser &&
				<Drawer
					title={`Edit ${activeUser.username}`}
					destroyOnClose
					width={720}
					onClose={onClose}
					open={open}
					styles={{
						body: {
							paddingBottom: 80,
						},
					}}
					extra={
						<Space>
							<Button
								onClick={() => {
									form.submit()
								}} htmlType={'submit'} type="primary">
								Save
							</Button>
							<Button onClick={onClose}>Cancel</Button>

							<Popconfirm
								title={`Delete ${activeUser.username}?`}
								description="Are you sure to delete this user?"
								onConfirm={() => {
									dispatch(axiosRequest(activeUser, 'users', 'delete'))
										.then(() => { onClose() })
								}}
								onCancel={onClose}
								okText="Yes"
								cancelText="No"
							>
								<Button type={'primary'} danger>Delete</Button>
							</Popconfirm>

						</Space>
					}
				>
					<Form form={form} initialValues={activeUser} layout="vertical" hideRequiredMark onFinish={onFinish}>
						<Row gutter={16}>
							<Col span={12}>
								<Form.Item
									name="username"
									label="User name"
									rules={[
										{
											required: true,
											message: 'Please enter user name',
										},
									]}
								>
									<Input placeholder="Please enter user name" />
								</Form.Item>
							</Col>
							<Col span={12}>
								<Form.Item
									name="photo"
									label="photo"
									rules={[
										{
											required: true,
											message: 'Please download your photo',
										},
									]}
								>
									<Input
										style={{
											width: '100%',
										}}
										placeholder="Please download your photo"
									/>
								</Form.Item>
							</Col>
						</Row>
						<Row gutter={16}>
							<Col span={12}>
								<Form.Item
									name="password"
									label="Password"
									rules={[
										{
											required: true,
											message: 'Please enter your password',
										},
									]}
								>
									<Input.Password
										style={{
											width: '100%',
										}}
										placeholder="Please enter your password"
									/>
								</Form.Item>
							</Col>
						</Row>
					</Form>
				</Drawer>
			}
		</>

	)
}
export default UserList