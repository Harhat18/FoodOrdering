import { FlatList, View } from "react-native";

import products from "@assets/data/products";
import ProductListItem from "@components/ProductlistItem";

export default function MenuScreen() {
  return (
    <FlatList
      data={products}
      numColumns={2}
      contentContainerStyle={{ gap: 10, padding: 10 }}
      columnWrapperStyle={{ gap: 10 }}
      renderItem={({ item }) => <ProductListItem product={item} />}
    />
  );
}
