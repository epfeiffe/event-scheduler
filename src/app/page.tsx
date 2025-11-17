'use client';
import { useRef, useState } from "react";
import { days, hours } from "./constants";
import "./time.selector.css";
import { Button } from "baseui/button";

export default function Home() {
  const [selected, setSelected] = useState(new Set());
  const selecting = useRef<boolean>(true);
  const [loading, setLoading] = useState(false);
  const [eventId, setEventId] = useState<number | null>(null);

  const toggleSlot = (key: string) => {
    setSelected((prev) => {
      const copy = new Set(prev);
      if (copy.has(key)) {
        copy.delete(key);
      } else {
        copy.add(key);
      }
      return copy;
    });
  };

  // TODO: Remove test createEvent and handler
  // replace with real implementation and unit test
  const createEvent = async () => {
    setLoading(true);
    try {
      const response = await fetch('/api/events', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
      });
      if (response.ok) {
        const event = await response.json();
        setEventId(event.id);
        alert(`Event created with ID: ${event.id}`);
      } else {
        alert('Failed to create event');
      }
    } catch (error) {
      alert('Error creating event: ' + String(error));
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <table className="time-grid">
        <thead>
          <tr>
            <th></th>
            {days.map(day => <th key={day}>{day}</th>)}
          </tr>
        </thead>
        <tbody>
          {hours.map(hour => (
            <tr key={hour}>
              <th>{hour}</th>
              {days.map(day => {
                const key = `${day}-${hour}`;
                const isActive = selected.has(key);
                return (
                  <td
                    key={key}
                    className={isActive ? "selected" : ""}
                    onClick={() => toggleSlot(key)}
                    onMouseDown={(e) => {
                      e.preventDefault();
                      selecting.current = !isActive;
                    }}
                    onMouseMove={(e) => {
                      e.preventDefault();
                      if (e.buttons === 1) { // Left mouse button is pressed
                        if (selecting.current && !isActive) toggleSlot(key);
                        else if (!selecting.current && isActive) toggleSlot(key);
                      }
                    }}
                  />
                );
              })}
            </tr>
          ))}
        </tbody>
      </table>
      {/** TODO: Remove test buttons */}
      <Button
        onClick={() => {
          console.log("Selected slots:", Array.from(selected).join(", "));
        }}
      >
        Log Selected Slots
      </Button>
      <Button onClick={createEvent} disabled={loading}>
        {loading ? 'Creating...' : 'Create Event'}
      </Button>
      {eventId && <p>Created Event ID: {eventId}</p>}
    </>
  );
}
