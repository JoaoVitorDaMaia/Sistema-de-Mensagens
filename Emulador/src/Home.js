// src/Home.js
import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";

export default function Home({ navigation }) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Escolha seu modo</Text>

      <TouchableOpacity
        style={styles.btn}
        onPress={() => navigation.navigate("LoginCliente")}
      >
        <Text style={styles.btnText}>Sou Cliente</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.btn}
        onPress={() => navigation.navigate("LoginAtendente")}
      >
        <Text style={styles.btnText}>Sou Atendente</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
    backgroundColor: "#f3f6fb",
  },
  title: { fontSize: 26, marginBottom: 40, fontWeight: "600" },
  btn: {
    width: "80%",
    backgroundColor: "#2b7cff",
    padding: 16,
    borderRadius: 12,
    marginVertical: 10,
  },
  btnText: { color: "#fff", textAlign: "center", fontSize: 16 },
});
