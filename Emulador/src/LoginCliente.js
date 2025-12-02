// src/LoginCliente.js
import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
} from "react-native";

export default function LoginCliente({ navigation }) {
  const [nome, setNome] = useState("");
  const [pedido, setPedido] = useState("");

  function entrar() {
    if (!nome.trim() || !pedido.trim()) return alert("Preencha nome e pedido.");
    navigation.navigate("ChatCliente", { nome, pedido });
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Entrar como Cliente</Text>
      <TextInput
        style={styles.input}
        placeholder="Seu nome"
        value={nome}
        onChangeText={setNome}
      />
      <TextInput
        style={styles.input}
        placeholder="Número do pedido"
        value={pedido}
        onChangeText={setPedido}
      />
      <TouchableOpacity style={styles.btn} onPress={entrar}>
        <Text style={styles.btnText}>Entrar</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, justifyContent: "center" },
  title: { fontSize: 22, marginBottom: 20 },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 12,
    marginBottom: 10,
    borderRadius: 10,
  },
  btn: { backgroundColor: "#2b7cff", padding: 14, borderRadius: 12 },
  btnText: { color: "#fff", textAlign: "center" },
});
