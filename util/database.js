import { MongoClient } from 'mongodb'
const url = 'mongodb+srv://admin:11053445@cluster0.o0urfcn.mongodb.net/?retryWrites=true&w=majority'
const options = { useNewUrlParser: true }
let connectDB

if (process.env.NODE_ENV === 'development') {
  if (!global._mongo) {
    global._mongo = new MongoClient(url, options).connect()
  }
  connectDB = global._mongo
} else {
  connectDB = new MongoClient(url, options).connect()
}
export { connectDB }

// DB입출력하는 코드는 server component 안에서만 사용하자. 
// client component 안에 적은 코드는 유저들에게 쉽게 노출이된다.. 