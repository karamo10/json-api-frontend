import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav className="nav">
      <ul>
        <li>
          <Link to={'/'}>Home</Link>
        </li>
        <div>
          <li>
            <Link to={'/create-form'}>Create-Product</Link>
          </li>
          <li>
            <Link to={'/admin/products'}>Admin-Product</Link>
          </li>
           <li>
            <Link to={'/delete-products'}>Admin-Product</Link>
          </li>
        </div>
      </ul>
    </nav>
  );
};

export default Navbar;
