import { PluginConfig } from "./pluginConfig";
export default function createCustomDispatch(reactotron: any, store: {
    dispatch: Function;
}, pluginConfig: PluginConfig): (action: any) => any;
