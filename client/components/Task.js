import * as React from "react";
import {
  View,
  Text,
  StyleSheet,
  Pressable,
  TouchableOpacity,
} from "react-native";
import { Feather } from "@expo/vector-icons";

function CheckMark({ id, completed, toggleTodo }) {
  async function toggle() {
    const response = await fetch(`http://localhost:8080/todos/${id}`, {
      headers: {
        "x-api-key": "abcdef123456",
        "Content-Type": "application/json",
      },
      method: "PUT",
      body: JSON.stringify({
        value: completed ? 0 : 1,
      }),
    });
    const data = await response.json();
    toggleTodo(id);
    console.log(data);
  }

  return (
    <Pressable
      onPress={toggle}
      style={[
        styles.checkMark,
        { backgroundColor: completed === 0 ? "#E9E9EF" : "#0EA5E9" },
      ]}
    ></Pressable>
  );
}

export default function Task({
  id,
  title,
  shared_with_id,
  completed,
  clearTodo,
  toggleTodo,
}) {
  const [isDeleteActive, setIsDeleteActive] = React.useState(false);
  async function deleteTodo() {
    const response = await fetch(`http://localhost:8080/todos/${id}`, {
      headers: {
        "x-api-key": "abcdef123456",
      },
      method: "DELETE",
    });
    clearTodo(id);
    console.log(response.status);
  }

  return (
    <TouchableOpacity
      onLongPress={() => setIsDeleteActive(true)}
      onPress={() => setIsDeleteActive(false)}
      activeOpacity={0.8}
      style={[styles.container]}
    >
      <View style={styles.containerTextCheckBox}>
        <CheckMark id={id} completed={completed} toggleTodo={toggleTodo} />
        <Text style={styles.text}>{title}</Text>
      </View>
      {shared_with_id !== null ? (
        <Feather name="users" size={20} color="#383839" />
      ) : (
        <Feather name="share" size={20} color="#383839" />
      )}
      {isDeleteActive && (
        <Pressable onPress={deleteTodo} style={styles.deleteButton}>
          <Text style={{ color: "white", fontWeight: "bold" }}>x</Text>
        </Pressable>
      )}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: 14,
    borderRadius: 21,
    marginBottom: 10,
    backgroundColor: "white",
  },
  containerTextCheckBox: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    flexGrow: 1,
  },
  text: {
    fontSize: 16,
    fontWeight: "600",
    color: "#383839",
    letterSpacing: -0.011 * 16, // 16 = baseFontSize
    flexShrink: 1,
    marginHorizontal: 8,
  },
  checkMark: {
    width: 20,
    height: 20,
    borderRadius: 7,
  },
  deleteButton: {
    position: "absolute",
    right: 0,
    top: -6,
    width: 20,
    height: 20,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#ef4444",
    borderRadius: 10,
  },
});
