import { Link } from 'react-router-dom';
import './NotFound.css';
import { Result, Button } from 'antd';

const NotFound = () => {
	return (
		<Result
			status="404"
			title="404"
			subTitle="Sorry, the page you visited does not exist."
			extra={
				<Link to={'home'}>
					<Button type="primary">Back Home</Button>
				</Link>
			}
		/>
	)
}
export default NotFound