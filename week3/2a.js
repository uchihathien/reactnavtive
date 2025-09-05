import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from "react-native";
import Svg, { Defs, LinearGradient as SvgLinearGradient, Stop, Rect } from "react-native-svg";
import { MaterialCommunityIcons } from "@expo/vector-icons";

function GradientBackground() {
  return (
    <Svg width="100%" height="100%" style={StyleSheet.absoluteFill} pointerEvents="none">
      <Defs>
        <SvgLinearGradient id="grad" x1="0" y1="0" x2="0" y2="1">
          <Stop offset="0%" stopColor="#FFD700" />
          <Stop offset="100%" stopColor="#DAA520" />
        </SvgLinearGradient>
      </Defs>
      <Rect x="0" y="0" width="100%" height="100%" fill="url(#grad)" />
    </Svg>
  );
}

export default function LoginScreen() {
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  return (
    <View style={{ flex: 1 }}>
      <GradientBackground />
      <View style={styles.container}>
        <Text style={styles.title}>LOGIN</Text>

        {/* Name */}
        <View style={styles.inputContainer}>
          <MaterialCommunityIcons name="account" size={24} color="#000" />
          <TextInput
            style={styles.input}
            placeholder="Name"
            value={name}
            onChangeText={setName}
            placeholderTextColor="#333"
          />
        </View>

        {/* Password */}
        <View style={styles.inputContainer}>
          <MaterialCommunityIcons name="lock" size={24} color="#000" />
          <TextInput
            style={styles.input}
            placeholder="Password"
            value={password}
            onChangeText={setPassword}
            secureTextEntry={!showPassword}
            placeholderTextColor="#333"
          />
          <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
            <MaterialCommunityIcons name={showPassword ? "eye-off" : "eye"} size={24} color="#000" />
          </TouchableOpacity>
        </View>

        <TouchableOpacity style={styles.loginButton}>
          <Text style={styles.loginText}>LOGIN</Text>
        </TouchableOpacity>

        <TouchableOpacity>
          <Text style={styles.forgotPassword}>Forgot your password?</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, justifyContent: "center" },
  title: { fontSize: 32, fontWeight: "900", marginBottom: 40, color: "#000" },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#fff",
    borderRadius: 6,
    backgroundColor: "rgba(255,255,255,0.25)",
    paddingHorizontal: 12,
    height: 56,
    marginBottom: 18,
    gap: 8,
  },
  input: { flex: 1, fontSize: 16, color: "#000" },
  loginButton: {
    backgroundColor: "#000",
    paddingVertical: 16,
    borderRadius: 6,
    alignItems: "center",
    marginTop: 8,
  },
  loginText: { color: "#fff", fontSize: 18, fontWeight: "bold" },
  forgotPassword: { marginTop: 24, fontSize: 16, textAlign: "center", fontWeight: "bold", color: "#000" },
});
