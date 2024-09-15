import { collection, addDoc, deleteDoc, doc } from 'firebase/firestore';
import { db } from '../firebase';
export const moviesReducer = (state, action) => {
    switch (action.type) {
        case 'AddAllMovies':
            return { ...state, allMovies: action.payload };

        // case 'AddFavoriteMovie': {
        //     const newMovie = { ...action.payload };
        //     addDoc(collection(db, 'favoriteMovies'), newMovie)
        //         .then((docRef) => {
        //             const movieWithId = { ...newMovie, movieid: docRef.id };
        //             dispatch({ type: 'AddFavoriteMovieSuccess', payload: movieWithId });
        //         })
        //         .catch((error) => {
        //             console.error('Error adding favorite movie:', error);
        //         });
        //     return state;
        // }

        case 'AddFavoriteMovie': {
            // const addFavoriteMovie = async () => {
            //     try {
            //         const docRef = await addDoc(collection(db, 'favoriteMovies'), action.payload);
            //         const movieWithId = { ...action.payload, movieid: docRef.id };
            //         console.log('movieWithId:', movieWithId);

            //         dispatch({ type: 'UpdateFavoriteMovie', payload: movieWithId });
            //     } catch (error) {
            //         console.error('Error adding favorite movie:', error);
            //     }
            // };
            // addFavoriteMovie();

            return {
                ...state,
                favoriteMovies: [...state.favoriteMovies, action.payload],
            };
        }
        case 'RemoveFavoriteMovie': {
            if (!action.payload || !action.payload.movieid) {
                console.error('Invalid movie payload:', action.payload);
                return state;
            }
            const movieDocRef = doc(db, 'favoriteMovies', action.payload.movieid);
            deleteDoc(movieDocRef)
                .catch((error) => {
                    console.error('Error removing favorite movie:', error);
                });
            return {
                ...state,
                favoriteMovies: state.favoriteMovies.filter(movie => movie.movieid !== action.payload.movieid),
            };
        }
        case 'GetAllFavoriteMovies':
            return { ...state, favoriteMovies: action.payload };

        case 'RemoveALL': {
            const deleteAllMovies = async () => {
                try {
                    const deletePromises = state.favoriteMovies.map(async (movie) => {
                        const movieDocRef = doc(db, 'favoriteMovies', movie.movieid);
                        return deleteDoc(movieDocRef);
                    });

                    await Promise.all(deletePromises);
                } catch (error) {
                    console.error('Error removing favorite movies:', error);
                }
            };
            deleteAllMovies();
            return { ...state, favoriteMovies: [] };
        }
        default:
            return state;
    }
};
