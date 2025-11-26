import React, { useState } from "react";
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

  function sendMessage() {
    if (!text.trim()) return;

    const newMsg = {
      id: Date.now(),
      text,
      time: new Date().toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      }),
      me: true,
    };

    setMessages([...messages, newMsg]);
    setText("");

    // simula resposta
    setTimeout(() => {
      setMessages((prev) => [...prev]);
    }, 600);
  }

  return (
    <View style={styles.app}>
      {/* HEADER */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Chat</Text>
        <Text style={styles.subtitle}>Conectado</Text>
      </View>

      {/* CHAT WINDOW */}
      <ScrollView style={styles.chatWindow}>
        {messages.length === 0 && (
          <Text style={styles.note}>Nenhuma mensagem ainda</Text>
        )}

        {messages.map((msg) => (
          <View
            key={msg.id}
            style={[styles.message, msg.me ? styles.me : styles.peer]}
          >
            <View
              style={[
                styles.bubble,
                msg.me ? styles.bubbleMe : styles.bubblePeer,
              ]}
            >
              <Text style={styles.bubbleText}>{msg.text}</Text>
            </View>
            <Text style={styles.time}>{msg.time}</Text>
          </View>
        ))}
      </ScrollView>

      {/* FORM */}
      <View style={styles.form}>
        <TextInput
          style={styles.input}
          placeholder="Digite sua mensagem..."
          value={text}
          onChangeText={setText}
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

  note: {
    textAlign: "center",
    color: COLORS.muted,
    padding: 14,
    fontSize: 13,
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
    shadowColor: "#0b1641",
    shadowOpacity: 0.04,
    shadowRadius: 6,
    elevation: 2,
  },

  bubbleMe: {
    backgroundColor: COLORS.meBg,
  },

  bubblePeer: {
    backgroundColor: COLORS.peerBg,
  },

  bubbleText: {
    fontSize: 14,
  },

  time: {
    fontSize: 11,
    color: COLORS.muted,
    width: 38,
    textAlign: "center",
    paddingBottom: 2,
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
    borderColor: "rgba(15,23,42,0.06)",
    fontSize: 14,
  },

  sendBtn: {
    backgroundColor: COLORS.accent,
    paddingHorizontal: 18,
    borderRadius: 12,
    justifyContent: "center",
  },

  sendText: {
    color: "#fff",
    fontWeight: "bold",
  },
});
