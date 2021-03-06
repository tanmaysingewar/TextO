import React,{useState, useEffect} from 'react'
import {  Image, ScrollView, StyleSheet, Text, View , ActivityIndicator, RefreshControl, FlatList,Dimensions } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context';
import icon from '../icon/icon';
import Cards from '../components/Cards';
import { api_url } from '../api';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Profile =  ({navigation}) => {
  const [refreshing, setRefreshing] = React.useState(false);
  const [user_data, setUser_data] = useState({})
  const [DATA, setDATA] = useState([])
  const [localData, setlocalData] = useState({})
  useEffect(() => {
    getPosts()
  }, [])

  const getPosts = async () => {
      setRefreshing(true);
      const value = await AsyncStorage.getItem('user_data')
      setlocalData(JSON.parse(value))
      setUser_data(JSON.parse(value))
      console.log(user_data)
      return fetch(`${api_url}/post?uid=${JSON.parse(value)._id}&token=${JSON.parse(value).token}`)
      .then((response) => response.json())
      .then((json) => {
          if (json) {
            let profile_card = [{
                _id : "header_1",
                profile_card : true
            }]
            setDATA([])
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


    const LogOut = async () => {
        return navigation.navigate("Login")
    }

    const getUser = async () =>{
        const value = await AsyncStorage.getItem('user_data')
        return await fetch(`${api_url}/user?id=${JSON.parse(value)._id}&token=${JSON.parse(value).token}`)
        .then((response) => response.json())
        .then( async (json) => {
            console.log(json, "THis is JSON")
            setUser_data({
                ...user_data,
                joiners_count : json?.find[0].joiners,
                joining_count :json?.find[0].joinings,
                name : json?.find[0]?.name,
                post_count : json?.find[0].post_count,
                profile_pic : json?.find[0].profile_pic,
                bio: json?.find[0].bio,
                username : json?.find[0].username
            })
            let insertVal??= JSON.stringify(user_data)
            await AsyncStorage.setItem('user_data',insertVal)
        })
  }

    const onRefresh = async () => {
        getPosts()
        getUser()
      };

      const renderPost = ({item}) =>{
        if (item.profile_card) {
            return <View style={{margin : 20}}>
            <View style={{marginBottom : 10,flexDirection :"row",justifyContent : "space-between"}}>
                <View style={{flexDirection :"row"}}>
                    <Text style={{fontFamily : "Poppins_600SemiBold", fontSize : 20}}>{user_data?.username}</Text>
                    <Image source={icon.verified_icon} style={{height : 15, width : 15, alignSelf : "center", marginLeft : 3, tintColor : "#faa5c9", marginTop : -3}}/>
                </View>
                <View onTouchEnd={() => LogOut()}>
                <Text style={{fontFamily : "Poppins_400Regular", fontSize : 18}}>LogOut</Text>
                </View>
            </View>
            <View style={{flexDirection : "row" , alignItems : "center", justifyContent : "flex-start"}}>
            <Image source={{uri : user_data?.profile_pic}} style={{height : 75 , width : 75 , borderRadius : 50}} />
                <View style={{flexDirection : "row",alignItems : "center",justifyContent :"space-around", width : "70%", marginLeft : 10}}>
                    <View style={{alignItems : "center"}}>
                        <Text style={{fontFamily : "Poppins_600SemiBold", fontSize : 17, lineHeight : 27}}>{user_data?.post_count}</Text>
                        <Text style={{fontFamily : "Poppins_400Regular", fontSize : 13, lineHeight : 15}}>Post</Text>
                    </View>
                    <View style={{alignItems : "center"}}>
                        <Text style={{fontFamily : "Poppins_600SemiBold", fontSize : 17, lineHeight : 27}}>{user_data?.joiners_count}</Text>
                        <Text style={{fontFamily : "Poppins_400Regular", fontSize : 13, lineHeight : 15}}>Join</Text>
                    </View>
                    <View style={{alignItems : "center"}}>
                        <Text style={{fontFamily : "Poppins_600SemiBold", fontSize : 17, lineHeight : 27}}>{user_data?.joining_count}</Text>
                        <Text style={{fontFamily : "Poppins_400Regular", fontSize : 13, lineHeight : 15}}>Joined</Text>
                    </View>
                </View>
            </View>
            <View style={{margin : 5}}>
                <Text style={{fontSize : 15, fontFamily : "Poppins_500Medium"}}>{user_data?.name}</Text>
                <Text style={{fontSize : 12, fontFamily : "Poppins_400Regular"}}>{user_data?.bio}</Text>
            </View>
            <Text style={{fontFamily : "Poppins_400Regular",color : "#080808", fontSize : 10, marginLeft : 5, marginTop : 10}}>Refresh, if you update the profile or posted a post~</Text>
              <View style={{backgroundColor : "#080808", alignItems : "center", padding: 6, borderRadius : 5}} onTouchEnd={() => navigation.navigate("Edit_Profile")}>
                  <Text style={{fontFamily : "Poppins_600SemiBold", color : "#fff"}}>Edit Profile</Text>
              </View>
              <View style={{ alignItems : "center", padding: 6, borderRadius : 5, marginTop  : 10, borderWidth : 1, borderColor : "#ccc"}} onTouchEnd={() => navigation.navigate("Create_Post")}>
                  <Text style={{fontFamily : "Poppins_400Regular",color : "#080808"}}>Create Post</Text>
              </View>
            <View>
            </View>
            </View>
        } else if (item?.noPost) {
          return (
            <View style={{ marginHorizontal : 20,marginTop : Dimensions.get("window").height /4}} >
                <Text style={{fontFamily : "Poppins_500Medium", width : "80%", fontSize : 18, textAlign : "center", alignSelf : "center"}}>You havent posted yet something</Text>
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

export default Profile

const styles = StyleSheet.create({})
