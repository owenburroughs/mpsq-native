import * as React from 'react'
import { View } from 'react-native'
import { Text , Divider} from 'react-native-paper'
import { StyleSheet } from 'react-native'

export const InstructionsPage = (props)=>{

    return(
        <View style={{padding:16}} >
            <Text variant="bodyLarge" style={styles.paragraph}>
            The Maudsley PMDD Symptom Questionaire
            (MPSQ) is an app to aid in the diagnosis 
            of Premenstrual Dysphoric Disorder (PMDD). 
            This app should ONLY be used if directed 
            to do so by a physician.
            </Text>
            <Text variant="bodyLarge" style={styles.paragraph}>
            Use the app to record your symptoms once per day for
            at least two full menstrual cycles. It is okay to
            miss days, as long as you are recording your symptoms
            regularly.
            </Text>
            <Text variant="bodyLarge" style={styles.paragraph}>
            After logging your symptoms for at least two menstrual
            cycles, use the "Share Symptom Logs" button in the 
            "Previous Logs" menu to send your symptom logs to your
            physician (usually by email).
            </Text>
            <Divider />
            <Text variant="bodySmall" style={styles.credits}>
            The MPSQ is a research project of the Female Hormone Clinic
            at Maudsley Hospital, and was developed through a training grant from
            the UK Medical Research Council (MR/W006820/1).
            </Text>
            <Text variant="bodySmall" style={styles.credits}>
            Please address any queries about the app to 
            owen.burroughs@kcl.ac.uk.
            Please address any queries about your symptoms to your physician.
            </Text>
        </View>
    )
}

const styles = StyleSheet.create({
    paragraph:{
        marginBottom:12
    },
    credits:{
        marginTop:12
    }
})