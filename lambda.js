/* Default signiture for wrapping Lambda function  */
exports.handler = (event, context) => {
  try {
    //switch statement for multiple intents
    switch (event.request.intent.name) {
        //replace tell in first case with your intent name
      case "tell":
        //switch statement for the slots
        switch (event.request.intent.slots.Params.value) {
            //replace cases with slot values
          case "funny":
            //on success generate a response
            context.succeed(generateResponse("What is the most used language in development? ..... Profanity"));
            break;

          case "fact":
            context.succeed(generateResponse("He drinks."));
            break;
        }
        break;

      default:
        //can use default response as a custom fail message using .succeed
        throw "Invalid intent";
    }
  } catch (error) {
    //try catch for error handling
    context.fail(`Exception: ${error}`);
  }
};

//generate response helper function
generateResponse = (outputText) => {
  return {
    response: {
      outputSpeech: {
        type: "PlainText",
        text: outputText
      }
    }
  };
};


//the intent schema used in the developer console, for referencing
var intentSchema = {
  "intents": [
    {
      "slots": [
        {
          "name": "Params",
          "type": "CUSTOM"
        }
      ],
      "intent": "tell"
    }
  ]
};
