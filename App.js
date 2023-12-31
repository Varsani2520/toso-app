import React, { useState, useEffect } from "react";
import { View, TextInput, Button, Text, FlatList, Image } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";

const App = () => {
  const [todos, setTodos] = useState([]);
  const [newTodo, setNewTodo] = useState("");
  const [editingTodo, setEditingTodo] = useState(null);

  useEffect(() => {
    loadTodos();
  }, []);

  useEffect(() => {
    saveTodos();
  }, [todos]);

  const loadTodos = async () => {
    try {
      const storedTodos = await AsyncStorage.getItem("todos");
      if (storedTodos !== null) {
        setTodos(JSON.parse(storedTodos));
      }
    } catch (error) {
      console.error("Error loading todos from AsyncStorage:", error);
    }
  };

  const saveTodos = async () => {
    try {
      await AsyncStorage.setItem("todos", JSON.stringify(todos));
    } catch (error) {
      console.error("Error saving todos to AsyncStorage:", error);
    }
  };

  const addTodo = () => {
    if (newTodo.trim() !== "") {
      const newTodoItem = { id: Date.now(), content: newTodo };
      setTodos([...todos, newTodoItem]);
      setNewTodo("");
    }
  };

  const deleteTodo = async (id) => {
    const updatedTodos = todos.filter((todo) => todo.id !== id);
    setTodos(updatedTodos);
  };

  const editTodo = (id) => {
    setEditingTodo(id);
    const todoToEdit = todos.find((todo) => todo.id === id);
    setNewTodo(todoToEdit.content);
  };

  const updateTodo = () => {
    if (newTodo.trim() !== "") {
      const updatedTodos = todos.map((todo) =>
        todo.id === editingTodo ? { ...todo, content: newTodo } : todo
      );
      setTodos(updatedTodos);
      setNewTodo("");
      setEditingTodo(null);
    }
  };

  return (
    <View style={{ margin: 20, marginTop: 50 }}>
      {/* Image at the top */}
      <Image
        source={{
          uri: "https://t4.ftcdn.net/jpg/02/18/12/59/360_F_218125902_9k6teJpNNQCcg4YgMI3HypyTUNMCRkdR.jpg",
        }}
        style={{ height: 100, width: "100%", marginBottom: 20 }}
        resizeMode="cover"
      />

      {/* Main Content */}
      <TextInput
        style={{
          height: 40,
          borderColor: "gray",
          borderWidth: 1,
          marginBottom: 10,
          paddingLeft: 10,
          backgroundColor: "#fff", // White background for TextInput
        }}
        onChangeText={(text) => setNewTodo(text)}
        value={newTodo}
        placeholder="Enter a new todo"
      />
      <Button title="Add" onPress={addTodo} />
      <FlatList
        data={todos}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              marginVertical: 5,
              backgroundColor: "#d3d3d3", // Gray background for FlatList item
              padding: 10,
              borderRadius: 5,
            }}
          >
            <Text>{item.content}</Text>
            <View style={{ flexDirection: "row" }}>
              {/* Edit Icon */}
              <Icon
                name="pencil-outline"
                size={24}
                color="blue"
                onPress={() => editTodo(item.id)}
              />
              {/* Delete Icon */}
              <Icon
                name="delete-outline"
                size={24}
                color="red"
                onPress={() => deleteTodo(item.id)}
              />
            </View>
          </View>
        )}
      />
      {editingTodo && (
        <View style={{ flexDirection: "row", marginTop: 10 }}>
          <Button title="Update" onPress={updateTodo} />
          <Button title="Cancel" onPress={() => setEditingTodo(null)} />
        </View>
      )}
    </View>
  );
};

export default App;
