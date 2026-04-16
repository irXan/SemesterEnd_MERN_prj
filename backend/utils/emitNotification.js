const emitNotification = (app, userId, payload) => {
  const io = app.get("io");

  if (!io || !userId) {
    return;
  }

  const notification = {
    id: `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
    createdAt: new Date().toISOString(),
    ...payload,
  };

  io.to(`user:${userId}`).to(userId.toString()).emit("notification", notification);
};

export default emitNotification;
