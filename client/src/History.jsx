import React, { useEffect, useState } from "react";

function History() {
  const [history, setHistory] = useState([]);

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem("outfitHistory")) || [];
    setHistory(data);
  }, []);

  return (
    <div style={{ padding: "30px" }}>
      <h2>👗 Outfit History</h2>

      {history.length === 0 ? (
        <p>No outfit history yet</p>
      ) : (
        history.map((item, index) => (
          <div key={index} style={{ marginBottom: "20px" }}>
            <img src={item.image} width="200" alt="outfit" />
            <p>Gender: {item.gender}</p>
            <p>Climate: {item.climate}</p>
            <p>Date: {item.date}</p>
          </div>
        ))
      )}
    </div>
  );
}

export default History;