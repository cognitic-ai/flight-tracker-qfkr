import { Stack } from "expo-router";
import * as AC from "@bacons/apple-colors";
import { NativeStackNavigationOptions } from "@react-navigation/native-stack";

const AppleStackPreset: NativeStackNavigationOptions =
  process.env.EXPO_OS !== "ios"
    ? {}
    : {
        headerTransparent: true,
        headerShadowVisible: false,
        headerLargeTitleShadowVisible: false,
        headerLargeStyle: {
          backgroundColor: "transparent",
        },
        headerTitleStyle: {
          color: AC.label as any,
        },
        headerBlurEffect: "systemChromeMaterial",
        headerBackButtonDisplayMode: "default",
      };

export default function Layout() {
  return (
    <Stack screenOptions={AppleStackPreset}>
      <Stack.Screen
        name="index"
        options={{
          title: "Flight Tracker",
          headerLargeTitle: true,
        }}
      />
    </Stack>
  );
}
