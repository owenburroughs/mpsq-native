import React, { createContext, useState } from "react";

// create context
const SurveyContext = createContext(null);


const SurveyContextProvider = ({ children }) => {
  // the value that will be given to the context
  const [surveyDataState, setSurveyDataState] = useState({});

  const setSurveyData = (data) =>{
    setSurveyDataState(data)
    console.log(data)
  }

  return (
    // the Provider gives access to the context to its children
    <SurveyContext.Provider value={{surveyDataState, setSurveyData}}>
      {children}
    </SurveyContext.Provider>
  );
};

export { SurveyContext, SurveyContextProvider};