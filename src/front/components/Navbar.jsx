import { Link } from "react-router-dom";
import useGlobalReducer from "../hooks/useGlobalReducer";

export const Navbar = () => {
	const {store, dispatch} = useGlobalReducer()
	
	return (
		<nav className="navbar navbar-light bg-light">
			<div className="container">
				<Link to="/">
					<span className="navbar-brand mb-0 h1">React Boilerplate</span>
				</Link>
			{store.auth?
				<div className="ml-auto">
					<Link to="/">
						<button onClick={()=>{
							dispatch({
								type: 'set_auth',
								payload: false
							})
							localStorage.removeItem("token")
						}} className="btn btn-primary">Log Out</button>
					</Link>
				</div>
			:null}
			</div>
		</nav>
	);
};