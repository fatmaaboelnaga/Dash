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
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [error, setError] = useState("");

  const handleCreateAccount = () => {
    if (!name.trim() ||!email.trim() || !password ) {
      setError("Please fill in all fields");
      return;
    }

    if (!email.includes("@")) {
      setError("Please enter a valid email");
      return;
    }

    if (password.length < 6) {
      setError("Password must be at least 6 characters");
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
      >
        <View style={styles.content}>
          <Text style={styles.logo}>Dash.</Text>

          <Text style={styles.title}>Create Account</Text>
          <Text style={styles.subtitle}>
            Create your account to get started
          </Text>

          <Text style={styles.label}>Full Name</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter your full name"
            placeholderTextColor="#999999"
            value={name}
            onChangeText={setName}
          />

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
            >
              <Text style={styles.showText}>
                {showPassword ? "Hide" : "Show"}
              </Text>
            </TouchableOpacity>
          </View>

          {error ? <Text style={styles.error}>{error}</Text> : null}
          <TouchableOpacity
            style={styles.createButton}
            onPress={handleCreateAccount}
          >
            <Text style={styles.createButtonText}>Create Account</Text>
          </TouchableOpacity>

          <View style={styles.footer}>
            <Text style={styles.footerText}>
              Already have an account?{" "}
            </Text>
            <TouchableOpacity onPress={onSignIn}>
              <Text style={styles.signInText}>Sign In</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F7F7F2",
  },
  scrollContent: {
    flexGrow: 1,
    justifyContent: "center",
    paddingVertical: 30,
  },
  content: {
    width: "100%",
    maxWidth: 430,
    alignSelf: "center",
    paddingHorizontal: 28,
  },
  logo: {
    fontSize: 25,
    fontWeight: "800",
    color: "#27834D",
    marginBottom: 35,
  },
  title: {
    fontSize: 30,
    fontWeight: "800",
    color: "#202820",
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 15,
    color: "#777777",
    marginBottom: 28,
  },
  label: {
    fontSize: 14,
    fontWeight: "600",
    color: "#303830",
    marginBottom: 8,
    marginTop: 15,
  },
  input: {
    height: 54,
    borderWidth: 1,
    borderColor: "#DDDED7",
    borderRadius: 12,
    paddingHorizontal: 15,
    fontSize: 15,
    backgroundColor: "#FFFFFF",
    color: "#202820",
  },
  passwordContainer: {
    height: 54,
    borderWidth: 1,
    borderColor: "#DDDED7",
    borderRadius: 12,
    backgroundColor: "#FFFFFF",
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 15,
  },
  passwordInput: {
    flex: 1,
    fontSize: 15,
    color: "#202820",
  },
  showText: {
    color: "#27834D",
    fontWeight: "600",
    fontSize: 13,
  },
  error: {
    color: "#D13B3B",
    fontSize: 13,
    marginTop: 12,
  },
  createButton: {
    height: 55,
    backgroundColor: "#FFC21A",
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 28,
  },
  createButtonText: {
    fontSize: 16,
    fontWeight: "700",
    color: "#202820",
  },
  footer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 25,
  },
  footerText: {
    color: "#777777",
    fontSize: 14,
  },
  signInText: {
    color: "#27834D",
    fontSize: 14,
    fontWeight: "700",
  },
});