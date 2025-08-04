import { dummyShowsData } from "../assets/assets"
import BlurCircle from "../components/BlurCircle"
import MovieCard from "../components/MovieCard"

const Favorite = () => {
  return dummyShowsData.length > 0 ? (
    <div className="relative my-40 mb-60 md:px-16 lg:px-40 xl:px-44
    overflow-hidden min-h-[80vh]">

      <BlurCircle left="0px" top="150px"/>
      <BlurCircle right="50px" bottom="50px"/>
      <h1 className="font-medium my-4 text-lg">Your Favourite Movies</h1>
      <div className="flex flex-wrap max-sm:justify-center gap-8">
        {dummyShowsData.map((movie) => (
          <MovieCard key={movie._id} movie={movie}/>
        ))}
      </div>
    </div>
  ) : (
    <div className="flex flex-col items-center justify-center h-screen">
        <h1 className="text-3xl font-bold text-center">No Movies available</h1>
    </div>
  )
}

export default Favorite
