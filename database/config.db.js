import mongoose from 'mongoose';
//configure mongoose
// 
// mongoose.connect(
//  process.env.MONGODB_URI || "mongodb://localhost/infomoto_dev",
mongoose.connect(
  process.env.MONGODB_URI,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  },
  (err) => {
    if (err) {
      console.log(err);
    } else {
      console.log("Connected to MongoDB");
    }
  }
);
