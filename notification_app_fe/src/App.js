import React, { useEffect, useState } from "react";
import { notifications as sampleData } from "./data";

function App() {
  const [notifications, setNotifications] = useState([]);
  const [filter, setFilter] = useState("All");
  const [readIds, setReadIds] = useState([]);

  useEffect(() => {
    setNotifications(sampleData);
  }, []);

  const priorityValue = (type) => {
    if (type === "Placement") return 3;
    if (type === "Result") return 2;
    return 1;
  };

  const priorityNotifications = [...notifications]
    .sort((a, b) => {
      const priorityDiff =
        priorityValue(b.Type) - priorityValue(a.Type);

      if (priorityDiff !== 0) {
        return priorityDiff;
      }

      return (
        new Date(b.Timestamp) -
        new Date(a.Timestamp)
      );
    })
    .slice(0, 10);

  const filteredNotifications =
    filter === "All"
      ? notifications
      : notifications.filter(
          (notification) =>
            notification.Type === filter
        );

  const markAsRead = (id) => {
    setReadIds([...readIds, id]);
  };

  return (
    <div style={{ padding: "20px" }}>
      <h1>Notifications Dashboard</h1>

      <div style={{ marginBottom: "20px" }}>
        <label>Filter: </label>

        <select
          value={filter}
          onChange={(e) =>
            setFilter(e.target.value)
          }
        >
          <option value="All">All</option>
          <option value="Placement">
            Placement
          </option>
          <option value="Result">
            Result
          </option>
          <option value="Event">
            Event
          </option>
        </select>
      </div>

      <h2>All Notifications</h2>

      {filteredNotifications.map((notification) => (
        <div
          key={notification.ID}
          style={{
            border: "1px solid gray",
            padding: "10px",
            marginBottom: "10px",
            backgroundColor:
              readIds.includes(notification.ID)
                ? "#f0f0f0"
                : "#d4ffd4",
          }}
        >
          <h3>{notification.Type}</h3>

          <p>{notification.Message}</p>

          <p>{notification.Timestamp}</p>

          {!readIds.includes(notification.ID) && (
            <button
              onClick={() =>
                markAsRead(notification.ID)
              }
            >
              Mark Read
            </button>
          )}
        </div>
      ))}

      <h2>Top 10 Priority Notifications</h2>

      {priorityNotifications.map((notification) => (
        <div
          key={`priority-${notification.ID}`}
          style={{
            border: "1px solid black",
            padding: "10px",
            marginBottom: "10px",
          }}
        >
          <h3>{notification.Type}</h3>

          <p>{notification.Message}</p>

          <p>{notification.Timestamp}</p>
        </div>
      ))}
    </div>
  );
}

export default App;