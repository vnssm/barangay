import { useState } from "react";
import Notification from "../components/Notification";

export const useNotification = () => {
  const [notif, setNotif] = useState(null);

  const showNotification = (message, type = "info") => {
    setNotif({ message, type });
  };

  const NotificationComponent = notif ? (
    <Notification
      message={notif.message}
      type={notif.type}
      onClose={() => setNotif(null)}
    />
  ) : null;

  return { showNotification, NotificationComponent };
};