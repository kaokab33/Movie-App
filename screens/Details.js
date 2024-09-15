import React from 'react';
import { StyleSheet, View, Text, Image, ScrollView, Dimensions } from 'react-native';

const { width } = Dimensions.get('window');

const Details = ({ route }) => {
    const { movie } = route.params;

    return (
        <ScrollView contentContainerStyle={styles.container}>
            <Image
                source={{ uri: `https://image.tmdb.org/t/p/w500${movie.backdrop_path}` }}
                style={styles.backdrop}
                resizeMode='cover'
            />
            <View style={styles.details}>
                <Image
                    source={{ uri: `https://image.tmdb.org/t/p/w500${movie.poster_path}` }}
                    style={styles.poster}
                    resizeMode='cover'
                />
                <Text style={styles.title}>{movie.title}</Text>
                <Text style={styles.releaseDate}>{new Date(movie.release_date).toLocaleDateString()}</Text>
                <Text style={styles.overview}>{movie.overview}</Text>
                <View style={styles.rating}>
                    <Text style={styles.ratingText}>Rating: {movie.vote_average.toFixed(1)}</Text>
                    <Text style={styles.voteCount}>({movie.vote_count} votes)</Text>
                </View>
            </View>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        flexGrow: 1,
        backgroundColor: '#1c1d21',
    },
    backdrop: {
        width: width,
        height: 200,
    },
    details: {
        padding: 16,
        backgroundColor: '#2c2c2c',
    },
    poster: {
        width: 120,
        height: 180,
        alignSelf: 'center',
        marginBottom: 16,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#fff',
        textAlign: 'center',
    },
    releaseDate: {
        fontSize: 16,
        color: '#b0b0b0',
        textAlign: 'center',
        marginVertical: 8,
    },
    overview: {
        fontSize: 14,
        color: '#d0d0d0',
        marginVertical: 16,
    },
    rating: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },
    ratingText: {
        fontSize: 16,
        color: '#ffdd00',
    },
    voteCount: {
        fontSize: 14,
        color: '#b0b0b0',
        marginLeft: 5,
    },
});

export default Details;
