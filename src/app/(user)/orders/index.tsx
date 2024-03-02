// import { FlatList } from 'react-native-gesture-handler';
import { ActivityIndicator, FlatList, Text } from "react-native";
import OrderListItem from "@/components/OrderListItems";
import { useMyOrderList } from "@/api/orders";

export default function OrdersScreen() {
  const { data: orders, error, isLoading } = useMyOrderList();

  if (isLoading) {
    return <ActivityIndicator />;
  }

  if (error) {
    return <Text>Failed to fetch</Text>;
  }
  return (
    <>
      <FlatList
        data={orders}
        contentContainerStyle={{ gap: 10, padding: 10 }}
        renderItem={({ item }) => <OrderListItem order={item} />}
      />
    </>
  );
}
