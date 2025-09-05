import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  StyleSheet,
} from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";

export default function ReviewScreen() {
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState("");

  return (
    <View style={styles.container}>
      {/* Thông tin sản phẩm */}
      <View style={styles.productInfo}>
        <Image source={require("./s.png")} style={styles.productImage} />
        <Text style={styles.productText}>
          USB Bluetooth Music Receiver HJX-001 - Biến loa thường thành loa bluetooth
        </Text>
      </View>

      {/* Đánh giá sao */}
      <Text style={styles.label}>Cực kỳ hài lòng</Text>
      <View style={styles.starRow}>
        {[1, 2, 3, 4, 5].map((star) => (
          <TouchableOpacity key={star} onPress={() => setRating(star)}>
            <MaterialCommunityIcons
              name={star <= rating ? "star" : "star-outline"}
              size={32}
              color="#FFD700"
            />
          </TouchableOpacity>
        ))}
      </View>

      {/* Thêm hình ảnh */}
      <TouchableOpacity style={styles.addImageBtn}>
        <MaterialCommunityIcons name="camera" size={24} color="#000" />
        <Text style={{ marginLeft: 8 }}>Thêm hình ảnh</Text>
      </TouchableOpacity>

      {/* Ô nhập nhận xét */}
      <TextInput
        style={styles.textArea}
        placeholder="Hãy chia sẻ những điều mà bạn thích về sản phẩm"
        multiline
        value={comment}
        onChangeText={setComment}
      />

      {/* Link */}
      <Text style={styles.link}>
        https://meet.google.com/nsj-ojwi-xpp
      </Text>

      {/* Nút gửi */}
      <TouchableOpacity style={styles.submitBtn}>
        <Text style={styles.submitText}>Gửi</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 50, backgroundColor: "#fff" },
  productInfo: { flexDirection: "row", alignItems: "center", marginBottom: 16 },
  productImage: { width: 80, height: 70, marginRight: 12 },
  productText: { flex: 1, fontSize: 16, fontWeight: "bold" },
  label: { fontSize: 16, fontWeight: "600", marginVertical: 8 },
  starRow: { flexDirection: "row", marginBottom: 16 },
  addImageBtn: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#2196F3",
    borderRadius: 6,
    padding: 10,
    marginBottom: 16,
  },
  textArea: {
    height: 100,
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 6,
    padding: 10,
    textAlignVertical: "top",
    marginBottom: 8,
  },
  link: { color: "blue", marginBottom: 16, fontSize: 12 },
  submitBtn: {
    backgroundColor: "#2196F3",
    paddingVertical: 14,
    borderRadius: 6,
    alignItems: "center",
  },
  submitText: { color: "#fff", fontSize: 16, fontWeight: "bold" },
});
