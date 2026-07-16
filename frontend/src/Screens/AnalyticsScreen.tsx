import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  StatusBar,
  TouchableOpacity,
  Platform,
  useWindowDimensions,
} from 'react-native';

import { ChevronLeft, ChevronRight } from 'lucide-react-native';

import Svg, {
  Path,
  Line,
  Circle,
  Defs,
  LinearGradient,
  Stop,
} from 'react-native-svg';

// ==========================================
// TYPES
// ==========================================

type LegendItemProps = {
  color: string;
  text: string;
};

type CodingHour = {
  day: string;
  value: number;
};

// ==========================================
// DATA
// ==========================================

const days: string[] = [
  'Sun',
  'Mon',
  'Tue',
  'Wed',
  'Thu',
  'Fri',
  'Sat',
];

const codingHours: CodingHour[] = [
  { day: 'Sun', value: 18 },
  { day: 'Mon', value: 13 },
  { day: 'Tue', value: 22 },
  { day: 'Wed', value: 23 },
  { day: 'Thu', value: 28 },
  { day: 'Fri', value: 30 },
  { day: 'Sat', value: 18 },
  { day: 'Sun', value: 13 },
];

// ==========================================
// LINE CHART PATHS
// ==========================================

const linePath = `
  M 10 105
  C 25 80, 30 65, 42 62
  S 65 72, 75 75
  S 95 25, 108 20
  S 130 75, 140 72
  S 165 65, 175 60
  S 200 30, 210 15
`;

const areaPath = `
  ${linePath}
  L 210 110
  L 10 110
  Z
`;

// ==========================================
// MAIN SCREEN
// ==========================================

export default function AnalyticsScreen() {
  const { width } = useWindowDimensions();
  const horizontalPadding = Math.max(
    16,
    Math.min(24, width * 0.045)
  );

  return (
    <View style={styles.safeArea}>
      <StatusBar
        barStyle="light-content"
        backgroundColor="#0D0E12"
      />

      <ScrollView
        style={styles.container}
        contentContainerStyle={[
          styles.content,
          { paddingHorizontal: horizontalPadding },
        ]}
        showsVerticalScrollIndicator={false}
      >
        {/* ================= HEADER ================= */}

        <View style={styles.header}>
          <TouchableOpacity activeOpacity={0.8}>
            <ChevronLeft size={25} color="#A9ABB2" />
          </TouchableOpacity>

          <Text style={styles.headerTitle}>
            Analytics
          </Text>

          <View style={styles.headerSpacer} />
        </View>

        {/* ========== WEEKLY CONSISTENCY ========== */}

        <View style={styles.card}>
          <View style={styles.cardHeader}>
            <Text style={styles.cardTitle}>
              Weekly Consistency
            </Text>

            <ChevronRight
              size={20}
              color="#8C8E94"
            />
          </View>

          <View style={styles.chartContainer}>
            {/* Y AXIS */}

            <View style={styles.yAxis}>
              <Text style={styles.axisText}>20</Text>
              <Text style={styles.axisText}>15</Text>
              <Text style={styles.axisText}>10</Text>
              <Text style={styles.axisText}>5</Text>
              <Text style={styles.axisText}>0</Text>
            </View>

            {/* LINE CHART */}

            <View style={styles.lineChartWrapper}>
              <Svg
                width="100%"
                height={120}
                viewBox="0 0 220 120"
              >
                <Defs>
                  <LinearGradient
                    id="greenGradient"
                    x1="0"
                    y1="0"
                    x2="0"
                    y2="1"
                  >
                    <Stop
                      offset="0%"
                      stopColor="#50F29B"
                      stopOpacity={0.35}
                    />

                    <Stop
                      offset="100%"
                      stopColor="#50F29B"
                      stopOpacity={0}
                    />
                  </LinearGradient>
                </Defs>

                {/* GRID LINES */}

                {[20, 42, 64, 86, 108].map(
                  (y, index) => (
                    <Line
                      key={index}
                      x1="0"
                      y1={y}
                      x2="220"
                      y2={y}
                      stroke="#34363D"
                      strokeWidth={1}
                    />
                  )
                )}

                {/* GREEN AREA */}

                <Path
                  d={areaPath}
                  fill="url(#greenGradient)"
                />

                {/* GREEN LINE */}

                <Path
                  d={linePath}
                  fill="none"
                  stroke="#50F29B"
                  strokeWidth={2.5}
                  strokeLinecap="round"
                />
              </Svg>

              {/* DAYS */}

              <View style={styles.daysRow}>
                {days.map((day) => (
                  <Text
                    key={day}
                    style={styles.dayText}
                  >
                    {day}
                  </Text>
                ))}
              </View>
            </View>
          </View>
        </View>

        {/* ============== CODING HOURS ============== */}

        <View style={styles.card}>
          <Text style={styles.cardTitle}>
            Coding Hours
          </Text>

          <View style={styles.barChartContainer}>
            {/* Y AXIS */}

            <View style={styles.barYAxis}>
              <Text style={styles.axisText}>30</Text>
              <Text style={styles.axisText}>20</Text>
              <Text style={styles.axisText}>10</Text>
              <Text style={styles.axisText}>0</Text>
            </View>

            {/* BAR AREA */}

            <View style={styles.barsArea}>
              <View
                style={[
                  styles.gridLine,
                  { top: 5 },
                ]}
              />

              <View
                style={[
                  styles.gridLine,
                  { top: 35 },
                ]}
              />

              <View
                style={[
                  styles.gridLine,
                  { top: 65 },
                ]}
              />

              <View
                style={[
                  styles.gridLine,
                  { top: 95 },
                ]}
              />

              <View style={styles.barsRow}>
                {codingHours.map(
                  (item, index) => (
                    <View
                      key={`${item.day}-${index}`}
                      style={styles.barItem}
                    >
                      <View
                        style={[
                          styles.bar,
                          {
                            height:
                              item.value * 3,
                            backgroundColor:
                              index >= 6
                                ? '#55565C'
                                : '#50F29B',
                          },
                        ]}
                      />

                      <Text
                        style={styles.barDay}
                      >
                        {item.day}
                      </Text>
                    </View>
                  )
                )}
              </View>
            </View>
          </View>
        </View>

        {/* =========== ACTIVITY BREAKDOWN =========== */}

        <View style={styles.card}>
          <Text style={styles.cardTitle}>
            Activity Breakdown
          </Text>

          <View style={styles.activityContent}>
            {/* DONUT CHART */}

            <View style={styles.donutWrapper}>
              <Svg
                width={135}
                height={135}
                viewBox="0 0 120 120"
              >
                {/* BASE CIRCLE */}

                <Circle
                  cx={60}
                  cy={60}
                  r={42}
                  stroke="#3F4147"
                  strokeWidth={30}
                  fill="none"
                />

                {/* PROJECTS 40% */}

                <Circle
                  cx={60}
                  cy={60}
                  r={42}
                  stroke="#50F29B"
                  strokeWidth={30}
                  fill="none"
                  strokeDasharray="105.5 158"
                  strokeDashoffset={0}
                  transform="rotate(-90 60 60)"
                />

                {/* DSA 30% */}

                <Circle
                  cx={60}
                  cy={60}
                  r={42}
                  stroke="#A7A9AE"
                  strokeWidth={30}
                  fill="none"
                  strokeDasharray="79 184"
                  strokeDashoffset={-105.5}
                  transform="rotate(-90 60 60)"
                />

                {/* LEARNING 20% */}

                <Circle
                  cx={60}
                  cy={60}
                  r={42}
                  stroke="#D0D1D4"
                  strokeWidth={30}
                  fill="none"
                  strokeDasharray="52.7 211"
                  strokeDashoffset={-184.5}
                  transform="rotate(-90 60 60)"
                />

                {/* OPEN SOURCE 10% */}

                <Circle
                  cx={60}
                  cy={60}
                  r={42}
                  stroke="#777980"
                  strokeWidth={30}
                  fill="none"
                  strokeDasharray="26.4 237"
                  strokeDashoffset={-237}
                  transform="rotate(-90 60 60)"
                />
              </Svg>

              {/* PERCENTAGE LABELS */}

              <Text
                style={[
                  styles.percent,
                  styles.percent40,
                ]}
              >
                40%
              </Text>

              <Text
                style={[
                  styles.percent,
                  styles.percent30,
                ]}
              >
                30%
              </Text>

              <Text
                style={[
                  styles.percent,
                  styles.percent20,
                ]}
              >
                20%
              </Text>

              <Text
                style={[
                  styles.percent,
                  styles.percent10,
                ]}
              >
                10%
              </Text>
            </View>

            {/* LEGEND */}

            <View style={styles.legend}>
              <LegendItem
                color="#50F29B"
                text="Projects"
              />

              <LegendItem
                color="#A7A9AE"
                text="DSA"
              />

              <LegendItem
                color="#D0D1D4"
                text="Learning"
              />

              <LegendItem
                color="#777980"
                text="Open Source"
              />
            </View>
          </View>
        </View>

        {/* ============ STREAK STATISTICS ============ */}

        <View style={styles.card}>
          <Text style={styles.cardTitle}>
            Streak Statistics
          </Text>

          <View style={styles.statsRow}>
            <View style={styles.statBox}>
              <Text style={styles.statLabel}>
                Longest Streak
              </Text>

              <Text style={styles.statNumber}>
                187
              </Text>
            </View>

            <View style={styles.verticalDivider} />

            <View style={styles.statBox}>
              <Text style={styles.statLabel}>
                Total Days Active
              </Text>

              <Text style={styles.statNumber}>
                190
              </Text>
            </View>
          </View>
        </View>

        <View style={styles.bottomSpace} />
      </ScrollView>
    </View>
  );
}

// ==========================================
// LEGEND COMPONENT
// ==========================================

function LegendItem({
  color,
  text,
}: LegendItemProps) {
  return (
    <View style={styles.legendItem}>
      <View
        style={[
          styles.legendDot,
          { backgroundColor: color },
        ]}
      />

      <Text style={styles.legendText}>
        {text}
      </Text>
    </View>
  );
}

// ==========================================
// STYLES
// ==========================================

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#0D0E12',
    paddingTop:
      Platform.OS === 'android'
        ? StatusBar.currentHeight ?? 0
        : 0,
  },

  container: {
    flex: 1,
    backgroundColor: '#0D0E12',
  },

  content: {
    paddingHorizontal: 10,
    paddingTop: 10,
  },

  // HEADER

  header: {
    height: 60,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 8,
  },

  headerTitle: {
    color: '#F4F4F5',
    fontSize: 18,
    fontWeight: '700',
  },

  headerSpacer: {
    width: 25,
  },

  // CARD

  card: {
    backgroundColor: '#202126',
    borderWidth: 1,
    borderColor: '#33343A',
    borderRadius: 13,
    padding: 14,
    marginBottom: 10,
  },

  cardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },

  cardTitle: {
    color: '#F1F1F2',
    fontSize: 16,
    fontWeight: '700',
    marginBottom: 10,
  },

  // LINE CHART

  chartContainer: {
    flexDirection: 'row',
    height: 145,
  },

  yAxis: {
    width: 25,
    height: 112,
    justifyContent: 'space-between',
  },

  axisText: {
    color: '#A5A6AB',
    fontSize: 10,
  },

  lineChartWrapper: {
    flex: 1,
  },

  daysRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 4,
    marginTop: 2,
  },

  dayText: {
    color: '#A5A6AB',
    fontSize: 10,
  },

  // BAR CHART

  barChartContainer: {
    flexDirection: 'row',
    height: 125,
  },

  barYAxis: {
    width: 25,
    height: 100,
    justifyContent: 'space-between',
  },

  barsArea: {
    flex: 1,
    position: 'relative',
  },

  gridLine: {
    position: 'absolute',
    left: 0,
    right: 0,
    height: 1,
    backgroundColor: '#34363D',
  },

  barsRow: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'space-around',
    paddingBottom: 20,
  },

  barItem: {
    height: 105,
    alignItems: 'center',
    justifyContent: 'flex-end',
  },

  bar: {
    width: 16,
    borderRadius: 3,
  },

  barDay: {
    color: '#B3B4B8',
    fontSize: 9,
    marginTop: 5,
  },

  // ACTIVITY BREAKDOWN

  activityContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  donutWrapper: {
    width: 145,
    height: 135,
    position: 'relative',
    justifyContent: 'center',
    alignItems: 'center',
  },

  percent: {
    position: 'absolute',
    color: '#111216',
    fontWeight: '800',
    fontSize: 13,
  },

  percent40: {
    right: 4,
    top: 52,
  },

  percent30: {
    left: 55,
    bottom: 3,
  },

  percent20: {
    left: 3,
    top: 54,
  },

  percent10: {
    left: 38,
    top: 8,
  },

  // LEGEND

  legend: {
    flex: 1,
    marginLeft: 10,
  },

  legendItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 5,
  },

  legendDot: {
    width: 11,
    height: 11,
    borderRadius: 6,
    marginRight: 9,
  },

  legendText: {
    color: '#E0E0E2',
    fontSize: 14,
  },

  // STREAK STATS

  statsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 5,
  },

  statBox: {
    flex: 1,
  },

  statLabel: {
    color: '#A9AAB0',
    fontSize: 13,
  },

  statNumber: {
    color: '#F5F5F6',
    fontSize: 22,
    fontWeight: '700',
    marginTop: 3,
  },

  verticalDivider: {
    width: 1,
    height: 45,
    backgroundColor: '#45464C',
    marginHorizontal: 12,
  },

  bottomSpace: {
    height: 30,
  },
});