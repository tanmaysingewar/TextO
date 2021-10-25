import React,{useState, useEffect} from 'react'
import {  Image, ScrollView, StyleSheet, Text, View , ActivityIndicator, RefreshControl, FlatList,Dimensions, TouchableNativeFeedback,TouchableOpacity } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context';
import icon from '../icon/icon';
import Cards from '../components/Cards';
import { api_url } from '../api';
import AsyncStorage from '@react-native-async-storage/async-storage';

import LottieView from 'lottie-react-native';

import { useFonts,
  Poppins_400Regular, 
  Poppins_600SemiBold, 
  Poppins_500Medium,
  Poppins_100Thin,
  Poppins_300Light,
  Poppins_900Black,
  Poppins_200ExtraLight,
  Poppins_800ExtraBold} from '@expo-google-fonts/poppins';
  import { DancingScript_700Bold ,
    DancingScript_600SemiBold,
    DancingScript_400Regular,
    DancingScript_500Medium,} from '@expo-google-fonts/dancing-script'

const Home = ({navigation}) => {
  const [fontLoading] = useFonts({
    Poppins_400Regular,
    Poppins_600SemiBold, 
    Poppins_500Medium,
    Poppins_100Thin,
    Poppins_300Light,
    Poppins_900Black,
    Poppins_200ExtraLight,
    Poppins_800ExtraBold,DancingScript_700Bold,
    DancingScript_600SemiBold,
    DancingScript_400Regular,
    DancingScript_500Medium
})

  const [refreshing, setRefreshing] = React.useState(false);

  const [loalData, setloalData] = useState({})

  const getPosts = async () => {
    setRefreshing(true);
    const value = await AsyncStorage.getItem('user_data')
    setloalData(JSON.parse(value))
    console.log(JSON.parse(value), "user from localstorage")
    return fetch(`${api_url}/home?token=${JSON.parse(value).token}`)
    .then((response) => response.json())
    .then((json) => {
        if (json) {
          setDATA([])
          setDATA(json.home_posts)
          console.log(json.home_posts)
          setRefreshing(false)
        }else{
            return console.log("error")
        }
    })
      .catch((error) => {
      console.error(error);
      });
  }


    const [DATA, setDATA] = useState([])

    useEffect(() => {
      getPosts()
    }, [])

    const onRefresh = () => {
      getPosts()
    };

    const renderCards =({item}) => {
      // console.log(item)
      return <Cards navigation={navigation} data={item} local={loalData} />
    }
    const ContentRender = () => {
    

    const noCard = () => {
      return <View style={{ marginHorizontal : 20,marginTop : Dimensions.get("window").height /4}} >
        <Text style={{fontFamily : "Poppins_500Medium", width : "80%", fontSize : 22, textAlign : "center", alignSelf : "center"}}>No Post Yet</Text>
        <Text style={{fontFamily : "Poppins_500Medium", width : "80%", fontSize : 12, textAlign : "center", alignSelf : "center"}}>You havent join people or may they havent posted yet, please follow more or get more post on explore tab</Text>
        <Text style={{fontFamily : "Poppins_500Medium", width : "80%", fontSize : 12, alignSelf : "center", textAlign : "center", marginTop : 20}}>If you think something went wrong click reload </Text>
        <TouchableOpacity onPress={onRefresh}>
          <View style={{backgroundColor : "#080808", alignItems : "center", padding: 6, borderRadius : 5, marginTop  : 10}} >
              <Text style={{fontFamily : "Poppins_600SemiBold", color : "#fff"}}>Reload</Text>
          </View>
        </TouchableOpacity>
        
      </View>
    }

    if (DATA[0]?.noPost) {
      return (<FlatList 
        renderItem={noCard}
        data={DATA}// Change Data to show Posts fetched from api
        style={{marginBottom : 40}}
        keyExtractor={item => "126736"}
        refreshControl={
          <RefreshControl 
              colors={["#000", "#be66d4"]}
              refreshing={refreshing}
              onRefresh={onRefresh}
              />
        }
        />)
    }

    return (<FlatList 
    renderItem={renderCards}
    data={DATA}// Change Data to show Posts fetched from api
    style={{marginBottom : 40}}
    keyExtractor={item => item._id}
    refreshControl={
      <RefreshControl 
          colors={["#000", "#be66d4"]}
          refreshing={refreshing}
          onRefresh={onRefresh}
          />
    }
    />)
    }

    if (!fontLoading) {
      return (
        <View>
           <ActivityIndicator size="large" color="#00ff00" />
        </View>
      )
    }

  return (
      <SafeAreaView>
        <View style={{paddingLeft : 12, flexDirection :"row", justifyContent: "space-between"}}>
            <Text style={{fontSize : 32 , fontFamily : "DancingScript_600SemiBold" , color : "#000" ,marginBottom : 5}}>TextO</Text>
            {/* <Image source={icon.logo_icon} style={{height : 40 , width : 40 , marginRight : 10}} /> */}
            <LottieView 
              style={{
                  height : 50, 
                  width : 50,
              }}
              source={require("../icon/lotti/logo.json")}
              autoPlay={true}
              loop={true}
            />
        </View>
           {ContentRender()}
      </SafeAreaView>
  )
}
  

export default Home

const styles = StyleSheet.create({})
