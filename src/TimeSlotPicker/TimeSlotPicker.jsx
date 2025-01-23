import React, { useRef, useState } from "react";
import "./TimeSlotPicker.css";
import timeSlots from "./slots.json";
import Modal from "react-bootstrap/Modal";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";

const TimeSlotPicker = () => {
  const [selectedDate, setSelectedDate] = useState("2024/08/02");
  const [selectedSlot, setSelectedSlot] = useState(null);
  const menuRef = useRef(null);
  const leftPaddleRef = useRef(null);
  const rightPaddleRef = useRef(null);

  // Extract unique dates
  const uniqueDates = [...new Set(timeSlots.map((slot) => slot.displayDate))];

  const handleDateSelect = (date) => {
    setSelectedDate(date);
    setSelectedSlot(null); // Reset the selected slot
  };

  const handleSlotSelect = (slot) => {
    setSelectedSlot(slot);
  };

  const formatWeekdayDate = (dateString) => {
    const date = new Date(dateString);
    const weekday = date.toLocaleDateString("en-US", { weekday: "short" }); // e.g., "Fri"
    return `${weekday}`;
  };

  const formatDayDate = (dateString) => {
    const date = new Date(dateString);
    const day = date.getDate(); // Day of the month
    return `${day < 10 ? `0${day}` : day}`;
  };

  const scrollMenu = (direction) => {
    const menu = menuRef.current;
    if (menu) {
      const currentPosition = menu.scrollLeft;
      const itemWidth = menu.children[0]?.offsetWidth || 0;
      const scrollAmount =
        direction === "left"
          ? currentPosition - itemWidth
          : currentPosition + itemWidth;

      menu.scrollTo({
        left: scrollAmount,
        behavior: "smooth",
      });
    }
  };

  return (
    <>
      <Modal show={true} centered>
        <Modal.Header>
          <Modal.Title className="fs-5">Pick a date</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="time-slot-picker d-flex">
            <div className="d-flex justify-content-center align-items-center">
              <button
                ref={leftPaddleRef}
                onClick={() => scrollMenu("left")}
                style={{ borderRadius: "50%", width: "60px", height: "60px" }}
                className="left-paddle border"
              >
                <FaArrowLeft />
              </button>
            </div>
            <div className="time-slot-picker-menu" ref={menuRef}>
              {uniqueDates.map((date, index) => (
                <div
                  onClick={() => handleDateSelect(date)}
                  className={`${
                    selectedDate === date
                      ? "border border-success bg-light"
                      : ""
                  } time-slot-picker-item`}
                  key={index}
                >
                  <div
                    className={`${selectedDate === date ? "fw-bold" : ""} fs-3`}
                  >
                    {formatDayDate(date)}
                  </div>
                  <p className="text-nowrap p-0 fs-6">
                    {formatWeekdayDate(date)}
                  </p>
                </div>
              ))}
            </div>
            <div className="d-flex justify-content-center align-items-center">
              <button
                ref={rightPaddleRef}
                onClick={() => scrollMenu("right")}
                style={{ borderRadius: "50%", width: "60px", height: "60px" }}
                className="left-paddle border"
              >
                <FaArrowRight />
              </button>
            </div>
          </div>
          {selectedDate && (
            <div style={{ marginTop: "5rem" }}>
              <h4 className="fs-4">Available Time Slots</h4>
              <p className="fs-5 text-secondary">
                Each session lasts for 30 minutes
              </p>
              <div className="slot-picker">
                {timeSlots
                  .filter((slot) => slot.displayDate === selectedDate)
                  .map((slot) => (
                    <button
                      key={slot.startTimeUtc}
                      className={`slot-button ${
                        selectedSlot?.startTimeUtc === slot.startTimeUtc
                          ? "selected"
                          : ""
                      }`}
                      onClick={() => handleSlotSelect(slot)}
                    >
                      {slot.displayTime}
                    </button>
                  ))}
              </div>
            </div>
          )}
          {selectedSlot && (
            <div className="confirmation">
              <h4>Selected Time Slot:</h4>
              <p className="text-nowrap">Date: {selectedSlot.displayDate}</p>
              <p className="text-nowrap">
                Time: {selectedSlot.displayTime} - {selectedSlot.displayTimeEnd}
              </p>
            </div>
          )}
        </Modal.Body>
      </Modal>
    </>
  );
};

export default TimeSlotPicker;
