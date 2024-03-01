import { ActivityIndicator, FlatList, Text, View } from "react-native";
import ProductListItem from "@components/ProductlistItem";
import { useProductList } from "@/src/api/products";

export default function MenuScreen() {
  // useEffect(() => {
  //   const fetchProducts = async () => {
  //     const { data, error } = await supabase.from("products").select("*");
  //     console.log("====================================");
  //     console.log(data);
  //     console.log(error);
  //     console.log("====================================");
  //   };
  //   fetchProducts();
  // }, []);
  const { data: products, error, isLoading } = useProductList();

  if (isLoading) {
    return <ActivityIndicator />;
  }

  if (error) {
    return <Text>Failed to fetch products</Text>;
  }
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
