/** @type {import('next').NextConfig} */
const nextConfig = {};

export default nextConfig;



// db 변수를 database.js에 적어두고 export {db} 해서 쓰면 매번 저렇게 길게 안써도 되는데
// 현재는 실험단계인 top-level await 기능을 추가하거나 하면 해볼 수 있다. 
// webpack(){} 부분만 붙여넣으면 될텐데 근데 nodejs 버전이 낮으면 못쓰는 기능이라
// 나중에 클라우드로 서버 배포할 때 클라우드서비스에서 nodejs 높은버전 제공을 안해주면 못씀. 
// 그래서 지금은 주석처리. 

 /** @type {import('next').NextConfig} */
//  const nextConfig = {
//     experimental: {
//       appDir: true,
//     },
//     webpack(config) {
//       config.experiments = { ...config.experiments, topLevelAwait: true }
//       return config
//     }
//   }
//   module.exports = nextConfig