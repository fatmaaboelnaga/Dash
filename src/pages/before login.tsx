

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
          <View style={styles.userIcon}>
            <Ionicons name="person" size={28} color="#075B36" />
          </View>

          <Text style={styles.title}>
            Sign in to make Dash yours
          </Text>

          <Text style={styles.subtitle}>
            Track orders, save favorites, and enjoy a faster checkout.
          </Text>

          {/* Features */}
          <View style={styles.features}>
            <Feature
              icon="bag-check-outline"
              text="Track your orders"
            />
            <Feature
              icon="heart-outline"
              text="Save your favorites"
            />
            <Feature
              icon="time-outline"
              text="Reorder in one tap"
            />
          </View>

          {/* Buttons */}
          <TouchableOpacity style={styles.createButton}>
            <Text style={styles.createButtonText}>
              Create account
            </Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.signInButton}>
            <Text style={styles.signInButtonText}>
              Sign in
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>

      {/* Bottom Navigation */}
      <View style={styles.bottomNav}>
        <NavItem icon="home-outline" label="Home" />
        <NavItem icon="search-outline" label="Search" />
        <NavItem icon="bag-outline" label="Cart" />
        <NavItem icon="receipt-outline" label="Orders" />
        <NavItem icon="person" label="Account" active />
      </View>
    </View>
  );
}

// Feature Component
function Feature({ icon, text }: any) {
  return (
    <View style={styles.featureItem}>
      <Ionicons name={icon} size={20} color="#FFC928" />
      <Text style={styles.featureText}>{text}</Text>
    </View>
  );
}

// Navigation Component
function NavItem({ icon, label, active = false }: any) {
  return (
    <TouchableOpacity style={styles.navItem}>
      <Ionicons
        name={icon}
        size={23}
        color={active ? '#16804B' : '#888888'}
      />
      <Text style={[
        styles.navText,
        active && styles.activeNavText,
      ]}>
        {label}
      </Text>
    </TouchableOpacity>
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
    borderRadius: 22,
    padding: 24,
    alignItems: 'center',
  },

  userIcon: {
    width: 58,
    height: 58,
    borderRadius: 29,
    backgroundColor: '#FFC928',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 20,
  },

  title: {
    fontSize: 21,
    fontWeight: '700',
    color: '#FFFFFF',
    textAlign: 'center',
    marginBottom: 10,
  },

  subtitle: {
    fontSize: 14,
    color: '#E0EEE5',
    textAlign: 'center',
    lineHeight: 21,
    marginBottom: 25,
  },

  features: {
    width: '100%',
    gap: 18,
    marginBottom: 28,
  },

  featureItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },

  featureText: {
    fontSize: 14,
    color: '#FFFFFF',
    fontWeight: '500',
  },

  createButton: {
    width: '100%',
    backgroundColor: '#FFC928',
    borderRadius: 12,
    paddingVertical: 15,
    alignItems: 'center',
    marginBottom: 12,
  },

  createButtonText: {
    color: '#075B36',
    fontSize: 15,
    fontWeight: '700',
  },

  signInButton: {
    width: '100%',
    borderWidth: 1,
    borderColor: '#FFFFFF',
    borderRadius: 12,
    paddingVertical: 15,
    alignItems: 'center',
  },

  signInButtonText: {
    color: '#FFFFFF',
    fontSize: 15,
    fontWeight: '600',
  },

  bottomNav: {
    height: 75,
    borderTopWidth: 1,
    borderTopColor: '#EEEEEE',
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
  },

  navItem: {
    alignItems: 'center',
    justifyContent: 'center',
    gap: 4,
  },

  navText: {
    fontSize: 10,
    color: '#888888',
  },

  activeNavText: {
    color: '#16804B',
    fontWeight: '700',
  },
});
