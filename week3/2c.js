import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  TextInput,
  StyleSheet,
} from "react-native";

export default function CheckoutScreen() {
  const [quantity, setQuantity] = useState(1);
  const price = 141800;

  return (
    <View style={styles.container}>
      {/* Sản phẩm */}
      <View style={styles.productRow}>
        <Image source={require("./assets/snack-icon.png")} style={styles.productImage} />
        <View style={{ flex: 1, marginLeft: 12 }}>
          <Text style={styles.productName}>Nguyên hàm, Tích phân và Ứng dụng</Text>
          <Text style={styles.seller}>Cung cấp bởi Tiki Trading</Text>
          <View style={styles.priceRow}>
            <Text style={styles.price}>{price.toLocaleString()} đ</Text>
            <Text style={styles.oldPrice}>141.800 đ</Text>
          </View>

          {/* Số lượng */}
          <View style={styles.qtyRow}>
            <TouchableOpacity onPress={() => setQuantity(Math.max(1, quantity - 1))}>
              <Text style={styles.qtyBtn}>-</Text>
            </TouchableOpacity>
            <Text style={styles.qty}>{quantity}</Text>
            <TouchableOpacity onPress={() => setQuantity(quantity + 1)}>
              <Text style={styles.qtyBtn}>+</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>

      {/* Mã giảm giá */}
      <View style={styles.couponRow}>
        <TextInput
          style={styles.couponInput}
          placeholder="Mã giảm giá"
        />
        <TouchableOpacity style={styles.applyBtn}>
          <Text style={{ color: "#fff", fontWeight: "bold" }}>Áp dụng</Text>
        </TouchableOpacity>
      </View>

      {/* Phiếu quà tặng */}
      <Text style={styles.link}>Bạn có phiếu quà tặng? Nhập tại đây</Text>

      {/* Tạm tính */}
      <View style={styles.summaryRow}>
        <Text style={styles.summaryLabel}>Tạm tính</Text>
        <Text style={styles.summaryValue}>{(price * quantity).toLocaleString()} đ</Text>
      </View>

      {/* Thành tiền */}
      <View style={styles.summaryRow}>
        <Text style={[styles.summaryLabel, { fontWeight: "bold" }]}>Thành tiền</Text>
        <Text style={[styles.summaryValue, { color: "red", fontWeight: "bold" }]}>
          {(price * quantity).toLocaleString()} đ
        </Text>
      </View>

      {/* Nút đặt hàng */}
      <TouchableOpacity style={styles.orderBtn}>
        <Text style={styles.orderText}>TIẾN HÀNH ĐẶT HÀNG</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, backgroundColor: "#fff" },
  productRow: { flexDirection: "row", marginBottom: 20, marginTop:30 },
  productImage: { width: 80, height: 80, borderRadius: 4 },
  productName: { fontSize: 16, fontWeight: "bold" },
  seller: { fontSize: 12, color: "#555", marginBottom: 4 },
  priceRow: { flexDirection: "row", alignItems: "center", marginBottom: 6 },
  price: { fontSize: 16, fontWeight: "bold", color: "red", marginRight: 8 },
  oldPrice: { fontSize: 12, color: "#888", textDecorationLine: "line-through" },
  qtyRow: { flexDirection: "row", alignItems: "center" },
  qtyBtn: {
    borderWidth: 1,
    borderColor: "#ccc",
    paddingHorizontal: 12,
    paddingVertical: 4,
    fontSize: 16,
  },
  qty: { marginHorizontal: 12, fontSize: 16 },
  couponRow: { flexDirection: "row", marginVertical: 12 },
  couponInput: {
    flex: 1,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 4,
    paddingHorizontal: 8,
  },
  applyBtn: {
    backgroundColor: "#1565C0",
    marginLeft: 8,
    borderRadius: 4,
    paddingHorizontal: 12,
    justifyContent: "center",
  },
  link: { fontSize: 13, color: "#1565C0", marginBottom: 12 },
  summaryRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginVertical: 6,
  },
  summaryLabel: { fontSize: 15, color: "#333" },
  summaryValue: { fontSize: 15, color: "#333" },
  orderBtn: {
    backgroundColor: "red",
    paddingVertical: 14,
    borderRadius: 6,
    alignItems: "center",
    marginTop: 16,
  },
  orderText: { color: "#fff", fontSize: 16, fontWeight: "bold" },
});
