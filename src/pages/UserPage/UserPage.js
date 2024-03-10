import { Link, useNavigate, useParams } from 'react-router-dom'
import './UserPage.css'
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { axiosRequest, clearError } from '../../redux/actions';
import { Avatar, Button, Col, Descriptions, Row, Space } from 'antd';

const UserPage = () => {

	const { userId } = useParams();
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const user = useSelector(state => state.users.item);
	const error = useSelector(state => state.users.error);
	useEffect(() => {
		if (!!error) {
			dispatch(clearError())
			navigate('/users')
		}
	}, [error])
	useEffect(() => {
		if (userId) {
			dispatch(axiosRequest({ id: userId }, 'users', 'get'))
		}
	}, [])

	return (
		<>
			{
				!!userId &&
				<Row>
					<Col span={4}>
						<Avatar size={100}>
							<img src={user.photo} alt={user.username} />
						</Avatar>

					</Col>
					<Col span={18}>
						<Descriptions title={<Space>
							<span>
								Users №${user.id}
							</span>
							<Button
								danger type={'text'}
								onClick={() => {
									dispatch(axiosRequest(user, "users", 'delete'))
										.then(() => {
											navigate("/users")
										})
								}}>
								Delete
							</Button>
						</Space>}>
							<Descriptions.Item label="User Name">{user.username}</Descriptions.Item>
							<Descriptions.Item label="User Password">{user.password}</Descriptions.Item>
						</Descriptions >
						<Link to={'/users'}>
							<Button type={'primary'}>Back to users list!</Button>
						</Link>
					</Col>
				</Row>
			}

		</>
	)
}
export default UserPage