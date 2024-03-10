import { useDispatch, useSelector } from 'react-redux'
import './Users.css'
import { Table, Empty, Button } from 'antd';
import { useEffect } from 'react';
import { axiosRequest } from "../../redux/actions"
import { Link, useNavigate } from 'react-router-dom';

const Users = () => {
	const dispatch = useDispatch();
	const users = useSelector(state => state.users.data);
	const navigate = useNavigate();
	useEffect(() => {
		dispatch(axiosRequest('', 'users', ''))
	})
	const columns = [
		{
			title: "id",
			dataIndex: "id",
			key: "id"
		},
		{
			title: "username",
			dataIndex: "username",
			key: "username"
		},
		{
			title: "password",
			dataIndex: "password",
			key: "password"
		},
	]
	return (
		<>
			<Table
				dataSource={users}
				columns={columns}
				onRow={(record) => {
					return {
						onClick: (event) => {
							navigate(`/users/${record.id}`)
						}
					}
				}}
				rowKey={r => r.id}
				locale={{
					emptyText: (
						<Empty image={Empty.PRESENTED_IMAGE_SIMPLE}>
							<Link to={'/home'}>
								<Button>Go to home!</Button>
							</Link>
						</Empty>
					)
				}}
			/>
		</>
	)
}
export default Users