export const mpsqSurveyJson = {
    "questions": [
      //Menstrual Phase
      {
        "model": "date",
        "name" : "date"
      },
      {
        "model" : "menstrualPhase",
         "name" : "menstrualPhase",
         "title" : "Are you currently menstruating?"
       },
       {
        "model": "text",
        "headline" : " Please evaluate your symptoms today on a scale from 1-5.",
        "body":  '1-	I have not experienced this symptom today\n2-	This symptom has been minimal today\n3-	This symptom has been mild today\n4-	This symptom has been moderate today\n5-	This symptom has been extreme today'
      },
      //Mood Swings
      {
       "model" : "mpsqSymptomScale",
        "name" : "moodSwings",
        "title" : "Mood Swings"
      },
      //irritability
      {
        "model" : "mpsqSymptomScale",
          "name" : "irritability",
          "title" : "Irritability/Anger"
        },
      //Depressed Mood
      {
        "model" : "mpsqSymptomScale",
          "name" : "depressed",
          "title" : "Depressed Mood"
        },
      
        //Anxiety
      {
        "model" : "mpsqSymptomScale",
          "name" : "anxiety",
          "title" : "Anxiety"
        },
      //Tiredness
      {
        "model" : "mpsqSymptomScale",
          "name" : "tiredness",
          "title" : "Tiredness"
        },
        //Joint Pain
      {
        "model" : "mpsqSymptomScale",
          "name" : "jointPain",
          "title" : "Joint Pain"
        },
        //Overeating
      {
        "model" : "mpsqSymptomScale",
          "name" : "overeating",
          "title" : "Overeating"
        },
        //Increased Sleep
      {
        "model" : "mpsqSymptomScale",
          "name" : "increasedSleep",
          "title" : "Increased Sleep"
        },
        //Breast Tenderness
      {
        "model" : "mpsqSymptomScale",
          "name" : "breastTenderness",
          "title" : "Breast Tenderness"
        },
        //Extremety Swelling
      {
        "model" : "mpsqSymptomScale",
          "name" : "extremetySwelling",
          "title" : "Swelling of the Extremeties"
        },
        //Poor Concentration
      {
        "model" : "mpsqSymptomScale",
          "name" : "poorConcentration",
          "title" : "Poor Concentration"
        },
        //Forgetfullness
      {
        "model" : "mpsqSymptomScale",
          "name" : "forgetfullness",
          "title" : "Forgetfullness"
        },
        //Part II Text
        {
          "model": "text",
          "headline" : "Evaluate how severely your symptoms have disrupted the following aspects of your life:",
          "body":  '1-	No disruption today\n2-	Disruption has been minimal today\n3-	Disruption has been mild today\n4-	Disruption has been moderate today\n5-	Disruption has been extreme today'
        },
        //Family Life
      {
        "model" : "mpsqSymptomScale",
          "name" : "familyLife",
          "title" : "Family Life"
        },
        //Social Life
      {
        "model" : "mpsqSymptomScale",
          "name" : "socialLife",
          "title" : "Social Life"
        },
        //Educational Life
      {
        "model" : "mpsqSymptomScale",
          "name" : "educationalLife",
          "title" : "Educational Life (if applicable)"
        },
        //Occupational Life
      {
        "model" : "mpsqSymptomScale",
          "name" : "occupationalLife",
          "title" : "Occupational Life (if applicable)"
        },
    ],

    "questionModels":[
      //main mpsq symptom 1-5
      {
        "id": "mpsqSymptomScale",
        "type": "rating",
        "buttons":[
          {
            "value" : 1,
            "label": "1"
          },
            {
              "value" : 2,
              "label": "2"
            },
            {
              "value" : 3,
              "label": "3",
            },
            {
              "value" : 4,
              "label": "4",
            },
            {
              "value" : 5,
              "label":"5",
            }
        ]
      },
      //radio buttons for phase of menstrual cycle
      {
        "id":"menstrualPhase",
        "type": "radio",
        "options": [
            {
              "value": "bleeding",
              "title": "Yes, Bleeding"
            },
            {
              "value": "spotting",
              "title": "Yes, Spotting"
            },
            {
              "value": "no",
              "title": "No"
            }
        ]
      },
    {
      "id":"text",
      "type":"text"
    }]
  };