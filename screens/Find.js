import { useState } from "react";
import { StyleSheet, Text, View, TextInput, Button } from "react-native";

export default function Find(props) {
    const [sessions, setSession] = useState([
        {
            key: 0,
            first_name: "John",
            last_name: "Doe",
            timeslot: "12:00:00:0000",
            game: "Chess"
        },
        {
            key: 1,
            first_name: "Jane",
            last_name: "Doe",
            timeslot: "12:00:00:0000",
            game: "Chess"
        }
    ]);

    return (
        <View style={styles.container}>
            {sessions.map(x=>
                <View style={styles.find}>
                    <Text>{x.first_name+" "+x.last_name+" started playing "+x.game+" at "+x.timeslot}</Text>
                </View>
            )}
            <View style={styles.break}/>
            <Text style={styles.header2}>Nobody Playing Your Game?</Text>
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
        marginTop: 25,
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