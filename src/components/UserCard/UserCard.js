import { Typography } from 'antd'
import './UserCard.css'

const UserCard = ({ item, onClick }) => {
	return (
		<div className={'user-card'} onClick={onClick}>
			<img src={item.photo} alt={item.username} />
			<Typography.Title level={2}>{item.username}</Typography.Title>
			<Typography.Text code >{item.id}</Typography.Text>
		</div>
	)
}
export default UserCard