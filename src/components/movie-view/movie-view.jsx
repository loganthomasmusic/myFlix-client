import { useParams } from "react-router";
import { Link } from "react-router-dom";
import "./movie-view.scss";

export const MovieView = ({ movies }) => {
    const { movieId } = useParams();

    const movie = movies.find((b) => b.id === bookId)

    return (
        <div>
            <div>
                <div>
                    <img src={location.href.split("/movies")[0] + "/" + movie.ImagePath} />
                </div>
                <div>
                    <span>Title: </span>
                    <span>{movie.Title}</span>
                </div>
                <div>
                    <span>Director: </span>
                    <span>{movie.Director.Name}</span>
                </div>
                <div>
                    <span>Genre: </span>
                    <span>{movie.Genre.Name}</span>
                </div>
                <Link to="/">
                    Back
                </Link>
            </div>
            <div>
                <span>Title: </span>
                <span>{movie.title}</span>
            </div>
            <div>
                <span>Director: </span>
                <span>{movie.director}</span>
            </div>
            <Link to={`/`}>
                <button className="back-button">Back</button>
            </Link>
        </div>
    );
};