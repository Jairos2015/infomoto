import mongoose from 'mongoose';
//configure mongoose
// 
// mongoose.connect(
//  process.env.MONGODB_URI || "mongodb://localhost/infomoto_dev",
mongoose.connect(
  "mongodb+srv://user2022:lasPalmas2022@cluster0.zc0cxdr.mongodb.net/test?authSource=admin&replicaSet=atlas-13ao3z-shard-0&readPreference=primary&appname=MongoDB%20Compass&ssl=true",
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
