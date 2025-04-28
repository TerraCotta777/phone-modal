import { FC } from "react";
import { styles } from '../styles/modalStyles';

interface SuccessScreenProps {
  phone: string;
  onClose: () => void;
}

export const SuccessScreen: FC<SuccessScreenProps> = ({ phone, onClose }) => {
  return (
    <div style={styles.success}>
      <h3 style={styles.successTitle}>Success!</h3>
      <p>Your phone number has been saved:</p>
      <p style={{ fontWeight: "bold" }}>{phone}</p>
      <button onClick={onClose} style={styles.button}>Close</button>
    </div>
  );
};
