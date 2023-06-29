import { RequireAuth } from './contexts/Auth/RequireAuth';

import { MainRoutes } from './routes/MainRoutes';

import "./App.css"

function App() {
	return (
		<div className='App'>

			<MainRoutes />

		</div>
	);
}

export default App;
