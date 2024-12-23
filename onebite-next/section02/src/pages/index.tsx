//css module
import SearchableLayout from "@/components/searchable-layout";
import style from "./index.module.css";
import { ReactNode } from "react";
import BookItem from "@/components/book-item";
import {  InferGetStaticPropsType } from "next";
import fetchBooks from "@/lib/fetch-books";
import fetchRandomBooks from "@/lib/fetch-random-books";

//ssg
export const getStaticProps = async() => {

  console.log("index page");
  
  const [allBooks, recoBooks] = await Promise.all([
    fetchBooks(),
    fetchRandomBooks()
  ]);

  return{
    props:{
      allBooks,
      recoBooks
    },
    //3초 주기로 재검증
    // revalidate : 3,
  }
};

export default function Home({allBooks, recoBooks} : InferGetStaticPropsType<typeof getStaticProps>) {
  
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