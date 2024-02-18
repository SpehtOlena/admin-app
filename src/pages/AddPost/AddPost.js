import './AddPost.css';
import axios from 'axios';
import { Button, Form, Input } from 'antd';
import TextArea from 'antd/es/input/TextArea';

const AddPost = ({ activeUser, posts, setPosts }) => {
	const onFinish = (values) => {
		axios
			.post('http://localhost:3000/posts', { ...values, userId: activeUser.id, comments: [] })
			.then(res => setPosts([...posts, res.data]))
	};
	const onFinishFailed = (errorInfo) => {
		console.log('Failed:', errorInfo);
	};
	return (
		<Form
			name="add-post"
			className={'add-post-container'}

			onFinish={onFinish}
			onFinishFailed={onFinishFailed}
			autoComplete="off"
		>
			<Form.Item
				label="Title"
				name="title"
				rules={[
					{
						required: true,
						message: 'Please input title!',
					},
				]}
			>
				<Input />
			</Form.Item>

			<Form.Item
				label="Body"
				name="body"
				rules={[
					{
						required: true,
						message: 'Please input your text!',
					},
				]}
			>
				<TextArea autoSize={{
					minRows: 3,
					maxRows: 10,
				}} />
			</Form.Item>

			<Form.Item
				wrapperCol={{
					offset: 8,
					span: 16,
				}}
			>
				<Button type="primary" htmlType="submit">
					Save
				</Button>
			</Form.Item>
		</Form>
	)
}
export default AddPost