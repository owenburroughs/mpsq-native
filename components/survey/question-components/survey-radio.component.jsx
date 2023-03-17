import * as React from 'react';
import {StyleSheet, View} from 'react-native';
import { RadioButton, Text } from 'react-native-paper';
import { v4 as uuid } from 'uuid';
import { SurveyContext } from '../../../contexts/survey-context';

const SurveyRadio = (props) =>{

    //context to update the global survey data
    const {
        surveyDataState,
        setSurveyData
      } = React.useContext(SurveyContext);

    let truantStyle = {}

    //determine if question is truant
    if(surveyDataState.truantQuestions){
        if(surveyDataState.truantQuestions.find(e=>e==props.name)){
        console.log("truant")
        truantStyle = {
            backgroundColor: 'rgba(250, 128, 114, 0.4)',
            }
        }  
    }

    //internal state for selected button
    const [radioSelected, setRadioSelected] = React.useState(surveyDataState[props.name]);

    let output = []

    //Add options from passed props
    for(let option of props.options){
        output.push(  
        //Container for a single radio button item
        <View style={styles.buttonLineContainer} key={uuid()}>
            <View style={styles.buttonContainer} key={uuid()}>
                <RadioButton.Android
                    value={option.value}
                    key={uuid()}
                    disabled={props.disabled}
                />
            </View>
            <View style={styles.textContainer} key={uuid()}>
                <Text key={uuid()}>{option.title}</Text>
            </View>
        </View>
    )
    }

    return (
        <View style={[styles.mainContainer, truantStyle]}>
            <RadioButton.Group 
                onValueChange={newValue => {
                    setRadioSelected(newValue);
                    let newSurveyDataState = surveyDataState
                    newSurveyDataState[props.name] = newValue
                    setSurveyData(newSurveyDataState)
                    }
                } 
                value={radioSelected}
                key={uuid()}
                >
                <View style={{flex:1, alignContent:"stretch"}}>
                    <Text variant="headlineMedium" key={uuid()} style={props.titleStyle}>{props.title}</Text>
                </View>
                <View style={styles.buttonsContainer} key={uuid()}>
                    {output}
                </View>
            </RadioButton.Group>
        </View>
      );

}

export default React.memo(SurveyRadio)



const styles = StyleSheet.create({
    mainContainer:{
        alignItems:'stretch',
        flexDirection:'row',
        flex:1
    },
    buttonsContainer: {
        flexDirection: 'column',
        alignContent: 'center'
    },
    buttonLineContainer:{
        alignItems: "flex-start", 
        flexDirection:"row",
        flex:1
    },
    textContainer:{
        alignContent: 'stretch',
        textAlign:'center',
        marginTop:8,
        flex:1
    },
    buttonContainer:{
    },
    titleStyle:{
        fontSize: 20,
        fontWeight: 'bold',
        flex:1
    }
  });
  
 