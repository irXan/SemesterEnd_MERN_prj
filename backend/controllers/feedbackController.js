import Feedback from "../models/Feedback.js";

const createFeedback = async (req, res) => {
  try {
    const { subject, message } = req.body;

    if (!subject || !message) {
      return res.status(400).json({ message: "Subject and message are required" });
    }

    const feedback = await Feedback.create({
      user: req.user._id,
      subject: subject.trim(),
      message: message.trim(),
    });

    res.status(201).json({ message: "Feedback submitted", feedback });
  } catch {
    res.status(500).json({ message: "Server error while submitting feedback" });
  }
};

const getMyFeedback = async (req, res) => {
  try {
    const feedbackItems = await Feedback.find({ user: req.user._id }).sort({ createdAt: -1 });
    res.json({ feedbackItems });
  } catch {
    res.status(500).json({ message: "Server error while loading feedback" });
  }
};

export { createFeedback, getMyFeedback };
