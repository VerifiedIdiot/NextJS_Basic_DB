'use client'

import { usePathname, useRouter, useSearchParams } from "next/navigation"

export default function DetailLink() {
    const router = useRouter()
    const curPath = usePathname()
    const queryStr = useSearchParams()
    return (
        <button onClick={() =>{ router.push('/list')}}>버튼</button>   
    )
}


//router.back은 뒤로가기, router.foward는 앞으로, router.refresh는 소프트 새로고침
// router.prefetch는 페이지 미리로드, 이 기능은 Link 태그에 자동적으로 제공을해주고 있고 a href보다 Link태그사용을 권장하는 이유이기도 하다, 이미 호출한 페이지는 더 빠르게 !!
// 물론 prefetch는 사용자가 원하지 않는 페이지도 미리 불러올 수 있기 때문에 <link prefetch={false}> 로 방지할 수 있다, 회원가입 페이지를 미리 로드할 필요는 없지않은가 ?


// const router = useRouter() -> 저수준단계의 페이지 이동객체 Router 생성, link나 a href 대신 페이지이동에 상세한 설정을 하고 싶을때 사용한다
// const curPath = usePathname() -> 현재 URL 출력
// const queryStr = useSearchParams() -> 중요! 이것은 마지막 접근한 URL 정보를 저장, 이 함수를 통해서 새로고침하더라도 페이지가 유지되게 할 수 있다. 쿼리스트링 !!