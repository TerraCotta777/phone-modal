import { FC, FormEvent, useEffect, useState } from "react";

interface PhoneInputProps {
  onSave: (phone: string) => void;
}

export const PhoneInput: React.FC<PhoneInputProps> = ({ onSave }) => {
  const [phone, setPhone] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    const savedPhone = localStorage.getItem("userPhone");
    if (savedPhone) {
      setPhone(savedPhone);
    }
  }, []);

  const validatePhone = (value: string): boolean => {
    const phoneRegex = /^\d{10,}$/;
    return phoneRegex.test(value.replace(/\D/g, ""));
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    const cleanedPhone = phone.replace(/\D/g, "");

    if (validatePhone(cleanedPhone)) {
      setError("");
      onSave(cleanedPhone);
    } else {
      setError("Please enter a valid phone number (at least 10 digits)");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <input
          type="tel"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          placeholder="Enter phone number"
          aria-label="Phone number"
        />
        {error && <div style={{ color: "red" }}>{error}</div>}
      </div>
      <button type="submit">Save</button>
    </form>
  );
};
