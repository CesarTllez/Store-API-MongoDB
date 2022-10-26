import mongoose from 'mongoose';

const roleSchema = mongoose.Schema({
  name: String,
});

roleSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id;
    delete returnedObject._id;
    delete returnedObject.__v;
  },
});

const Role = mongoose.model('Role', roleSchema);

export default Role;
