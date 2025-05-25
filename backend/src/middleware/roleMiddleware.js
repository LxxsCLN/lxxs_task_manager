const roleMiddleware = (requiredRole) => {
    return (req, res, next) => {
        if (!req.user)
            return res.status(403).json({ message: "No user in request" });

        if (req.user.role !== requiredRole) {
            return res
                .status(403)
                .json({ message: "Access denied: insufficient role" });
        }

        next();
    };
};

export default roleMiddleware;
