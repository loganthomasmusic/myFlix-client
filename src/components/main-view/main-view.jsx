import { useState, useEffect } from "react";
import { MovieCard } from "../movie-card/movie-card";
import { MovieView } from "../movie-view/movie-view";
import { LoginView } from "../login-view/login-view";
import { SignupView } from "../signup-view/signup-view";
import { ProfileView } from "../profile-view/profile-view";
import { Row, Col } from "react-bootstrap";
import { BrowserRouter, Routes, Route, Navigate, Link } from "react-router-dom";

const NavBar = () => {
    if (!localStorage.getItem("user")) {
        return (
            <nav>
                <ul style={{ display: "flex", justifyContent: "space-between", listStyle: "none" }}>
                    <li>
                        <Link to="/login">{data.loginText}</Link>
                    </li>
                    <li>
                        <Link to="/signup">Signup</Link>
                    </li>
                </ul>
            </nav>
        );
    }

    return (
        <nav>
            <ul style={{ display: "flex", justifyContent: "space-between", listStyle: "none" }}>
                <li>
                    <Link to="/">Movies</Link>
                </li>
                <li>
                    <Link to="/profile">Profile</Link>
                </li>
                <li>
                    <Link to="#" onClick={() => {
                        localStorage.clear();
                        location.reload();
                        location.href = "/"

                    }}>Logout</Link>
                </li>
            </ul>
        </nav>
    );
};

export const MainView = () => {
    const [movies, setMovies] = useState([]);
    const [selectedMovie, setSelectedMovie] = useState(null);
    const [user, setUser] = useState(null);
    const [token, setToken] = useState(null);

    useEffect(() => {
        fetch("https://logan-movie-api-1dcba13d053e.herokuapp.com/")
            .then((response) => response.json())
            .then(movies => {
                setMovies(movies)
            })
            .catch(e => console.log(e))

    }, []);

    return (
        <BrowserRouter>
            <Row>
                <Routes>
                    <Route path="/login" element={
                        <>
                            <NavBar></NavBar>
                            {!user ? (
                                <LoginView onLoggedIn={(user, token) => {
                                    // console.log(user);
                                    // localStorage.setItem("user", user);
                                    setUser(user);
                                    //setToken(token);
                                }} />
                            ) : (
                                <Navigate to="/" />
                            )}
                        </>
                    }>
                    </Route>
                    <Route path="/signup" element={
                        <>
                            <NavBar></NavBar>
                            <SignupView />
                        </>
                    }>
                    </Route>
                    <Route path="/" element={
                        <>
                            <NavBar></NavBar>
                            {!user ? (
                                <Navigate to="/login" replace />
                            ) : (<>
                                {
                                    movies.map((movie) => (
                                        <Col className='md5'>
                                            <MovieCard
                                                key={movie._id}
                                                movie={movie}
                                                onMovieClick={(newSelectedMovie) => {
                                                    setSelectedMovie(newSelectedMovie);
                                                }}
                                            />
                                        </Col>
                                    ))}
                            </>
                            )}
                        </>
                    }>
                    </Route>
                    <Route path="/movies/:movieId" element={
                        <>
                            <NavBar></NavBar>
                            {!user ? (
                                <Navigate to="/login" replace />
                            ) : (
                                <MovieView movies={movies} onBackClick={() => setSelectedMovie(null)} />
                            )}
                        </>
                    }>
                    </Route>
                    <Route path="/profile" element={
                        <>
                            <NavBar></NavBar>
                            <ProfileView movies={movies} />
                        </>
                    }>
                    </Route>
                    {/* {movies.map((movie) => (
            <Col className = 'md5'>
            <MovieCard
              key={movie._id}
              movie={movie}
              onMovieClick={(newSelectedMovie) => {
                setSelectedMovie(newSelectedMovie);
              }}
            />
            </Col>
          ))} */}
                    {/* <button onClick={() => { setUser(null); localStorage.clear(); }}>Logout</button> */}
                </Routes>
            </Row>
        </BrowserRouter>
    );
};