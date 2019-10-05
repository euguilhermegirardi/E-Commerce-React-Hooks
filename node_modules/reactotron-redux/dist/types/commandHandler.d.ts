import { Reactotron } from "reactotron-core-client";
import { PluginConfig } from "./pluginConfig";
export default function createCommandHandler(reactotron: Reactotron, pluginConfig: PluginConfig, onReduxStoreCreation: (func: () => void) => void): ({ type, payload }: {
    type: string;
    payload?: any;
}) => void;
