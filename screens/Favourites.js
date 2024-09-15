import React from 'react';
import { View, Text, Pressable } from 'react-native';
import { useContext } from 'react';
import { MoviesContext } from '../contexts/moviesContextProvider';
import { StyleSheet } from 'react-native';
import Movie from '../components/Movie';
import { FlatList } from 'react-native-gesture-handler';

export default function Favourites() {
    const { state, dispatch } = useContext(MoviesContext);
    const handlePress = () => {
        dispatch({ type: 'RemoveALL' });
    }

    if (state.favoriteMovies.length === 0) {
        return (
            <View style={styles.container}>
                <View style={styles.emptyContainer}>
                    <Text style={styles.emptyText}>No favorite movies yet!</Text>
                </View>
            </View>
        );
    }
    else {
        return (
            <View style={styles.container}>
                <FlatList
                    data={state.favoriteMovies}
                    keyExtractor={(item) => item.id.toString()}
                    renderItem={({ item }) => (
                        <Movie movie={item}
                        />
                    )}
                >
                </FlatList>
                <Pressable style={styles.button} onPress={handlePress}>
                    <Text style={styles.text}>Delete All</Text>
                </Pressable>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#1c1d21",
        alignItems: 'center',
        justifyContent: 'center',
    },
    text: {
        color: 'white',
        fontSize: 20,
    },
    button: {
        backgroundColor: '#ff0000',
        padding: 10,
        borderRadius: 10,
        marginVertical: 8,
    },
    emptyContainer: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    emptyText: {
        color: 'white',
        fontSize: 20,
        textAlign: 'center',
    },
});