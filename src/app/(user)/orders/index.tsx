// import { FlatList } from 'react-native-gesture-handler';
import { FlatList } from "react-native";
import orders from "../../../../assets/data/orders";

import { Stack } from "expo-router";
import OrderListItem from "@/src/components/OrderListItems";

export default function OrdersScreen() {
  return (
    <>
      <Stack.Screen options={{ title: "Orders" }} />
      <FlatList
        data={orders}
        contentContainerStyle={{ gap: 10, padding: 10 }}
        renderItem={({ item }) => <OrderListItem order={item} />}
      />
    </>
  );
}
