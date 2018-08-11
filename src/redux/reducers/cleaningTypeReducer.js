import { CLEANING_TYPE_ACTIONS } from "../actions/cleaningTypeActions";

const cleaningType = (state = [], action) => {
    switch (action.type) {
      case CLEANING_TYPE_ACTIONS.STORE:
        return action.payload
      default:
        return state;
    }
  };


export default cleaningType