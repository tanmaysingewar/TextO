import AsyncStorage from '@react-native-async-storage/async-storage';
import React,{useState,useEffect} from 'react'
import { StyleSheet, Text, TextInput, View, RefreshControl,Image } from 'react-native'
import { FlatList } from 'react-native-gesture-handler';
import { SafeAreaView } from 'react-native-safe-area-context'
import { api_url } from '../api';
import Cards from '../components/Cards';
import CommentsCards from '../components/CommentsCards';
import icon from '../icon/icon';

const Comment = ({route ,navigation}) => {
  const [text, settext] = useState("")
  const [DATA, setDATA] = useState([])
  const [refreshing, setRefreshing] = useState(false)
  const [commentWarn, setcommentWarn] = useState("")

  const getComment = async () => {
    setRefreshing(true);
    return fetch(`${api_url}/comment?id=${route.params.userData._id}`)
    .then((response) => response.json())
    .then((json) => {
        if (json) {
          let profile_card = [{
              _id : "header_1",
              post : true
          }]
          setDATA([])
          const profile_card_loaded = profile_card.concat(json.post_comments.comments)
          // console.log(profile_card_loaded)
          setDATA(profile_card_loaded)
          setRefreshing(false)
        }else{
            return console.log("error")
        }
    })
      .catch((error) => {
      console.error(error);
      });
  }

  const onRefresh = () => {
    getComment()
  };

  useEffect(() => {
    getComment()
  }, [])

  const postComment = async () => {
    console.log("post the post")
    if (text == "" || text == " ") {
      console.log("return Post")
      return
    }
    settext("")
    const value = await AsyncStorage.getItem('user_data')
    setDATA(DATA.concat([{
      user : {
        _id : JSON.parse(value)._id,
        name : JSON.parse(value).name,
        pic_url : JSON.parse(value).profile_pic,
        username : JSON.parse(value).username,
      },
      comments : text
    }]))
    
    await fetch(`${api_url}/comment?id=${route.params.userData._id}&token=${JSON.parse(value).token}`,{
      method: "POST",
      headers:{
          Accept: "application/json",
          "Content-Type": "application/json"
      },
      body: JSON.stringify({
        user_pic : JSON.parse(value).profile_pic,
        user_name : JSON.parse(value).name,
        user_username : JSON.parse(value).username,
        user_id : JSON.parse(value)._id,
        comment : text
      })
  })
  .then((response) => response.json())
  .then((json) => {
    console.log(json)
    setcommentWarn(json.message)
  })
  }


  const renderPost = ({item}) => {
    if (item.post) {
      return <View>
        <View style={{flexDirection : "row", marginHorizontal : 15,alignItems : "center", marginTop : 10, marginBottom : 20}} onTouchEnd={() => navigation.goBack()}>
            <Image source={icon.back_icon} style={{height : 25 , width : 25, tintColor : "#000"}}/>
            <Text style={{fontFamily : "Poppins_400Regular",fontSize : 21, marginLeft : 10, marginBottom : -3}}>Create Post</Text>
        </View>
        <Cards data={route.params.userData} navigation={navigation} />
        <View style={{marginHorizontal : 20, marginTop : -20, marginBottom : 20}}>
          <Text style={{fontFamily : "Poppins_400Regular", fontSize : 12}}>Note : Like will not update here</Text>
          <View style={{flexDirection : "row", marginBottom : 20}}>
                <TextInput style={{borderColor : "#ccc", height : 35, borderWidth : 1,fontSize : 15, fontFamily : "Poppins_400Regular", paddingHorizontal : 10, borderRadius : 5, width : "80%", marginRight : 10}} placeholder={"Enter Username"} keyboardType={"default"} autoCapitalize={'none'} onChangeText={text => settext(text)} />
                <View style={{height : 35, backgroundColor : "#000",justifyContent : "center", borderRadius : 5}} onTouchEnd={() => postComment()}>
                <Text style={{fontFamily : "Poppins_500Medium", color : "#fff", paddingHorizontal : 15}}>GO</Text>
              </View>
          </View>
          <Text style={{fontFamily : "Poppins_500Medium", color : "red", marginTop : -10}}>{commentWarn}</Text>
        </View>
      </View>
    }
    return <View>
      <CommentsCards data={item} />
    </View>
  }

  const renderComments = () =>{
    return <FlatList 
    renderItem={renderPost}
    data={DATA} // Change Data to show Posts fetched from api
    keyExtractor={item => item?._id}
    refreshControl={
      <RefreshControl 
          colors={["#000", "#6C63FF"]}
          refreshing={refreshing}
          onRefresh={onRefresh}
          />
    }
    />
  }
  return (
    <SafeAreaView>
      {renderComments()}
    </SafeAreaView>
  )
}

export default Comment

const styles = StyleSheet.create({})
