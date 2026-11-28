import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  ScrollView,
} from "react-native";

interface CreateAccountProps {
  onSignIn?: () => void;
  onCreateAccount?: (
    name: string,
    email: string,
    password: string
  ) => void;
}

export default function CreateAccount({
  onSignIn,
  onCreateAccount,
}: CreateAccountProps) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");

  const handleCreateAccount = () => {
    if (!name.trim() || !email.trim() || !password) {
      setError("Please fill in all fields");
      return;
    }

    if (!email.includes("@")) {
      setError("Please enter a valid email");
      return;
    }

    if (password.length < 8) {
      setError("Password must be at least 8 characters");
      return;
    }

    setError("");
    onCreateAccount?.(name.trim(), email.trim(), password);
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.content}>

          {/* Logo */}
          <Text style={styles.logo}>
            Dash<Text style={styles.logoDot}>.</Text>
          </Text>

          {/* Heading */}
          <View style={styles.heading}>
            <Text style={styles.title}>
              Create your Account
            </Text>

            <Text style={styles.subtitle}>
              Save addresses, reorder favorites and keep every receipt.
            </Text>
          </View>

          {/* Form */}
          <View style={styles.form}>

            {/* Full Name */}
            <Text style={styles.label}>Full Name</Text>
            <TextInput
              style={styles.input}
              placeholder="Enter your full name"
              placeholderTextColor="#999999"
              value={name}
              onChangeText={setName}
              autoCapitalize="words"
            />

            {/* Email */}
            <Text style={styles.label}>Email Address</Text>
            <TextInput
              style={styles.input}
              placeholder="Enter your email"
              placeholderTextColor="#999999"
              keyboardType="email-address"
              autoCapitalize="none"
              value={email}
              onChangeText={setEmail}
            />

            {/* Password */}
            <Text style={styles.label}>Password</Text>

            <View style={styles.passwordContainer}>
              <TextInput
                style={styles.passwordInput}
                placeholder="Create a password"
                placeholderTextColor="#999999"
                secureTextEntry={!showPassword}
                value={password}
                onChangeText={setPassword}
              />

              <TouchableOpacity
                onPress={() => setShowPassword(!showPassword)}
                style={styles.eyeButton}
                activeOpacity={0.7}
              >
                <View style={styles.eyeShape}>
                  <View style={styles.eyePupil} />
                </View>
              </TouchableOpacity>
            </View>

            {/* Error */}
            {error ? (
              <Text style={styles.error}>{error}</Text>
            ) : null}

            {/* Create Account Button */}
            <TouchableOpacity
              style={styles.mainButton}
              onPress={handleCreateAccount}
              activeOpacity={0.85}
            >
              <Text style={styles.mainButtonText}>
                Create Account
              </Text>
            </TouchableOpacity>

            {/* Footer */}
            <View style={styles.footer}>
              <Text style={styles.footerText}>
                Already have an account?{" "}
              </Text>
              <TouchableOpacity onPress={onSignIn}>
                <Text style={styles.linkText}>
                  Sign In
                </Text>
              </TouchableOpacity>
            </View>

          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F8F8F5",
  },

  scrollContent: {
    flexGrow: 1,
    justifyContent: "center",
    paddingVertical: 30,
  },

  content: {
    width: "100%",
    maxWidth: 480,
    alignSelf: "center",
    paddingHorizontal: 24,
  },

  logo: {
    fontSize: 30,
    fontWeight: "900",
    color: "#111B19",
    letterSpacing: -1,
    marginBottom: 65,
  },

  logoDot: {
    color: "#FFC21A",
  },

  heading: {
    marginBottom: 42,
  },

  title: {
    fontSize: 32,
    fontWeight: "800",
    color: "#111B19",
    letterSpacing: -0.8,
    marginBottom: 12,
  },

  subtitle: {
    fontSize: 16,
    lineHeight: 24,
    color: "#777B76",
  },

  form: {
    width: "100%",
  },

  label: {
    fontSize: 16,
    fontWeight: "600",
    color: "#26312D",
    marginBottom: 12,
    marginTop: 22,
  },

  input: {
    height: 60,
    borderRadius: 19,
    borderWidth: 1,
    borderColor: "#DEDFDA",
    backgroundColor: "#FFFFFF",
    paddingHorizontal: 20,
    fontSize: 16,
    color: "#202820",
  },

  passwordContainer: {
    height: 60,
    borderRadius: 19,
    borderWidth: 1,
    borderColor: "#DEDFDA",
    backgroundColor: "#FFFFFF",
    flexDirection: "row",
    alignItems: "center",
    paddingLeft: 20,
    paddingRight: 16,
  },

  passwordInput: {
    flex: 1,
    height: "100%",
    fontSize: 16,
    color: "#202820",
  },

  eyeButton: {
    width: 40,
    height: 45,
    alignItems: "center",
    justifyContent: "center",
  },

  eyeShape: {
    width: 20,
    height: 16,
    borderWidth: 2,
    borderColor: "#737A75",
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
  },

  eyePupil: {
    width: 7,
    height: 7,
    borderWidth: 2,
    borderColor: "#737A75",
    borderRadius: 5,
  },

  error: {
    color: "#C43D3D",
    fontSize: 13,
    marginTop: 10,
  },

  mainButton: {
    height: 64,
    borderRadius: 19,
    backgroundColor: "#FFC21A",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 38,
  },

  mainButtonText: {
    fontSize: 18,
    fontWeight: "800",
    color: "#17221D",
  },

  footer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    flexWrap: "wrap",
    marginTop: 35,
  },

  footerText: {
    fontSize: 15,
    color: "#777B76",
  },

  linkText: {
    fontSize: 15,
    fontWeight: "700",
    color: "#26764F",
  },
});