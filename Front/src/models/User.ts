
import mongoose from 'mongoose';

// Define interfaces for TypeScript
interface IUserProject {
  name: string;
  createdAt: Date;
  modelData: string; // For storing GLTF JSON data
}

interface IUser {
  name: string;
  email: string;
  password: string;
  createdAt: Date;
  projects: IUserProject[];
}

const UserSchema = new mongoose.Schema<IUser>({
  name: {
    type: String,
    required: [true, 'Please provide a name'],
    maxlength: [60, 'Name cannot be more than 60 characters'],
  },
  email: {
    type: String,
    required: [true, 'Please provide an email'],
    unique: true,
    lowercase: true,
    trim: true,
    validate: {
      validator: function(v: string) {
        return /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(v);
      },
      message: 'Please enter a valid email'
    }
  },
  password: {
    type: String,
    required: [true, 'Please provide a password'],
    minlength: [6, 'Password cannot be less than 6 characters'],
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  projects: [
    {
      name: String,
      createdAt: {
        type: Date,
        default: Date.now
      },
      modelData: String // For storing GLTF JSON data
    }
  ]
});

// Fix the model declaration to handle "models does not exist on typeof mongoose" error
// This is to prevent OverwriteModelError when the model is defined multiple times
export default (mongoose.models?.User as mongoose.Model<IUser>) || 
  mongoose.model<IUser>('User', UserSchema);
