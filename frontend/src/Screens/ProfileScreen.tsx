import React from 'react';

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

  ExternalLink,
  Smartphone,
  ServerCog,
  Database,
  Code2,
  Flame,
  FileCheck2,
  ChevronRight,
  GitBranch,
} from 'lucide-react-native';

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

const githubStats = [
  {
    id: 1,
    value: '342',
    label: 'Commits',
  },
  {
    id: 2,
    value: '18',
    label: 'Merged PRs',
  },
  {
    id: 3,
    value: '7',
    label: 'Repositories',
  },
];

const skills = [
  {
    id: 1,
    name: 'React Native',
    proofs: 14,
  },
  {
    id: 2,
    name: 'Python',
    proofs: 11,
  },
  {
    id: 3,
    name: 'TypeScript',
    proofs: 8,
  },
  {
    id: 4,
    name: 'FastAPI',
    proofs: 6,
  },
  {
    id: 5,
    name: 'Expo',
    proofs: 5,
  },
  {
    id: 6,
    name: 'PostgreSQL',
    proofs: 3,
  },
];

const projects = [
  {
    id: 1,
    title: 'ProofOfWork',
    subtitle: 'Mobile App',
    technologies: 'Expo · React Native',
    evidence: '47 commits',
    icon: 'mobile',
  },
  {
    id: 2,
    title: 'Crime Intelligence',
    subtitle: 'API',
    technologies: 'FastAPI · PostgreSQL',
    evidence: '12 endpoints',
    icon: 'server',
  },
  {
    id: 3,
    title: 'Crime Data',
    subtitle: 'Pipeline',
    technologies: 'Python · Pandas',
    evidence: '24 datasets',
    icon: 'database',
  },
];

export default function ProfileScreen() {
  const { width } = useWindowDimensions();
  const horizontalPadding = Math.max(
    16,
    Math.min(24, width * 0.045)
  );

  const renderProjectIcon = (icon: string) => {
    switch (icon) {
      case 'mobile':
        return (
          <Smartphone
            size={24}
            color={COLORS.primary}
            strokeWidth={2}
          />
        );

      case 'server':
        return (
          <ServerCog
            size={24}
            color={COLORS.primary}
            strokeWidth={2}
          />
        );

      case 'database':
        return (
          <Database
            size={24}
            color={COLORS.primary}
            strokeWidth={2}
          />
        );

      default:
        return (
          <Code2
            size={24}
            color={COLORS.primary}
            strokeWidth={2}
          />
        );
    }
  };

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
        {/* PROFILE HEADER */}

        <View style={styles.profileHeader}>
          <View style={styles.avatar}>
            <Text style={styles.avatarText}>S</Text>
          </View>

          <View style={styles.profileInfo}>
            <Text style={styles.profileName}>
              Shristi
            </Text>

            <Text style={styles.profileRole}>
              Developer · Building in public
            </Text>
          </View>
        </View>

        {/* GITHUB ACTIVITY */}

        <TouchableOpacity
          style={styles.githubCard}
          activeOpacity={0.9}
        >
          <View style={styles.githubHeader}>
            <View style={styles.githubTitleRow}>
              <View style={styles.githubIconBox}>
               <GitBranch
               size={23}
               color={COLORS.textPrimary}
               strokeWidth={2}
              />
              </View>

              <View style={styles.githubTitleContainer}>
                <Text style={styles.githubTitle}>
                  GitHub Activity
                </Text>

                <Text style={styles.githubSubtitle}>
                  Developer contribution summary
                </Text>
              </View>
            </View>

            <ExternalLink
              size={19}
              color={COLORS.textMuted}
            />
          </View>

          <View style={styles.githubStats}>
            {githubStats.map((stat, index) => (
              <View
                key={stat.id}
                style={[
                  styles.githubStat,
                  index !== githubStats.length - 1 &&
                    styles.githubStatBorder,
                ]}
              >
                <Text style={styles.githubStatValue}>
                  {stat.value}
                </Text>

                <Text style={styles.githubStatLabel}>
                  {stat.label}
                </Text>
              </View>
            ))}
          </View>

          <View style={styles.syncRow}>
            <View style={styles.syncDot} />

            <Text style={styles.syncText}>
              Synced 12 min ago
            </Text>
          </View>
        </TouchableOpacity>

        {/* SKILLS */}

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>
            Skills
          </Text>

          <View style={styles.skillsGrid}>
            {skills.map((skill) => (
              <TouchableOpacity
                key={skill.id}
                style={styles.skillCard}
                activeOpacity={0.85}
              >
                <Text style={styles.skillName}>
                  {skill.name}
                </Text>

                <Text style={styles.skillProofCount}>
                  {skill.proofs} proofs
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* PROJECTS */}

        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>
              Projects
            </Text>

            <TouchableOpacity
              style={styles.seeAllButton}
              activeOpacity={0.7}
            >
              <Text style={styles.seeAllText}>
                See all
              </Text>

              <ChevronRight
                size={17}
                color={COLORS.primary}
              />
            </TouchableOpacity>
          </View>

          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={
              styles.projectsContainer
            }
          >
            {projects.map((project) => (
              <TouchableOpacity
                key={project.id}
                style={styles.projectCard}
                activeOpacity={0.88}
              >
                <View style={styles.projectTopRow}>
                  <View style={styles.projectIconBox}>
                    {renderProjectIcon(project.icon)}
                  </View>

                  <ExternalLink
                    size={17}
                    color={COLORS.textMuted}
                  />
                </View>

                <View style={styles.projectTitleContainer}>
                  <Text style={styles.projectTitle}>
                    {project.title}
                  </Text>

                  <Text style={styles.projectSubtitle}>
                    {project.subtitle}
                  </Text>
                </View>

                <Text style={styles.projectTechnology}>
                  {project.technologies}
                </Text>

                <View style={styles.projectEvidenceRow}>
                  <View style={styles.evidenceDot} />

                  <Text style={styles.projectEvidence}>
                    {project.evidence}
                  </Text>
                </View>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>

        {/* PROOFS + STREAK */}

        <View style={styles.metricsSection}>
          {/* PROOFS */}

          <View style={styles.metricColumn}>
            <Text style={styles.sectionTitle}>
              Proofs
            </Text>

            <View style={styles.metricCard}>
              <View style={styles.metricTopRow}>
                <Text style={styles.metricNumber}>
                  102
                </Text>

                <View style={styles.metricIconBox}>
                  <FileCheck2
                    size={25}
                    color={COLORS.primary}
                    strokeWidth={2}
                  />
                </View>
              </View>

              <Text style={styles.metricLabel}>
                Proofs shipped
              </Text>

              <Text style={styles.metricPositive}>
                ↑ 12 in the last 7 days
              </Text>
            </View>
          </View>

          {/* STREAK */}

          <View style={styles.metricColumn}>
            <Text style={styles.sectionTitle}>
              Current Streak
            </Text>

            <View style={styles.metricCard}>
              <View style={styles.metricTopRow}>
                <View style={styles.streakValueRow}>
                  <Text style={styles.metricNumber}>
                    12
                  </Text>

                  <Text style={styles.daysText}>
                    days
                  </Text>
                </View>

                <View style={styles.metricIconBox}>
                  <Flame
                    size={27}
                    color={COLORS.primary}
                    strokeWidth={2}
                  />
                </View>
              </View>

              <Text style={styles.metricLabel}>
                Current streak
              </Text>

              <Text style={styles.metricMuted}>
                Personal best · 24 days
              </Text>
            </View>
          </View>
        </View>
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
  },

  content: {
    paddingHorizontal: 18,
    paddingTop: 58,
    paddingBottom: 130,
  },

  /* PROFILE HEADER */

  profileHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 24,
  },

  avatar: {
    width: 58,
    height: 58,
    borderRadius: 29,
    backgroundColor: COLORS.surfaceElevated,
    borderWidth: 1,
    borderColor: COLORS.border,
    justifyContent: 'center',
    alignItems: 'center',
  },

  avatarText: {
    color: COLORS.primary,
    fontSize: 24,
    fontWeight: '800',
  },

  profileInfo: {
    flex: 1,
    marginLeft: 14,
  },

  profileName: {
    color: COLORS.textPrimary,
    fontSize: 24,
    fontWeight: '800',
  },

  profileRole: {
    color: COLORS.textSecondary,
    fontSize: 14,
    fontWeight: '500',
    marginTop: 4,
  },

  /* GITHUB */

  githubCard: {
    backgroundColor: COLORS.surface,
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: 20,
    padding: 18,
    marginBottom: 32,
  },

  githubHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },

  githubTitleRow: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 12,
  },

  githubIconBox: {
    width: 44,
    height: 44,
    borderRadius: 12,
    backgroundColor: COLORS.surfaceElevated,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },

  githubTitleContainer: {
    flex: 1,
  },

  githubTitle: {
    color: COLORS.textPrimary,
    fontSize: 18,
    fontWeight: '700',
  },

  githubSubtitle: {
    color: COLORS.textMuted,
    fontSize: 12,
    marginTop: 3,
  },

  githubStats: {
    flexDirection: 'row',
    marginTop: 24,
  },

  githubStat: {
    flex: 1,
    alignItems: 'center',
    paddingHorizontal: 4,
  },

  githubStatBorder: {
    borderRightWidth: 1,
    borderRightColor: COLORS.border,
  },

  githubStatValue: {
    color: COLORS.textPrimary,
    fontSize: 23,
    fontWeight: '800',
  },

  githubStatLabel: {
    color: COLORS.textSecondary,
    fontSize: 12,
    marginTop: 6,
    textAlign: 'center',
  },

  syncRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 22,
    paddingTop: 15,
    borderTopWidth: 1,
    borderTopColor: COLORS.border,
  },

  syncDot: {
    width: 7,
    height: 7,
    borderRadius: 4,
    backgroundColor: COLORS.primary,
    marginRight: 8,
  },

  syncText: {
    color: COLORS.textSecondary,
    fontSize: 13,
    fontWeight: '500',
  },

  /* SECTIONS */

  section: {
    marginBottom: 32,
  },

  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 16,
  },

  sectionTitle: {
    color: COLORS.textPrimary,
    fontSize: 21,
    fontWeight: '700',
  },

  seeAllButton: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  seeAllText: {
    color: COLORS.primary,
    fontSize: 14,
    fontWeight: '700',
  },

  /* SKILLS */

  skillsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
    marginTop: 16,
  },

  skillCard: {
    width: '48%',
    minHeight: 68,
    backgroundColor: COLORS.surface,
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: 14,
    paddingHorizontal: 14,
    paddingVertical: 12,
    justifyContent: 'center',
  },

  skillName: {
    color: COLORS.textPrimary,
    fontSize: 15,
    fontWeight: '600',
  },

  skillProofCount: {
    color: COLORS.textSecondary,
    fontSize: 12,
    fontWeight: '500',
    marginTop: 5,
  },

  /* PROJECTS */

  projectsContainer: {
    gap: 12,
    paddingRight: 18,
  },

  projectCard: {
    width: 220,
    minHeight: 230,
    backgroundColor: COLORS.surface,
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: 18,
    padding: 17,
  },

  projectTopRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },

  projectIconBox: {
    width: 46,
    height: 46,
    borderRadius: 12,
    backgroundColor: COLORS.surfaceElevated,
    justifyContent: 'center',
    alignItems: 'center',
  },

  projectTitleContainer: {
    marginTop: 22,
  },

  projectTitle: {
    color: COLORS.textPrimary,
    fontSize: 17,
    fontWeight: '700',
  },

  projectSubtitle: {
    color: COLORS.textPrimary,
    fontSize: 17,
    fontWeight: '700',
    marginTop: 2,
  },

  projectTechnology: {
    color: COLORS.textSecondary,
    fontSize: 13,
    marginTop: 10,
  },

  projectEvidenceRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 'auto',
    paddingTop: 20,
  },

  evidenceDot: {
    width: 7,
    height: 7,
    borderRadius: 4,
    backgroundColor: COLORS.primary,
    marginRight: 8,
  },

  projectEvidence: {
    color: COLORS.primary,
    fontSize: 13,
    fontWeight: '600',
  },

  /* METRICS */

  metricsSection: {
    flexDirection: 'row',
    gap: 12,
  },

  metricColumn: {
    flex: 1,
  },

  metricCard: {
    minHeight: 210,
    backgroundColor: COLORS.surface,
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: 18,
    padding: 16,
    marginTop: 16,
  },

  metricTopRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },

  metricNumber: {
    color: COLORS.textPrimary,
    fontSize: 38,
    fontWeight: '800',
  },

  metricIconBox: {
    width: 46,
    height: 46,
    borderRadius: 13,
    backgroundColor: COLORS.surfaceElevated,
    justifyContent: 'center',
    alignItems: 'center',
  },

  metricLabel: {
    color: COLORS.textSecondary,
    fontSize: 14,
    fontWeight: '500',
    marginTop: 18,
  },

  metricPositive: {
    color: COLORS.primary,
    fontSize: 13,
    fontWeight: '600',
    marginTop: 'auto',
  },

  metricMuted: {
    color: COLORS.textMuted,
    fontSize: 13,
    fontWeight: '500',
    marginTop: 'auto',
  },

  streakValueRow: {
    flexDirection: 'row',
    alignItems: 'baseline',
  },

  daysText: {
    color: COLORS.primary,
    fontSize: 16,
    fontWeight: '700',
    marginLeft: 5,
  },
});