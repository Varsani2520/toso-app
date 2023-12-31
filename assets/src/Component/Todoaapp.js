import { Button, Text, TextInput, View } from "react-native";
import React, { useState } from "react";

export default function Todoaapp() {
  const [newTodo, setNewTodo] = useState("");
  const [todos, setTodos] = useState([]);

  const addTodo = () => {
    if (newTodo.trim() !== "") {
      setTodos([...todos, { id: Date.now(), content: newTodo }]);
      setNewTodo("");
    }
  };
  return (
    <View style={{ margin: 20 }}>
      <TextInput
        style={{
          height: 40,
          borderColor: "gray",
          borderWidth: 1,
          marginBottom: 10,
        }}
        placeholder="Enter a new todo"
        onChangeText={(text) => setNewTodo(text)}
        value={newTodo}
      />
      <Button title="add" onPress={addTodo} />
    </View>
  );
}
