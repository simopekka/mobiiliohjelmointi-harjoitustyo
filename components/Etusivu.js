import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, TextInput, View, Button, FlatList, Alert } from 'react-native';
import { set, ref, onValue } from'firebase/database';
import { db } from './firebaseConfig'


export default function Etusivu() {

    const [treeni, setTreeni] = useState('');
    const [setteja, setSetteja] = useState('');
    const [toistoja, setToistoja] = useState('');
    const [paino, setPaino] = useState('');
    const [data, setData] = useState([]);
    const [paiva, setPaiva] = useState();
    const [id, setId] = useState(0);

    var day = new Date().getDate();
    var month = new Date().getMonth() + 1;
    var year = new Date().getFullYear();

    useEffect(() => {
        onValue(ref(db, 'treenilista/'), (snapshot) => {
            const dat = snapshot.val();
        })
        setPaiva(year + "/" + month + "/" + day);
    }, []);

    const addItem = () => {
        if (treeni!=null && setteja!=0 && toistoja!=0){
            setData([...data, {id, treeni, setteja, toistoja, paino}]);
            console.log(data);
            setId(id +1);
        } else {
            return;
        }
    }

    const saveData = () => {
        set(
            ref(db, `treenilista/` + paiva),
            {
                treeni: data
            });
        setData("");
        setId(0);
    }

    const clearData = () => {
        if (data != ""){
            Alert.alert(
                "Tallennus",
                "Ootko valmis? Klikkaa peruuta jos haluut viel treenata",
                [
                    {
                        text: "Peruuta",
                        onPress: () => console.log("Cancel Pressed"),
                        style: "cancel"
                    },
                    { text: "Tallenna", onPress: (saveData) }
                ]
            );
        } else {
            return
        }
    }
    
    const deleteItem = id => {
        setData(
            data.filter(data => id !== data.id)
        );
        console.log(id);
    }
    
    const listSeparator = () => {
        return (
            <View
                style={{
                    marginTop:3,
                    marginBottom:3,
                    height: 2,
                    width: "100%",
                    backgroundColor: "#B5EECB",
                }}
            />
        );
    };

    return (
        <View style={styles.container}>
            <View
                style={{
                    marginTop:30
                }}>
                <Text>Liikeen nimi:</Text>
                <TextInput
                    placeholder='Treeni'
                    style={styles.textField}
                    onChangeText={(treeni) => setTreeni(treeni)}
                    value={treeni}
                />
                <Text>Settejä:</Text>
                <TextInput
                    placeholder='Settejä'
                    keyboardType = 'numeric'
                    style={styles.textField}
                    onChangeText={(setteja) => setSetteja(setteja)}
                    value={setteja}
                />
                <Text>Toistoja:</Text>
                <TextInput
                    placeholder='Toistoja'
                    keyboardType = 'numeric'
                    style={styles.textField}
                    onChangeText={(toistoja) => setToistoja(toistoja)}
                    value={toistoja}
                />
                <Text>Käytetty paino kiloissa:</Text>
                <TextInput
                    placeholder='Paino'
                    keyboardType = 'numeric'
                    style={styles.textField}
                    onChangeText={(paino) => setPaino(paino)}
                    value={paino}
                />
            </View>
            <View
                style={{
                    flexDirection:"row"
                }}>
                <Button
                    color="#B5EECB"
                    onPress={addItem}
                    title="Lisää"
                />
                <Button
                    color="#B5EECB"
                    onPress={clearData}
                    title="Tallenna"
            />
            </View>
            <Text>{paiva}</Text>
            <Text
                style={styles.header}>
                        Päivän treeni:
            </Text>
            <FlatList
                data={data}
                renderItem={({item}) =>
                <View style={styles.listcontainer}>
                    <Text>{item.treeni} {item.setteja}x{item.toistoja}, {item.paino}kg</Text>
                    <Text style={{color: '#FEC8A7'}} onPress={() => deleteItem(item.id)}> Poista</Text></View>}
                keyExtractor={(item) => item.id.toString()}
                
                ItemSeparatorComponent={listSeparator}/>
        </View>
    );
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 20,
    },
    listcontainer: {
        flexDirection: 'row',
        alignItems: 'center',
        radius:100,
    },
    list:{
        border:1,
        borderColor:'black'
    },
    textField: {
        marginTop: 10,
        marginBottom: 5,
        fontSize:18,
        width: 200,
        borderColor: 'black',
        borderWidth: 1
    },
    header: {
        marginTop: 20,
        marginBottom:20,
        fontSize: 25,
        color:'#CBC7FC'
    }
});