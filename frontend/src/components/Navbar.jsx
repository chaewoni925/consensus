import { Link } from 'react-router-dom';

function Navbar() {
    return (
        <nav>
            <Link to="/">About Us</Link>
            <Link to="/members">Member</Link>
            <Link to="/activities">Activity</Link>
            <Link to="/join-us">Join Us</Link>
            <Link to="/contact">Contact</Link>
        </nav>
    );
}

export default Navbar;