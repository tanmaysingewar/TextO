import React from 'react'
import {  Image, ScrollView, StyleSheet, Text, View , ActivityIndicator, RefreshControl, FlatList } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context';
import icon from '../icon/icon';
import Cards from '../components/Cards';

const Home = ({navigation}) => {
  const [refreshing, setRefreshing] = React.useState(false);

      const renderCards =() => {
        return <Cards navigation={navigation} />
      }
      const ContentRender = () => {
      const DATA = [
        {
          id: "bd7acbea-c1b1-46c2-aed5-3ad53abb28ba",
          title: "First Item",
        },
        {
          id: "3ac68afc-c605-48d3-a4f8-fbd91aa97f63",
          title: "Second Item",
        },
        {
          id: "58694a0f-3da1-471f-bd96-145572e29d72",
          title: "Third Item",
        },
        {
          id: "58694a0f-3da1-471f-bd96-142171e29d72",
          title: "Third Item",
        },
        {
          id: "58694a0f-3da1-471f-bd96-1121271e29d72",
          title: "Third Item",
        },
      ];
      const onRefresh = () => {
        setRefreshing(true);
        setTimeout(() => {
          return setRefreshing(false)
        }, 3000);
      };
      return (<FlatList 
      renderItem={renderCards}
      data={DATA}// Change Data to show Posts fetched from api
      style={{marginBottom : 40}}
      keyExtractor={item => item.id}
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
          <View style={{paddingLeft : 12, flexDirection :"row", justifyContent: "space-between"}}>
              <Text style={{fontSize : 32 , fontFamily : "DancingScript_600SemiBold" , color : "#000" ,marginBottom : 5}}>TextO</Text>
              <Image source={icon.logo_icon} style={{height : 40 , width : 40 , marginRight : 10}} />
          </View>
             {ContentRender()}
        </SafeAreaView>
    )
}

export default Home

const styles = StyleSheet.create({})
