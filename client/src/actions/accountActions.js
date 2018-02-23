export const CHANGE_ACCOUNT = 'CHANGE_ACCOUNT';
export const CHANGE_ACTION_TYPE = 'CHANGE_ACTION_TYPE';

export const changeAccount = accountId => ({
    type: CHANGE_ACCOUNT,
    accountId,
});

export const changeActionType = selectedAction => ({
    type: CHANGE_ACTION_TYPE,
    selectedAction,
});