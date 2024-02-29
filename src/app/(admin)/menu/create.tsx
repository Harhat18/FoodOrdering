import { Alert, Image, StyleSheet, Text, TextInput, View } from "react-native";
import React, { useState } from "react";
import Button from "@/src/components/Button";
import { defaultPizzaImage } from "@/src/components/ProductlistItem";
import * as ImagePicker from "expo-image-picker";
import Colors from "@/src/constants/Colors";
import { Stack, useLocalSearchParams } from "expo-router";

const CreateProductScreen = () => {
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [errors, setErrors] = useState("");
  const [image, setImage] = useState<string | null>(null);

  const { id } = useLocalSearchParams();
  const isUpdating = !!id;

  const resetFields = () => {
    setName("");
    setPrice("");
  };

  const onValidateInput = () => {
    setErrors("");
    if (!name) {
      setErrors("Name is required");
      return false;
    }
    if (!price) {
      setErrors("Price is required");
      return false;
    }
    if (isNaN(parseFloat(price))) {
      setErrors("Price is not a number");
      return false;
    }
    return true;
  };

  const onSubmit = () => {
    if (isUpdating) {
      onUpdate();
    } else {
      onCreate();
    }
  };
  const onCreate = () => {
    if (!onValidateInput()) {
      return;
    }

    console.warn("button press create");
    resetFields();
  };

  const onUpdate = () => {
    if (!onValidateInput()) {
      return;
    }

    console.warn("button press update");
    resetFields();
  };

  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    console.log(result);

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };

  const onDelete = () => {
    console.warn("Delete");
  };
  const confirmDelete = () => {
    Alert.alert("Confirm", "Are you sure you want to delete this product", [
      { text: "Cancel" },
      { text: "Delete", style: "destructive", onPress: onDelete },
    ]);
  };

  return (
    <View style={styles.container}>
      <Stack.Screen
        options={{ title: isUpdating ? "Update Product" : "Create Product" }}
      />
      <Image
        source={{ uri: image || defaultPizzaImage }}
        style={styles.image}
      />
      <Text onPress={pickImage} style={styles.textButton}>
        Select Image
      </Text>
      <Text style={styles.label}>Name</Text>
      <TextInput
        placeholder="Name"
        style={styles.input}
        value={name}
        onChangeText={setName}
      />

      <Text style={styles.label}>Price ($)</Text>
      <TextInput
        placeholder="9.99"
        style={styles.input}
        keyboardType="numeric"
        value={price}
        onChangeText={setPrice}
      />

      <Text style={{ color: "red" }}>{errors}</Text>

      <Button onPress={onSubmit} text={isUpdating ? "Update" : "Create"} />
      {isUpdating && (
        <Text style={styles.textButton} onPress={confirmDelete}>
          Delete
        </Text>
      )}
    </View>
  );
};

export default CreateProductScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    padding: 10,
  },
  textButton: {
    alignSelf: "center",
    fontWeight: "bold",
    color: Colors.light.tint,
    marginVertical: 10,
  },
  image: {
    width: "50%",
    aspectRatio: 1,
    alignSelf: "center",
  },
  label: {
    color: "gray",
    fontSize: 16,
  },
  input: {
    backgroundColor: "white",
    padding: 10,
    borderRadius: 5,
    marginTop: 5,
    marginBottom: 20,
  },
});
