import { useEffect, useState } from "react";
import { FlatList, SafeAreaView, StyleSheet } from "react-native";
import InputTask from "./components/InputTask";
import Task from "./components/Task";

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
    <SafeAreaView style={styles.container}>
      <FlatList
        data={todos}
        contentContainerStyle={styles.contentContainerStyle}
        keyExtractor={(todo) => todo.id}
        renderItem={({ item }) => <Task {...item} />}
      />
      <InputTask />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#E9E9EF",
  },
  contentContainerStyle: {
    padding: 15,
  },
});
