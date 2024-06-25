import React from "react";
import PropType from "prop-types";
import { Link } from "react-router-dom";

export const MovieCard = ({ movie }) => {
    return (
        <Card>
            <Card.Img variant="top" src={movie.imageUrl} />
            <Card.Body>
                <Card.Title>{movie.title}</Card.Title>
                <Card.Text>{movie.director.Name}</Card.Text>
                <Link to={`/movies/${encodeURIComponent(movie.id)}`}>
                    <Button variant="link">Open</Button>
                </Link>
            </Card.Body>
        </Card>
    );
};
MovieCard.propTypes = {
    movie: PropType.shape({
        title: PropType.string.isRequired,
        imageUrl: PropType.string.isRequired,
    }).isRequired
};

/*export const MovieCard = ({ movie, onMovieClick }) => {
    return (
        <div
            onClick={() => {
                onMovieClick(movie);
            }}
        >
            {movie.title}
        </div>
    );
};*/