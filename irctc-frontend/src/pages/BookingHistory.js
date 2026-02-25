import { useEffect, useState } from "react";
import API from "../services/api";

export default function BookingHistory() {
  const [bookings, setBookings] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchBookings();
  }, []);

  const fetchBookings = async () => {
    try {
      const res = await API.get("train/my-bookings/");
      setBookings(res.data);
    } catch (err) {
      setError("Failed to load bookings");
    }
  };

  return (
    <div>
      <h2>My Bookings</h2>

      {error && <p style={{ color: "red" }}>{error}</p>}

      {bookings.length === 0 ? (
        <p>No bookings found</p>
      ) : (
        bookings.map((b, i) => (
          <div key={i}>
            Train: {b.train_name || "N/A"} | Seats: {b.seats_booked}
          </div>
        ))
      )}
    </div>
  );
}