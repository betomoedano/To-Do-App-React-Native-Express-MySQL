import { useEffect, useState } from "react";
import { FlatList, SafeAreaView, StyleSheet, Text, View } from "react-native";

export default function App() {
  const [todos, setTodos] = useState([]);

  useEffect(() => {
    fetchTodos();
  }, []);

  async function fetchTodos() {
    const response = await fetch("http://localhost:8080/todos/2", {
      headers: {
        "x-api-key": "abcdef123456",
      },
    });
    const data = await response.json();
    setTodos(data);
  }

  return (
    <SafeAreaView>
      <FlatList
        data={todos}
        contentContainerStyle={{
          padding: 15,
        }}
        keyExtractor={(todo) => todo.id}
        renderItem={({ item }) => (
          <View>
            <Text>ID: {item.id}</Text>
            <Text>Task: {item.title}</Text>
            <Text>Shared with: {item.shared_with_id}</Text>
            <Text>
              Status: {item.completed === 0 ? "Incompleted" : "Completed"}
            </Text>
          </View>
        )}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
