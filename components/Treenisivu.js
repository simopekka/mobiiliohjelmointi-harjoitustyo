import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, TextInput, View, Button, FlatList } from 'react-native';
import { getDatabase, ref, onValue, child, get } from "firebase/database";


export default function Treenisivu() {

  const database = getDatabase();
  const [paiva, setPaiva] = useState();
  const [items, setItems] = useState([]);

  const dbRef = ref(getDatabase());

  useEffect(() => {
    onValue(ref(database, 'treenilista/'), (snapshot) => {
      const data = snapshot.val();
      setItems(data);
    }) 
  }, []);

  const getData = () => {
    get(child(dbRef, `treenilista/${paiva}/`)).then((snapshot) => {
      if (snapshot.exists()) {
        const data = snapshot.val();
        setItems(data.treeni);
        console.log(data);
      } else {
        console.log("No data available");
      }
    }).catch((error) => {
      console.error(error);
    });
  }

  const listSeparator = () => {
    return (
      <View
        style={{
          height: 2,
          width: "100%",
          backgroundColor: "#B5EECB",
        }}
      />
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>
        Etsi vanha treeni:
      </Text>
      <Text>
        esim("2022/12/12")
      </Text>
      <TextInput 
        placeholder='2022/12/13'
        style={styles.textField}
        onChangeText={(paiva) => setPaiva(paiva)}
        value={paiva}
      />
      <Button
        color="#B5EECB"
        onPress={getData}
        title="Hae"
      />
      <FlatList 
        data={items}
        renderItem={({item}) =><Text>{item.treeni} {item.setteja}x{item.toistoja}, {item.paino}kg</Text>}  
        keyExtractor={(item) => item.toString()}
        ItemSeparatorComponent={listSeparator}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    justifyContent: 'center',
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
    marginTop: 100,
    fontSize: 25,
    color:'#CBC7FC'
}
});