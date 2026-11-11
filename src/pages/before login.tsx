
import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default function BeforeLogin() {
  return (
    <View style={styles.container}>

      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Account</Text>
      </View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.content}
      >

        {/* Account Card */}
        <View style={styles.accountCard}>

          {/* User Icon */}
          <View style={styles.userIcon}>
            <Ionicons
              name="person-outline"
              size={30}
              color="#171717"
            />
          </View>

          {/* Title */}
          <Text style={styles.title}>
            Sign in to make Dash yours
          </Text>

          {/* Features */}
          <View style={styles.features}>

            <Feature
              icon="receipt-outline"
              text="Every order and receipt, on any device"
            />

            <Feature
              icon="location-outline"
              text="Saved addresses for one-tap checkout"
            />

            <Feature
              icon="heart-outline"
              text="Favorite restaurants, always close by"
            />

          </View>

          {/* Create Account Button */}
          <TouchableOpacity style={styles.createButton}>
            <Text style={styles.createButtonText}>
              Create account
            </Text>
          </TouchableOpacity>

          {/* Sign In Button */}
          <TouchableOpacity style={styles.signInButton}>
            <Text style={styles.signInButtonText}>
              Sign in
            </Text>
          </TouchableOpacity>

        </View>

      </ScrollView>
    </View>
  );
}

// Feature Component
function Feature({ icon, text }: any) {
  return (
    <View style={styles.featureItem}>
      <Ionicons
        name={icon}
        size={23}
        color="#FFC928"
      />

      <Text style={styles.featureText}>
        {text}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({

  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },

  header: {
    paddingHorizontal: 22,
    paddingTop: 60,
    paddingBottom: 20,
  },

  headerTitle: {
    fontSize: 25,
    fontWeight: '700',
    color: '#171717',
  },

  content: {
    paddingHorizontal: 20,
    paddingTop: 15,
    paddingBottom: 30,
  },

  accountCard: {
    backgroundColor: '#075B36',
    borderRadius: 35,
    paddingHorizontal: 25,
    paddingTop: 25,
    paddingBottom: 28,
    alignItems: 'stretch',
  },

  userIcon: {
    width: 58,
    height: 58,
    borderRadius: 29,
    backgroundColor: '#FFC928',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 40,
  },

  title: {
    fontSize: 23,
    fontWeight: '700',
    color: '#FFFFFF',
    textAlign: 'left',
    marginBottom: 30,
  },

  features: {
    width: '100%',
    gap: 22,
    marginBottom: 40,
  },

  featureItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 14,
  },

  featureText: {
    flex: 1,
    fontSize: 15,
    color: '#FFFFFF',
    fontWeight: '500',
  },

  createButton: {
    width: '100%',
    backgroundColor: '#FFC928',
    borderRadius: 35,
    paddingVertical: 17,
    alignItems: 'center',
    marginBottom: 14,
  },

  createButtonText: {
    color: '#171717',
    fontSize: 17,
    fontWeight: '600',
  },

  signInButton: {
    width: '100%',
    borderWidth: 1,
    borderColor: '#FFFFFF',
    borderRadius: 35,
    paddingVertical: 17,
    alignItems: 'center',
  },

  signInButtonText: {
    color: '#FFFFFF',
    fontSize: 17,
    fontWeight: '600',
  },

});
