import * as React from 'react';
import { Button } from 'react-native-paper';
import {StyleSheet, View} from 'react-native';

const SurveySubmitButton = (props) =>{

    return(
    <View style={styles.mainContainer}>
        <Button mode="contained" onPress={() => {
            if(typeof props.onSubmit == 'function'){
                props.onSubmit()
            }
        }}>
            Submit
        </Button>
    </View>
    )
}

export default SurveySubmitButton

const styles = StyleSheet.create({
    mainContainer:{
        alignItems:'center',
        paddingTop:25
    }
})