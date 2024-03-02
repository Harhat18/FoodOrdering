import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from "@react-navigation/native";
import { Stack } from "expo-router";
import { useColorScheme } from "@/components/useColorScheme";
import CartProvider from "@/providers/CartProvider";
import AuthProvider from "@/providers/AuthProvider";
import QueryProvider from "../providers/QueryProvider";
import StripeProvider from "@stripe/stripe-react-native";

export function RootLayoutNav() {
  const colorScheme = useColorScheme();

  return (
    <ThemeProvider value={colorScheme === "dark" ? DarkTheme : DefaultTheme}>
      <StripeProvider
        publishableKey={process.env.EXPO_PUBLIC_STRIPE_PUBLISHABLE_KEY || ""}
      >
        <QueryProvider>
          <AuthProvider>
            <CartProvider>
              <Stack>
                <Stack.Screen name="(admin)" options={{ headerShown: false }} />
                <Stack.Screen name="(user)" options={{ headerShown: false }} />
                <Stack.Screen name="(auth)" options={{ headerShown: false }} />r
                <Stack.Screen name="cart" options={{ presentation: "modal" }} />
              </Stack>
            </CartProvider>
          </AuthProvider>
        </QueryProvider>
      </StripeProvider>
    </ThemeProvider>
  );
}
