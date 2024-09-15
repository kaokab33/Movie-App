import React, { useEffect, useReducer } from 'react';
import axios from 'axios';
import { collection, onSnapshot } from 'firebase/firestore';
import { db } from '../firebase';
import { createContext } from 'react';
import { getDocs } from 'firebase/firestore';
import { moviesReducer } from '../reducers/moviesReducer';
export const MoviesContext = createContext();

const MoviesContextProvider = ({ children }) => {
    const [state, dispatch] = useReducer(moviesReducer, {
        allMovies: [],
        favoriteMovies: [],
    });

    useEffect(() => {
        axios
            .get(
                'https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=9813ce01a72ca1bd2ae25f091898b1c7'
            )
            .then((res) => {
                dispatch({ type: 'AddAllMovies', payload: res.data.results });
            })
            .catch((error) => {
                console.error('Error fetching movies:', error);
            });
        getFavoriteMovies();
    }, []);

    const getFavoriteMovies = async () => {
        const querySnapshot = await getDocs(collection(db, 'favoriteMovies'));
        const favoriteMovies = querySnapshot.docs.map((doc) => ({
            movieid: doc.id,
            ...doc.data(),
        }));
        dispatch({ type: 'GetAllFavoriteMovies', payload: favoriteMovies });
    }

    return (
        <MoviesContext.Provider value={{ state, dispatch }}>
            {children}
        </MoviesContext.Provider>
    );
};

export default MoviesContextProvider;
