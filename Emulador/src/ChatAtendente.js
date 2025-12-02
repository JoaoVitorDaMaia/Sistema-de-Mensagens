// src/ChatAtendente.js
import React, { useEffect, useRef, useState } from "react";
import {
  View,
  Text,
  FlatList,
  TextInput,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

export default function ChatAtendente({ route }) {
  const { nome } = route.params || { nome: "Atendente" };
  const [messages, setMessages] = useState([]);
  const [msg, setMsg] = useState("");
  const flatListRef = useRef(null);
  const ws = useRef(null);

  useEffect(() => {
    const WS_HOST = "10.0.2.2";
    const socket = new WebSocket(`ws://${WS_HOST}:3000`);

    socket.onopen = () => {
      console.log("conectado (atendente)");
      socket.send(
        JSON.stringify({ type: "role", role: "attendant", user: nome })
      );
    };

    socket.onmessage = (e) => {
      const data = JSON.parse(e.data);
      if (data.type === "history") {
        setMessages(data.messages);
        return;
      }
      if (data.type === "newMessage") {
        setMessages((prev) => [...prev, data.msg]);
      }
    };

    ws.current = socket;
    return () => socket.close();
  }, []);

  function enviar() {
    if (!msg.trim()) return;
    const payload = {
      type: "message",
      payload: {
        id: Date.now(),
        sender: "atendente",
        nome,
        texto: msg,
        time: new Date().toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        }),
      },
    };
    ws.current.send(JSON.stringify(payload));
    setMessages((prev) => [...prev, payload.payload]);
    setMsg("");
  }

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Atendente — {nome}</Text>

      <FlatList
        ref={flatListRef}
        data={messages}
        keyExtractor={(it) => String(it.id || Math.random())}
        onContentSizeChange={() =>
          flatListRef.current?.scrollToEnd({ animated: true })
        }
        renderItem={({ item }) => (
          <View
            style={[
              styles.msgBox,
              item.sender === "atendente" ? styles.me : styles.peer,
            ]}
          >
            <Text style={styles.nome}>
              {item.nome}
              {item.pedido ? ` — Pedido: ${item.pedido}` : ""}
            </Text>
            <Text style={styles.text}>{item.texto}</Text>
            <Text style={styles.time}>{item.time}</Text>
          </View>
        )}
      />

      <View style={styles.footer}>
        <TextInput
          style={styles.input}
          value={msg}
          onChangeText={setMsg}
          placeholder="Digite..."
        />
        <TouchableOpacity style={styles.btn} onPress={enviar}>
          <Ionicons name="send" size={20} color="#fff" />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#f3f6fb", padding: 12 },
  header: { fontSize: 18, fontWeight: "600", marginBottom: 8 },
  msgBox: { padding: 10, borderRadius: 12, maxWidth: "80%", marginVertical: 6 },
  me: { backgroundColor: "#daf1ff", alignSelf: "flex-end" },
  peer: { backgroundColor: "#f1f3f5", alignSelf: "flex-start" },
  nome: { fontSize: 12, fontWeight: "700", marginBottom: 4 },
  text: { fontSize: 15 },
  time: { fontSize: 11, color: "#6b7280", marginTop: 6, textAlign: "right" },
  footer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    paddingTop: 10,
  },
  input: {
    flex: 1,
    backgroundColor: "#fff",
    padding: 12,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#e6e9ef",
  },
  btn: {
    backgroundColor: "#2b7cff",
    padding: 12,
    borderRadius: 10,
    marginLeft: 8,
  },
});
