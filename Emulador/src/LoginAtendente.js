// src/LoginAtendente.js
import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
} from "react-native";

const LOGIN_LOCAL = { cpf: "12345678900", senha: "1234" };

export default function LoginAtendente({ navigation }) {
  const [cpf, setCpf] = useState("");
  const [senha, setSenha] = useState("");

  function entrar() {
    if (cpf === LOGIN_LOCAL.cpf && senha === LOGIN_LOCAL.senha) {
      navigation.navigate("ChatAtendente", { nome: "Atendente" });
    } else {
      alert("CPF ou senha inválidos. (teste: 12345678900 / 1234)");
    }
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Login Atendente</Text>
      <TextInput
        style={styles.input}
        placeholder="CPF"
        value={cpf}
        onChangeText={setCpf}
      />
      <TextInput
        style={styles.input}
        placeholder="Senha"
        value={senha}
        onChangeText={setSenha}
        secureTextEntry
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
