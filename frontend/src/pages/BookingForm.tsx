import React, { useState } from "react";
import NameQuestion from "../components/NameQuestion";
import WheelCountQuestion from "../components/WheelCountQuestion";
import VehicleTypeQuestion from "../components/VehicleTypeQuestion";
import VehicleModelQuestion from "../components/VehicleModelQuestion";
import DateRangeQuestion from "../components/DateRangeQuestion";
import { bookVehicle } from "../api/api";

type FormData = {
  firstName: string;
  lastName: string;
  wheels: 2 | 4 | null;
  vehicleTypeId: number | null;
  vehicleId: number | null;
  startDate: string;
  endDate: string;
};

const BookingForm: React.FC = () => {
  const [step, setStep] = useState<number>(0);
  const [formData, setFormData] = useState<FormData>({
    firstName: "",
    lastName: "",
    wheels: null,
    vehicleTypeId: null,
    vehicleId: null,
    startDate: "",
    endDate: "",
  });

  const [error, setError] = useState<string>("");

  const handleNext = () => {
    const valid = validateStep();
    if (!valid) return;
    setError("");
    setStep((prev) => prev + 1);
  };

  const handleBack = () => {
    setError("");
    setStep((prev) => prev - 1);
  };

  const handleChange = (newData: Partial<FormData>) => {
    setFormData((prev) => ({ ...prev, ...newData }));
  };

  const handleSubmit = async () => {
    const valid = validateStep();
    if (!valid) return;

    try {
      let res = await bookVehicle(formData);
      if (res.statusText === "Conflict") {
        alert(
          "Booking already exists for this vehicle on the selected date range"
        );
      } else alert("Booking successful!");
    } catch (err) {
      alert("Booking failed!");
    }
  };

  const validateStep = () => {
    switch (step) {
      case 0:
        return formData.firstName && formData.lastName;
      case 1:
        return formData.wheels !== null;
      case 2:
        return formData.vehicleTypeId !== null;
      case 3:
        return formData.vehicleId !== null;
      case 4:
        return formData.startDate !== "" && formData.endDate !== "";
      default:
        return false;
    }
  };

  const renderStep = () => {
    switch (step) {
      case 0:
        return <NameQuestion data={formData} onChange={handleChange} />;
      case 1:
        return (
          <WheelCountQuestion
            wheels={formData.wheels}
            onChange={(newData) =>
              setFormData((prev) => ({ ...prev, ...newData }))
            }
          />
        );
      case 2:
        return <VehicleTypeQuestion data={formData} onChange={handleChange} />;
      case 3:
        return <VehicleModelQuestion data={formData} onChange={handleChange} />;
      case 4:
        return <DateRangeQuestion data={formData} onChange={handleChange} />;
      default:
        return null;
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen px-4">
      <div className="w-full max-w-md bg-white rounded-xl shadow-lg p-6">
        {renderStep()}

        {error && <p className="text-red-500 mt-2">{error}</p>}

        <div className="flex justify-between mt-6">
          {step > 0 && (
            <button
              onClick={handleBack}
              className="bg-gray-300 px-4 py-2 rounded-md"
            >
              Back
            </button>
          )}
          {step < 4 ? (
            <button
              onClick={handleNext}
              className="bg-blue-500 text-white px-4 py-2 rounded-md"
            >
              Next
            </button>
          ) : (
            <button
              onClick={handleSubmit}
              className="bg-green-600 text-white px-4 py-2 rounded-md"
            >
              Submit
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default BookingForm;
