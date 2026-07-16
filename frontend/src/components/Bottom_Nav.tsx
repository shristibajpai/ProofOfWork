import { router, usePathname, type Href } from 'expo-router';


import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

import {
  Home,
  Activity,
  Plus,
  ChartNoAxesColumnIncreasing,
  User,
} from 'lucide-react-native';

export default function BottomNav() {
  const pathname = usePathname();

  return (
    <View style={styles.bottomNav}>
      {/* HOME */}

      <TouchableOpacity
        style={styles.navItem}
        onPress={() => router.push('/' as Href)}
      >
        <Home
          size={23}
          color={
            pathname === '/'
              ? '#50E3A4'
              : '#9CA3AF'
          }
          strokeWidth={2.2}
        />

        <Text
          style={[
            styles.navText,
            pathname === '/' &&
              styles.activeNavText,
          ]}
        >
          Home
        </Text>
      </TouchableOpacity>

      {/* ACTIVITY */}

      <TouchableOpacity
        style={styles.navItem}
        onPress={() => router.push('/activity' as Href)}
      >
        <Activity
          size={23}
          color={
            pathname === '/activity'
              ? '#50E3A4'
              : '#9CA3AF'
          }
          strokeWidth={2.2}
        />

        <Text
          style={[
            styles.navText,
            pathname === '/activity' &&
              styles.activeNavText,
          ]}
        >
          Activity
        </Text>
      </TouchableOpacity>

      {/* ADD PROOF */}

      <TouchableOpacity
        style={styles.addButton}
        onPress={() => router.push('/add-proof' as Href)}
      >
        <Plus
          size={30}
          color="#101114"
          strokeWidth={2.5}
        />
      </TouchableOpacity>

      {/* ANALYTICS */}

      <TouchableOpacity
        style={styles.navItem}
        onPress={() => router.push('/analytics' as Href)}
      >
        <ChartNoAxesColumnIncreasing
          size={23}
          color={
            pathname === '/analytics'
              ? '#50E3A4'
              : '#9CA3AF'
          }
          strokeWidth={2.2}
        />

        <Text
          style={[
            styles.navText,
            pathname === '/analytics' &&
              styles.activeNavText,
          ]}
        >
          Analytics
        </Text>
      </TouchableOpacity>

      {/* PROFILE */}

      <TouchableOpacity
        style={styles.navItem}
        onPress={() => router.push('/profile' as Href)}
      >
        <User
          size={23}
          color={
            pathname === '/profile'
              ? '#50E3A4'
              : '#9CA3AF'
          }
          strokeWidth={2.2}
        />

        <Text
          style={[
            styles.navText,
            pathname === '/profile' &&
              styles.activeNavText,
          ]}
        >
          Profile
        </Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  bottomNav: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: 85,
    backgroundColor: '#0D0E11',

    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',

    paddingHorizontal: 10,
    paddingBottom: 10,

    borderTopWidth: 1,
    borderTopColor: '#2A2B30',
  },

  navItem: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 5,
  },

  navText: {
    fontSize: 11,
    color: '#9CA3AF',
    fontWeight: '500',
  },

  activeNavText: {
    color: '#50E3A4',
    fontWeight: '700',
  },

  addButton: {
    width: 58,
    height: 58,
    borderRadius: 29,

    backgroundColor: '#50E3A4',

    alignItems: 'center',
    justifyContent: 'center',

    marginTop: -35,

    shadowColor: '#000',

    shadowOffset: {
      width: 0,
      height: 4,
    },

    shadowOpacity: 0.3,
    shadowRadius: 5,

    elevation: 8,
  },
});