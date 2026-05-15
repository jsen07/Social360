import { Stack } from "expo-router";
import useAuth from "../hooks/useAuth";
import "../global.css";
import { Amplify } from "aws-amplify";
import outputs from "../amplify_outputs.json";
import { ApolloClient, HttpLink, InMemoryCache } from "@apollo/client";
import { ApolloProvider } from "@apollo/client/react";
import { setContext } from "@apollo/client/link/context";
import { fetchAuthSession } from "aws-amplify/auth";
import ServiceUnavailableScreen from "../components/ServiceUnavailableScreen";
import { Provider } from "react-redux";
import { store } from "../store";

import {
  useFonts,
  IBMPlexSans_100Thin,
  IBMPlexSans_200ExtraLight,
  IBMPlexSans_300Light,
  IBMPlexSans_400Regular,
  IBMPlexSans_500Medium,
  IBMPlexSans_600SemiBold,
  IBMPlexSans_700Bold,
} from "@expo-google-fonts/ibm-plex-sans";

Amplify.configure(outputs);

const httpLink = new HttpLink({
  uri: "http://192.168.1.151:4000/graphql",
});

const authLink = setContext(async (_, { headers }) => {
  const session = await fetchAuthSession();
  const token = session.tokens?.idToken?.toString();
  // console.log(token);

  return {
    headers: {
      ...headers,
      Authorization: token ? `Bearer ${token}` : "",
    },
  };
});

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});

export default function Layout() {
  const [fontsLoaded] = useFonts({
    IBMPlexSans_100Thin,
    IBMPlexSans_200ExtraLight,
    IBMPlexSans_300Light,
    IBMPlexSans_400Regular,
    IBMPlexSans_500Medium,
    IBMPlexSans_600SemiBold,
    IBMPlexSans_700Bold,
  });
  if (!fontsLoaded) return null;
  return (
    <ApolloProvider client={client}>
      <Provider store={store}>
        <RootNavigator />
      </Provider>
    </ApolloProvider>
  );

  function RootNavigator() {
    const {
      authUser,
      profile,
      hasCompletedOnboarding,
      loading,
      isLoggedIn,
      isDBConnected,
    } = useAuth();

    if (loading) return null;
    // console.log(isDBConnected);
    if (!loading && !isDBConnected && isLoggedIn)
      return <ServiceUnavailableScreen />;

    return (
      <Stack
        screenOptions={{
          headerShown: false,
          animation: "fade_from_bottom",
        }}
      >
        <Stack.Protected guard={isLoggedIn && !hasCompletedOnboarding}>
          <Stack.Screen name="(onboarding)" />
        </Stack.Protected>
        <Stack.Protected guard={isLoggedIn && hasCompletedOnboarding}>
          <Stack.Screen name="(app)" />
        </Stack.Protected>

        <Stack.Protected guard={!isLoggedIn}>
          <Stack.Screen name="(auth)" />
        </Stack.Protected>
      </Stack>
    );
  }
}
