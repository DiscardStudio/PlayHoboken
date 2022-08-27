import { useState, useLayoutEffect } from "react";
import { StyleSheet, Text, View, Button } from "react-native";

const labels = new Map();
labels.set('DnD', 'Dungeons & Dragons');
labels.set('BG', 'Board Games');
labels.set('P', 'Billiards');
labels.set('MtG', 'Magic the Gathering');
labels.set('FnB', 'Flesh \'N Blood');
labels.set('Chess', 'Chess');
labels.set('G', 'Golf');
labels.set('E', 'E-Sports');
labels.set('D', 'Darts');
labels.set('F', 'Foosball');

const Profile=(props) => {
    const [initialMount, setMounted] = useState(false);
    const [sessions, setSession] = useState([{
        key: 0,
        first_name: "You",
        last_name: "haven't",
        session_time: "all!",
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
            if(json.rows === undefined)
                await setSession([{
                    key: 0,
                    first_name: "You",
                    last_name: "haven't",
                    session_time: "all!",
                    game: "any games"
                }]);
            else
                await setSession(json.rows);
        }, err=> console.error(err))
        .catch(err => console.error(err)).done();
    },[initialMount]);

    const removeSession = async (game, time) => {
        await fetch('https://play-hoboken.herokuapp.com/deactivate-session', {
            method: 'PUT',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                email: props.login.email,
                game: game,
                session_time: time
            })
        })
        .then(res => res.status)
        .catch(err => console.error(err)).done();
        await setMounted(!initialMount); //To take advantage of React rendering upon state updates
    }

    return (
        <View style={styles.container}>
            <Text style={styles.header1}>Hello {props.login.first_name}</Text>
            <Text style={styles.header2}>You've Played:</Text>
            
            <Text/>
            <Button title="Log out" onPress={e => props.render()}/>

            <View style={styles.break}/>

            {sessions === undefined?
                <View key={0} style={styles.find}>
                    <Text>You haven't played at all!</Text>
                </View>
            :
            sessions.map(x=>
                <View key={x.session_time+x.game} style={styles.find}>
                    <Text>{
                    x.first_name+" "+x.last_name+" played "+
                    (labels.get(x.game))+
                    " at "+x.session_time
                    }</Text>
                    { x.active ? <Button title="End game" onPress={e => removeSession(x.game, x.session_time)}/> : <View/>}
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
        height: 75,
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