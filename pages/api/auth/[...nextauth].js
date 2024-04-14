import { connectDB } from "@/util/database";
import { MongoDBAdapter } from "@next-auth/mongodb-adapter";
import NextAuth from "next-auth";
import GithubProvider from "next-auth/providers/github";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcrypt";

export const authOptions = {
  providers: [
    
    CredentialsProvider({
      //1. 로그인페이지 폼 자동생성해주는 코드
      name: "credentials",
      credentials: {
        email: { label: "email", type: "text" },
        password: { label: "password", type: "password" },
      },
      

      //2. 로그인요청시 실행되는코드
      //직접 DB에서 아이디,비번 비교하고
      //아이디,비번 맞으면 return 결과, 틀리면 return null 해야함
      async authorize(credentials) {
        const db = (await connectDB).db("my_mongo_db");
        const user = await db
          .collection("user_credit")
          .findOne({ email: credentials.email });
        if (!user) {
          console.log("해당 이메일은 없음");
          return null;
        }
        const pwcheck = await bcrypt.compare(
          credentials.password,
          user.password
        );
        if (!pwcheck) {
          console.log("비번틀림");
          return null;
        }
        return user;
      },
    }),
    
    GithubProvider({
      clientId: process.env.GIT_HUB_CLIENT_ID,
      clientSecret: process.env.GIT_HUB_CLIENT_PW,
    }),
  ],

  //3. jwt 써놔야 잘됩니다 + jwt 만료일설정
  session: {
    strategy: "jwt",
    maxAge: 30 * 24 * 60 * 60, //30일
  },

  callbacks: {
    
    //4. jwt 만들 때 실행되는 코드
    //user변수는 DB의 유저정보담겨있고 token.user에 뭐 저장하면 jwt에 들어갑니다.
    jwt: async ({ token, user, account }) => {
      // 새로운 사용자가 OAuth를 통해 로그인한 경우
      if (account && user && account.provider === 'github') {
        token.user = {
          _id: user._id,
          name: user.name,
          email: user.email,
          role: user.role // 예시로 추가한 필드
        };
      }
      // 기존 세션을 지속할 때
      else if (user) {
        token.user = {
          _id: user._id.toString(),
          name: user.name,
          email: user.email,
          role: user.role
        };
      }
      return token;
    },
    //5. 유저 세션이 조회될 때 마다 실행되는 코드
    session: async ({ session, token }) => {
      session.user = token.user;
      return session;
    },
  },
  secret: process.env.AUTH_SECRET,
  adapter: MongoDBAdapter(connectDB),

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
