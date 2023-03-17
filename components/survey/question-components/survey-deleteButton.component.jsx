import * as React from 'react';
import { Button } from 'react-native-paper';
import {StyleSheet, View, Text} from 'react-native';

const SurveyDeleteButton = (props) =>{

    return(
    <View style={styles.mainContainer}>
        <Button mode="contained" 
            onPress={() => {
                if(typeof props.onPress == 'function'){
                    props.onPress()
            }}}
            buttonColor='red'
        >
            Delete Survey
        </Button>
    </View>
    )
}

export default SurveyDeleteButton

const styles = StyleSheet.create({
    mainContainer:{
        alignItems:'center',
        paddingTop:25
    }
})