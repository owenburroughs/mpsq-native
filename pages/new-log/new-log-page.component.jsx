import * as React from 'react'
import { Survey } from '../../components/survey/survey.component.jsx';
import { SurveyContext, SurveyContextProvider } from '../../contexts/survey-context.jsx';
import { mpsqSurveyJson } from '../../Surveys/mpsq.js';
import { v4 as uuid } from 'uuid';
import { StyleSheet, View, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';

export default function NewLogPage(){

    return(
    <View style={styles.container}>
        <ScrollView style={styles.scrollView}>
        <SurveyContextProvider>
          <Survey json={mpsqSurveyJson} onValueChange={onSurveyUpdate} key={uuid()}/>
        </SurveyContextProvider>
        </ScrollView>
    </View>
    )
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
      flexDirection:'column',
      alignItems:'center',
      flexGrow:1
    },
    scrollView:{
      width:'100%',
      flex:1,
      flexGrow: 1
    }
  });
  
  const onSurveyUpdate = (value) =>{
    console.log(value)
  }