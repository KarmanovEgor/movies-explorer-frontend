import Footer from "../Footer/Footer";
import Header from "../Header/Header";
import MoviesCardList from "../MoviesCardList/MoviesCardList";
import Search from "../Search/Search";


export default function SavedMovies() {

  return (
   
    <>
     <Header />
      <Search/>
      <MoviesCardList/>
      <Footer />
    </>
    
  )
}