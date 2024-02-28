import { FlatList, Platform, StyleSheet, Text, View } from "react-native";
import React from "react";
import { StatusBar } from "expo-status-bar";
import { useCart } from "../providers/CartProvider";
import CartListItem from "../components/CartListItem";

const CartScreens = () => {
  const { items } = useCart();

  return (
    <View>
      <FlatList
        data={items}
        contentContainerStyle={{ padding: 10, gap: 10 }}
        renderItem={({ item }) => {
          <CartListItem cartItem={item} />;
        }}
      />
      <Text>CartScreens : {items.length}</Text>
      <StatusBar style={Platform.OS === "ios" ? "light" : "auto"} />
    </View>
  );
};

export default CartScreens;
