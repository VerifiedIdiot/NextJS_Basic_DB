import { MongoClient } from 'mongodb'
import Sequelize from "sequelize"


const url = process.env.MONGO_DB_URI

let connectDB

if (process.env.NODE_ENV === 'development') {
  if (!global._mongo) {
    global._mongo = new MongoClient(url).connect()
  }
  connectDB = global._mongo
} else {
  connectDB = new MongoClient(url).connect()
}


// MySQL(Sequelize) 연결 설정
// const sequelize = new Sequelize(process.env.MYSQL_DATABASE, process.env.MYSQL_USERNAME, process.env.MYSQL_PASSWORD, {
//   host: process.env.MYSQL_HOST,
//   dialect: 'mysql',
// });

export { connectDB }

// DB입출력하는 코드는 server component 안에서만 사용하자. 
// client component 안에 적은 코드는 유저들에게 쉽게 노출이된다.. 