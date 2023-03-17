import * as React from 'react'
import { SafeAreaView, StyleSheet, View, ScrollView, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Text } from 'react-native-paper';
import { Button } from 'react-native-paper';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { List } from 'react-native-paper';
import { v4 as uuid } from 'uuid';
import { IconButton, MD3Colors } from 'react-native-paper';
import { mpsqSurveyJson } from '../../Surveys/mpsq';

import * as Sharing from 'expo-sharing';
import * as FileSystem from 'expo-file-system';


export default function PreviousLogsPage (){
    const navigation = useNavigation();

    const [logListItemComponents, SetLogListItemComponents] = React.useState([])

     const getLogData = async () =>{
        let keys = await AsyncStorage.getAllKeys()
        let previousLogData = await AsyncStorage.multiGet(keys)

        previousLogData.sort((a,b)=>{
            let aDate = Date.parse(JSON.parse(a[1]).date)
            let bDate = Date.parse(JSON.parse(b[1]).date)
            console.log(aDate)
            console.log(Date.parse(aDate))
            if(aDate > bDate){
                return -1;
            }
            else if(aDate < bDate){
                return 1;
            }else{
                return 0;
            }
        })

        let newLogListItemComponents

        newLogListItemComponents = []

        previousLogData.forEach((protoItem)=>{
            let item = JSON.parse(protoItem[1])

    
            if(item.date == undefined){
                item.date="No Date"
            }

            newLogListItemComponents.push(
                <List.Item
                    key={uuid()}
                    title={item.date}
                    //calendar icon
                    left={props =>  <List.Icon {...props} key={uuid()} icon="calendar"/>}
                    onPress={(e)=>{
                        navigation.navigate('view-log',{ 'logData':{item} })
                    }}
                />
            )
     })
     SetLogListItemComponents(newLogListItemComponents)
     return newLogListItemComponents
    }
     
    React.useEffect(()=>{
        navigation.addListener('focus', () => {
            getLogData()
          });
    },[])
    

    return(
        <View style={styles.PageContainer}>
            <ScrollView style={styles.LogsContainer}>
                {logListItemComponents}
            </ScrollView>
            <LogShareButton/>
        </View>

    )
}

const LogShareButton = ()=>{
    return (
        <Button 
            onPress={share} 
            key={uuid()} 
            title="Share"
            icon="share" 
            mode="contained"
            style={styles.ShareButton}
        >Share Symptom Logs</Button>
    );
}

const saveFile = async ()=>{
    return (
        await getLogsAsCSV().then(async (csv)=>{
        let directoryUri = FileSystem.documentDirectory;
        let fileUri = directoryUri + "MPSQ_Symptom_Export.csv";
        return FileSystem.writeAsStringAsync(fileUri, csv, { encoding: FileSystem.EncodingType.UTF8 }).then(
                    ()=> {return fileUri}
                );
        })
    )
};
    
const shareFile = async (fileUri) => {
    const canShare = await Sharing.isAvailableAsync();
    // Check if permission granted
    if (canShare) {
        try{
        await Sharing.shareAsync(fileUri).then( 
        )
        } catch(e) {
        console.error(e)
        }
    } else {
        Alert.alert("Please give sharing permission.")
}};


const share = async ()=>{
    await saveFile().then(shareFile)
}

const styles = StyleSheet.create({
    LogsContainer:{
    },
    ShareButton:{
        marginBottom:16,
        marginTop:16,
        marginLeft:16,
        marginRight:16,
    },
    PageContainer:{
        flex:1
    }
})

const getLogsAsCSV = async ()=>{
    let outputCSV =""
    const questions = mpsqSurveyJson.questions.filter(e => e.name).map(e => e.name)

    //add top row of CSV
    outputCSV += questions.join(",") + "\n"
    let csv = await AsyncStorage.getAllKeys().then(async (keys)=>{
        return AsyncStorage.multiGet(keys).then((res)=>{
            let logs = res.map((e)=>{return JSON.parse(e[1])})

            //iterate through the questions
            for(let log of logs){
            for(let question of questions){
                if(log[question]){
                    outputCSV += log[question] + ","
                }else{
                    outputCSV += ",,"
                }
            }
            outputCSV+='\n'
            }
            return(outputCSV)
        })
    })
    return(csv)
}