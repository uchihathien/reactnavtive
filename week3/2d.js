// screens/PasswordGeneratorScreen.js
import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
} from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";

/*
  Custom checkbox (tránh dùng CheckBox của react-native để khỏi bị undefined trên Snack web).
  Hiển thị icon khác nhau dựa trên state.
*/
const Checkbox = ({ value, onValueChange }) => {
  return (
    <TouchableOpacity
      onPress={() => onValueChange(!value)}
      style={styles.checkboxWrap}
      accessibilityRole="button"
      accessibilityState={{ checked: value }}
    >
      {value ? (
        <MaterialCommunityIcons name="check-box" size={28} color="#fff" />
      ) : (
        <MaterialCommunityIcons
          name="checkbox-blank-outline"
          size={28}
          color="#fff"
        />
      )}
    </TouchableOpacity>
  );
};

export default function PasswordGeneratorScreen() {
  const [password, setPassword] = useState("");
  const [length, setLength] = useState("12");
  const [lowercase, setLowercase] = useState(true);
  const [uppercase, setUppercase] = useState(false);
  const [numbers, setNumbers] = useState(true);
  const [symbols, setSymbols] = useState(false);

  const lowercaseChars = "abcdefghijklmnopqrstuvwxyz";
  const uppercaseChars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  const numberChars = "0123456789";
  const symbolChars = "!@#$%^&*()_+-=[]{}|;:,.<>?";

  // shuffle helper
  const shuffle = (arr) => {
    for (let i = arr.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    return arr;
  };

  const generatePassword = () => {
    const len = parseInt(length, 10);
    if (isNaN(len) || len <= 0) {
      Alert.alert("Sai độ dài", "Độ dài phải là số lớn hơn 0.");
      return;
    }
    if (len > 128) {
      Alert.alert("Độ dài quá lớn", "Giới hạn tối đa là 128 ký tự.");
      return;
    }

    // build pool and ensure at least one of chosen groups included
    let pool = "";
    const required = [];

    if (lowercase) {
      pool += lowercaseChars;
      required.push(
        lowercaseChars[Math.floor(Math.random() * lowercaseChars.length)]
      );
    }
    if (uppercase) {
      pool += uppercaseChars;
      required.push(
        uppercaseChars[Math.floor(Math.random() * uppercaseChars.length)]
      );
    }
    if (numbers) {
      pool += numberChars;
      required.push(numberChars[Math.floor(Math.random() * numberChars.length)]);
    }
    if (symbols) {
      pool += symbolChars;
      required.push(symbolChars[Math.floor(Math.random() * symbolChars.length)]);
    }

    if (pool.length === 0) {
      Alert.alert("Chưa chọn loại ký tự", "Hãy chọn ít nhất một loại ký tự.");
      return;
    }

    // build remaining characters
    const result = [...required];
    for (let i = required.length; i < len; i++) {
      const idx = Math.floor(Math.random() * pool.length);
      result.push(pool[idx]);
    }

    // shuffle to mix required chars
    const finalPass = shuffle(result).join("");
    setPassword(finalPass);
  };

  const clear = () => {
    setPassword("");
  };

  return (
    <View style={styles.screen}>
      <View style={styles.card}>
        <Text style={styles.title}>PASSWORD GENERATOR</Text>

        <TouchableOpacity
          activeOpacity={0.9}
          onPress={() => {
            // tap password box to copy to clipboard (only works on web if allowed).
            // we just show an alert as feedback to user here.
            if (password) {
              // option: add expo-clipboard later if you want cross-platform copy
              Alert.alert("Password", "Mật khẩu đã tạo:\n\n" + password);
            }
          }}
        >
          <View style={styles.passwordBox}>
            <Text style={styles.passwordText}>
              {password ? password : "— your generated password will appear here —"}
            </Text>
          </View>
        </TouchableOpacity>

        <View style={styles.row}>
          <Text style={styles.label}>Password length</Text>
          <TextInput
            style={styles.lengthInput}
            keyboardType="numeric"
            value={length}
            onChangeText={(t) => setLength(t.replace(/[^0-9]/g, ""))}
            maxLength={3}
            placeholder="12"
            placeholderTextColor="#111"
          />
        </View>

        <View style={styles.row}>
          <Text style={styles.label}>Include lower case letters</Text>
          <Checkbox value={lowercase} onValueChange={setLowercase} />
        </View>

        <View style={styles.row}>
          <Text style={styles.label}>Include upcase letters</Text>
          <Checkbox value={uppercase} onValueChange={setUppercase} />
        </View>

        <View style={styles.row}>
          <Text style={styles.label}>Include number</Text>
          <Checkbox value={numbers} onValueChange={setNumbers} />
        </View>

        <View style={styles.row}>
          <Text style={styles.label}>Include special symbol</Text>
          <Checkbox value={symbols} onValueChange={setSymbols} />
        </View>

        <View style={{ flexDirection: "row", marginTop: 18 }}>
          <TouchableOpacity style={styles.generateBtn} onPress={generatePassword}>
            <Text style={styles.generateText}>GENERATE PASSWORD</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.clearBtn} onPress={clear}>
            <Text style={styles.clearText}>CLEAR</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: "#cbcbe0",
    justifyContent: "center",
    alignItems: "center",
  },
  card: {
    width: "86%",
    backgroundColor: "#1f1f5c",
    borderRadius: 16,
    padding: 22,
    shadowColor: "#000",
    shadowOpacity: 0.3,
    shadowRadius: 10,
    elevation: 8,
  },
  title: {
    color: "#fff",
    fontSize: 22,
    fontWeight: "800",
    textAlign: "center",
    marginBottom: 18,
  },
  passwordBox: {
    backgroundColor: "#0d0d33",
    paddingVertical: 14,
    paddingHorizontal: 10,
    borderRadius: 8,
    marginBottom: 18,
    minHeight: 44,
    justifyContent: "center",
  },
  passwordText: {
    color: "#fff",
    textAlign: "center",
    fontSize: 14,
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginVertical: 8,
  },
  label: {
    color: "#fff",
    fontSize: 16,
    flex: 1,
  },
  lengthInput: {
    width: 80,
    backgroundColor: "#fff",
    paddingVertical: 6,
    borderRadius: 6,
    textAlign: "center",
    marginLeft: 12,
  },
  checkboxWrap: {
    paddingLeft: 8,
    paddingRight: 4,
  },
  generateBtn: {
    flex: 1,
    backgroundColor: "#3d3df5",
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: "center",
    marginRight: 8,
  },
  generateText: {
    color: "#fff",
    fontWeight: "700",
  },
  clearBtn: {
    width: 88,
    backgroundColor: "#2a2a87",
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: "center",
  },
  clearText: {
    color: "#fff",
    fontWeight: "700",
  },
});
