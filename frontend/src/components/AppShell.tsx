import React, { ReactNode } from 'react';

import {
  StyleSheet,
  View,
} from 'react-native';

import BottomNav from './Bottom_Nav';

type AppShellProps = {
  children: ReactNode;
};

export default function AppShell({
  children,
}: AppShellProps) {
  return (
    <View style={styles.screen}>
      <View style={styles.content}>
        {children}
      </View>

      <BottomNav />
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: '#0D0E11',
  },

  content: {
    flex: 1,
  },
});