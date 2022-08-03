import { useState, useLayoutEffect } from "react";
import { StyleSheet, Text, View, TextInput, Button } from "react-native";

const Home = props => {

    return (
        <View style={styles.container}>

        </View>
    );
}

const Find = props => {
    const [sessions, setSession] = useState([
        {
            first_name: "John",
            last_name: "Doe",
            timeslot: "12:00:00:0000",
            game: "Chess"
        }
    ]);

    return (
        <View style={styles.container}>
            {sessions.map(session=>{
                <View style={{ flex: 1, alignSelf: 'stretch', flexDirection: 'row' }}>
                    <View style={{ flex: 1, alignSelf: 'stretch' }}><Text>{session.first_name+" "+session.last_name}</Text></View>
                    <View style={{ flex: 1, alignSelf: 'stretch' }}><Text>{session.timeslot}</Text></View>
                    <View style={{ flex: 1, alignSelf: 'stretch' }}><Text>{session.game}</Text></View>
                </View>
            })}
        </View>
    );
}

const Profile = props => {

    return (
        <View style={styles.container}>

        </View>
    );
}

export default function Play(props) {
    const [page, toggle] = useState(1);
    return page === 0? <Home/>: (page === 1? <Find/>: <Profile/>);
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
    },
    inputs: {
        height: 40,
        width: 205,
        margin: 12,
        borderWidth: 1,
        borderRadius: 3,
        padding: 10,
    },
  });