import { useEffect, useRef, useState } from "react";
import { StyleSheet, Text, ScrollView, View, Button } from "react-native";
import DropdownComponent from "../components/DropdownComponent";

const labels = [
    { label: 'Dungeons & Dragons', value: 'DnD' },
    { label: 'Board Games', value: 'BG' },
    { label: 'Billiards', value: 'P' },
    { label: 'Magic the Gathering', value: 'MtG' },
    { label: 'Flesh \'N Blood', value: 'FnB' },
    { label: 'Chess', value: 'Chess' },
    { label: 'Golf', value: 'G' },
    { label: 'E-Sports', value: 'E' },
    { label: 'Darts', value: 'D' },
    { label: 'Foosball', value: 'F' },
    
  ]

const Find = (props) => {
    const createSession = useRef("");
    const [shouldQuery, setShouldQuery] = useState(true);
    const [sessions, setSession] = useState([
        <View key={0} style={styles.find}>
            <Text>Loading...</Text>
        </View>
    ]);

    useEffect(() => {
        setShouldQuery(false);
        return fetch('https://play-hoboken.herokuapp.com/find-session',{
            method: 'GET',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
            }
        })
        .then(res => res.json())
        .then(data => {
            if(data === undefined || data.rows === undefined)
                setSession([
                    <View key={0} style={styles.find}>
                        <Text>Nobodys here. Be the first player of the day!</Text>
                    </View>
                ]);
            else
                setSession(data.rows.map(x=>
                    <View key={x.session_time} style={styles.find}>
                        <Text>{x.first_name+" "+x.last_name+" started playing "+(labels.filter(x => x.value === x.game)[0].label)+" at "+x.session_time}</Text>
                    </View>
                ));
        })
        .catch(err => console.error(err)).done();            
    },[shouldQuery]);

    const sessionCreation = async () => {
        await fetch('https://play-hoboken.herokuapp.com/create-session', {
            method: 'PUT',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                email: props.login.email,
                first_name: props.login.first_name,
                last_name: props.login.last_name,
                game: createSession.current
            })
        })
        .then(res => res.status === 200? setSession([
            <View key={0} style={styles.find}>
                <Text>Loading...</Text>
            </View>
        ]):console.error("Error creating session"))
        .catch(err => console.error(err)).done();
        setShouldQuery(true);
    }

    return (
        <ScrollView
        style={styles.container}
        contentContainerStyle={styles.contentContainer}>
            <Text style={styles.header1}>Who's Playing?</Text>
            {sessions.map(x=>x)}
            <View style={styles.break}/>
            <Text style={styles.header2}>Nobody Playing Your Game?</Text>
            <Text style={styles.header3}>Start Your Own Session!</Text>
            <Text />
            <DropdownComponent ref={createSession}/>
            <Button title="Make Session" onPress={e => {
                sessionCreation();
            }} />
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    contentContainer: {
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
    header3: {
        position: 'relative',
        top: 25,
        fontSize: 15,
        marginBottom: 10,
    },
    find: {
        top: 15,
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
        top: 15,
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

export default Find;