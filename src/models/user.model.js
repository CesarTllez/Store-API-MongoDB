import mongoose from 'mongoose';

const userSchema = mongoose.Schema({
  nickName: String,
  idCard: Number,
  password: String,
  roleId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Role',
  },
});

userSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id;
    delete returnedObject._id;
    delete returnedObject.__v;
  },
});

const User = mongoose.model('User', userSchema);

export default User;
