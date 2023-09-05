import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, TextInput, Button, Modal } from 'react-native';
import React, { useState } from 'react';

export default function App() {
  const [textItem, setTextItem] = useState('');
  const [itemList, setItemList] = useState([])

  const onHandlerChangeItem = ((t) => {setTextItem(t)})

  const add = () => {
    setItemList(currentItems => [
      ...currentItems,
      {id: Math.random().toString(), value: textItem}
    ])
    setTextItem('');
  }

  const [itemDelSelected, setDelItemSelected] = useState({});
  const [modalVisible, setModalVisible] = useState(false);

  const onHandlerDelSelected = ((item) => { 
    setDelItemSelected(item);
    setModalVisible(true);
  });
  
  const del = () => {
    console.log("itemList:"+ itemList)
    setItemList(currentItems => [
      ...currentItems.filter(item => item.id !== itemDelSelected.id)
    ]);

    setModalVisible(false);
  }

  return (

    <View style={styles.container}>
          <Modal
    animationType="slide"
    visible={modalVisible}
    >
      <View >
        <Text>Mi Modal</Text>
      </View>
      <View>
        <Text>¿Esta seguro que desea borrar {itemDelSelected.value} ?</Text>
      </View>
      <View>
        <Button onPress={del} title="confirmar"/>
      </View>
    </Modal>

      <TextInput placeholder="elemento a añadir"
       style={styles.textInput} 
       onChangeText={onHandlerChangeItem}
       value={textItem}
       />
      <Button title="ADD" onPress={add}/>
      <View >
        {itemList.map(item => <View Style={styles.itemList}>
          <Text >{item.value}</Text>
          <Button title="DELETE" onPress={() => onHandlerDelSelected(item)}/>
          </View>)}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
  },
  textInput: {
    width: 200,
    color: 'black',
    borderBottomColor: 'black',
    borderBottomWidth: 1
  }
});
