import React,{useState, useEffect} from 'react'
import {  Image, ScrollView, StyleSheet, Text, View , ActivityIndicator, RefreshControl, FlatList,Dimensions } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context';
import icon from '../icon/icon';
import Cards from '../components/Cards';
import { api_url } from '../api';
import AsyncStorage from '@react-native-async-storage/async-storage';

const ProfileO = ({route,navigation}) => {
  const [refreshing, setRefreshing] = React.useState(false);
  const [user_data, setUser_data] = useState({})
  const [DATA, setDATA] = useState([])
  const [localData, setlocalData] = useState({})
  const {_id} = route.params.item;
  console.log(route.params)
  useEffect(() => {
    getPosts()
    getUser()
  }, [])

  const getUser = async () =>{
        const value = await AsyncStorage.getItem('user_data')
        return fetch(`${api_url}/user?id=${_id}&token=${JSON.parse(value).token}`)
        .then((response) => response.json())
        .then((json) => {
            console.log(json.find[0])
            setUser_data(json.find[0])
        })
  }

  const join_user = async () =>{
    setUser_data({
        ...user_data,
        is_joined : !user_data.is_joined,
        joiners : user_data.is_joined ? user_data.joiners-- : user_data.joiners++
    })
    const value = await AsyncStorage.getItem('user_data')
    return fetch(`${api_url}/join?token=${JSON.parse(value).token}`,{
        method: "POST",
        headers:{
            Accept: "application/json",
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            client_id : user_data._id,
            user_id : JSON.parse(value)._id
        })
    })
    .then((response) => response.json())
    .then((json) => {
        console.log(json)
        setUser_data({
            ...user_data,
            is_joined : json.state,
            joiners : json.join
        })
    })
  }

  const getPosts = async () => {
      setRefreshing(true);
      // console.log(JSON.parse(value), "user from localstorage")
      const value = await AsyncStorage.getItem('user_data')
      setlocalData(JSON.parse(value))
      return fetch(`${api_url}/post?uid=${_id}&token=${JSON.parse(value).token}`)
      .then((response) => response.json())
      .then((json) => {
          if (json) {
            let profile_card = [{
                _id : "header_1",
                profile_card : true
            }]
            const profile_card_loaded = profile_card.concat(json)
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
        getPosts()
        getUser()
      };

      const renderPost = ({item}) =>{
        if (item.profile_card) {
            return <View style={{margin : 20}}>
            <View style={{marginBottom : 10,flexDirection :"row"}}>
                <Text style={{fontFamily : "Poppins_600SemiBold", fontSize : 20}}>{user_data?.username}</Text>
                <Image source={icon.verified_icon} style={{height : 15, width : 15, alignSelf : "center", marginLeft : 3, tintColor : "#faa5c9", marginTop : -3}}/>
                {/* <Image source={icon.add_post} style={{height : 15, width : 15, alignSelf : "center", marginLeft : 3, tintColor : "#080808", marginTop : -3}}/> */}
            </View>
            <View style={{flexDirection : "row" , alignItems : "center", justifyContent : "flex-start"}}>
            <Image source={{uri : user_data?.profile_pic}} style={{height : 75 , width : 75 , borderRadius : 50}} />
                <View style={{flexDirection : "row",alignItems : "center",justifyContent :"space-around", width : "70%", marginLeft : 10}}>
                    <View style={{alignItems : "center"}}>
                        <Text style={{fontFamily : "Poppins_600SemiBold", fontSize : 17, lineHeight : 27}}>{user_data?.post_count}</Text>
                        <Text style={{fontFamily : "Poppins_400Regular", fontSize : 13, lineHeight : 15}}>Post</Text>
                    </View>
                    <View style={{alignItems : "center"}}>
                        <Text style={{fontFamily : "Poppins_600SemiBold", fontSize : 17, lineHeight : 27}}>{user_data?.joiners}</Text>
                        <Text style={{fontFamily : "Poppins_400Regular", fontSize : 13, lineHeight : 15}}>Joiners</Text>
                    </View>
                    <View style={{alignItems : "center"}}>
                        <Text style={{fontFamily : "Poppins_600SemiBold", fontSize : 17, lineHeight : 27}}>{user_data?.joinings}</Text>
                        <Text style={{fontFamily : "Poppins_400Regular", fontSize : 13, lineHeight : 15}}>Joinings</Text>
                    </View>
                </View>
            </View>
            <View style={{margin : 5}}>
                <Text style={{fontSize : 15, fontFamily : "Poppins_500Medium"}}>{user_data?.name}</Text>
                <Text style={{fontSize : 12, fontFamily : "Poppins_400Regular"}}>{user_data?.bio}</Text>
            </View>{
                <View onTouchEnd={() => join_user()}>{
                user_data?.is_joined ?
                <View style={{backgroundColor : "#fff", alignItems : "center", padding: 6, borderRadius : 5, marginTop  : 10,borderColor : "#ccc", borderWidth : 1}}>
                  <Text style={{fontFamily : "Poppins_600SemiBold", color : "#000"}}>Joined</Text>
                </View>:
                <View style={{backgroundColor : "#080808", alignItems : "center", padding: 6, borderRadius : 5, marginTop  : 10}}>
                    <Text style={{fontFamily : "Poppins_600SemiBold", color : "#fff"}}>Join</Text>
                </View>}
                </View>
              }
            <View>
            </View>
            </View>
        } else if (item?.noPost) {
          return (
            <View style={{ marginHorizontal : 20,marginTop : Dimensions.get("window").height /4}} >
                <Text style={{fontFamily : "Poppins_500Medium", width : "80%", fontSize : 18, textAlign : "center", alignSelf : "center"}}>{user_data?.name} havent posted yet something</Text>
                <Text style={{fontFamily : "Poppins_500Medium", width : "80%", fontSize : 12, alignSelf : "center", textAlign : "center", marginTop : 20}}>If you think something went wrong click reload </Text>
                <View style={{backgroundColor : "#080808", alignSelf : "center", alignItems : "center", padding: 6, borderRadius : 5, marginTop  : 10 , width : "20%"}} onTouchEnd={onRefresh}>
                    <Text style={{fontFamily : "Poppins_600SemiBold", color : "#fff"}}>Reload</Text>
                </View>
            </View>
          )
        }
          return <Cards navigation={navigation} data={item} local={localData} />
      }
      const ContentRender = () => {
      
      return (<FlatList 
      renderItem={renderPost}
      data={DATA}// Change Data to show Posts fetched from api
      keyExtractor={item => item._id}
      refreshControl={
        <RefreshControl 
            colors={["#000", "#6C63FF"]}
            refreshing={refreshing}
            onRefresh={onRefresh}
            />
      }
      />)
      }
 
    return (
        <SafeAreaView>
            {ContentRender()}
        </SafeAreaView>
    )
}

export default ProfileO

const styles = StyleSheet.create({})
