export declare const DEFAULT_REPLACER_TYPE = "REACTOTRON_RESTORE_STATE";
export default function reactotronReducer(rootReducer: Function, actionName?: string): (state: any, action: {
    type: string;
    state?: any;
}) => any;
