
const Header = ({ name = "User", role = "Employee" }) => {
  return (
    <div className="flex justify-between items-center mb-6">
      <h2 className="text-2xl font-semibold">
        Welcome, {name}
        <br />
        <span className="text-sm">Role: {role}</span>
      </h2>
      <button className="btn btn-secondary" onClick={() => {
        localStorage.removeItem('user');
        window.location.href = "/login";
      }}>
        Logout
      </button>
    </div>
  );
};

export default Header;
