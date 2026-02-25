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

    setError(""); // clear old error

    try {
      const res = await API.get(
        `train/search/?source=${source}&destination=${destination}&date=${date}`
      );

      setTrains(res.data);
      setSearched(true);
    } catch (err) {
      setError("Something went wrong");
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
    alert("Booking failed");
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

      {error && <p style={{ color: "red" }}>{error}</p>}

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
  <div key={i}>
    {t.name} - Seats: {t.available_seats}

    <button onClick={() => bookSeat(t.id)}>
      Book
    </button>
  </div>
))}
    </div>
  );
}