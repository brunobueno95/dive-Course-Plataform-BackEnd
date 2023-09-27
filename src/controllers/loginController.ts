import bcrypt from 'bcrypt'
import jwt from "jsonwebtoken"
import UserModel from '../db/userModel';

export const loginUser = async (req, res) => {
  const { username, password } = req.body;

  try {
    const user = await UserModel.findOne({ username });

    if (user) {
      const isPasswordValid = await bcrypt.compare(password, user.password);

      if (isPasswordValid) {
        const token = generateToken(user._id, user.role);
       
        if(user.enrolledCourses){
             res.json({ token, role: user.role ,courses: user.enrolledCourses, userName: username});
            console.log(`User logged in. Role: ${user.role} Token: ${token}, enrolledCourses: ${user.enrolledCourses}`);
        }
        else{
            res.json({ token, role: user.role });
            console.log(`User logged in. Role: ${user.role} Token: ${token}`);
        }
      } else {
        res.status(401).json({ message: 'Invalid credentials' });
      }
    } else {
      res.status(401).json({ message: 'Invalid credentials' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Internal server error' });
  }
};

function generateToken(userId, role) {
  const secretKey = process.env.JWT_SECRET || 'your_fallback_secret';
  const token = jwt.sign({ userId, role }, secretKey, { expiresIn: '1h' });
  return token;
}

module.exports = { loginUser, generateToken ,  };
