import { StyleSheet, Text, View, TextInput, Button } from "react-native";

export default function Profile(props) {

    return (
        <View style={styles.container}>

        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
    },
    play: {
        position: 'absolute',
        flex: 1,
        backgroundColor: '#fff',
        margin: 0,
        padding: 0,
        height: '100%',
        width: '100%',
    },
    find: {
        top: 55,
        position: 'relative',
        shadowOffset: -5,
        shadowColor: 'black',
        shadowRadius: 10,
        backgroundColor: '#fff',
        elevation: 40,
        alignItems: 'center',
        justifyContent: 'center',
        borderWidth: 2,
        borderColor: 'black',
        borderRadius: 3,
        width: 350,
        height: 50,
        margin: 15,
    },
    nav: {
        flexDirection: 'row',
        position: 'relative',
        alignItems: 'center',
        justifyContent: 'center',
        margin: 0,
        bottom: 0,
        left: 0,
        backgroundColor: 'orange',
        shadowOffset: -10,
        shadowColor: 'black',
        shadowRadius: 10,
        elevation: 40,
        width: '100%',
        height: 70,
    },
    inputs: {
        height: 40,
        width: 205,
        margin: 12,
        borderWidth: 1,
        borderRadius: 3,
        padding: 10,
    },
    navButtons: {
        position: 'relative',
        height: 30,
        width: 75,
        top: 5,
        margin: 15,
    },
  });