import React, { useContext, useState, useEffect } from 'react';
import { StyleSheet, Text, View, Image, Pressable } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/FontAwesome';
import { MoviesContext } from '../contexts/moviesContextProvider';
import { useNavigation } from '@react-navigation/native';
import { db } from '../firebase';
import { collection, addDoc } from 'firebase/firestore';
export default function Movie({ movie, navigation }) {
    const navigate = useNavigation();
    const { state, dispatch } = useContext(MoviesContext);
    const [isFavorite, setIsFavorite] = useState(false);

    useEffect(() => {
        const favoriteMovie = state.favoriteMovies.find(
            (favoriteMovie) => favoriteMovie.id === movie.id
        );
        setIsFavorite(!!favoriteMovie);
    }, [state.favoriteMovies]);

    const handleFavorite = async (e) => {
        console.log('handleFavorite');
        console.log(isFavorite);
        if (isFavorite) {
            dispatch({ type: "RemoveFavoriteMovie", payload: state.favoriteMovies.find((favoriteMovie) => favoriteMovie.id === movie.id) });
        } else {
            try {
                // Add movie to the database
                const docRef = await addDoc(collection(db, 'favoriteMovies'), movie);
                const movieWithId = { ...movie, movieid: docRef.id };

                // Dispatch an action to update the state
                dispatch({ type: 'AddFavoriteMovie', payload: movieWithId });
            } catch (error) {
                console.error('Error adding favorite movie:', error);
            }
        }
        setIsFavorite(!isFavorite);
    };

    return (
        <TouchableOpacity activeOpacity={1} onPress={() => {
            navigate.navigate('Details', { movie });
        }}>
            <View style={styles.container}>
                <View style={styles.card}>
                    <Image
                        source={{ uri: `https://image.tmdb.org/t/p/w500/${movie.poster_path}` }}
                        style={styles.image}
                        resizeMode='stretch'
                    />
                    <View style={styles.overview}>
                        <Text style={styles.title}>{movie.title}</Text>
                        <TouchableOpacity onPress={handleFavorite}>
                            <Icon name="heart" size={20} color={isFavorite ? "red" : "#000"} />
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 10,
    },
    card: {
        width: 350,
        height: 300,
        backgroundColor: '#fff',
        borderRadius: 15,
        overflow: 'hidden',
    },
    image: {
        // width: '90%',
        height: 250,
    },
    overview: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 10,
    },
    title: {
        fontSize: 16,
        fontWeight: 'bold',
    },
});
