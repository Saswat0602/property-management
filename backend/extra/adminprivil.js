function isAdmin(req, res, next) {
    if (!req.user.isAdmin) {
      return res.status(403).json({ message: "Access denied. Admin privileges required." });
    }
    next();
  }
  
  app.delete("/users/:userId", authMiddleware, isAdmin, async (req, res) => {
    try {
      const userIdToDelete = req.params.userId;
      // Check if the user exists
      const userToDelete = await User.findById(userIdToDelete);
      if (!userToDelete) {
        return res.status(404).json({ message: "User not found." });
      }
      await userToDelete.remove();
      res.json({ message: "User deleted successfully." });
    } catch (error) {
      res.status(500).json({ message: "An error occurred." });
    }
  });
  