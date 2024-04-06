import { connectDB } from "@/util/database";
import { MongoDBAdapter } from "@next-auth/mongodb-adapter";
import NextAuth from "next-auth";
import GithubProvider from "next-auth/providers/github";

export const authOptions = {
  providers: [
    GithubProvider({
      clientId: process.env.GIT_HUB_CLIENT_ID,
      clientSecret: process.env.GIT_HUB_CLIENT_PW,
    }),
  ],
  secret : process.env.AUTH_SECRET,
  adapter : MongoDBAdapter(connectDB),
  
  // 유저정보의 경우 관계형 데이터베이스를 토대로 관리하고자 한다면 MySQL이나 ORACLE adapter를 사용하자
  // 영속성이 필요없는 데이터(세션, 캐싱, 메시지 큐 등)들은 Redis를 사용하여 쾌적한 환경을 마련해보자
};
export default NextAuth(authOptions); 




// 추후에 관계형 데이터베이스에서 회원정보를 관리할때 사용할 코드
// NextAuth는 하나의 DB만을 선택해야한다.

// export const authOptions = {
//   providers: [
//     GithubProvider({
//       clientId: process.env.GIT_HUB_CLIENT_ID,
//       clientSecret: process.env.GIT_HUB_CLIENT_PW,
//     }),
//   ],
//   secret: process.env.AUTH_SECRET,
//   adapter: SequelizeAdapter(sequelize),  // MySQL을 사용하기 위해 Sequelize 어댑터 설정
// };

// export default NextAuth(authOptions);