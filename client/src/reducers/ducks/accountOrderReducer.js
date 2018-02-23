import { CHANGE_ACCOUNT, CHANGE_ACTION_TYPE } from '../../actions/accountActions';

export function reducer(state = {}, action = {}) {
    switch (action.type) {
        case CHANGE_ACCOUNT:
            return { ...state, accountId: action.accountId };
        case CHANGE_ACTION_TYPE:
            return { ...state, selectedAction: action.selectedAction };
        default:
            return state;
    }
}