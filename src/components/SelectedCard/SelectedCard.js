import './SelectedCard.css';
import { Typography } from 'antd'

const SelectedCard = ({ activeUser }) => {
	return (
		<div className={'selected-card'}>
			<img src={activeUser.photo} alt={activeUser.username} />
			<Typography.Title level={1}>{activeUser.username.toUpperCase()}</Typography.Title>
			<Typography.Text strong >{activeUser.id}</Typography.Text>
		</div>
	)
}
export default SelectedCard