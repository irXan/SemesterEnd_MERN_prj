const getCurrentUser = async (req, res) => {
  res.json({
    user: {
      id: req.user._id,
      fullName: req.user.fullName,
      email: req.user.email,
    },
  });
};

export default getCurrentUser;

