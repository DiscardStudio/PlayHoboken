import { StyleSheet, Text, View, Image, ScrollView } from "react-native";

export default function Home(props) {

    return (
        <ScrollView
            style={styles.container}
            contentContainerStyle={styles.contentContainer}>
            <Text style={styles.header1}>Play! Hoboken</Text>
            <Image
                style={{position: 'relative', width: 350,margin: 15}} 
                source={require("../assets/homepage1.png")}
            />
            <Text style={styles.header2}>Looking for a place to Play?</Text>
            <Text style={styles.header3}>Come to 1012 Grand St Floor 3, Hoboken NJ</Text>
            <View style={styles.games}>
                <Image
                    style={styles.game} 
                    source={require("../assets/homepage2.png")}
                />
                <View>
                    <Text style={styles.header4}>Various Board Games</Text>
                    <Text style={styles.gameText}>Both in Tournaments or Casual Play!</Text>
                </View>
            </View>
            <View style={styles.games}>
                <Image
                    style={styles.game} 
                    source={require("../assets/homepage3.png")}
                />
                <View>
                    <Text style={styles.header4}>Dungeons and Dragons</Text>
                    <Text style={styles.gameText}>For Those Whose Imaginations Run Wild!</Text>
                </View>
            </View>
            <View style={styles.games}>
                <Image
                    style={styles.game} 
                    source={require("../assets/homepage4.png")}
                />
                <View>
                    <Text style={styles.header4}>Pinball</Text>
                    <Text style={styles.gameText}>If You Think You Can Beat Our High Scores!</Text>
                </View>
            </View>
            <View style={styles.games}>
                <Image
                    style={styles.game} 
                    source={require("../assets/homepage5.png")}
                />
                <View>
                    <Text style={styles.header4}>Billiards</Text>
                    <Text style={styles.gameText}>Relax To Some Jazz On Our 9-Foot Tables</Text>
                </View>
            </View>
            <Text style={styles.header3}>All of this and more at Play! Hoboken</Text>
            <Text/>
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
    play: {
        position: 'absolute',
        flex: 1,
        backgroundColor: '#fff',
        margin: 0,
        padding: 0,
        height: '100%',
        width: '100%',
    },
    games: {
        position: 'relative',
        flexDirection: 'row',
        padding: 0,
        backgroundColor: '#fff',
        elevation: 40,
        borderWidth: 2,
        borderColor: 'black',
        borderRadius: 3,
        width: 350,
        height: 75,
        margin: 15,
    },
    game: {
        position: 'relative',
        left: 0,
        margin:0,
        width: '40%',
        height: '100%',
    },
    gameText: {
        position: 'relative',
        margin: 0,
        marginLeft:10,
        width: '60%',
        height: '100%',
    },
  });