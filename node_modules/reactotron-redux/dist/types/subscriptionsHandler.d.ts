export default function createSubscriptionHandler(reactotron: any, onReduxStoreCreation: (func: () => void) => void): {
    sendSubscriptions: () => void;
    sendSubscriptionsIfNeeded: () => void;
    setSubscriptions: (subs: string[]) => void;
};
