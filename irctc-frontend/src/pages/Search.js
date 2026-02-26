import { useState } from "react";
import API from "../services/api";

export default function Search() {
  const [source, setSource] = useState("");
  const [destination, setDestination] = useState("");
  const [date, setDate] = useState("");
  const [trains, setTrains] = useState([]);
  const [searched, setSearched] = useState(false);
  const [error, setError] = useState("");
  const [seats, setSeats] = useState(1);
  const searchTrains = async () => {
    const token = localStorage.getItem("access");

    if (!token) {
      setError("Please login first");
      return;
    }

    if (!source || !destination || !date) {
      setError("Please enter missing field");
      return;
    }

    setError("");

    try {
      const res = await API.get(
        `train/search/?source=${source}&destination=${destination}&date=${date}`
      );

      setTrains(res.data);
      setSearched(true);
    } catch (err) {
  if (err.response && err.response.data.error) {
    setError(err.response.data.error);
  } else {
    setError("Server error. Please try again.");
  }
}
  };
const bookSeat = async (train_id) => {
  try {
    await API.post("booking/book/", {
      train_id,
      date,
      seats,
    });

    alert("Booking Successful");
  } catch (err) {
    if (err.response && err.response.data.error) {
      setError(err.response.data.error);
    } else {
      setError("Booking failed");
    }
  }
};

  return (
    <div>
      <h2>Search Trains</h2>

      <input
        placeholder="Source"
        onChange={(e) => setSource(e.target.value)}
      />

      <input
        placeholder="Destination"
        onChange={(e) => setDestination(e.target.value)}
      />

      <input
        type="date"
        onChange={(e) => setDate(e.target.value)}
      />

      <button onClick={searchTrains}>Search</button>

     {error && (
  <div style={{
    background: "#ffe6e6",
    color: "#cc0000",
    padding: "10px",
    borderRadius: "6px",
    marginTop: "10px",
    width: "fit-content"
  }}>
    {error}
  </div>
)}

      {searched && trains.length === 0 && (
        <p>No trains available</p>
      )}
<input
  type="number"
  min="1"
  value={seats}
  onChange={(e) => setSeats(e.target.value)}
  placeholder="Seats"
/>
      {trains.map((t, i) => (
  <div key={i} style={{
    border: "1px solid #ddd",
    padding: "12px",
    marginTop: "10px",
    borderRadius: "8px",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    width: "400px"
  }}>
    <div>
      <strong>{t.name}</strong><br/>
      Seats Available: {t.available_seats}
    </div>

    <button
      onClick={() => bookSeat(t.id)}
      style={{
        background: "#007bff",
        color: "white",
        border: "none",
        padding: "6px 12px",
        borderRadius: "5px",
        cursor: "pointer"
      }}
    >
      Book
    </button>
  </div>
))}
    </div>
  );
}