import { useDispatch } from 'react-redux';
import './AddUser.css';
import { Form, Input, Button } from 'antd';
import { axiosRequest } from '../../redux/actions';
import UserList from '../UserList/UserList';

const AddUser = ({ setActivePage, success }) => {
	const dispatch = useDispatch();
	const [form] = Form.useForm();
	const userName = Form.useWatch('username', form);
	const onFinish = (values) => {
		dispatch(axiosRequest(values, 'users', 'post'))
			.then(() => {
				setActivePage(<UserList />)
				success(values.username + ' is successfully added!')
			})
	};
	const onFinishFailed = (errorInfo) => {
		console.log('Failed:', errorInfo);
	};
	return (
		<>
			<Form
				name="basic"
				form={form}
				onFinish={onFinish}
				onFinishFailed={onFinishFailed}>
				<Form.Item
					name={'username'}
					label={'username'}>
					<Input />
				</Form.Item>
				<Form.Item
					name={'password'}
					label={'password'}>
					<Input.Password />
				</Form.Item>
				<Form.Item
					name="photo"
					label="photo">
					<Input
						style={{
							width: '100%',
						}}
					/>
				</Form.Item>
				<Form.Item>
					<Button htmlType={'submit'} type={'primary'}>Submit</Button>
				</Form.Item>
			</Form>
		</>
	)
}
export default AddUser