import React,{useState} from 'react'
import { StyleSheet, Text, View, Image, TextInput,RefreshControl } from 'react-native'
import { FlatList, ScrollView } from 'react-native-gesture-handler'
import { SafeAreaView } from 'react-native-safe-area-context'
import Cards from '../components/Cards'
import icon from '../icon/icon'

const Explore = ({navigation}) => {
    const [refreshing, setRefreshing] = React.useState(false);
    const [DATA, setDATA] = useState([
        {
          id: "bd7acbea-c1b1-46c2-aed5-3ad53abb28ba",
          title: "First Item",
          like : false
        },
        {
          id: "3ac68afc-c605-48d3-a4f8-fbd91aa97f63",
          title: "Second Item",
          like : false
        },
        {
          id: "58694a0f-3da1-471f-bd96-145572e29d72",
          title: "Third Item",
          like : true
        },
        {
          id: "58694a0f-3da1-471f-bd96-142171e29d72",
          title: "Third Item",
          like : false
        },
        {
          id: "58694a0f-3da1-471f-bd96-1121271e29d72",
          title: "Third Item",
          like : false
        },
      ])
    const [DATA2, setDATA2] = useState([
        {
          id: "bd7acbea-c1b1-46c2-aed5-3ad53abb28ba",
          title: "First Item",
          like : false
        },
        {
          id: "3ac68afc-c605-48d3-a4f8-fbd91aa97f63",
          title: "Second Item",
          like : false
        },
        {
          id: "58694a0f-3da1-471f-bd96-145572e29d72",
          title: "Third Item",
          like : true
        },
        {
          id: "58694a0f-3da1-471f-bd96-142171e29d72",
          title: "Third Item",
          like : false
        },
        {
          id: "58694a0f-3da1-471f-bd96-1121271e29d72",
          title: "Third Item",
          like : false
        },
    ])
      const renderPost = ({item}) =>{
        return <Cards navigation={navigation} data={item} />
      }
        const onRefresh = () => {
            setRefreshing(true);
            setTimeout(() => {
            return setRefreshing(false)
            }, 3000);
        };
        const renderCard = () => {
            return (
            <View style={{margin : 10}}>
                <View style={{paddingLeft : 12, paddingBottom : 15}}>
                    <Text style={{fontFamily : "Poppins_400Regular", fontSize : 20, lineHeight : 25}}>Hello there,</Text>
                    <Text style={{fontFamily : "Poppins_600SemiBold", fontSize : 34, lineHeight : 40}}>Good Morning</Text>
                </View>
                <View style={{flexDirection : "row", marginHorizontal : 10 }}>
                    <TextInput style={{borderColor : "#ccc", height : 35, borderWidth : 1,fontSize : 15, fontFamily : "Poppins_400Regular", paddingHorizontal : 10, borderRadius : 5, width : "85%", marginRight : 10}} placeholder="Search Friends and People" />
                    <View style={{height : 35, backgroundColor : "#000",justifyContent : "center", borderRadius : 5}}>
                        <Image source={icon.search_icon} style={{height : 20, width : 20, tintColor : "#fff", margin : 10}} />
                    </View>
                </View>
                <View style={{marginHorizontal : 10, marginTop : 2, marginBottom : 20}}>
                <Text style={{fontSize : 12, fontFamily : "Poppins_400Regular"}}>This tab updates in certain interval of point. <Text onPress={() => onRefresh()} style={{fontFamily : "Poppins_600SemiBold",textDecorationLine : "underline" }}>Refresh</Text></Text>
                </View>
                <Text style={{fontFamily : "Poppins_500Medium", fontSize :18}}>Top Post</Text>
                <FlatList 
                listKey="TopPost"
                renderItem={renderPost}
                data={DATA}
                keyExtractor={item => item.id}
                />
                <Text style={{fontFamily : "Poppins_500Medium", fontSize :18}}>Most Liked</Text>
                <FlatList 
                listKey="MostLiked"
                renderItem={renderPost}
                data={DATA2}
                keyExtractor={item => item.id}
                />
            </View>
            )
        }
        return (
            <SafeAreaView>
                
                <FlatList 
                data={[{
                    id: "bd7acbea-c1b1-46c2-aed5-3ad53abb28ba",
                }]}
                renderItem={renderCard}
                keyExtractor={item => item.id}
                refreshControl={
                    <RefreshControl 
                        colors={["#000", "#6C63FF"]}
                        refreshing={refreshing}
                        onRefresh={onRefresh}
                    />
                }
                />
            </SafeAreaView>
        )
}

export default Explore

const styles = StyleSheet.create({})
