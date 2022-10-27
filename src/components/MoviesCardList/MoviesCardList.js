import MoviesCard from '../MoviesCard/MoviesCard';
import { useLocation } from 'react-router-dom';

function MoviesCardList(props) {
    const location = useLocation();
    const movieData = [
        {
          _id: 1,
          nameRU: 'Красотка',
          nameEn: 'Pretty Woman',
          trailer: 'https://youtu.be/jO70Gm7Q8MQ',
          image: 'https://s0.rbk.ru/v6_top_pics/resized/1440xH/media/img/5/50/754690280036505.jpg',
          saved: false,
          duration: 100,
        },
        {
          _id: 2,
          nameRU: 'Красотка',
          nameEn: 'Pretty Woman',
          trailer: 'https://youtu.be/jO70Gm7Q8MQ',
          image: 'https://s0.rbk.ru/v6_top_pics/resized/1440xH/media/img/5/50/754690280036505.jpg',
          saved: true,
          duration: 40,
        },
        {
          _id: 3,
          nameRU: 'Красотка',
          nameEn: 'Pretty Woman',
          trailer: 'https://youtu.be/jO70Gm7Q8MQ',
          image: 'https://s0.rbk.ru/v6_top_pics/resized/1440xH/media/img/5/50/754690280036505.jpg',
          saved: false,
          duration: 418,
        },
        {
          _id: 4,
          nameRU: 'Красотка',
          nameEn: 'Pretty Woman',
          trailer: 'https://youtu.be/jO70Gm7Q8MQ',
          image: 'https://s0.rbk.ru/v6_top_pics/resized/1440xH/media/img/5/50/754690280036505.jpg',
          saved: true,
          duration: 200,
        },
        {
          _id: 5,
          nameRU: 'Красотка',
          nameEn: 'Pretty Woman',
          trailer: 'https://youtu.be/jO70Gm7Q8MQ',
          image: 'https://s0.rbk.ru/v6_top_pics/resized/1440xH/media/img/5/50/754690280036505.jpg',
          saved: true,
          duration: 4000,
        },
      ]
    const createCardsMovies = movieData.map((item) => <MoviesCard movieData={item}  key={item._id} />);

    return(
      <section className='movies-cardlist'>
        <ul className='movies-cardlist__movies-list'>
          {createCardsMovies}
        </ul>
        {
          location.pathname === '/movies' && !props.ErrorApiMovies ? (<button className='movies-cardlist__show-more'>Еще</button>) : ""
        }
      </section>
    )
}
export default MoviesCardList;