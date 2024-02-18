import './UserMenu.css'

const UserMenu = ({ menuItems, setActivePage }) => {
	return (
		<div style={{ display: "flex", flexDirection: 'row', justifyContent: "space-between", width: "30%" }}>
			{
				menuItems.map((value, index) => <span onClick={() => setActivePage(value.component)} key={index} style={{ cursor: 'pointer' }}>{value.label}</span>)
			}
		</div>
	)
}
export default UserMenu