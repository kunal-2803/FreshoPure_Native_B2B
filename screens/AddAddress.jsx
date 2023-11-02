import { View, Text, StyleSheet, TouchableOpacity,TextInput,Dimensions,TouchableWithoutFeedback, Keyboard } from 'react-native'
import React from 'react'
import HeaderComponent from '../components/HeaderComponent'

const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;

const AddAddress = () => {
  return (
    <View className="flex justify-center items-center">
      {/* <Text>AddAddress</Text> */}
      <HeaderComponent heading={"AddAddress"} />
      <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <View style={{width:width*0.9}}>
        <Text>Name</Text>
        <TextInput className="rounded-md border mt-2 py-1 px-3"
            placeholder='Hemendra Mali'
          // style={styles.input}
          // onChangeText={onChangeText}
          // value={text}
        />
      </View>
      </TouchableWithoutFeedback>
      <View>
        <Text>Name</Text>
        <TextInput
          style={styles.input}
          // onChangeText={onChangeText}
          // value={text}
        />
      </View>
      <View>
        <Text>Name</Text>
        <TextInput
          style={styles.input}
          // onChangeText={onChangeText}
          // value={text}
        />
      </View>
      <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <View className="flex-row">
        <View>
          <Text>Name</Text>
          <TextInput
            style={styles.input}
            // onChangeText={onChangeText}
            // value={text}
          />
        </View>
        <View>
          <Text>Name</Text>
          <TextInput
            style={styles.input}
            // onChangeText={onChangeText}
            // value={text}
          />
        </View>
      </View>
      </TouchableWithoutFeedback>
      <View className="flex-row">
        <View>
          <Text>Name</Text>
          <TextInput
            style={styles.input}
            // onChangeText={onChangeText}
            // value={text}
          />
        </View>
        <View>
          <Text>Name</Text>
          <TextInput
            style={styles.input}
            // onChangeText={onChangeText}
            // value={text}
          />
        </View>
      </View>
      <TouchableOpacity>
        <Text className="border py-2 items-center text-center rounded-md" style={{width:width*0.8}}>Use My Location</Text>
      </TouchableOpacity>

      <TouchableOpacity>
      <Text className="border py-2 items-center text-center rounded-md mt-4" style={{width:width*0.8}}>Save Address</Text>
      </TouchableOpacity>
    </View>
  )
}
const styles = StyleSheet.create({
  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
  },
});

export default AddAddress