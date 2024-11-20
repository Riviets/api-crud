import React, { useState, useEffect } from "react";
import { fetchWorkers } from "../services/api";

function WorkersComponent() {
  const [workers, setWorkers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const getWorkers = async () => {
      setIsLoading(true);
      const workersData = await fetchWorkers();
      setWorkers(workersData);
      setIsLoading(false);
    };

    getWorkers();
  }, []);

  return (
    <div>
      <h1>Workers</h1>
      {isLoading ? (
        <p>Loading...</p>
      ) : (
        <ul>
          {workers.map((worker) => (
            <li key={worker.id}>
              <strong>Name:</strong> {worker.name} <br />
              <strong>Email:</strong> {worker.email} <br />
              <strong>Wage:</strong> {worker.wage}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default WorkersComponent;
