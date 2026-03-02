
import React, { useState, useEffect } from 'react';

// Icons for navigation (using a simple placeholder or could be react-icons)
const DashboardIcon = () => <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="7" height="9"></rect><rect x="14" y="3" width="7" height="5"></rect><rect x="14" y="12" width="7" height="9"></rect><rect x="3" y="16" width="7" height="5"></rect></svg>;
const OrdersIcon = () => <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M6 2L3 7v14h18V7l-3-5H6zM3 7h18M16 10a4 4 0 01-8 0"></path></svg>;
const ProductsIcon = () => <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2l3.09 6.36L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14l-5-4.87 8.91-1.2L12 2z"></path></svg>;
const CustomersIcon = () => <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M17 19h2c.5 0 1-.5 1-1v-1a4 4 0 00-4-4H8a4 4 0 00-4 4v1c0 .5.5 1 1 1h2"></path><circle cx="12" cy="7" r="4"></circle></svg>;
const ReportsIcon = () => <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect><line x1="12" y1="8" x2="12" y2="16"></line><line x1="8" y1="12" x2="16" y2="12"></line></svg>;
const SettingsIcon = () => <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="3"></circle><path d="M19.4 15a1.65 1.65 0 00.33 1.82l.06.06a2 2 0 010 2.83 2 2 0 01-2.83 0l-.06-.06a1.65 1.65 0 00-1.82-.33 1.65 1.65 0 00-1 1.51V21a2 2 0 01-2 2H9a2 2 0 01-2-2v-.09A1.65 1.65 0 006.2 19.4a1.65 1.65 0 00-1.82.33l-.06.06a2 2 0 01-2.83 0 2 2 0 010-2.83l.06-.06a1.65 1.65 0 00.33-1.82 1.65 1.65 0 00-1.51-1H3a2 2 0 01-2-2v-2a2 2 0 012-2h.09A1.65 1.65 0 004.6 4.6a1.65 1.65 0 00-.33-1.82l-.06-.06a2 2 0 010-2.83 2 2 0 012.83 0l.06.06a1.65 1.65 0 001.82.33H9a2 2 0 012-2h2a2 2 0 012 2h.09a1.65 1.65 0 001.82-.33l.06-.06a2 2 0 012.83 0 2 2 0 010 2.83l-.06.06a1.65 1.65 0 00-.33 1.82V9a1.65 1.65 0 001.51 1H21a2 2 0 012 2v2a2 2 0 01-2 2h-.09z"></path></svg>;
const AdminIcon = () => <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2"></path><circle cx="9" cy="7" r="4"></circle><path d="M23 21v-2a4 4 0 00-3-3.87"></path><path d="M16 3.13a4 4 0 010 7.75"></path></svg>;

// Role-Based Access Control (RBAC) Configuration
const ROLES = {
  ADMIN: ['DASHBOARD', 'ORDERS', 'PRODUCTS', 'CUSTOMERS', 'REPORTS', 'SETTINGS', 'ADMIN'],
  MANAGER: ['DASHBOARD', 'ORDERS', 'PRODUCTS', 'CUSTOMERS', 'REPORTS', 'SETTINGS'],
  SALES: ['DASHBOARD', 'ORDERS', 'PRODUCTS', 'CUSTOMERS'],
  VIEWER: ['DASHBOARD', 'REPORTS'],
};

const NavBar = ({ userRole, handleNavigate, currentView, handleLogout }) => {
  const navItems = [
    { name: 'DASHBOARD', icon: <DashboardIcon /> },
    { name: 'ORDERS', icon: <OrdersIcon /> },
    { name: 'PRODUCTS', icon: <ProductsIcon /> },
    { name: 'CUSTOMERS', icon: <CustomersIcon /> },
    { name: 'REPORTS', icon: <ReportsIcon /> },
    { name: 'SETTINGS', icon: <SettingsIcon /> },
    { name: 'ADMIN', icon: <AdminIcon />, roles: ['ADMIN'] }, // Only for Admin
  ];

  return (
    <div className="sidebar">
      <div className="sidebar-header">Admin Panel</div>
      <nav className="sidebar-nav">
        <ul>
          {navItems.map((item) =>
            ROLES[userRole]?.includes(item.name) ? (
              <li key={item.name} className="sidebar-nav-item">
                <a
                  href="#"
                  onClick={() => handleNavigate(item.name)}
                  className={`sidebar-nav-link ${currentView.screen === item.name ? 'active' : ''}`}
                >
                  {item.icon}
                  {item.name}
                </a>
              </li>
            ) : null
          )}
        </ul>
      </nav>
      <button onClick={handleLogout} className="logout-button">
        Logout
      </button>
    </div>
  );
};

const Header = ({ auth, currentView }) => {
  return (
    <header className="header">
      <h1 className="header-title">{currentView.screen}</h1>
      {auth.isAuthenticated && (
        <div className="user-info">
          <span>{auth.username} ({auth.role})</span>
          <div className="avatar">{auth.username?.[0]?.toUpperCase()}</div>
        </div>
      )}
    </header>
  );
};

// --- Dashboard Components (for demonstration) ---
const MetricCard = ({ title, value, label, colorClass = 'text-primary' }) => (
  <div className="card metric-card">
    <div className="card-title">{title}</div>
    <div className={`metric-value ${colorClass}`}>{value}</div>
    <div className="metric-label">{label}</div>
  </div>
);

const SalesChart = ({ data }) => {
    const maxSales = Math.max(...data.map(d => d.sales));
    const normalizedMaxHeight = 100; // Max height in percentage for bars

    return (
        <div className="card">
            <div className="card-title">Sales Over Time</div>
            <div className="chart-container">
                <div className="chart-bar-container">
                    {data.map((item, index) => (
                        <div
                            key={item.month}
                            className="chart-bar"
                            style={{
                                height: `${(item.sales / maxSales) * normalizedMaxHeight}%`,
                                backgroundColor: `var(--accent-primary)`,
                                opacity: 0.8 + (index / data.length) * 0.2 // Slight variation for visual interest
                            }}
                        >
                            <span className="chart-bar-label" style={{ bottom: 'calc(100% + 5px)' }}>{item.sales?.toLocaleString()}</span>
                            <span className="chart-bar-month" style={{ top: 'calc(100% + 5px)' }}>{item.month}</span>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

const RecentOrders = ({ orders }) => (
  <div className="card">
    <div className="card-title">Recent Orders</div>
    <div className="overflow-x-auto">
        <table className="data-table">
        <thead>
            <tr>
            <th>Order ID</th>
            <th>Customer</th>
            <th>Amount</th>
            <th>Status</th>
            </tr>
        </thead>
        <tbody>
            {orders?.map((order) => (
            <tr key={order.id}>
                <td>{order.id}</td>
                <td>{order.customer}</td>
                <td>${order.amount?.toFixed(2)}</td>
                <td>
                <span className={`status-badge ${order.status?.toLowerCase()}`}>
                    {order.status}
                </span>
                </td>
            </tr>
            ))}
        </tbody>
        </table>
    </div>
  </div>
);

const TopProducts = ({ products }) => (
  <div className="card">
    <div className="card-title">Top Products</div>
    <div className="overflow-x-auto">
        <table className="data-table">
        <thead>
            <tr>
            <th>Product</th>
            <th>Category</th>
            <th>Price</th>
            <th>Stock</th>
            </tr>
        </thead>
        <tbody>
            {products?.map((product) => (
            <tr key={product.id}>
                <td>{product.name}</td>
                <td>{product.category}</td>
                <td>${product.price?.toFixed(2)}</td>
                <td>{product.stock}</td>
            </tr>
            ))}
        </tbody>
        </table>
    </div>
  </div>
);

const Dashboard = () => {
  // Sample Data - UPDATED WITH MORE SAMPLE DATA
  const totalSales = 155000; // Updated value
  const totalOrders = 420; // Updated value
  const newCustomers = 60; // Updated value

  const recentOrders = [
    { id: 'ORD001', customer: 'John Doe', amount: 250.00, status: 'Completed' },
    { id: 'ORD002', customer: 'Jane Smith', amount: 150.50, status: 'Pending' },
    { id: 'ORD003', customer: 'Peter Jones', amount: 320.75, status: 'Shipped' },
    { id: 'ORD004', customer: 'Emily White', amount: 99.00, status: 'Completed' },
    { id: 'ORD005', customer: 'Michael Green', amount: 480.20, status: 'Pending' },
    { id: 'ORD006', customer: 'Sarah Brown', amount: 75.00, status: 'Shipped' },
    { id: 'ORD007', customer: 'Alice Johnson', amount: 120.00, status: 'Pending' },
    { id: 'ORD008', customer: 'Bob Williams', amount: 75.50, status: 'Completed' },
    { id: 'ORD009', customer: 'Charlie Brown', amount: 300.00, status: 'Shipped' },
    { id: 'ORD010', customer: 'Diana Prince', amount: 99.99, status: 'Pending' },
    { id: 'ORD011', customer: 'Clark Kent', amount: 500.00, status: 'Completed' },
    { id: 'ORD012', customer: 'Bruce Wayne', amount: 1200.00, status: 'Pending' },
    { id: 'ORD013', customer: 'Barry Allen', amount: 80.00, status: 'Shipped' },
    { id: 'ORD014', customer: 'Oliver Queen', amount: 210.50, status: 'Completed' },
    { id: 'ORD015', customer: 'Arthur Curry', amount: 65.00, status: 'Pending' },
  ];

  const products = [
    { id: 'PROD001', name: 'Laptop Pro', category: 'Electronics', price: 1200.00, stock: 50 },
    { id: 'PROD002', name: 'Wireless Mouse', category: 'Electronics', price: 25.00, stock: 200 },
    { id: 'PROD003', name: 'Desk Chair', category: 'Office', price: 180.00, stock: 70 },
    { id: 'PROD004', name: 'Coffee Maker', category: 'Home Goods', price: 75.00, stock: 120 },
    { id: 'PROD005', name: 'External SSD', category: 'Electronics', price: 90.00, stock: 100 },
    { id: 'PROD006', name: 'Smart Watch X', category: 'Electronics', price: 199.99, stock: 75 },
    { id: 'PROD007', name: 'Luxury Pen Set', category: 'Stationery', price: 89.00, stock: 40 },
    { id: 'PROD008', name: 'Ergonomic Chair', category: 'Office', price: 349.00, stock: 20 },
    { id: 'PROD009', name: 'Wireless Charger', category: 'Electronics', price: 45.00, stock: 150 },
    { id: 'PROD010', name: 'Gaming Keyboard', category: 'Electronics', price: 110.00, stock: 60 },
    { id: 'PROD011', name: 'Noise Cancelling Headphones', category: 'Electronics', price: 299.00, stock: 30 },
    { id: 'PROD012', name: 'Standing Desk', category: 'Office', price: 450.00, stock: 25 },
    { id: 'PROD013', name: 'Robot Vacuum', category: 'Home Goods', price: 350.00, stock: 80 },
    { id: 'PROD014', name: 'Portable Projector', category: 'Electronics', price: 280.00, stock: 45 },
    { id: 'PROD015', name: 'Graphic Tablet', category: 'Electronics', price: 150.00, stock: 90 },
  ];

  const customers = [
    { id: 'CUST001', name: 'Olivia Davis', email: 'olivia@example.com', totalOrders: 5 },
    { id: 'CUST002', name: 'William Miller', email: 'william@example.com', totalOrders: 10 },
    { id: 'CUST003', name: 'Sophia Wilson', email: 'sophia@example.com', totalOrders: 3 },
    { id: 'CUST004', name: 'James Moore', email: 'james@example.com', totalOrders: 7 },
    { id: 'CUST005', name: 'Isabella Taylor', email: 'isabella@example.com', totalOrders: 2 },
    { id: 'CUST006', name: 'Sarah Connor', email: 'sarah@example.com', totalOrders: 12 },
    { id: 'CUST007', name: 'John Wick', email: 'john@example.com', totalOrders: 8 },
    { id: 'CUST008', name: 'Leia Organa', email: 'leia@example.com', totalOrders: 25 },
    { id: 'CUST009', name: 'Luke Skywalker', email: 'luke@example.com', totalOrders: 15 },
    { id: 'CUST010', name: 'Han Solo', email: 'han@example.com', totalOrders: 20 },
    { id: 'CUST011', name: 'Darth Vader', email: 'vader@example.com', totalOrders: 1 },
    { id: 'CUST012', name: 'Yoda', email: 'yoda@example.com', totalOrders: 50 },
    { id: 'CUST013', name: 'Obi-Wan Kenobi', email: 'obiwan@example.com', totalOrders: 30 },
    { id: 'CUST014', name: 'Padme Amidala', email: 'padme@example.com', totalOrders: 18 },
  ];

  // More detailed sales data over 12 months
  const salesData = [
    { month: 'Jan', sales: 16000 }, // Updated value
    { month: 'Feb', sales: 19000 }, // Updated value
    { month: 'Mar', sales: 23000 }, // Updated value
    { month: 'Apr', sales: 20000 }, // Updated value
    { month: 'May', sales: 26000 }, // Updated value
    { month: 'Jun', sales: 29000 }, // Updated value
    { month: 'Jul', sales: 24000 }, // Updated value
    { month: 'Aug', sales: 27000 }, // Updated value
    { month: 'Sep', sales: 31000 }, // Updated value
    { month: 'Oct', sales: 28000 }, // Updated value
    { month: 'Nov', sales: 33000 }, // Updated value
    { month: 'Dec', sales: 36000 }, // Updated value
  ];


  return (
    <div className="dashboard-container">
      <div className="dashboard-grid" style={{ marginBottom: 'var(--spacing-lg)' }}>
        <MetricCard title="Total Sales" value={`$${totalSales.toLocaleString()}`} label="YTD Sales" colorClass="text-primary" />
        <MetricCard title="Total Orders" value={totalOrders.toLocaleString()} label="Orders Processed" colorClass="text-secondary-color" />
        <MetricCard title="New Customers" value={newCustomers.toLocaleString()} label="This Month" colorClass="text-success" />
        <MetricCard title="Revenue Growth" value="+15.2%" label="Vs Last Quarter" colorClass="text-success" /> {/* Updated value */}
      </div>
      <div className="dashboard-grid" style={{ gridTemplateColumns: '2fr 1fr', alignItems: 'flex-start' }}>
        <SalesChart data={salesData} />
        <RecentOrders orders={recentOrders} />
      </div>
      <div className="dashboard-grid" style={{ marginTop: 'var(--spacing-lg)' }}>
        <TopProducts products={products} />
        <div className="card">
            <div className="card-title">Customer Acquisition</div>
            <div className="chart-container text-center text-muted" style={{ minHeight: '150px' }}>
                {/* Placeholder for a more complex chart */}
                <p>Chart data for customer acquisition would go here.</p>
                <p>Total Customers: {customers.length}</p>
            </div>
        </div>
      </div>
    </div>
  );
};

const Orders = () => (
  <div className="orders-page dashboard-container">
    <h2>Orders Management</h2>
    <div className="card">
      <div className="card-title">All Orders</div>
      <p>Detailed list and management of all customer orders.</p>
      {/* Table with orders, filtering, pagination */}
      <table className="data-table" style={{marginTop: 'var(--spacing-md)'}}>
            <thead>
                <tr>
                    <th>ID</th>
                    <th>Customer</th>
                    <th>Date</th>
                    <th>Total</th>
                    <th>Status</th>
                    <th>Actions</th>
                </tr>
            </thead>
            <tbody>
                <tr><td>#1001</td><td>John Doe</td><td>2023-01-15</td><td>$120.00</td><td><span className="status-badge completed">Completed</span></td><td><button style={{ backgroundColor: 'var(--accent-primary)', color: 'white', border: 'none', padding: 'var(--spacing-xs) var(--spacing-sm)', borderRadius: 'var(--border-radius-sm)'}}>View</button></td></tr>
                <tr><td>#1002</td><td>Jane Smith</td><td>2023-01-16</td><td>$75.50</td><td><span className="status-badge pending">Pending</span></td><td><button style={{ backgroundColor: 'var(--accent-primary)', color: 'white', border: 'none', padding: 'var(--spacing-xs) var(--spacing-sm)', borderRadius: 'var(--border-radius-sm)'}}>View</button></td></tr>
                <tr><td>#1003</td><td>Alice Johnson</td><td>2023-01-17</td><td>$300.00</td><td><span className="status-badge shipped">Shipped</span></td><td><button style={{ backgroundColor: 'var(--accent-primary)', color: 'white', border: 'none', padding: 'var(--spacing-xs) var(--spacing-sm)', borderRadius: 'var(--border-radius-sm)'}}>View</button></td></tr>
            </tbody>
        </table>
    </div>
  </div>
);

const Products = () => (
  <div className="products-page dashboard-container">
    <h2>Product Catalog</h2>
    <div className="card">
      <div className="card-title">Inventory List</div>
      <p>Manage products, categories, pricing, and stock levels.</p>
      {/* Table with products, add/edit functionality */}
      <table className="data-table" style={{marginTop: 'var(--spacing-md)'}}>
            <thead>
                <tr>
                    <th>ID</th>
                    <th>Name</th>
                    <th>Category</th>
                    <th>Price</th>
                    <th>Stock</th>
                    <th>Actions</th>
                </tr>
            </thead>
            <tbody>
                <tr><td>P001</td><td>Laptop Pro</td><td>Electronics</td><td>$1200.00</td><td>50</td><td><button style={{ backgroundColor: 'var(--accent-primary)', color: 'white', border: 'none', padding: 'var(--spacing-xs) var(--spacing-sm)', borderRadius: 'var(--border-radius-sm)'}}>Edit</button></td></tr>
                <tr><td>P002</td><td>Wireless Mouse</td><td>Electronics</td><td>$25.00</td><td>200</td><td><button style={{ backgroundColor: 'var(--accent-primary)', color: 'white', border: 'none', padding: 'var(--spacing-xs) var(--spacing-sm)', borderRadius: 'var(--border-radius-sm)'}}>Edit</button></td></tr>
                <tr><td>P003</td><td>Desk Chair</td><td>Office</td><td>$180.00</td><td>70</td><td><button style={{ backgroundColor: 'var(--accent-primary)', color: 'white', border: 'none', padding: 'var(--spacing-xs) var(--spacing-sm)', borderRadius: 'var(--border-radius-sm)'}}>Edit</button></td></tr>
            </tbody>
        </table>
    </div>
  </div>
);

const Customers = () => (
  <div className="customers-page dashboard-container">
    <h2>Customer Database</h2>
    <div className="card">
      <div className="card-title">Customer List</div>
      <p>View and manage customer profiles and their order history.</p>
      {/* Table with customers, search functionality */}
      <table className="data-table" style={{marginTop: 'var(--spacing-md)'}}>
            <thead>
                <tr>
                    <th>ID</th>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Total Orders</th>
                    <th>Actions</th>
                </tr>
            </thead>
            <tbody>
                <tr><td>C001</td><td>Olivia Davis</td><td>olivia@example.com</td><td>5</td><td><button style={{ backgroundColor: 'var(--accent-primary)', color: 'white', border: 'none', padding: 'var(--spacing-xs) var(--spacing-sm)', borderRadius: 'var(--border-radius-sm)'}}>View</button></td></tr>
                <tr><td>C002</td><td>William Miller</td><td>william@example.com</td><td>10</td><td><button style={{ backgroundColor: 'var(--accent-primary)', color: 'white', border: 'none', padding: 'var(--spacing-xs) var(--spacing-sm)', borderRadius: 'var(--border-radius-sm)'}}>View</button></td></tr>
                <tr><td>C003</td><td>Sophia Wilson</td><td>sophia@example.com</td><td>3</td><td><button style={{ backgroundColor: 'var(--accent-primary)', color: 'white', border: 'none', padding: 'var(--spacing-xs) var(--spacing-sm)', borderRadius: 'var(--border-radius-sm)'}}>View</button></td></tr>
            </tbody>
        </table>
    </div>
  </div>
);

const Reports = () => (
  <div className="reports-page dashboard-container">
    <h2>Analytics & Reports</h2>
    <div className="card">
      <div className="card-title">Sales Performance</div>
      <p>Generate various business reports and analytics.</p>
      <ul>
        <li>Monthly Sales Report</li>
        <li>Customer Demographics</li>
        <li>Product Performance</li>
      </ul>
    </div>
    <div className="card" style={{marginTop: 'var(--spacing-md)'}}>
        <div className="card-title">Financial Overview</div>
        <p>Key financial metrics and summaries.</p>
        <p>Revenue: <span className="text-success font-bold">$1,800,000</span></p> {/* Updated value */}
        <p>Expenses: <span className="text-danger font-bold">$850,000</span></p> {/* Updated value */}
        <p>Profit: <span className="text-success font-bold">$950,000</span></p> {/* Updated value */}
    </div>
  </div>
);

const Settings = () => (
  <div className="settings-page dashboard-container">
    <h2>Application Settings</h2>
    <div className="card">
      <div className="card-title">General Settings</div>
      <p>Configure application preferences, notifications, and user profiles.</p>
      <div className="form-group">
            <label htmlFor="theme">Application Theme</label>
            <select id="theme">
                <option>Light Mode</option>
                <option>Dark Mode</option>
            </select>
        </div>
        <div className="form-group">
            <label htmlFor="notifications">Email Notifications</label>
            <input type="checkbox" id="notifications" style={{width: 'auto', marginLeft: 'var(--spacing-sm)'}} defaultChecked />
        </div>
    </div>
  </div>
);

const AdminPanel = ({ auth }) => {
  const handleUserManagement = () => alert('Navigating to User Management');
  const handleSystemLogs = () => alert('Viewing System Logs');

  return (
    <div className="admin-page dashboard-container">
      <h2>Admin Control Panel</h2>
      {ROLES[auth.role]?.includes('ADMIN') ? (
        <>
          <p>This area is for administrative tasks and is only accessible by ADMIN role.</p>
          <div className="admin-action-card">
            <p>Manage User Accounts</p>
            <button onClick={handleUserManagement}>Go to User Management</button>
          </div>
          <div className="admin-action-card">
            <p>View System Logs</p>
            <button onClick={handleSystemLogs}>View Logs</button>
          </div>
        </>
      ) : (
        <p className="error-message">Access Denied: You do not have permission to view this page.</p>
      )}
    </div>
  );
};

// --- Login Component ---
const Login = ({ handleLogin, errorMessage }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('ADMIN'); // Default to ADMIN for easy testing

  const handleSubmit = (e) => {
    e.preventDefault();
    handleLogin(username, password, role);
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <h2>Enterprise Login</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="username">Username</label>
            <input
              type="text"
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="role">Select Role</label>
            <select id="role" value={role} onChange={(e) => setRole(e.target.value)}>
              {Object.keys(ROLES).map((r) => (
                <option key={r} value={r}>
                  {r}
                </option>
              ))}
            </select>
          </div>
          <button type="submit" className="login-button">
            Login
          </button>
          {errorMessage && <p className="error-message">{errorMessage}</p>}
        </form>
      </div>
    </div>
  );
};

// --- Main App Component ---
function App() {
  const [auth, setAuth] = useState(() => {
    const savedAuth = localStorage.getItem('auth');
    return savedAuth ? JSON.parse(savedAuth) : { isAuthenticated: false, username: null, role: null };
  });
  const [view, setView] = useState({ screen: 'DASHBOARD', params: {} });
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    localStorage.setItem('auth', JSON.stringify(auth));
  }, [auth]);

  const handleLogin = (username, password, role) => {
    // Simple authentication logic for demonstration
    if (username && password && Object.keys(ROLES).includes(role)) {
      setAuth({ isAuthenticated: true, username, role });
      setView({ screen: 'DASHBOARD', params: {} }); // Redirect to dashboard on login
      setErrorMessage('');
    } else {
      setErrorMessage('Invalid credentials or role selection.');
    }
  };

  const handleLogout = () => {
    setAuth({ isAuthenticated: false, username: null, role: null });
    setView({ screen: 'DASHBOARD', params: {} }); // Reset view on logout
  };

  const handleNavigate = (screen, params = {}) => {
    if (auth.isAuthenticated && ROLES[auth.role]?.includes(screen)) {
      setView({ screen, params });
    } else if (auth.isAuthenticated) {
      alert('Access Denied: You do not have permission to view this page.');
    }
  };

  const renderScreen = () => {
    if (!auth.isAuthenticated) {
      return <Login handleLogin={handleLogin} errorMessage={errorMessage} />;
    }

    // Check if the user's role has permission for the current view
    if (!ROLES[auth.role]?.includes(view.screen)) {
      // If not permitted, redirect to dashboard or show an access denied message
      // For this prototype, we'll redirect to dashboard, but keep the alert
      // In a real app, you might have an 'Access Denied' component
      return (
        <div className="main-content">
          <Header auth={auth} currentView={{ screen: 'ACCESS_DENIED' }} />
          <div className="dashboard-container">
            <h2 className="error-message mb-lg">Access Denied</h2>
            <p className="text-muted">You do not have permission to view this page. Please contact your administrator.</p>
            <p className="text-muted">Redirecting to Dashboard...</p>
          </div>
        </div>
      );
    }

    switch (view.screen) {
      case 'DASHBOARD':
        return <Dashboard />;
      case 'ORDERS':
        return <Orders />;
      case 'PRODUCTS':
        return <Products />;
      case 'CUSTOMERS':
        return <Customers />;
      case 'REPORTS':
        return <Reports />;
      case 'SETTINGS':
        return <Settings />;
      case 'ADMIN':
        return <AdminPanel auth={auth} />;
      default:
        return <Dashboard />;
    }
  };

  return (
    <div className="app-container">
      {auth.isAuthenticated && (
        <NavBar
          userRole={auth.role}
          handleNavigate={handleNavigate}
          currentView={view}
          handleLogout={handleLogout}
        />
      )}
      <div className="main-content">
        {auth.isAuthenticated && <Header auth={auth} currentView={view} />}
        {renderScreen()}
      </div>
    </div>
  );
}

export default App;