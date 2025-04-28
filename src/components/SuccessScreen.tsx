import { FC } from "react";

interface SuccessScreenProps {
  phone: string;
  onClose: () => void;
}

export const SuccessScreen: FC<SuccessScreenProps> = ({ phone, onClose }) => {
  return (
    <div>
      <h3>Success!</h3>
      <p>Your phone number has been saved:</p>
      <p style={{ fontWeight: "bold" }}>{phone}</p>
      <button onClick={onClose}>Close</button>
    </div>
  );
};
