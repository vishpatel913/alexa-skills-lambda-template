This walkthrough and accompanying video will take you through as simple as possible an Alexa Skill that doesn't involve the words 'Hello' or 'World'.
Please feel free to do pull requests for any errors in this walkthrough or in the video. We would really appreciate if you did.
Image of the app structure
This is the structure of our Alexa Skill (don't worry if you don't have an Amazon Echo, [echosim.io](www.echosim.io) will work just fine for our purposes).
First things first
## Step 1. Sign up for everything
In order to follow this you will need to sign up to Amazon Developers Console and AWS. You will need to give real phone number and real credit card details in order to use these services. Amazon will not charge you unless you deliberately choose services for which you agree to be charged. Here is what is in their [free tier](https://aws.amazon.com/free/). Its a pain but I heartily encourage you to go through it anyway as its pretty cool stuff. Wanted to be upfront about it. Best use your same amazon account for them all. If you don't have amazon account you can make one as part of sign up process.
Here is link to sign up for [Amazon Developers Console](https://developer.amazon.com/) click Sign In in top right hand corner.
Here is link to sign up for [AWS](https://aws.amazon.com/console/) click Sign in to console in top right hand corner.
Now all that is taken care of lets get going.
## Step 2. Create Alexa Skill  
Go to [developer.amazon.com](www.developer.amazon.com)
Click on Sign In (top right hand corner)  
  Click on Alexa  
  Click on Alexa Skills Kit > Get Started  
  Click on Add New Skill  
  Change the language to English UK if you're using UK amazon account (likelihood you are!) It will not work if you choose English US with a UK based Amazon account.
  Give your skill a name, an invocation name ('example' if you're following strictly).
## Step 3. Create Interaction Model
  Th  interaction model is where you configure the 'front-end' of your app. Here's documentation if you wish to peruse [Interaction Model Documentation](https://developer.amazon.com/public/solutions/alexa/alexa-skills-kit/docs/alexa-skills-kit-interaction-model-reference)
  We are going to have one intent which has one slot. The intent is going to be 'tell' and the slot we're calling 'params'. This is going to be a custom type.
  <code>
{  
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
}  
</code>  
Next we need to define our CUSTOM type. Click Add and add
<code>
funny  
fact  
</code>
Finally we want to add our sample utterances so Alexa knows what to expect.  
<code>
tell me a {Params}  
tell a {Params}  
tell us a {Params}  
tell {Params}  
</code>
## Step 4. Create Lambda  
In new tab go to
[AWS Lambda](https://aws.amazon.com/lambda/)  
Sign in    
Create a Lambda    
Name your lambda  
Set existing role to lambda_basic_execution  
Copy the ARN number from top right hand corner and paste into the configuration page on Alexa Skills tab    
In your Lambda copy the following code.
<code>
<c/ode>
rts.handler = (event, context) => {
  switch(event.request.intent.slots.Params.value) {
    case "funny":
      context.succeed(
          generateResponse("What is the most used language in development? ..... Profanity")
          )
        break;
    case "fact":
      context.succeed(
          generateResponse("He drinks.")
          )
        break;
  }
};
generateResponse = (outputText) => {
  return {
    response: {
      outputSpeech: {
        type: "PlainText",
        text: outputText
      }
    }
  }
}
