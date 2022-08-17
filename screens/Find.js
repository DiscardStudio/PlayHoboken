import { forwardRef, useLayoutEffect, useEffect, useRef, useState } from "react";
import { StyleSheet, Text, View, Button } from "react-native";
import DropdownComponent from "../components/DropdownComponent";

const Find = (props, ref) => {
    const createSession = useRef("");
    const [sessions, setSession] = useState([
        <View key={0} style={styles.find}>
            <Text>Loading...</Text>
        </View>
    ]);

    useEffect(() => {
        return fetch('https://play-hoboken.herokuapp.com/find-session')
        .then(res => res.status == 200 ? res.json(): {status: 404})
        .then(data => 
            data.status === 404 ?
            setSession([
                <View key={0} style={styles.find}>
                    <Text>Nobodys here. Be the first player of the day!</Text>
                </View>
            ]):
            setSession(data.rows.map(x=>
                <View key={x.key} style={styles.find}>
                    <Text>{x.first_name+" "+x.last_name+" started playing "+x.game+" at "+x.timeslot}</Text>
                </View>
            )))
        .catch(err => console.error(err)).done();            
    },[createSession]);

    return (
        <View style={styles.container}>
            <Text style={styles.header1}>Who's Playing?</Text>
            {sessions}
            <View style={styles.break}/>
            <Text style={styles.header2}>Nobody Playing Your Game?</Text>
            <Text style={styles.header3}>Start Your Own Session!</Text>
            <Text />
            <DropdownComponent ref={createSession}/>
            <Button title="Make Session" onPress={e => (createSession.current === null? console.error('Please Select a Game Before Creating a Session'):setSession([{
                first_name: ref.current.first_name,
                last_name: ref.current.last_name,
                timeslot: "2022-08-10 04:05:06",
                game: createSession.current
            },]+sessions))} />
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

export default forwardRef(Find);