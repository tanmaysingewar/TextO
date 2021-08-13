import React from 'react'
import { StyleSheet, Text, View, Image , RefreshControl} from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import icon from '../icon/icon'
import { useFonts, 
    Poppins_400Regular, 
    Poppins_600SemiBold, 
    Poppins_500Medium,
    Poppins_100Thin,
    Poppins_300Light} from '@expo-google-fonts/poppins'
import { FlatList } from 'react-native-gesture-handler'
import Cards from '../components/Cards'

const Profile = () => {
    const [refreshing, setRefreshing] = React.useState(false);

    const [fontLoading] = useFonts({
        Poppins_400Regular,
        Poppins_600SemiBold, 
        Poppins_500Medium,
        Poppins_100Thin,
        Poppins_300Light
    })
    if(!fontLoading){
        return <View></View>
    }
    const onRefresh = () => {
        setRefreshing(true);
        setTimeout(() => {
        return setRefreshing(false)
        }, 3000);
    };

    const renderCard = ()=> {
        return(
            <View>
                <View style={{margin : 20}}>
                <View style={{marginBottom : 10}}>
                    <Text style={{fontFamily : "Poppins_600SemiBold", fontSize : 20}}>thetanmaysingewar</Text>
                </View>
                <View style={{flexDirection : "row" , alignItems : "center", justifyContent : "flex-start"}}>
                <Image source={{uri : "https://organicthemes.com/demo/profile/files/2018/05/profile-pic.jpg"}} style={{height : 75 , width : 75 , borderRadius : 50}} />
                    <View style={{flexDirection : "row",alignItems : "center",justifyContent :"space-around", width : "70%", marginLeft : 10}}>
                        <View style={{alignItems : "center"}}>
                            <Text style={{fontFamily : "Poppins_600SemiBold", fontSize : 17, lineHeight : 27}}>20</Text>
                            <Text style={{fontFamily : "Poppins_400Regular", fontSize : 13, lineHeight : 15}}>Post</Text>
                        </View>
                        <View style={{alignItems : "center"}}>
                            <Text style={{fontFamily : "Poppins_600SemiBold", fontSize : 17, lineHeight : 27}}>20</Text>
                            <Text style={{fontFamily : "Poppins_400Regular", fontSize : 13, lineHeight : 15}}>Join</Text>
                        </View>
                        <View style={{alignItems : "center"}}>
                            <Text style={{fontFamily : "Poppins_600SemiBold", fontSize : 17, lineHeight : 27}}>20</Text>
                            <Text style={{fontFamily : "Poppins_400Regular", fontSize : 13, lineHeight : 15}}>Joined</Text>
                        </View>
                    </View>
                </View>
                <View style={{margin : 5}}>
                    <Text style={{fontSize : 15, fontFamily : "Poppins_400Regular"}}>Tanmay Singewar</Text>
                    <Text style={{fontSize : 12, fontFamily : "Poppins_400Regular"}}>If you want to use this component, you should run expo install expo-app-loading and import AppLoading from its own package: import AppLoading from 'expo-app-loading';. This is part of an ongoing effort to make the expo package as lightweight as possible.</Text>
                </View>
                <View style={{backgroundColor : "#6C63FF", alignItems : "center", padding: 6, borderRadius : 5, marginTop  : 10}}>
                    <Text style={{fontFamily : "Poppins_600SemiBold", color : "#fff"}}>Join</Text>
                </View>
                <View>
                </View>
                <View style={{marginTop : 20}}>
                    <Text style={{fontFamily : "Poppins_600SemiBold", fontSize : 15, marginBottom : -30}}>All Posts</Text>
                </View>
            </View>
            <Cards /> 
            <Cards />
            <Cards />
            <Cards />
            <Cards />
            <Cards />
            <Cards />
            <Cards />
        </View>
        )
    }
    return (
        <SafeAreaView >
           

            <FlatList
            data={[{
                id : "12312-12312-123123"
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

export default Profile

const styles = StyleSheet.create({})
