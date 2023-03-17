import * as React from 'react'
import { SafeAreaView, StyleSheet, View, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Text } from 'react-native-paper';
import { Button } from 'react-native-paper';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function HomePage (){

    const [ logCompletedToday, setLogCompletedToday ] = React.useState(false)

    const navigation = useNavigation();
    
    let buttonComponent

    //every time page is focused, check if there are logs today and set logCompletedVariable
    React.useEffect(()=>{    
        navigation.addListener('focus', async () =>{
            return await AsyncStorage.getAllKeys().then(async (keys)=>{
                return AsyncStorage.multiGet(keys).then((res)=>{
                    let logs = res.map((e)=>{return JSON.parse(e[1])})
                    let todaysLogs = logs.find(e => {return new Date(e.date).toDateString == new Date().toDateString})
                    setLogCompletedToday(typeof todaysLogs == 'object')
                })
            })
        })
    },[])

    if(logCompletedToday){
        buttonComponent = <LogFinishedButton navigation={navigation}/>
    }else{
        buttonComponent = <LogUnfinishedButton navigation={navigation}/>
    }


    return(
        <View style={styles.PageContainer}>
            <Image
                source={require('../../assets/logo.png')}
            />
            <Text style={styles.titleText} variant="headlineMedium">Maudsley PMDD Symptom Questionaire</Text>
            {buttonComponent}
        </View>
    )
}


const LogUnfinishedButton = ({navigation})=>{
    return(
        <Button 
            mode="contained" 
            onPress={() => {
            navigation.navigate('new-log')
        }}>
            Log Today's Symptoms
        </Button>
    )
}

const LogFinishedButton = ({navigation})=>{
    return(
        <Button 
            mode="outlined" 
            onPress={() => {
            navigation.navigate('new-log')
        }}>
            Today's Symptom Tracker Complete!
        </Button>
    )
}

const styles = StyleSheet.create({
    PageContainer:{
        marginTop:16,
        marginBottom:32,
        flex:1,
        flexDirection: 'column',
        alignItems:'center',
        justifyContent: 'space-evenly'
    },
    titleText:{
        textAlign:'center'
    }
})