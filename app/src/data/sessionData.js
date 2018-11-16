// import { combineReducers } from 'redux';

// session data represents the cache for the current session, like fetched campaign data
// default schema
const schema = {
  sessionCampaigns: [],
  // sessionCharacters: [],
};

// constants
const constants = {
  ADD_SESSION_CHARACTER: 'ADD_SESSION_CHARACTER',
  ADD_SESSION_CAMPAIGN: 'ADD_SESSION_CAMPAIGN',
  REMOVE_SESSION_CAMPAIGN: 'REMOVE_SESSION_CAMPAIGN',
  UPDATE_SESSION_CAMPAIGN: 'UPDATE_SESSION_CAMPAIGN',
};

// actions
// const addSessionCharacter = (data) => ({ type: constants.ADD_SESSION_CHARACTER, data: data });
const addSessionCampaign = (data) => ({ type: constants.ADD_SESSION_CAMPAIGN, data: data });
const updateSessionCampaign = (data) => ({ type: constants.UPDATE_SESSION_CAMPAIGN, data: data });

// reducers
// const sessionCharacterReducer = (state, { type, data }) => {
//   switch (type) {
//     // add to list
//     case constants.ADD_SESSION_CHARACTER:
//       const previousSessionCharacters = state.slice();
//       previousSessionCharacters.push(data);
//       return previousSessionCharacters;

//     default:
//       return state || [];
//   }
// };
const sessionCampaignReducer = (state, { type, data }) => {
  switch (type) {
    // replace current list with given list
    case constants.UPDATE_SESSION_CAMPAIGN:
      return data || [];

    // add to list
    case constants.ADD_SESSION_CAMPAIGN:
      const previousSessionCampaigns = state.slice();
      previousSessionCampaigns.push(data);
      return previousSessionCampaigns;

    case constants.REMOVE_SESSION_CAMPAIGN:
    default:
      return state || [];
  }
};

// combined
const sessionData = {
  constants: constants,
  actions: {
    addSessionCampaign,
    updateSessionCampaign,
  },
  defaultState: Object.assign(schema, {

  }),
  reducer: {
    sessionCampaigns: sessionCampaignReducer,
    // sessionCharacters: sessionCharacterReducer,
  },
};

export default sessionData;

export {
  schema,
}
