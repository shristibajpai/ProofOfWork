import { useRouter } from 'expo-router';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  StatusBar,
  useWindowDimensions,
} from 'react-native';

import {
  Bell,
  Flame,
  ChevronRight,
  Box,
  Code2,
  Clock3,
  FileCheck2,
} from 'lucide-react-native';
import { useProofs } from '../context/ProofContext';

const COLORS = {
  background: '#0D0E11',
  surface: '#18191E',
  surfaceElevated: '#202126',
  border: '#303138',
  primary: '#50E3A4',
  textPrimary: '#F5F5F7',
  textSecondary: '#A1A1AA',
  textMuted: '#71717A',
};

const weeklyData = [
  { day: 'Sun', value: 4 },
  { day: 'Mon', value: 6 },
  { day: 'Tue', value: 8 },
  { day: 'Wed', value: 10 },
  { day: 'Thu', value: 13 },
  { day: 'Fri', value: 8 },
  { day: 'Sat', value: 1 },
];

export default function HomeScreen() {
  const router = useRouter();
  const { width } = useWindowDimensions();
  const { proofs } = useProofs();

  const recentProofs = proofs.slice(0, 2);
  const maxValue = Math.max(
    ...weeklyData.map((item) => item.value)
  );
  const proofCount = proofs.length;
  const completedPercent = Math.min(
    100,
    Math.round((proofCount / 5) * 100)
  );
  const focusedHours = proofs.reduce(
    (total, proof) => total + proof.hours,
    0
  );
  const horizontalPadding = Math.max(
    16,
    Math.min(24, width * 0.045)
  );

  return (
    <View style={styles.screen}>
      <StatusBar
        barStyle="light-content"
        backgroundColor={COLORS.background}
      />

      <ScrollView
        style={styles.container}
        contentContainerStyle={[
          styles.content,
          { paddingHorizontal: horizontalPadding },
        ]}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.header}>
          <View style={styles.headerText}>
            <Text style={styles.greeting}>
              Good morning, Shristi
            </Text>

            <Text style={styles.headerSubtitle}>
              Here&apos;s what you&apos;ve shipped.
            </Text>
          </View>

          <TouchableOpacity
            style={styles.notificationButton}
            activeOpacity={0.75}
            onPress={() => router.push('/profile')}
          >
            <Bell
              size={22}
              color={COLORS.textPrimary}
              strokeWidth={2}
            />

            <View style={styles.notificationDot} />
          </TouchableOpacity>
        </View>

        <View style={styles.streakCard}>
          <View style={styles.streakContent}>
            <Text style={styles.eyebrow}>
              CURRENT STREAK
            </Text>

            <View style={styles.streakValueRow}>
              <Text style={styles.streakNumber}>14</Text>
              <Text style={styles.streakUnit}>days</Text>
            </View>

            <Text style={styles.streakMessage}>
              Keep shipping.
            </Text>
          </View>

          <View style={styles.streakIcon}>
            <Flame
              size={30}
              color={COLORS.primary}
              strokeWidth={2}
            />
          </View>
        </View>

        <TouchableOpacity
          style={styles.card}
          activeOpacity={0.9}
          onPress={() => router.push('/activity')}
        >
          <View style={styles.cardHeader}>
            <View style={styles.cardHeaderText}>
              <Text style={styles.sectionTitle}>
                Weekly activity
              </Text>

              <Text style={styles.sectionSubtitle}>
                {proofCount} proofs logged this week
              </Text>
            </View>

            <ChevronRight
              size={20}
              color={COLORS.textMuted}
            />
          </View>

          <View style={styles.chart}>
            {weeklyData.map((item) => {
              const barHeight =
                (item.value / maxValue) * 94 + 14;

              return (
                <View
                  key={item.day}
                  style={styles.barColumn}
                >
                  <Text style={styles.barValue}>
                    {item.value}
                  </Text>

                  <View style={styles.barTrack}>
                    <View
                      style={[
                        styles.bar,
                        {
                          height: barHeight,
                        },
                      ]}
                    />
                  </View>

                  <Text style={styles.dayLabel}>
                    {item.day}
                  </Text>
                </View>
              );
            })}
          </View>
        </TouchableOpacity>

        <View style={styles.card}>
          <Text style={styles.sectionTitle}>
            Today&apos;s output
          </Text>

          <Text style={styles.sectionSubtitle}>
            Progress across your logged work
          </Text>

          <View style={styles.outputContent}>
            <View style={styles.progressRing}>
              <View style={styles.progressRingInner}>
                <Text style={styles.progressPercent}>
                  {completedPercent}%
                </Text>

                <Text style={styles.progressLabel}>
                  complete
                </Text>
              </View>
            </View>

            <View style={styles.outputStats}>
              <View style={styles.outputStat}>
                <View style={styles.outputIconBox}>
                  <FileCheck2
                    size={20}
                    color={COLORS.primary}
                    strokeWidth={2}
                  />
                </View>

                <View style={styles.outputStatText}>
                  <Text style={styles.outputValue}>
                    {proofCount} of 5
                  </Text>

                  <Text style={styles.outputLabel}>
                    Proofs shipped
                  </Text>
                </View>
              </View>

              <View style={styles.statDivider} />

              <View style={styles.outputStat}>
                <View style={styles.outputIconBox}>
                  <Clock3
                    size={20}
                    color={COLORS.primary}
                    strokeWidth={2}
                  />
                </View>

                <View style={styles.outputStatText}>
                  <Text style={styles.outputValue}>
                    {focusedHours}h
                  </Text>

                  <Text style={styles.outputLabel}>
                    Focused work
                  </Text>
                </View>
              </View>
            </View>
          </View>
        </View>

        <View style={styles.card}>
          <View style={styles.cardHeader}>
            <View style={styles.cardHeaderText}>
              <Text style={styles.sectionTitle}>
                Recent proofs
              </Text>

              <Text style={styles.sectionSubtitle}>
                Latest verified work
              </Text>
            </View>
          </View>

          {recentProofs.map((proof, index) => (
            <TouchableOpacity
              key={proof.id}
              activeOpacity={0.8}
              onPress={() => router.push('/activity')}
              style={[
                styles.proofRow,
                index !== recentProofs.length - 1 &&
                  styles.proofBorder,
              ]}
            >
              <View style={styles.proofIcon}>
                {proof.category === 'DSA' ? (
                  <Code2
                    size={20}
                    color="#4ADE80"
                  />
                ) : (
                  <Box
                    size={20}
                    color="#4ADE80"
                  />
                )}
              </View>

              <View style={styles.proofText}>
                <Text style={styles.proofTitle}>
                  {proof.title}
                </Text>

                <Text style={styles.proofProject}>
                  {proof.project}
                </Text>
              </View>

              <ChevronRight
                size={20}
                color="#71717A"
              />
            </TouchableOpacity>
          ))}

          <TouchableOpacity
            activeOpacity={0.8}
            style={styles.analyticsButton}
            onPress={() => router.push('/analytics')}
          >
            <Text style={styles.analyticsButtonText}>
              View Analytics
            </Text>

            <ChevronRight
              size={18}
              color="#50E3A4"
            />
          </TouchableOpacity>
        </View>

        <TouchableOpacity
          style={styles.analyticsCard}
          activeOpacity={0.85}
          onPress={() => router.push('/analytics')}
        >
          <View>
            <Text style={styles.analyticsTitle}>
              Explore your progress
            </Text>

            <Text style={styles.analyticsSubtitle}>
              Trends, consistency and proof insights
            </Text>
          </View>

          <View style={styles.analyticsArrow}>
            <ChevronRight
              size={20}
              color={COLORS.primary}
            />
          </View>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: COLORS.background,
  },

  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },

  content: {
    paddingHorizontal: 18,
    paddingTop: 58,
    paddingBottom: 130,
  },

  /* HEADER */

  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 25,
  },

  headerText: {
    flex: 1,
    paddingRight: 16,
  },

  greeting: {
    color: COLORS.textPrimary,
    fontSize: 27,
    fontWeight: '800',
  },

  headerSubtitle: {
    color: COLORS.textSecondary,
    fontSize: 14,
    fontWeight: '500',
    marginTop: 5,
  },

  notificationButton: {
    width: 44,
    height: 44,
    borderRadius: 13,
    backgroundColor: COLORS.surface,
    borderWidth: 1,
    borderColor: COLORS.border,
    alignItems: 'center',
    justifyContent: 'center',
  },

  notificationDot: {
    position: 'absolute',
    top: 10,
    right: 10,
    width: 7,
    height: 7,
    borderRadius: 4,
    backgroundColor: '#FF5C5C',
    borderWidth: 1,
    borderColor: COLORS.surface,
  },

  /* STREAK */

  streakCard: {
    minHeight: 150,
    backgroundColor: COLORS.surface,
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: 20,
    padding: 20,
    marginBottom: 14,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },

  streakContent: {
    flex: 1,
  },

  eyebrow: {
    color: COLORS.textMuted,
    fontSize: 11,
    fontWeight: '700',
    letterSpacing: 1.2,
  },

  streakValueRow: {
    flexDirection: 'row',
    alignItems: 'baseline',
    marginTop: 8,
  },

  streakNumber: {
    color: COLORS.textPrimary,
    fontSize: 40,
    fontWeight: '800',
  },

  streakUnit: {
    color: COLORS.primary,
    fontSize: 17,
    fontWeight: '700',
    marginLeft: 7,
  },

  streakMessage: {
    color: COLORS.textSecondary,
    fontSize: 14,
    fontWeight: '500',
    marginTop: 3,
  },

  streakIcon: {
    width: 62,
    height: 62,
    borderRadius: 18,
    backgroundColor: COLORS.surfaceElevated,
    alignItems: 'center',
    justifyContent: 'center',
  },

  /* COMMON CARD */

  card: {
    width: '100%',
    backgroundColor: COLORS.surface,
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: 20,
    padding: 18,
    marginBottom: 14,
  },

  cardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },

  cardHeaderText: {
    flex: 1,
    paddingRight: 8,
  },

  sectionTitle: {
    color: COLORS.textPrimary,
    fontSize: 19,
    fontWeight: '700',
  },

  sectionSubtitle: {
    color: COLORS.textMuted,
    fontSize: 13,
    fontWeight: '500',
    marginTop: 5,
  },

  /* CHART */

  chart: {
    height: 185,
    flexDirection: 'row',
    alignItems: 'flex-end',
    marginTop: 24,
  },

  barColumn: {
    flex: 1,
    height: '100%',
    alignItems: 'center',
    justifyContent: 'flex-end',
  },

  barValue: {
    color: COLORS.textSecondary,
    fontSize: 11,
    fontWeight: '600',
    marginBottom: 7,
  },

  barTrack: {
    height: 110,
    justifyContent: 'flex-end',
  },

  bar: {
    width: 25,
    maxHeight: 108,
    backgroundColor: COLORS.primary,
    borderRadius: 6,
  },

  dayLabel: {
    color: COLORS.textMuted,
    fontSize: 11,
    fontWeight: '500',
    marginTop: 9,
  },

  /* OUTPUT */

  outputContent: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 24,
  },

  progressRing: {
    width: 112,
    height: 112,
    borderRadius: 56,
    borderWidth: 9,
    borderColor: COLORS.primary,
    alignItems: 'center',
    justifyContent: 'center',
  },

  progressRingInner: {
    width: 82,
    height: 82,
    borderRadius: 41,
    backgroundColor: COLORS.surface,
    alignItems: 'center',
    justifyContent: 'center',
  },

  progressPercent: {
    color: COLORS.textPrimary,
    fontSize: 24,
    fontWeight: '800',
  },

  progressLabel: {
    color: COLORS.textMuted,
    fontSize: 11,
    fontWeight: '500',
    marginTop: 2,
  },

  outputStats: {
    flex: 1,
    marginLeft: 25,
  },

  outputStat: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  outputIconBox: {
    width: 39,
    height: 39,
    borderRadius: 11,
    backgroundColor: COLORS.surfaceElevated,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 11,
  },

  outputStatText: {
    flex: 1,
  },

  outputValue: {
    color: COLORS.textPrimary,
    fontSize: 16,
    fontWeight: '700',
  },

  outputLabel: {
    color: COLORS.textSecondary,
    fontSize: 12,
    fontWeight: '500',
    marginTop: 3,
  },

  statDivider: {
    height: 1,
    backgroundColor: COLORS.border,
    marginVertical: 14,
  },

  /* PROOFS */

  proofsContainer: {
    marginTop: 10,
  },

  proofRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 15,
  },

  proofBorder: {
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
  },

  proofIcon: {
    width: 42,
    height: 42,
    borderRadius: 11,
    backgroundColor: COLORS.surfaceElevated,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },

  proofText: {
    flex: 1,
    paddingRight: 8,
  },

  proofTitle: {
    color: COLORS.textPrimary,
    fontSize: 15,
    fontWeight: '600',
  },
   
  proofProject: {
  color: '#A1A1AA',
  fontSize: 13,
  marginTop: 3,
},


  proofMetadata: {
    color: COLORS.textSecondary,
    fontSize: 12,
    fontWeight: '500',
    marginTop: 5,
  },

  viewActivityButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderTopWidth: 1,
    borderTopColor: COLORS.border,
    paddingTop: 16,
    marginTop: 3,
  },

  viewActivityText: {
    color: COLORS.primary,
    fontSize: 14,
    fontWeight: '700',
  },

  /* ANALYTICS */

  analyticsCard: {
    minHeight: 88,
    backgroundColor: COLORS.surface,
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: 18,
    paddingHorizontal: 18,
    paddingVertical: 17,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },

  analyticsTitle: {
    color: COLORS.textPrimary,
    fontSize: 16,
    fontWeight: '700',
  },

  analyticsSubtitle: {
    color: COLORS.textMuted,
    fontSize: 12,
    fontWeight: '500',
    marginTop: 5,
  },

  analyticsArrow: {
    width: 38,
    height: 38,
    borderRadius: 11,
    backgroundColor: COLORS.surfaceElevated,
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: 12,
  },

  analyticsButton: {
  flexDirection: 'row',
  alignItems: 'center',
  justifyContent: 'space-between',
  paddingTop: 15,
  marginTop: 4,
  borderTopWidth: 1,
  borderTopColor: '#343438',
},

analyticsButtonText: {
  color: '#50E3A4',
  fontSize: 14,
  fontWeight: '700',
},
});