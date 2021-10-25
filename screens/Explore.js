import React,{useState, useEffect} from 'react'
import {  Image, StyleSheet, Text, View , ActivityIndicator, RefreshControl, FlatList, TextInput,Dimensions } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context';
import icon from '../icon/icon';
import Cards from '../components/Cards';
import { api_url } from '../api';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Explore =  ({navigation}) => {
  const [refreshing, setRefreshing] = useState(false);
  const [DATA, setDATA] = useState([])
  const [searchTerm, setSearchTerm] = useState("")
  const [searchData, setSearchData] = useState(false)
  const [localData, setlocalData] = useState({})
  


  console.log(searchData?.empty)
    const getPosts =  async () => {
      setRefreshing(true);
      const value = await AsyncStorage.getItem('user_data')
      setlocalData(JSON.parse(value))
      console.log(JSON.parse(value), "user from localstorage")
      return fetch(`${api_url}/home?token=${JSON.parse(value).token}&explore=${true}`)
      .then((response) => response.json())
      .then((json) => {
          if (json) {
            let header = [{
              _id : "header_1",
              header : true
            }]
            setDATA([])
            const header_loaded = header.concat(json.home_posts)
            setDATA(header_loaded)
            setRefreshing(false)
            console.log(json.home_posts[2])
          }else{
              return console.log("error")
          }
      })
        .catch((error) => {
        console.error(error);
        });
    }

    const goBackToExplore = () => {
      setSearchTerm("")
      return setSearchData(false) 
    }

    const searchUser = () => {
      //searchTerm
      if(searchTerm === "" || searchTerm == " "){
        return 
      }
      return fetch(`${api_url}/user?username=${searchTerm}`)
      .then((response) => response.json())
      .then((json) => {
          if (json) {
            setSearchData(json)
            console.log(json)
          }else{
              return console.log("error")
          }
      })
        .catch((error) => {
        console.error(error);
        });
    }


      useEffect(() => {
        getPosts()
      }, [])

      

      const renderCards =({item}) => {
        if(item.header){
          return <Text style={{fontFamily : "Poppins_500Medium", fontSize :18, marginLeft : 20, marginBottom : 20}}>Top Post</Text>
        }
        // console.log(item)
        return <Cards navigation={navigation} data={item} local={localData} />
      }
      const ContentRender = () => {
      const onRefresh = () => {
        getPosts()
      };
      return (<FlatList 
      renderItem={renderCards}
      style={{marginBottom : 20}}
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

      const redirectToProfile = async (item) => {
        const value = await AsyncStorage.getItem('user_data')
        if (item._id === JSON.parse(value)._id) {
          return navigation.navigate("Profile")
        }
        return navigation.navigate("ProfileO",{item : item})
      }

      const SearchRender = () =>{

       
       
        if (searchData?.empty ) {
          return <View>
            <Text>no serach found</Text>
          </View>
        }
        const renderSearchCard = ({item }) => {
          return  <View style={{flexDirection : "row", marginHorizontal : 20, marginTop : 10}} onTouchEnd={() => redirectToProfile(item) }>
                  <Image source={{uri : item.profile_pic}} style={{height : 45 , width : 45 , borderRadius : 50}} />
                  <View style={{alignSelf : "center" , marginLeft : 13, marginTop : -2}}>
                    <Text style={{fontFamily : "Poppins_600SemiBold",fontSize : 13}}>{item.username} </Text>
                    <Text style={{fontFamily : "Poppins_400Regular",fontSize : 13}}>{item.name}</Text>
                  </View>
              </View>
            }
        return(
          <View >
            <View style={{marginHorizontal : 20 }}>
            <Text style={{fontFamily : "Poppins_400Regular",color : "#080808"}} >Tap on search to see reasult</Text>
            <View style={{ alignItems : "center", padding: 6, borderRadius : 5, marginTop  : 10, borderWidth : 1, borderColor : "#ccc", width: "100%"}} onTouchEnd={() => goBackToExplore()}>
                  <Text style={{fontFamily : "Poppins_400Regular",color : "#080808"}} >Go back to Explore</Text>
            </View>
            </View>
            <FlatList 
            renderItem={renderSearchCard}
            style={{marginBottom : 20 , marginTop : 10}}
            data={searchData.find}// Change Data to show Posts fetched from api
            keyExtractor={item => item._id}
          />
          </View>
          
        )
      }

      const noSearchFound = () => {
        return(
          <View style={{marginHorizontal : 20}}>
            <Text style={{fontFamily : "Poppins_400Regular",color : "#080808"}} >Tap on search to see reasult</Text>
            <View style={{ alignItems : "center", padding: 6, borderRadius : 5, marginTop  : 10, borderWidth : 1, borderColor : "#ccc", width: "100%"}} onTouchEnd={() => goBackToExplore()}>
                  <Text style={{fontFamily : "Poppins_400Regular",color : "#080808"}} >Go back to Explore</Text>
            </View>
          <View style={{ marginHorizontal : 20,marginTop : Dimensions.get("window").height /4}} >
                <Text style={{fontFamily : "Poppins_500Medium", width : "80%", fontSize : 18, textAlign : "center", alignSelf : "center"}}>No Search Found</Text>
                <Text style={{fontFamily : "Poppins_500Medium", width : "80%", fontSize : 12, alignSelf : "center", textAlign : "center", marginTop : 20}}>If you think something went wrong click reload </Text>
                <View style={{backgroundColor : "#080808", alignSelf : "center", alignItems : "center", padding: 6, borderRadius : 5, marginTop  : 10 , width : "20%"}} >
                    <Text style={{fontFamily : "Poppins_600SemiBold", color : "#fff"}}>Reload</Text>
                </View>
          </View>
          </View>
          
        )
      }
 
    return (
        <SafeAreaView>
          <View style={{marginHorizontal : 10, marginTop : 10, marginBottom : 5}}>
          <View style={{flexDirection : "row", marginHorizontal : 10 }}>
              <TextInput style={{borderColor : "#ccc", height : 35, borderWidth : 1,fontSize : 15, fontFamily : "Poppins_400Regular", paddingHorizontal : 10, borderRadius : 5, width : "85%", marginRight : 10}} placeholder="Search Friends and People" onChangeText={text => setSearchTerm(text) } />
              <View style={{height : 35, backgroundColor : "#000",justifyContent : "center", borderRadius : 5}} onTouchEnd={searchUser}>
                  <Image source={icon.search_icon} style={{height : 20, width : 20, tintColor : "#fff", margin : 10}} />
              </View>
          </View>
          </View>
             { searchData?.empty ? noSearchFound() : searchTerm ? SearchRender() :ContentRender()}
        </SafeAreaView>
    )
}

export default Explore

const styles = StyleSheet.create({})
