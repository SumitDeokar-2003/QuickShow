import { useNavigate, useParams } from "react-router-dom";
import { dummyDateTimeData, dummyShowsData } from "../assets/assets";
import { useEffect, useState } from "react";
import BlurCircle from "../components/BlurCircle";
import { Heart, PlayCircleIcon, StarIcon } from "lucide-react";
import timeFormat from "../lib/timeFormat";
import DateSelect from "../components/DateSelect";
import MovieCard from "../components/MovieCard";
import Loading from "../components/Loading";

const MovieDetails = () => {
  const { id } = useParams();
  const [show, setShow] = useState(null);

  const navigate = useNavigate();

  const getShow = async () => {
    const show = dummyShowsData.find((show) => show._id === id);
    if(show){
      setShow({
      movie: show,
      dateTime: dummyDateTimeData,
      });
    }
  };

  useEffect(() => {
    getShow();
  }, [id]);


  const handleButton = () => {
    navigate('/movies')
    scrollTo(0,0)
  }

  return show ? (
    <div className="px-6 md:px-16 lg:px-40 pt-30 md:pt-50">
      <div className="flex flex-col md:flex-row gap-8 max-w-6xl mx-auto">
        <img
          src={show.movie.poster_path}
          alt=""
          className="max-md:mx-auto
        rounded-xl h-104 max-w-70 object-cover"
        />

        <div className="relative flex flex-col gap-3">
          <BlurCircle top="-100px" left="-100px" />
          <p className="text-primary">ENGLISH</p>
          <h1 className="text-4xl font-semibold max-w-96 text-balance">
            {show.movie.title}
          </h1>
          <div className="flex gap-3 items-center">
            <StarIcon className="text-primary fill-primary h-5 w-5" />
            {show.movie.vote_average.toFixed(1)} User Rating
          </div>

          <p className="text-gray-400 mt-2 text-sm leading-tight max-w-xl">
            {show.movie.overview}
          </p>

          <p>
            {timeFormat(show.movie.runtime)} •{" "}
            {show.movie.genres.map((genre) => genre.name).join(", ")} •{" "}
            {show.movie.release_date.split("-")[0]}
          </p>

          <div className="flex gap-4 mt-4 items-center flex-wrap">
            <button
              className="bg-gray-800 flex gap-2 px-7 py-3 
            rounded-md items-center text-sm font-medium cursor-pointer
          hover:bg-gray-900 transition active:scale-95"
            >
              <PlayCircleIcon strokeWidth={2} className="h-5 w-5" />
              Watch Trailer
            </button>
            <a href="#dateSelect" className="bg-primary hover:bg-primary-dull transiiton px-10 py-3 
            rounded-md text-sm font-medium cursor-pointer active:scale-95">
              Buy Tickets
            </a>
            <button className="bg-gray-700 p-2.5 rounded-full transition
            cursor-pointer active:scale-95">
              <Heart className={`w-5 h-5`}/>
            </button>
          </div>
        </div>
      </div>

      <p className="font-medium text-lg mt-20">Your Favourite Cast</p>
      <div className="overflow-x-auto no-scrollbar mt-8 pb-4">
        <div className="flex items-center gap-4 w-max px-4">
          {show.movie.casts.slice(0,12).map((cast,index) => (
            <div key={index} className="flex flex-col items-center text-center">
              <img src={cast.profile_path} alt="" className="rounded-full object-cover 
              h-20 md:h-20 aspect-square"/>
              <p className="text-xs font-medium mt-3">{cast.name}</p>
            </div>
          ))}
        </div>
      </div>

        <DateSelect dateTime={show.dateTime} id={id}/>

        <p className="text-lg font-medium mt-20 mb-8">You May Also Like</p>
        <div className="flex flex-wrap max-sm:justify-center gap-8">
          {dummyShowsData.slice(0,4).map((movie,index) => (
            <MovieCard key={index} movie={movie}/>
          ))}
        </div>
        <div className="flex justify-center items-center mt-20">
          <button onClick={handleButton}
          className="bg-primary hover:bg-primary-dull
          cursor-pointer px-10 py-3 rounded-md transition text-sm
          font-medium">show more</button>
        </div>

    </div>
  ) : (
    <Loading/>
  );
};

export default MovieDetails;
