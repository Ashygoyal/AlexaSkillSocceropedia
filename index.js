/* eslint-disable  func-names */
/* eslint-disable  no-console */

const Alexa = require('ask-sdk');

const GetNewFactHandler = {
  canHandle(handlerInput) {
    const request = handlerInput.requestEnvelope.request;
    return request.type === 'LaunchRequest'
      || (request.type === 'IntentRequest'
        && request.intent.name === 'GetNewFactIntent');
  },
  handle(handlerInput) {
    const factArr = data;
    const factIndex = Math.floor(Math.random() * factArr.length);
    const randomFact = factArr[factIndex];
    const speechOutput = GET_FACT_MESSAGE + randomFact;

    return handlerInput.responseBuilder
      .speak(speechOutput)
      .withSimpleCard(SKILL_NAME, randomFact)
      .getResponse();
  },
};

const HelpHandler = {
  canHandle(handlerInput) {
    const request = handlerInput.requestEnvelope.request;
    return request.type === 'IntentRequest'
      && request.intent.name === 'AMAZON.HelpIntent';
  },
  handle(handlerInput) {
    return handlerInput.responseBuilder
      .speak(HELP_MESSAGE)
      .reprompt(HELP_REPROMPT)
      .getResponse();
  },
};

const ExitHandler = {
  canHandle(handlerInput) {
    const request = handlerInput.requestEnvelope.request;
    return request.type === 'IntentRequest'
      && (request.intent.name === 'AMAZON.CancelIntent'
        || request.intent.name === 'AMAZON.StopIntent');
  },
  handle(handlerInput) {
    return handlerInput.responseBuilder
      .speak(STOP_MESSAGE)
      .getResponse();
  },
};

const SessionEndedRequestHandler = {
  canHandle(handlerInput) {
    const request = handlerInput.requestEnvelope.request;
    return request.type === 'SessionEndedRequest';
  },
  handle(handlerInput) {
    console.log(`Session ended with reason: ${handlerInput.requestEnvelope.request.reason}`);

    return handlerInput.responseBuilder.getResponse();
  },
};

const ErrorHandler = {
  canHandle() {
    return true;
  },
  handle(handlerInput, error) {
    console.log(`Error handled: ${error.message}`);

    return handlerInput.responseBuilder
      .speak('Sorry, an error occurred.')
      .reprompt('Sorry, an error occurred.')
      .getResponse();
  },
};

const SKILL_NAME = 'Socceropedia';
const GET_FACT_MESSAGE = 'Here\'s your fact: ';
const HELP_MESSAGE = 'You can say tell me a soccer fact, or, you can say exit... What can I help you with?';
const HELP_REPROMPT = 'What can I help you with?';
const STOP_MESSAGE = 'Goodbye!';

const data = [
  'Transfer Fee - When a player under contract to a club is traded (or transferred) to another club, the new club has to purchase the contract, often paying huge sums of money for it. This is the transfer fee, it goes to the selling club, not to the player.',
  'Timeout - The referee alone can stop the clock in soccer. Coaches are not permitted to call timeouts. A FIFA experiment with timeouts during the 1995 U-17 World Cup in Ecuador where coaches were allowed to call one 90-second timeout in each half, was not repeated.',
  'Own Goal - It is possible for a player to kick, or head, or deflect, the ball into his own goal. If he does so, the score counts for his opponents; and if the ball clearly would not have gone in without his intervention, then he, is listed as the scorer with the letters O.G. (for "own goal") after his name.',
  'Mark -  In man-to-man coverage the defender is said to mark, rather than guard the attacker. The closer he plays to him, the tighter the marking; the further away, the looser the marking.',
  'Fiftt Fifty Ball - A loose ball, or a badly placed pass, that is as near to a player of one team as it is to a player of the opposing team, allowing both an equal chance of controlling it.',
  'Dead Ball - When play is stopped and the ball is not moving, it is a dead ball. All free kicks, including penalty kicks, have to be taken from a dead i.e., stationary ball.',
  'Box - The box means the penalty area. Sometimes called the 18-yard box, to distinguish it from the goal area, which is the 6-yard box. The corresponding measurements are 16.5 meters and 5.5 meters.',
  'Channels - An area approximately 15 yards from the touchline.',
  'Decoy Run - Where a soccer player executes a run to draw attention from the intended play. Also known as creating space.',
  'Dummy - Any trick, technique or skill that unbalances or confuses an opponent and can send them the wrong way in order to gain an advantage',
  'Fakeover - A technique where a player looks as if they are to take the ball from their team mate who is in possession but they dont and just run past each other',
  'Flank - It refers to the 10 - 15 yards from the side lines, often where crosses come in from.',
  'Hollywood Ball - an ambitious pass that is only seen in the movies!',
  'Jockeying - delaying and holding up play, not diving in with a tackle but staying up right and preventing the advancement of the opponent.',
  'One Touch Soccer - It is, when players move the ball quickly and immediately when they receive it.',
  'Plyometrics - drills and exercises that develop explosiveness in players.',
  'Scouts - These are quite often volunteers that watch local junior and youth soccer for professional clubs to eye the talent and recommend them for academy trials.',
  'Shadow Play - playing soccer without opponents.',
  'Sweeper - A specific role on the field where a player will sit just in front or behind the defense',
  'Volley - refers to striking the ball before it lands. Its a difficult skill to master but is very powerful',
  'Advantage Law - A clause in the law that directs the referee to refrain from stopping play for a foul if a stoppage would benefit the team that committed the violation.',
  'Chest Trap - When a player uses his chest to slow down and control a ball in the air.',
  'Chip Pass - A pass lofted into the air from a player to a teammate.',
  'Cleats - The metal, plastic or rubber points in the bottom of a soccer/football shoe used to provide a player with traction.',
  'Crossbar - The horizontal beam that forms the top of a goal and sits on top of the two posts; it is 24 feet long and supported 8 feet above the ground.',
  'Deflection - The ricochet of a ball after it hits a player.',
  'Foot trap - The use of the bottom or sides of a shoe, by a player, to control a rolling or low-bouncing ball.',
  'Shinguards - Pads that strap onto the lower leg of a player, to protect the shins should he or she be kicked there.',
  'Wall Pass - A Give and go pass, or interpassing between two attacking players, where the player acting as the wall plays the ball first time and off at a similar angle at which the ball was received. The pass is usually made behind an opponent.',
  'Wings or Wingers - The outside forwards who play to the sides of the strikers and whose primary task is to provide them with accurate crossing passes so they can shoot at the goal; often the fastest players and best dribblers on a team.',
  
  
];

const skillBuilder = Alexa.SkillBuilders.standard();

exports.handler = skillBuilder
  .addRequestHandlers(
    GetNewFactHandler,
    HelpHandler,
    ExitHandler,
    SessionEndedRequestHandler
  )
  .addErrorHandlers(ErrorHandler)
  .lambda();
