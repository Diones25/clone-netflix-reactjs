import React, { useEffect, useState } from "react";
import './App.css';
import Tmdb from "./Tmdb";
import MovieRow from './components/MovieRow';
import FeaturedMovie from './components/FeaturedMovie';
import Header from './components/Header';
import LoadingNetflix  from './img/Netflix_LoadTime.gif';

export default () => {

  const [ movieList, setMovieList ] = useState([]);
  const [ featuredData, setFeaturedData ] = useState(null);
  const [ blackHeader, setBlackHeader] = useState(false);

  useEffect(() => {
    const loadAll = async () => {
      //Pegando a lista total
      let list = await Tmdb.getHomeLis();
      setMovieList(list);
      // console.log(list);

      //Pegar o filme em destaque
      let originals = list.filter(i => i.slug === 'originals');
      let randomChosen = Math.floor(Math.random() * (originals[0].items.results.length - 1));
      let chosen = originals[0].items.results[randomChosen];
      // console.log(chosen);

      let chosenInfo = await Tmdb.getMovieInfo(chosen.id, 'tv');
      // console.log(chosenInfo);

      setFeaturedData(chosenInfo);
    }

    loadAll();
  }, []);

  useEffect(() => {
    const scrollListener = () => {
      if(window.scrollY > 10) {
        setBlackHeader(true);
      }
      else{
        setBlackHeader(false);
      }
    }

    window.addEventListener('scroll', scrollListener);

    return () => {
      window.removeEventListener('scroll', scrollListener);
    }
  }, []);

  return(
    <>
      <div className="page">

        <Header black={blackHeader} />

        {featuredData &&
          <FeaturedMovie item={featuredData} />
        }

        <section className="lista">
          {movieList.map((item, key) => (
            <MovieRow key={key} title={item.title} items={item.items} />
          ))}
        </section>

        <footer>
          Feito com <span role="img" aria-label="coração">❤️</span> por Diones<br/>
          Direitos de imagem para Netflix<br/>
          Dados pegos do site Themoviedb.org
        </footer>
        
        {movieList.length <= 0 &&
          <div className="loading">
            <img src={LoadingNetflix} style={{ width: "500px" }} alt="Carregnado" />
          </div>
        }
      </div>
    </>
  )
}