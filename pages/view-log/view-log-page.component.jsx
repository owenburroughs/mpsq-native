import * as React from 'react'
import { Text } from 'react-native-paper'
import { mpsqSurveyJson } from '../../Surveys/mpsq.js';
import { v4 as uuid } from 'uuid';
import { StyleSheet, View, ScrollView } from 'react-native';

import { Survey } from '../../components/survey/survey.component'
import { SurveyContextProvider } from '../../contexts/survey-context'
import { useNavigation } from '@react-navigation/native';

export default function ViewLogPage(props){
   // const navigation = useNavigation();
    let params = props.route.params
    // let date = new Date(params.logData.item.date).toLocaleString()
    // let dateString = date.split(',')[0]

    return(
        <ScrollView>
        <SurveyContextProvider>
          <Survey 
                json={mpsqSurveyJson} 
                key={uuid()}
                readOnly={true}
                logData={params.logData}
            />
        </SurveyContextProvider>
        </ScrollView>
    )
}