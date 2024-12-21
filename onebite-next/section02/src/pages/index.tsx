//css module
import SearchableLayout from "@/components/searchable-layout";
import style from "./index.module.css";
import { ReactNode } from "react";
import BookItem from "@/components/book-item";
import { InferGetServerSidePropsType } from "next";
import fetchBooks from "@/lib/fetch-books";
import fetchRandomBooks from "@/lib/fetch-random-books";

//컴포넌트보다 먼저 실행되어서, 컴포넌트에 필요한 데이터를 불러오는 함수
//객체를 반환
export const getServerSideProps = async() => {
  
  // const allBooks = await fetchBooks();
  // const recoBooks = await fetchRandomBooks();
  //병렬동작
  const [allBooks, recoBooks] = await Promise.all([
    fetchBooks(),
    fetchRandomBooks()
  ]);

  return{
    props:{
      allBooks,
      recoBooks
    }
  }
};

// InferGetServerSidePropsType<typeof getServerSideProps> -> getServerSideProps 함수의 반환값 타입을 자동으로 추론해줌
export default function Home({allBooks, recoBooks} : InferGetServerSidePropsType<typeof getServerSideProps>) {
  
  return (
    <div className={style.container}>
      <section>
        <h3>지금 추천하는 도서</h3>
        {recoBooks.map((book) => (
          <BookItem key={book.id} {...book} />
        ))}
      </section>
      <section>
        <h3>등록된 모든 도서</h3>
        {allBooks.map((book) => (
          <BookItem key={book.id} {...book} />
        ))}
      </section>
    </div>
  );
}


Home.getLayout = (page : ReactNode) => {
  return <SearchableLayout>{page}</SearchableLayout>;
}
//특정 페이지를 SearchableLayout에 묶어서 리턴