const [notifications, setNotifications] = useState([]);
const [showDropdown, setShowDropdown] = useState(false);

const addNotification = (message) => {
  const newNotif = {
    id: Date.now(),
    text: message,
    time: "Just now",
    isRead: false
  };
  setNotifications([newNotif, ...notifications]);
};