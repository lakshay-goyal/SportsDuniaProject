import { CALCULATE_PAYOUTS } from '../actions/payoutActions';

const initialState = {
  rate: 10,
  data: [],
};

const payoutReducer = (state = initialState, action) => {
  switch (action.type) {
    case CALCULATE_PAYOUTS:
      console.log('Payout Reducer - Received action:', action);
      console.log('Payout Reducer - Current state:', state);
      
      // Check if the payout already exists to avoid duplicates
      const newPayouts = action.payload.filter(
        newPayout => !state.data.some(existingPayout => existingPayout.articleId === newPayout.articleId)
      );
      
      console.log('Payout Reducer - New payouts to be added:', newPayouts);
      
      const updatedState = {
        ...state,
        data: [...state.data, ...newPayouts]
      };
      
      console.log('Payout Reducer - Updated state:', updatedState);
      return updatedState;
    default:
      return state;
  }
};

export default payoutReducer;

