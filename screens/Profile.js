import { useState, useLayoutEffect } from "react";
import { StyleSheet, Text, View, Button } from "react-native";
/**
 * TODO: Add ability to add to interests table. May be more efficient to do so by use of the Create-Session backend
 */
const Profile=(props) => {
    const [sessions, setSession] = useState([{
        key: 0,
        first_name: "You",
        last_name: "haven't",
        timeslot: "all!",
        game: "any games"
    }]);

    useLayoutEffect(() => {
        fetch('https://play-hoboken.herokuapp.com/my-sessions', {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                email: props.login.email
            })
        })
        .then(json => json.json())
        .then(async json => {
            if(json.rows !== undefined)
                await setSession([{
                    key: 0,
                    first_name: "You",
                    last_name: "haven't",
                    timeslot: "all!",
                    game: "any games"
                }]);
            else
                await setSession(json.rows);
        }, err=> console.error(err))
        .catch(err => console.error(err)).done();
    });

    return (
        <View style={styles.container}>
            <Text style={styles.header1}>Hello {props.login.first_name}</Text>
            <Text style={styles.header2}>You've Played:</Text>
            
            <Text/>
            <Button title="Log out" onPress={e => props.render()}/>

            <View style={styles.break}/>

            {sessions === undefined?
            [{
                key: 0,
                first_name: "You",
                last_name: "haven't",
                timeslot: "all!",
                game: "any games"
            }].map(x=>
                <View key={x.key} style={styles.find}>
                    <Text>{x.first_name+" "+x.last_name+" played "+x.game+" at "+x.timeslot}</Text>
                </View>
            ):
            sessions.map(x=>
                <View key={x.key} style={styles.find}>
                    <Text>{x.first_name+" "+x.last_name+" played "+x.game+" at "+x.timeslot}</Text>
                </View>
            )}
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
        top: 45,
        position: 'relative',
        alignItems: 'center',
        justifyContent: 'center',
        borderWidth: 1,
        borderColor: 'black',
        width: 375,
        height: 0,
        marginBottom: 10,
    }
});

export default Profile;