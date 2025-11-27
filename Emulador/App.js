import React, { useEffect, useRef, useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
} from "react-native";

export default function App() {
  const [messages, setMessages] = useState([]);
  const [text, setText] = useState("");
  const ws = useRef(null);

  useEffect(() => {
    ws.current = new WebSocket("ws://10.0.2.2:3000");

    ws.current.onopen = () => console.log("Atendente conectado");

    ws.current.onmessage = (event) => {
      const data = JSON.parse(event.data);

      if (data.type === "history") {
        setMessages(data.messages);
      }

      if (data.type === "newMessage") {
        setMessages((prev) => [...prev, data.msg]);
      }
    };

    return () => ws.current.close();
  }, []);

  function sendMessage() {
    if (!text.trim()) return;

    const msg = {
      id: Date.now(),
      sender: "attendant",
      text,
      time: new Date().toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      }),
    };

    ws.current.send(JSON.stringify(msg));
    setText("");
  }

  return (
    <View style={styles.app}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Atendente</Text>
        <Text style={styles.subtitle}>Conectado</Text>
      </View>

      <ScrollView style={styles.chatWindow}>
        {messages.map((msg) => (
          <View
            key={msg.id}
            style={[
              styles.message,
              msg.sender === "attendant" ? styles.me : styles.peer,
            ]}
          >
            <View
              style={[
                styles.bubble,
                msg.sender === "attendant"
                  ? styles.bubbleMe
                  : styles.bubblePeer,
              ]}
            >
              <Text style={styles.bubbleText}>{msg.text}</Text>
            </View>
            <Text style={styles.time}>{msg.time}</Text>
          </View>
        ))}
      </ScrollView>

      <View style={styles.form}>
        <TextInput
          style={styles.input}
          value={text}
          onChangeText={setText}
          placeholder="Escreva..."
        />
        <TouchableOpacity style={styles.sendBtn} onPress={sendMessage}>
          <Text style={styles.sendText}>Enviar</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const COLORS = {
  bg: "#f3f6fb",
  panel: "#ffffff",
  accent: "#2b7cff",
  muted: "#6b7280",
  meBg: "#daf1ff",
  peerBg: "#f1f3f5",
};

const styles = StyleSheet.create({
  app: {
    flex: 1,
    backgroundColor: COLORS.bg,
    paddingTop: 40,
  },

  header: {
    padding: 18,
    backgroundColor: "rgba(43,124,255,0.06)",
    borderBottomWidth: 1,
    borderColor: "rgba(15,23,42,0.04)",
  },

  headerTitle: {
    fontSize: 18,
    fontWeight: "600",
  },

  subtitle: {
    fontSize: 13,
    color: COLORS.muted,
    marginTop: 4,
  },

  chatWindow: {
    flex: 1,
    padding: 18,
  },

  message: {
    maxWidth: "78%",
    marginVertical: 6,
    flexDirection: "row",
    alignItems: "flex-end",
    gap: 8,
  },

  me: {
    alignSelf: "flex-end",
    flexDirection: "row-reverse",
  },

  peer: {
    alignSelf: "flex-start",
  },

  bubble: {
    padding: 10,
    borderRadius: 12,
  },

  bubbleMe: { backgroundColor: COLORS.meBg },
  bubblePeer: { backgroundColor: COLORS.peerBg },

  bubbleText: { fontSize: 14 },

  time: {
    fontSize: 11,
    color: COLORS.muted,
    width: 38,
    textAlign: "center",
  },

  form: {
    flexDirection: "row",
    padding: 12,
    borderTopWidth: 1,
    borderColor: "rgba(15,23,42,0.04)",
    gap: 10,
  },

  input: {
    flex: 1,
    backgroundColor: "#fff",
    padding: 12,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#ccc",
  },

  sendBtn: {
    backgroundColor: COLORS.accent,
    paddingHorizontal: 20,
    borderRadius: 12,
    justifyContent: "center",
  },

  sendText: {
    color: "#fff",
    fontWeight: "bold",
  },
});
