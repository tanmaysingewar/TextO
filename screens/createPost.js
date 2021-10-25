import React,{useState} from "react";
import {  StyleSheet, TextInput, View, Text, Image,ActivityIndicator} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import icon from "../icon/icon";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { api_url } from "../api";

const createPost = ({navigation}) => {
  const [title, setTitle] = useState("")
  const [post, setpost] = useState("")
  const [loading, setloading] = useState(false)

  const createPost = async () =>{
    setloading(true)
    const value = await AsyncStorage.getItem('user_data')
      // setUser_data(JSON.parse(value))
    return await fetch(`${api_url}/post?token=${JSON.parse(value).token}`,{
      method: "POST",
      headers:{
          Accept: "application/json",
          "Content-Type": "application/json"
      },
      body: JSON.stringify({
        title : title,
        post : post,
        user_pic : JSON.parse(value).profile_pic,
        user_name : JSON.parse(value).name,
        user_username : JSON.parse(value).username,
        user_id : JSON.parse(value)._id
    })
  })
  .then((response) => response.json())
  .then( async res =>{
    navigation.goBack();
    return setloading(false)
  })
  .catch((err) => {
    setloading(false)
  })
  }

  return (
    <SafeAreaView >
        <View style={{flexDirection : "row", marginHorizontal : 15,alignItems : "center", marginTop : 10}} onTouchEnd={() => navigation.goBack()}>
            <Image source={icon.back_icon} style={{height : 25 , width : 25, tintColor : "#000"}}/>
            <Text style={{fontFamily : "Poppins_400Regular",fontSize : 21, marginLeft : 10, marginBottom : -3}}>Create Post</Text>
        </View>
        <View style={{marginHorizontal : 20}}>
        <Text style={{fontFamily : "Poppins_600SemiBold", color : "#000", fontSize : 18, marginTop : 20}}>Title</Text>
        <TextInput 
            multiline  
            style={{borderColor : "#ccc", height : 35, borderWidth : 1,fontSize : 15, fontFamily : "Poppins_400Regular", paddingHorizontal : 10, borderRadius : 5, marginRight : 10, height : 50, textAlignVertical : "top", paddingTop : 10}} 
            placeholder={"Write Post Title"} 
            keyboardType={"default"} 
            autoCapitalize={'none'} 
            onChangeText={text => setTitle(text)}
            numberOfLines={2} />
        <Text style={{fontFamily : "Poppins_600SemiBold", color : "#000", fontSize : 18, marginTop : 20}}>Post</Text>
        <TextInput 
            multiline  
            style={{borderColor : "#ccc", height : 35, borderWidth : 1,fontSize : 15, fontFamily : "Poppins_400Regular", paddingHorizontal : 10, borderRadius : 5, marginRight : 10, height : 150, textAlignVertical : "top", paddingTop : 10}} 
            placeholder={"Write Post"} 
            keyboardType={"default"} 
            autoCapitalize={'none'} 
            onChangeText={text => setpost(text)}
            numberOfLines={10} />
            {
              loading ? 
                  <ActivityIndicator size="large" color="#0000ff" /> 
                : <View style={{backgroundColor : "#080808", alignItems : "center", padding: 6, borderRadius : 5, marginTop : 20}} onTouchEnd={() =>createPost()}>
                    <Text style={{fontFamily : "Poppins_600SemiBold", color : "#fff"}}>Send Post</Text>
                  </View>
            }
        </View>
    </SafeAreaView>
  );
};
const styles = StyleSheet.create({
  input: {
    margin: 12,
    borderWidth: 1,
    textAlignVertical : "top"
  },
});
export default createPost;


