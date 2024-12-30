//react의 서버 컴포넌트이기 때문에 async 사용 가능
export default async function Page({searchParams} : {searchParams: Promise<{q:string}>}){
  const {q} = await searchParams;
  return(
    <div>search 페이지 : {q}</div>
  );
}