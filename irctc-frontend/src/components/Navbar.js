export default function Navbar() {

  const handleLogout = () => {
    localStorage.clear();
    window.location.href = "/login";
  };


  return (
    <div style={{ display: "flex", justifyContent: "space-between", padding: "10px", background: "#eee" }}>
      <h3>IRCTC</h3>

      <button onClick={handleLogout}>
        Logout
      </button>
       <button onClick={() => window.location.href="/bookings"}>
  View Bookings
</button>
    </div>
  );
}