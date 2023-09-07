import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, TextInput, Button, Modal, FlatList } from 'react-native';
import React, { useState } from 'react';

export default function App() {
  const [textItem, setTextItem] = useState('');
  const [itemList, setItemList] = useState([])

  const onHandlerChangeItem = ((t) => { setTextItem(t) })

  const add = () => {
    setItemList(currentItems => [
      ...currentItems,
      { id: Math.random().toString(), value: textItem }
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
    console.log("itemList:" + itemList)
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
        style={styles.modalContainer}
      >
        <View style={styles.modal}>

          <View >
            <Text>Mi Modal</Text>
          </View>
          <View>
            <Text>¿Esta seguro que desea borrar {itemDelSelected.value} ?</Text>
          </View>
          <View style={styles.modalButtons}>
            <Button onPress={() => setModalVisible(false)} title="cancelar" />
            <Button onPress={del} title="confirmar" />
          </View>
        </View>
      </Modal>

      <View style={styles.textInputContainer}>
      <TextInput placeholder="elemento a añadir"
        style={styles.textInput}
        onChangeText={onHandlerChangeItem}
        value={textItem}
      />
      <Button title="ADD" onPress={add} />
      </View>
      <View >
        <FlatList
          style={styles.flatlist}
          data={itemList}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <View style={styles.itemContainer}>
              <Text style={styles.text}>{item.value}</Text>
              <Button title="DELETE" onPress={() => onHandlerDelSelected(item)} />
            </View>
          )}
        />

        {/*
         {itemList.map(item => <View Style={styles.itemList}>
          <Text >{item.value}</Text>
          <Button title="DELETE" onPress={() => onHandlerDelSelected(item)} />
        </View>)} 
        */}
      </View>
    </View>
    
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    alignItems: 'stretch',
    justifyContent: 'space-evenly',
  },
  textInput: {
    width: 200,
    color: 'black',
    borderBottomColor: 'black',
    borderBottomWidth: 1
  },
  modal: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'white'
  },
  modalButtons: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  flatlist: {
    flex: 1,
    padding: 90,
    backgroundColor: 'black'
  },
  text: {
    fontSize: 20
  },
  textInputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  itemContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  }
});
