// /**
//  * @format
//  */

import { AppRegistry } from "react-native";
// import App from "./App";
// import { name as appName } from "./app.json";
import App from "./app/index";

AppRegistry.registerComponent("ShittyMatch", () => App);

console.ignoredYellowBox = [
  "Warning: componentWillMount is deprecated",
  "Warning: componentWillReceiveProps is deprecated",
  "Warning: componentWillUpdate is deprecated",
  "Warning: isMounted(...) is deprecated"
];
