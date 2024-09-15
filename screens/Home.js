import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text, FlatList, TextInput, ActivityIndicator } from 'react-native';
import Movie from '../components/Movie';
import { MoviesContext } from '../contexts/moviesContextProvider';
import { useContext } from 'react';
import LottieView from 'lottie-react-native';
export default function Home() {
    const { state } = useContext(MoviesContext);
    const [text, setText] = useState('');
    const [filteredMovies, setFilteredMovies] = useState(state.allMovies);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (state.allMovies.length > 0) {
            setLoading(false);
            filterMovies(text);
        }
    }, [state.allMovies]);

    const filterMovies = (searchText) => {
        if (searchText === '') {
            setFilteredMovies(state.allMovies);
        } else {
            const filtered = state.allMovies.filter(movie =>
                movie.title.toLowerCase().includes(searchText.toLowerCase())
            );
            setFilteredMovies(filtered);
        }
    };
    if (loading) {
        return (
            <View style={styles.container}>
                <View style={styles.loadingContainer}>
                    <LottieView
                        source={require('../assets/loading.json')}
                        autoPlay
                        loop
                        style={styles.loadingAnimation}
                    />
                </View>
            </View>
        );
    }

    return (
        <View style={styles.container}>
            <TextInput
                placeholder="Search"
                onChangeText={(text) => {
                    setText(text);
                    filterMovies(text);
                }}
                value={text}
                style={styles.searchInput}
                placeholderTextColor="white"
            />
            <FlatList
                data={filteredMovies}
                keyExtractor={(item) => item.id.toString()}
                renderItem={({ item }) => (
                    <Movie movie={item} />
                )}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#1c1d21",
        alignItems: 'center',
        justifyContent: 'center',
    },
    searchInput: {
        height: 60,
        color: 'white',
        backgroundColor: '#464646',
        borderColor: 'transparent',
        borderWidth: 2,
        borderRadius: 18,
        width: '95%',
        padding: 10,
        marginHorizontal: 10,
        marginVertical: 16,
        fontSize: 20,
    },
    loadingText: {
        color: 'white',
        fontSize: 18,
        marginTop: 10,
    },
    loadingContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    loadingAnimation: {
        width: 150,
        height: 150,
    },
});
