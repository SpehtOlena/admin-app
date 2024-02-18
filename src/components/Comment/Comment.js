import { Avatar, Typography } from 'antd';
import { UserOutlined } from '@ant-design/icons';
import './Comment.css'

const Comment = ({ comment }) => {
	return (
		<div className={'comment-item-container'}>
			<div>
				{
					comment.photoUser ?
						<Avatar size={40} src={comment.photoUser} alt={comment.username} />
						:
						<Avatar size={40} icon={<UserOutlined />} />
				}
			</div>
			<div className={'comment-body'}>
				<Typography.Title level={5}>{comment.username}</Typography.Title>
				<Typography>{comment.body}</Typography>
			</div>
		</div>
	)
}
export default Comment