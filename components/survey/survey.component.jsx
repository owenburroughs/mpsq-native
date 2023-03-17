import * as React from 'react';
import { SafeAreaView, StyleSheet, Alert, View, FlatList } from 'react-native';
import { v4 as uuid } from 'uuid';
import SurveyRadio from './question-components/survey-radio.component';
import SurveyButton from './question-components/survey-button.component';
import SurveySubmitButton from './question-components/survey-submitButton.component';
import SurveyDeleteButton from './question-components/survey-deleteButton.component';
import { SurveyContext, SurveyContextProvider } from '../../contexts/survey-context';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import { Card, Text } from 'react-native-paper';

const Survey = (props) =>{

    let readOnly = props.readOnly != undefined ? props.readOnly : false

    const navigation = useNavigation();

    //rerender functionality for updating truancy
    const [rerender, setRerender] = React.useState(false);

    const  {surveyDataState, setSurveyData } = React.useContext(SurveyContext)
    
    let outputButtons = []

    React.useEffect(()=>{
        if(readOnly){
            setSurveyData(props.logData.item)
        }else{
            setSurveyData({date: new Date().toDateString()})
        }
    },[])

    //question models are just a set of preset values for different question types
    //iterate through each question
    let questionNumber = 0;
    for(let question of props.json.questions){
        //find the model used by the question and assign it to questionModel
        let questionModel = props.json.questionModels.find( e => {
        return e.id == question.model
        })
        
        if(questionModel){
            //add questions depending on the parent type of the model
            switch(questionModel.type){
                case "rating":
                    questionNumber++
                    outputButtons.push(
                    <Card mode="elevated" key={uuid()} style={styles.card}>
                    <SurveyButton 
                        title={questionNumber + ". " + question.title} 
                        key={uuid()} 
                        name={question.name}
                        options={questionModel.buttons}
                        disabled= {readOnly}
                        titleStyle={styles.titleStyle}
                        />
                    </Card>)
                break;

                case "radio":
                    questionNumber++
                    outputButtons.push(
                    <Card mode="elevated" key={uuid()} style={styles.card}>
                    <SurveyRadio 
                        title={questionNumber + ". " + question.title} 
                        key={uuid()} 
                        name={question.name}
                        options={questionModel.options}
                        value={surveyDataState[question.name]}
                        disabled= {readOnly}
                        titleStyle={styles.titleStyle}
                        />
                    </Card>)
                break;

                case "text":
                    outputButtons.push(
                        <Card mode="contained" key={uuid()} style={styles.card}>
                            <Text variant="headlineSmall" style={styles.titleStyle} key={uuid()}>{question.headline}</Text>
                            <Text variant="bodyMedium" style={styles.bodyStyle} key={uuid()}>{question.body}</Text>
                        </Card>
                    )
            }
        }
    }

    const onSurveySubmit = ()=>{
        console.log("Submitted!")

        let truantQuestions = []

        for(let question of props.json.questions){
            if(question.model != 'text'){
                if(!surveyDataState[question.name]){
                    truantQuestions.push(question.name)
                }
            }
        }
        
        let newSurveyData = surveyDataState
        newSurveyData.truantQuestions = truantQuestions
        newSurveyData.id = uuid()
        newSurveyData.date = new Date().toDateString()
        
        if(truantQuestions.length > 0){
            setSurveyData(newSurveyData)
            setRerender(!rerender); 
            console.log("Incomplete Survey")
        }else{
            setSurveyData({})
            let surveyDataString = JSON.stringify(newSurveyData)
            AsyncStorage.setItem(newSurveyData.id, surveyDataString)
            navigation.navigate('homepage')

        }
    }

    const deleteSurvey = (id)=>{
        Alert.alert(
            'Delete Item?',
            'Are you sure you want to delete this symptom log?',
            [
              { text: "Don't Delete", style: 'cancel', onPress: () => {} },
              {
                text: 'Discard',
                style: 'destructive',
                // If the user confirmed, then we dispatch the action we blocked earlier
                // This will continue the action that had triggered the removal of the screen
                onPress: () => {
                    AsyncStorage.removeItem(id)
                    navigation.navigate('Previous Logs Stack')
                },
              },
            ]
          );
    }

    if(!readOnly){
        outputButtons.push(
            <SurveySubmitButton key={uuid()} onSubmit={onSurveySubmit}/>
        )
    }else{
        outputButtons.push(
         <SurveyDeleteButton key={uuid()} onPress={()=> deleteSurvey(props.logData.item.id)}/>
        )
    }

    return(

        // <FlatList
        //     data={outputButtons}
        //     renderItem={(item) => <SurveyItem card={item} />}
        //     keyExtractor={item => item.id}
        // />
    <View style={styles.container} key={uuid()}>
            {outputButtons}  
    </View>
    )
}

// const SurveyItem = (item)=>{
//     console.log(item)
//     return(
//         <View>
//             {[item]}
//         </View>
//     )
// }



export {Survey};

const styles = StyleSheet.create({
    container: {
        borderBottomWidth: 0,
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'flex-start',
        transform:[{scaleX: 1}, {scaleY: 1}],
        alignSelf: 'stretch'
        
    },
    truant:{
        alignSelf: 'stretch',
        textAlign: 'center',
        backgroundColor: 'rgba(250, 128, 114, 0.4)',
    },
    titleStyle:{
        fontSize: 20,
        fontWeight: "500",
        textAlign:"center",
        lineHeight:25,
        flexDirection: 'row',
        textJustify: "interWord",
    },
    bodyStyle:{
        fontWeight: "220",
        fontSize: '12hw'
    },
    card:{
        flex:1,
        marginLeft: 16,
        marginRight:16,
        marginTop:16,
        paddingLeft:16,
        paddingRight:16,
        paddingBottom:10,
        paddingTop:6,
    }
  });