import { UnauthorizedError, UnauthenticatedError } from "../errors/customError.js";

export const authenticateUser = async (req, res, next) => {
  console.log(req.cookies);
  const { token } = req.cookies;
  if (!token) throw new UnauthenticatedError("authentication invalid");
  try {
    const { userId, role } = verifyJWT(token);
    req.user = { userId, role };
    next();
  } catch (error) {
    throw new UnauthenticatedError("authentication invalid");
  }
};

export const authorizePermissions = (...roles) => {
  console.log(roles);
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      throw new UnauthorizedError("Unauthorized to access this route");
    }
    next();
  };
};
