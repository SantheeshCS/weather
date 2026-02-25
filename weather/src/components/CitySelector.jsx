import { useEffect, useState } from "react";
import axios from "axios";
import "../App.css";
const CitySelector = ({ onCitySelect }) => {
  const [cities, setCities] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios.get("http://localhost:5000/cities")
      .then((res) => {
        setCities(res.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching cities:", error);
        setLoading(false);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <div>Loading cities...</div>;
  }

  return (
    <select className="dropdown" onChange={(e) => onCitySelect(e.target.value)}>
      <option value="">Select a city</option>
      {Object.entries(cities).map(([id, name]) => (
        <option key={id} value={id}>
          {name}
        </option>
      ))}
    </select>
  );
};

export default CitySelector;
