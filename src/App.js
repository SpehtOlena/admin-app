import { useState } from 'react';
import './App.css';
import AddUser from './components/AddUser/AddUser';
import Body from './components/Body/Body';

function App() {
	const [activeUser, setActiveUser] = useState(null);
	return (
		<div className="App">
			{
				!!activeUser ? <Body activeUser={activeUser} setActiveUser={setActiveUser} /> : <AddUser activeUser={activeUser} setActiveUser={setActiveUser} />
			}
		</div>
	);
}

export default App;
