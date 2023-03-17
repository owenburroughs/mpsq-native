import * as React from 'react';
import { SegmentedButtons, Text } from 'react-native-paper';
import { StyleSheet, View } from 'react-native';
import { SurveyContext } from '../../../contexts/survey-context';

const SurveyButton = (props) =>{
  let options
  const {
    surveyDataState,
    setSurveyData
  } = React.useContext(SurveyContext);

  //determine if question is truant
  let truantStyle={}
  if(surveyDataState.truantQuestions){
    if(surveyDataState.truantQuestions.find(e=>e==props.name)){
      console.log("truant")
      truantStyle = {
        backgroundColor: 'rgba(250, 128, 114, 0.4)',
      }
    }
  }

  //disable all options if mode is read only
  if(props.disabled){ 
    options=  props.options.map(e=> e = { ...e, disabled: true} )
  }else(
    options= props.options
  )

  const [value, setValue] = React.useState(surveyDataState[props.name]);

  return(
        <View style={[styles.container, truantStyle]}>
            <Text variant="headlineMedium" style={props.titleStyle}>{props.title}</Text>
            <SegmentedButtons
            value={value}
            style={styles.segmentedButton}
            onValueChange={(newValue)=>{
              setValue(newValue)
              let newSurveyData = surveyDataState
              newSurveyData[props.name] = newValue
              setSurveyData(newSurveyData)
            }}
            buttons={options}
        />
      </View>
    )
}
export default SurveyButton

const styles = StyleSheet.create({
    container: {
      //flex: 1
      alignItems: 'center',
      //marginBottom:25
    },
    segmentedButton:{
      transform:[{scaleX: 0.9}, {scaleY: 0.9}],
    }
});