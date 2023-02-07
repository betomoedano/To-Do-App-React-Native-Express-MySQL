import * as React from "react";
import { View, Text, StyleSheet, Pressable } from "react-native";
import { Feather } from "@expo/vector-icons";

function CheckMark({ completed }) {
  return (
    <Pressable
      style={[
        styles.checkMark,
        { backgroundColor: completed === 0 ? "#E9E9EF" : "#0EA5E9" },
      ]}
    ></Pressable>
  );
}

export default function Task({ id, title, shared_with_id, completed }) {
  return (
    <View style={[styles.container]}>
      <View style={styles.containerTextCheckBox}>
        <CheckMark completed={completed} />
        <Text style={styles.text}>{title}</Text>
      </View>
      {shared_with_id !== null ? (
        <Feather name="users" size={20} color="#383839" />
      ) : (
        <Feather name="share" size={20} color="#383839" />
      )}
    </View>
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
});
