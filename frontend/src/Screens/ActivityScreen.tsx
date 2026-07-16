import React, { useState } from 'react';

import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  useWindowDimensions,
} from 'react-native';

import {
  ChevronRight,
  GitPullRequest,
  Code2,
  BookOpen,
  FolderGit2,
} from 'lucide-react-native';

import {
  useProofs,
} from '../context/ProofContext';

const categories = [
  'All',
  'Project Work',
  'DSA',
  'Learning',
  'Open Source',
];

export default function ActivityScreen() {
  const { width } = useWindowDimensions();
  const [activeCategory, setActiveCategory] =
    useState('All');

  const { proofs } = useProofs();

  const filteredProofs =
    activeCategory === 'All'
      ? proofs
      : proofs.filter(
          (proof) =>
            proof.category === activeCategory
        );

  const renderIcon = (category: string) => {
    switch (category) {
      case 'Open Source':
        return (
          <GitPullRequest
            size={20}
            color="#50E3A4"
          />
        );

      case 'DSA':
        return (
          <Code2
            size={20}
            color="#50E3A4"
          />
        );

      case 'Learning':
        return (
          <BookOpen
            size={20}
            color="#50E3A4"
          />
        );

      default:
        return (
          <FolderGit2
            size={20}
            color="#50E3A4"
          />
        );
    }
  };

  const getTimeParts = (createdAt: string) => {
    const parts = createdAt.split(' ');

    return {
      time: parts[0] || createdAt,
      period: parts[1] || '',
    };
  };

  const horizontalPadding = Math.max(
    16,
    Math.min(24, width * 0.045)
  );

  return (
    <View style={styles.container}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={[
          styles.content,
          { paddingHorizontal: horizontalPadding },
        ]}
      >
        {/* HEADER */}

        <Text style={styles.screenTitle}>
          Activity
        </Text>

        {/* CATEGORY FILTERS */}

        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          style={styles.categoryScroll}
          contentContainerStyle={
            styles.categoriesContainer
          }
        >
          {categories.map((category) => {
            const isActive =
              activeCategory === category;

            return (
              <TouchableOpacity
                key={category}
                activeOpacity={0.8}
                onPress={() =>
                  setActiveCategory(category)
                }
                style={[
                  styles.categoryButton,
                  isActive &&
                    styles.activeCategoryButton,
                ]}
              >
                <Text
                  style={[
                    styles.categoryText,
                    isActive &&
                      styles.activeCategoryText,
                  ]}
                >
                  {category}
                </Text>
              </TouchableOpacity>
            );
          })}
        </ScrollView>

        {/* ACTIVITY TIMELINE */}

        <View style={styles.timeline}>
          {filteredProofs.length === 0 ? (
            <View style={styles.emptyState}>
              <Text style={styles.emptyTitle}>
                No proofs yet
              </Text>

              <Text style={styles.emptyDescription}>
                Add a proof to start building your
                activity timeline.
              </Text>
            </View>
          ) : (
            filteredProofs.map((proof, index) => {
              const { time, period } =
                getTimeParts(proof.createdAt);

              return (
                <View
                  key={proof.id}
                  style={styles.timelineItem}
                >
                  {/* TIME */}

                  <View style={styles.timeContainer}>
                    <Text style={styles.time}>
                      {time}
                    </Text>

                    <Text style={styles.period}>
                      {period}
                    </Text>
                  </View>

                  {/* TIMELINE */}

                  <View style={styles.lineContainer}>
                    <View
                      style={styles.timelineDot}
                    />

                    {index !==
                      filteredProofs.length - 1 && (
                      <View
                        style={styles.timelineLine}
                      />
                    )}
                  </View>

                  {/* PROOF CARD */}

                  <TouchableOpacity
                    activeOpacity={0.85}
                    style={styles.activityCard}
                    onPress={() => {}}
                  >
                    <View style={styles.cardTopRow}>
                      <View style={styles.iconBox}>
                        {renderIcon(
                          proof.category
                        )}
                      </View>

                      <View
                        style={styles.titleContainer}
                      >
                        <Text
                          style={styles.activityTitle}
                        >
                          {proof.title}
                        </Text>

                        <Text
                          style={styles.categoryLabel}
                        >
                          {proof.category}
                        </Text>
                      </View>

                      <ChevronRight
                        size={20}
                        color="#77777F"
                      />
                    </View>

                    {/* TAGS */}

                    <View
                      style={styles.tagsContainer}
                    >
                      {proof.tags.map((tag) => (
                        <View
                          key={tag}
                          style={styles.tag}
                        >
                          <Text
                            style={styles.tagText}
                          >
                            {tag}
                          </Text>
                        </View>
                      ))}
                    </View>

                    {/* DESCRIPTION */}

                    <Text style={styles.description}>
                      {proof.description}
                    </Text>

                    {/* TIME SPENT */}

                    <Text style={styles.timeSpent}>
                      {proof.hours}h {proof.minutes}m
                      {'  '}focused
                    </Text>
                  </TouchableOpacity>
                </View>
              );
            })
          )}
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0D0E11',
  },

  content: {
    paddingTop: 55,
    paddingBottom: 130,
  },

  /* HEADER */

  screenTitle: {
    color: '#FFFFFF',
    fontSize: 30,
    fontWeight: '800',
    textAlign: 'center',
    marginBottom: 28,
  },

  /* CATEGORIES */

  categoryScroll: {
    flexGrow: 0,
    marginBottom: 30,
  },

  categoriesContainer: {
    paddingHorizontal: 16,
    gap: 10,
  },

  categoryButton: {
    height: 44,
    paddingHorizontal: 20,
    borderRadius: 22,
    backgroundColor: '#24252A',
    borderWidth: 1,
    borderColor: '#3A3B40',
    justifyContent: 'center',
    alignItems: 'center',
  },

  activeCategoryButton: {
    backgroundColor: '#50E3A4',
    borderColor: '#50E3A4',
  },

  categoryText: {
    color: '#D5D5D8',
    fontSize: 15,
    fontWeight: '600',
  },

  activeCategoryText: {
    color: '#101114',
    fontWeight: '800',
  },

  /* TIMELINE */

  timeline: {
    paddingHorizontal: 16,
  },

  timelineItem: {
    flexDirection: 'row',
    alignItems: 'stretch',
    marginBottom: 20,
  },

  /* TIME */

  timeContainer: {
    width: 62,
    paddingTop: 14,
  },

  time: {
    color: '#A1A1AA',
    fontSize: 14,
    fontWeight: '600',
  },

  period: {
    color: '#71717A',
    fontSize: 12,
    marginTop: 3,
  },

  /* LINE */

  lineContainer: {
    width: 26,
    alignItems: 'center',
  },

  timelineDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: '#50E3A4',
    marginTop: 19,
    zIndex: 2,
  },

  timelineLine: {
    position: 'absolute',
    top: 28,
    bottom: -25,
    width: 2,
    backgroundColor: '#303136',
  },

  /* ACTIVITY CARD */

  activityCard: {
    flex: 1,
    backgroundColor: '#202126',
    borderRadius: 18,
    borderWidth: 1,
    borderColor: '#37383E',
    padding: 16,
  },

  cardTopRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  iconBox: {
    width: 38,
    height: 38,
    borderRadius: 10,
    backgroundColor: '#2B2C31',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 11,
  },

  titleContainer: {
    flex: 1,
  },

  activityTitle: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '700',
  },

  categoryLabel: {
    color: '#8E8E96',
    fontSize: 12,
    marginTop: 4,
  },

  /* TAGS */

  tagsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 7,
    marginTop: 14,
  },

  tag: {
    backgroundColor: '#393A40',
    paddingHorizontal: 11,
    paddingVertical: 6,
    borderRadius: 15,
  },

  tagText: {
    color: '#E4E4E7',
    fontSize: 12,
    fontWeight: '500',
  },

  /* DESCRIPTION */

  description: {
    color: '#50E3A4',
    fontSize: 14,
    fontWeight: '600',
    marginTop: 14,
  },

  timeSpent: {
    color: '#71717A',
    fontSize: 12,
    fontWeight: '500',
    marginTop: 10,
  },

  /* EMPTY */

  emptyState: {
    alignItems: 'center',
    paddingVertical: 70,
    paddingHorizontal: 30,
  },

  emptyTitle: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: '700',
  },

  emptyDescription: {
    color: '#71717A',
    fontSize: 14,
    textAlign: 'center',
    lineHeight: 21,
    marginTop: 8,
  },
});