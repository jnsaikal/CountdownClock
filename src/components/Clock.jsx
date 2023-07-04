import React, { useState, useEffect } from "react";
import "./Clock.css";

function Clock() {
  const [enteredDays, setEnteredDays] = useState(0);
  const [enteredHours, setEnteredHours] = useState(0);
  const [enteredMinutes, setEnteredMinutes] = useState(0);
  const [enteredSeconds, setEnteredSeconds] = useState(0);

  const [days, setDays] = useState(0);
  const [hours, setHours] = useState(0);
  const [minutes, setMinutes] = useState(0);
  const [seconds, setSeconds] = useState(0);

  const [countdownDate, setCountdownDate] = useState(null);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    const parsedValue = parseInt(value);
    if (name === "days") {
      setEnteredDays(parsedValue);
      setDays(parsedValue);
    } else if (name === "hours") {
      setEnteredHours(parsedValue);
      setHours(parsedValue);
    } else if (name === "minutes") {
      setEnteredMinutes(parsedValue);
      setMinutes(parsedValue);
    } else if (name === "seconds") {
      setEnteredSeconds(parsedValue);
      setSeconds(parsedValue);
    }
  };

  useEffect(() => {
    const countdownDate = new Date();
    countdownDate.setDate(countdownDate.getDate() + enteredDays);
    countdownDate.setHours(countdownDate.getHours() + enteredHours);
    countdownDate.setMinutes(countdownDate.getMinutes() + enteredMinutes);
    countdownDate.setSeconds(countdownDate.getSeconds() + enteredSeconds);

    setDays(enteredDays);
    setHours(enteredHours);
    setMinutes(enteredMinutes);
    setSeconds(enteredSeconds);

    setCountdownDate(countdownDate);
  }, [enteredDays, enteredHours, enteredMinutes, enteredSeconds]);

  useEffect(() => {
    if (countdownDate) {
      const interval = setInterval(() => {
        const now = new Date().getTime();
        const distance = countdownDate - now;

        if (distance < 0) {
          clearInterval(interval);
          setDays(0);
          setHours(0);
          setMinutes(0);
          setSeconds(0);
          setCountdownDate(null);
        } else {
          const remainingDays = Math.floor(distance / (1000 * 60 * 60 * 24));
          const remainingHours = Math.floor(
            (distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
          );
          const remainingMinutes = Math.floor(
            (distance % (1000 * 60 * 60)) / (1000 * 60)
          );
          const remainingSeconds = Math.floor((distance % (1000 * 60)) / 1000);

          setDays(remainingDays);
          setHours(remainingHours);
          setMinutes(remainingMinutes);
          setSeconds(remainingSeconds);
        }
      }, 1000);

      return () => clearInterval(interval);
    }
  }, [countdownDate]);

  return (
    <div className="main">
      <div className="inputs">
        <div>
          <label>Days:</label>
          <input
            type="number"
            name="days"
            value={enteredDays}
            onChange={handleInputChange}
          />
        </div>
        <div>
          <label>Hours:</label>
          <input
            type="number"
            name="hours"
            value={enteredHours}
            onChange={handleInputChange}
          />
        </div>
        <div>
          <label>Minutes:</label>
          <input
            type="number"
            name="minutes"
            value={enteredMinutes}
            onChange={handleInputChange}
          />
        </div>
        <div>
          <label>Seconds:</label>
          <input
            type="number"
            name="seconds"
            value={enteredSeconds}
            onChange={handleInputChange}
          />
        </div>
      </div>
      <div className="show">
        <div>{days} days</div>
        <div>{hours} hours</div>
        <div>{minutes} minutes</div>
        <div>{seconds} seconds</div>
      </div>
    </div>
  );
}

export default Clock;
