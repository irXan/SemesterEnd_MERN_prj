import { createContext, useEffect, useMemo, useState } from "react";
import { useAuth } from "../hooks/useAuth";
import { connectSocket } from "../services/socket";

const NotificationContext = createContext(null);

const getStorageKey = (userId) => `fitness_notifications_${userId}`;

export const NotificationProvider = ({ children }) => {
  const { token, user, isAuthenticated } = useAuth();
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    if (!user?.id) {
      setNotifications([]);
      return;
    }

    try {
      const savedNotifications = localStorage.getItem(getStorageKey(user.id));
      setNotifications(savedNotifications ? JSON.parse(savedNotifications) : []);
    } catch {
      setNotifications([]);
    }
  }, [user?.id]);

  useEffect(() => {
    if (!user?.id) {
      return;
    }

    localStorage.setItem(getStorageKey(user.id), JSON.stringify(notifications));
  }, [notifications, user?.id]);

  useEffect(() => {
    if (!isAuthenticated || !token || !user?.id) {
      return;
    }

    const socket = connectSocket(token);

    const handleNotification = (data) => {
      setNotifications((prev) => [
        {
          id: data.id || `${Date.now()}`,
          type: data.type || "general",
          message: data.message || "New notification",
          createdAt: data.createdAt || new Date().toISOString(),
          read: false,
        },
        ...prev,
      ]);
    };

    socket.on("notification", handleNotification);

    return () => {
      socket.off("notification", handleNotification);
    };
  }, [isAuthenticated, token, user?.id]);

  const value = useMemo(() => {
    const unreadCount = notifications.filter((notification) => !notification.read).length;

    return {
      notifications,
      unreadCount,
      markAllAsRead: () => {
        setNotifications((prev) =>
          prev.map((notification) => ({
            ...notification,
            read: true,
          }))
        );
      },
      clearAll: () => setNotifications([]),
    };
  }, [notifications]);

  return <NotificationContext.Provider value={value}>{children}</NotificationContext.Provider>;
};

export default NotificationContext;
