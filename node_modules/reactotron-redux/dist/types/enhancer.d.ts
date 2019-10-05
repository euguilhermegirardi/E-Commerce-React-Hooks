import { Reactotron } from "reactotron-core-client";
import { PluginConfig } from "./pluginConfig";
export default function createEnhancer(reactotron: Reactotron, pluginConfig: PluginConfig, handleStoreCreation: () => void): (skipSettingStore?: boolean) => (createStore: any) => (reducer: any, ...args: any[]) => any;
