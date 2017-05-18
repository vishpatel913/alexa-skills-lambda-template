
# Alexa Skills Template
[Link to the video](https://drive.google.com/drive/folders/0B5189b8eE2iOUjFpRWY3cmJKcXc)...   
This walkthrough and accompanying video will take you through as simple as possible an Alexa Skill that doesn't involve the words 'Hello' or 'World'.      

Please feel free to do pull requests for any errors in this walkthrough or in the video. We would really appreciate if you did.      

![structure](https://github.com/vishpatel7/alexa-lambda-template/blob/master/img/structure-diagram.png)      

This is the structure of our Alexa Skill (don't worry if you don't have an Amazon Echo, [echosim.io](www.echosim.io) will work just fine for our purposes).      

First things first    
## Step 1. Sign up for everything     

In order to follow this you will need to sign up to Amazon Developers Console and AWS. You will need to give real phone number and real credit/debit card details in order to use these services. Amazon will not charge you unless you deliberately choose services for which you agree to be charged. Here is what is in their [free tier](https://aws.amazon.com/free/). Its a pain but I heartily encourage you to go through it anyway as its pretty cool stuff. Wanted to be upfront about it. Best use your same amazon account for them all. If you don't have amazon account you can make one as part of sign up process.      

Here is link to sign up for [Amazon Developers Console](https://developer.amazon.com/) click Sign In in top right hand corner.    

Here is link to sign up for [AWS](https://aws.amazon.com/console/) click Sign in to console in top right hand corner.     


Now all that is taken care of lets get going.    


## Step 2. Create Alexa Skill      
Go to [developer.amazon.com](www.developer.amazon.com) [01:19]

Click on Sign In (top right hand corner) [01:25]

Click on Alexa [01:32]     

Click on Alexa Skills Kit > Get Started [01:33]     

Click on Add New Skill [01:37]     

Change the language to English UK if you're using UK amazon account (likelihood you are!) It will not work if you choose English US with a UK based Amazon account. [01:41]


Give your skill a name, an invocation name ('example' if you're following strictly). [01:45]

Click Next


## Step 3. Create Interaction Model    

The  interaction model is where you configure the 'front-end' of your app. Here's documentation if you wish to peruse [Interaction Model Documentation](https://developer.amazon.com/public/solutions/alexa/alexa-skills-kit/docs/alexa-skills-kit-interaction-model-reference) [02:15]

  We are going to have one intent which has one slot. The intent is going to be 'tell' and the slot we're calling 'params'. This is going to be a custom type. [02:19] 

  ```
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
```

Next we need to define our CUSTOM type. Click Add and add  [03:18]   


```
funny      
fact      
```


Finally we want to add our sample utterances so Alexa knows what to expect. [03:46]
<code>    

```
tell me a {Params}      
tell a {Params}      
tell us a {Params}      
tell {Params}      
```
</code>    

Click Save

Click Next

## Step 4. Create Lambda      
In new tab go to  
[AWS Lambda](https://aws.amazon.com/lambda/) [04:39]

Sign in        

Create a Lambda [04:45]

Select Blank Function [04:53]

Choose Alexa Skills Kit in Configure Triggers [04:57]  
(note if you don't see this option please change your location in top right hand corner to N.Virginia.)
Name your lambda [05:05] 

Choose Node.js as Runtime

Set existing role to lambda_basic_execution [05:33]

Click Next

Click Create function [05:51]

Copy the ARN number from top right hand corner and paste into the configuration page on Alexa Skills tab [05:58]

Open up two windows in your text editor. One will be for the sample json to examine and one will be write your lambda code.  

To see the sample JSON go to Alexa Skills > Test. [07:24]  In Service Simulator enter 
<code>
tell me a fact
</code>
And click the 'Ask...' button
Copy the Lambda Request JSON which appears. (Lambda Response should give you an error). [07:51]

In your Lambda Atom paste the following code. [12:42]    

```
exports.handler = (event, context) => {    
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

```
Paste the code into your AWS Lambda browser window. [12:50]

Click on Save.  


## Step 4. Test your skill    
Copy your JSON from your text editor and then click Actions > Configure Test Event. [12:54]
Paste over the sample template with your copied JSON.    

Click Save and Test. [13:21]     

Go to Alexa Skills kit in browser [13:43]

In Service Simulator enter     
```    
tell me a fact    
```    
Click 'Ask....'    

Your Lambda response will hopefully be a recognizable JSON.    

next try out     
```    
tell me a funny    
```    

Click 'Ask....'    


## Step 5. Test it for realsies    
Go to [echosim.io](www.echosim.io) [14:35] 

  Log in with the same amazon account you used to build the skill.    

  Change the language to EN-GB      

  Hold down space bar and say    
  <i>Ask example tell me a funny</i>    

  Please goodness it says something back to you! If not feel free to reach out for help.       
