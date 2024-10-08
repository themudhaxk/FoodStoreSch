import { Link } from "react-router-dom";
// import "./Sidebar.css";

const Sidebar = () => {
	return (
		<div className="sidebar-wrapper">
			<nav id="sidebar">
				<ul className="list-unstyled components mt-4">
					<li>
						<Link to="/dashboard">
							<i className="fa fa-tachometer"></i> Dashboard
						</Link>
					</li>

					<li>
						<a
							href="#productSubmenu"
							data-toggle="collapse"
							aria-expanded="false"
							className="dropdown-toggle"
						>
							<i className="fa fa-product-hunt"></i> Products
						</a>
						<ul className="collapse list-unstyled" id="productSubmenu">
							<li>
								<Link to="/admin/allproductslist">
									<i className="fa fa-clipboard"></i> All
								</Link>
							</li>

							<li>
								<Link to="/admin/productlist">
									<i className="fa fa-plus"></i> Create
								</Link>
							</li>
						</ul>
					</li>
					<li>
						<a
							href="#categorySubmenu"
							data-toggle="collapse"
							aria-expanded="false"
							className="dropdown-toggle"
						>
							<i className="fa fa-product-hunt"></i> Category
						</a>
						<ul className="collapse list-unstyled" id="categorySubmenu">
							<li>
								<Link to="/admin/category">
									<i className="fa fa-clipboard"></i> All
								</Link>
							</li>

							<li>
								<Link to="/admin/category/new">
									<i className="fa fa-plus"></i> Create
								</Link>
							</li>
						</ul>
					</li>

					<li>
						<Link to="/admin/orderlist">
							<i className="fa fa-shopping-basket"></i> Orders
						</Link>
					</li>

					<li>
						<Link to="/admin/userlist">
							<i className="fa fa-users"></i> Users
						</Link>
					</li>

					<li>
						<Link to="/admin/reviews">
							<i className="fa fa-star"></i> Reviews
						</Link>
					</li>
				</ul>
			</nav>
		</div>
	);
};

export default Sidebar;
