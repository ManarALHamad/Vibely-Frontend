import { Link } from "react-router-dom"

const Nav = (props) => {

    const handleSignOut = () => {
        localStorage.removeItem("token")
        props.setUser(null)
    }

    return (
        <nav className="navbar">

            <Link className="nav-brand" to="/">
                Vibely
            </Link>

            {props.user ? (

                <ul className="nav-links">

                    <li className="nav-welcome">
                        Welcome, {props.user.username}!
                    </li>

                    <li>
                        <Link to="/">FEED</Link>
                    </li>

                    <li>
                        <Link to="/posts/new">NEW POST</Link>
                    </li>

                    <li>
                        <Link to="/profiles">ALL PROFILES</Link>
                    </li>

                    <li>
                        <Link to="/profile">PROFILE</Link>
                    </li>

                    <li>
                        <Link
                            to="/"
                            onClick={handleSignOut}
                            className="sign-out"
                        >
                            SIGN OUT
                        </Link>
                    </li>

                </ul>

            ) : (

                <ul className="nav-links">

                    <li>
                        <Link to="/">HOME</Link>
                    </li>

                    <li>
                        <Link to="/sign-up">SIGN UP</Link>
                    </li>

                    <li>
                        <Link to="/sign-in" className="nav-signin">
                            SIGN IN
                        </Link>
                    </li>

                </ul>

            )}

        </nav>
    )
}

export default Nav