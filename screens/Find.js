import { useEffect, useState } from "react";
import { StyleSheet, Text, ScrollView, View, Button } from "react-native";
import DropdownComponent from "../components/DropdownComponent";

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

const Find = (props) => {
    const [shouldQuery, setShouldQuery] = useState(true);
    const [createSession, setValue] = useState('');
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
            else {
                setSession(data.rows.map(x=>{
                    return (
                    <View key={x.session_time+x.game} style={styles.find}>
                        <Text>{
                            x.first_name+" "+x.last_name.charAt(0)+
                            " started "+
                            (labels.get(x.game))+
                            " at "+x.session_time
                        }</Text>
                    </View>
                );}));
            }
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
                game: createSession
            })
        })
        .then(res => res.status === 200? setSession([
            <View key={0} style={styles.find}>
                <Text>Loading...</Text>
            </View>
        ]):console.error("Error creating session"))
        .catch(err => console.error(err)).done();
        setShouldQuery(true); //To take advantage of React rendering upon state updates
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
            <DropdownComponent value={createSession} setValue={setValue}/>
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