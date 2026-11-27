import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  Alert,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
} from 'react-native';

interface SignInProps {
  onCreateAccount?: () => void;
  onSignIn?: (email: string, password: string) => void;
}

const SignIn: React.FC<SignInProps> = ({
  onCreateAccount,
  onSignIn,
}) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const handleSignIn = () => {
    if (!email.trim() || !password.trim()) {
      Alert.alert('Error', 'Please enter your email and password.');
      return;
    }

    if (!/\S+@\S+\.\S+/.test(email)) {
      Alert.alert('Error', 'Please enter a valid email address.');
      return;
    }

    onSignIn?.(email.trim(), password);
  };

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      >
        <ScrollView
          contentContainerStyle={styles.scrollContent}
          keyboardShouldPersistTaps="handled"
        >
          <View style={styles.content}>

            <Text style={styles.logo}>
              dash<Text style={styles.logoDot}>.</Text>
            </Text>

            <View style={styles.header}>
              <Text style={styles.title}>Welcome back</Text>

              <Text style={styles.subtitle}>
                Sign in to see your orders, addresses and favorites.
              </Text>
            </View>

            <View style={styles.form}>

              <Text style={styles.label}>Email</Text>

              <TextInput
                style={styles.input}
                placeholder="you@example.com"
                placeholderTextColor="#888888"
                keyboardType="email-address"
                autoCapitalize="none"
                autoCorrect={false}
                value={email}
                onChangeText={setEmail}
              />

              <Text style={styles.label}>Password</Text>

              <View style={styles.passwordContainer}>
                <TextInput
                  style={styles.passwordInput}
                  placeholder="Enter your password"
                  placeholderTextColor="#888888"
                  secureTextEntry={!showPassword}
                  value={password}
                  onChangeText={setPassword}
                  autoCapitalize="none"
                />

                <TouchableOpacity
                  onPress={() => setShowPassword(!showPassword)}
                >
                  <Text style={styles.eyeIcon}>
                    {showPassword ? 'Hide' : 'Show'}
                  </Text>
                </TouchableOpacity>
              </View>

              <TouchableOpacity
                style={styles.signInButton}
                onPress={handleSignIn}
                activeOpacity={0.8}
              >
                <Text style={styles.signInText}>Sign in</Text>
              </TouchableOpacity>

            </View>

            <View style={styles.footer}>
              <Text style={styles.footerText}>
                New to Dash?{' '}
              </Text>

              <TouchableOpacity onPress={onCreateAccount}>
                <Text style={styles.linkText}>
                  Create an account
                </Text>
              </TouchableOpacity>
            </View>

          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F7F7F2',
  },

  scrollContent: {
    flexGrow: 1,
  },

  content: {
    flex: 1,
    paddingHorizontal: 32,
    paddingTop: 45,
    paddingBottom: 40,
  },

  logo: {
    fontSize: 30,
    fontWeight: '800',
    color: '#101820',
    marginBottom: 110,
  },

  logoDot: {
    color: '#FFC21A',
  },

  header: {
    marginBottom: 50,
  },title: {
    fontSize: 38,
    fontWeight: '800',
    color: '#101820',
    marginBottom: 22,
  },

  subtitle: {
    fontSize: 17,
    lineHeight: 27,
    color: '#777777',
  },

  form: {
    width: '100%',
  },

  label: {
    fontSize: 17,
    fontWeight: '600',
    color: '#263238',
    marginBottom: 14,
    marginTop: 12,
  },

  input: {
    height: 66,
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#E7E7E2',
    borderRadius: 40,
    paddingHorizontal: 22,
    fontSize: 17,
    color: '#222222',
    marginBottom: 30,
  },

  passwordContainer: {
    height: 66,
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#E7E7E2',
    borderRadius: 40,
    paddingHorizontal: 22,
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 45,
  },

  passwordInput: {
    flex: 1,
    fontSize: 17,
    color: '#222222',
  },

  eyeIcon: {
    fontSize: 14,
    color: '#777777',
    fontWeight: '600',
  },

  signInButton: {
    height: 68,
    backgroundColor: '#FFC21A',
    borderRadius: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },

  signInText: {
    fontSize: 20,
    fontWeight: '700',
    color: '#172019',
  },

  footer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 55,
    flexWrap: 'wrap',
  },

  footerText: {
    fontSize: 16,
    color: '#777777',
  },

  linkText: {
    fontSize: 16,
    fontWeight: '700',
    color: '#285B49',
  },
});

export default SignIn;