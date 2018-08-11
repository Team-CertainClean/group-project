import { CLEANING_TYPE_ACTIONS } from "../actions/cleaningTypeActions";

const cleaningTypes = (state = [], action) => {
    switch (action.type) {
      case CLEANING_TYPE_ACTIONS.STORE:
        return action.payload
      default:
        return state;
    }
  };


export default cleaningTypes