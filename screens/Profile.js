import { forwardRef } from "react";
import { StyleSheet, Text, View, TextInput, Button } from "react-native";

const Profile=(props,ref) => {

    return (
        <View style={styles.container}>
            <Text style={styles.header1}>Hello {ref.current.first_name}</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
    },
    header1: {
        position: 'relative',
        top: 25,
        fontSize: 32,
        margin: 10,
        marginBottom: 20,
    },
    header2: {
        position: 'relative',
        top: 25,
        fontSize: 25,
        margin: 10,
    },
    header3: {
        position: 'relative',
        top: 25,
        fontSize: 15,
        marginBottom: 10,
    },
    header4: {
        position: 'relative',
        fontWeight: 'bold',
        fontSize: 15,
        marginLeft: 10,
    },
    find: {
        top: 55,
        position: 'relative',
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
    break: {
        top: 55,
        position: 'relative',
        alignItems: 'center',
        justifyContent: 'center',
        borderWidth: 1,
        borderColor: 'black',
        width: 375,
        height: 0,
        margin: 15,
    }
});

export default forwardRef(Profile);