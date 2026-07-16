import { View, StyleSheet } from 'react-native';
import { ReactNode } from 'react';

type CardProps = {
  children: ReactNode;
};

export default function Card({ children }: CardProps) {
  return (
    <View style={styles.card}>
      {children}
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#1C1C1F',
    borderRadius: 14,
    padding: 16,
    borderWidth: 1,
    borderColor: '#303034',
  },
});

