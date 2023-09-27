import mongoose, { Document } from 'mongoose';
import bcrypt from "bcrypt"

interface IUser extends Document {
  username: string;
  password: string;
  role: 'student' | 'admin';
  enrolledCourses: mongoose.Types.ObjectId[]; // Assuming it's an array of ObjectIds
}

const userSchema = new mongoose.Schema({
  username: String,
  password: String,
  role: {
    type: String,
    enum: ['student', 'admin'],
    required: true
  },
  enrolledCourses: {
    type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Course' }],
    default: [],
    required: function () {
      return (this as IUser).role === 'student';
    }
  }
});

userSchema.pre('save', async function (next) {
    try {
      const salt = await bcrypt.genSalt(10);
      this.password = await bcrypt.hash(this.password, salt);
      next();
    } catch (error :any) {
      next(error);
    }
  });
  

const UserModel = mongoose.model<IUser>('User', userSchema);

export default UserModel;

  