import React, { useState } from 'react';

import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  ScrollView,
  StatusBar,
  Alert,
} from 'react-native';

import { useRouter } from 'expo-router';

import {
  ChevronLeft,
  ChevronDown,
  Upload,
} from 'lucide-react-native';

import { useProofs } from '../context/ProofContext';

const categories = [
  'Project Work',
  'DSA',
  'Learning',
  'Open Source',
];

export default function AddProofScreen() {
  const router = useRouter();

  const { addProof } = useProofs();

  const [title, setTitle] = useState('');
  const [category, setCategory] =
    useState('Project Work');

  const [proofLink, setProofLink] = useState('');
  const [hours, setHours] = useState('');
  const [minutes, setMinutes] = useState('');
  const [description, setDescription] = useState('');

  const [showCategories, setShowCategories] =
    useState(false);

  const handlePostProof = () => {
    const cleanTitle = title.trim();
    const cleanDescription = description.trim();
    const cleanProofLink = proofLink.trim();

  if (!cleanTitle) {
    Alert.alert(
      'Title required',
      'Please enter a title for your proof.'
    );
    return;
  }

  if (!cleanDescription) {
    Alert.alert(
      'Description required',
      'Please describe what you completed.'
    );
    return;
  }

  const parsedHours = Number(hours || 0);
  const parsedMinutes = Number(minutes || 0);

  if (
    Number.isNaN(parsedHours) ||
    Number.isNaN(parsedMinutes) ||
    parsedHours < 0 ||
    parsedMinutes < 0 ||
    parsedMinutes > 59
  ) {
    Alert.alert(
      'Invalid time',
      'Please enter valid hours and minutes.'
    );
    return;
  }

addProof({
  title: cleanTitle,
  project: cleanProofLink || 'ProofOfWork',
  category: category,
  description: cleanDescription,
  tags: [category],
  hours: parsedHours,
  minutes: parsedMinutes,
});
  Alert.alert(
    'Proof Posted',
    'Your proof has been added successfully.',
    [
      {
        text: 'View Activity',
        onPress: () => {
          router.replace('/activity');
        },
      },
    ]
  );
};


  return (
    <View style={styles.screen}>
      <StatusBar barStyle="light-content" />

      <ScrollView
        style={styles.container}
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
      >
        {/* HEADER */}

        <View style={styles.header}>
          <TouchableOpacity
            style={styles.backButton}
            onPress={() => router.back()}
          >
            <ChevronLeft
              size={26}
              color="#B8B8BE"
            />
          </TouchableOpacity>

          <Text style={styles.headerTitle}>
            Add Proof
          </Text>

          <View style={styles.headerSpacer} />
        </View>

        {/* TITLE */}

        <View style={styles.fieldGroup}>
          <Text style={styles.label}>
            Title
          </Text>

          <TextInput
            style={styles.input}
            placeholder="Implement multi-factor authentication"
            placeholderTextColor="#8E8E95"
            value={title}
            onChangeText={setTitle}
          />
        </View>

        {/* CATEGORY */}

        <View style={styles.fieldGroup}>
          <Text style={styles.label}>
            Category
          </Text>

          <TouchableOpacity
            style={styles.categoryInput}
            activeOpacity={0.8}
            onPress={() =>
              setShowCategories(
                (currentValue) => !currentValue
              )
            }
          >
            <Text style={styles.categoryText}>
              {category}
            </Text>

            <ChevronDown
              size={18}
              color="#9A9AA1"
            />
          </TouchableOpacity>

          {showCategories && (
            <View style={styles.categoryMenu}>
              {categories.map((item) => (
                <TouchableOpacity
                  key={item}
                  style={styles.categoryOption}
                  activeOpacity={0.8}
                  onPress={() => {
                    setCategory(item);
                    setShowCategories(false);
                  }}
                >
                  <Text
                    style={[
                      styles.categoryOptionText,

                      category === item &&
                        styles.activeCategoryOptionText,
                    ]}
                  >
                    {item}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          )}
        </View>

        {/* PROOF LINK */}

        <View style={styles.fieldGroup}>
          <Text style={styles.label}>
            Proof Link
          </Text>

          <TextInput
            style={styles.input}
            placeholder="https://github.com/your-project"
            placeholderTextColor="#77777F"
            value={proofLink}
            onChangeText={setProofLink}
            autoCapitalize="none"
            keyboardType="url"
          />
        </View>

        {/* TIME SPENT */}

        <View style={styles.fieldGroup}>
          <Text style={styles.label}>
            Time Spent
          </Text>

          <View style={styles.timeRow}>
            <View style={styles.timeInputBox}>
              <TextInput
                style={styles.timeInput}
                placeholder="10"
                placeholderTextColor="#D4D4D8"
                value={hours}
                onChangeText={setHours}
                keyboardType="numeric"
              />

              <Text style={styles.timeUnit}>
                hours
              </Text>
            </View>

            <View style={styles.timeInputBox}>
              <TextInput
                style={styles.timeInput}
                placeholder="0"
                placeholderTextColor="#D4D4D8"
                value={minutes}
                onChangeText={setMinutes}
                keyboardType="numeric"
              />

              <Text style={styles.timeUnit}>
                minutes
              </Text>
            </View>
          </View>
        </View>

        {/* DESCRIPTION */}

        <View style={styles.fieldGroup}>
          <Text style={styles.label}>
            Description
          </Text>

          <TextInput
            style={styles.descriptionInput}
            placeholder="Describe what you built or completed..."
            placeholderTextColor="#77777F"
            value={description}
            onChangeText={setDescription}
            multiline
            textAlignVertical="top"
          />
        </View>

        {/* ATTACHMENT */}

        <View style={styles.fieldGroup}>
          <Text style={styles.label}>
            Attachment
          </Text>

          <TouchableOpacity
            style={styles.uploadBox}
            activeOpacity={0.8}
            onPress={() => {
              Alert.alert(
                'Coming next',
                'Media upload will be connected after proof saving.'
              );
            }}
          >
            <Upload
              size={25}
              color="#A2A2A9"
              strokeWidth={1.7}
            />

            <Text style={styles.uploadText}>
              Upload media
            </Text>
          </TouchableOpacity>
        </View>

        {/* POST BUTTON */}

        <TouchableOpacity
          style={styles.postButton}
          activeOpacity={0.85}
          onPress={handlePostProof}
        >
          <Text style={styles.postButtonText}>
            Post Proof
          </Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: '#0D0D10',
  },

  container: {
    flex: 1,
  },

  content: {
    paddingHorizontal: 18,
    paddingTop: 12,
    paddingBottom: 35,
  },

  /* HEADER */

  header: {
    height: 65,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 12,
  },

  backButton: {
    width: 42,
    height: 42,
    justifyContent: 'center',
    alignItems: 'flex-start',
  },

  headerTitle: {
    color: '#F5F5F7',
    fontSize: 18,
    fontWeight: '700',
  },

  headerSpacer: {
    width: 42,
  },

  /* FORM */

  fieldGroup: {
    marginBottom: 16,
  },

  label: {
    color: '#F0F0F2',
    fontSize: 15,
    fontWeight: '600',
    marginBottom: 8,
  },

  input: {
    width: '100%',
    height: 50,
    backgroundColor: '#242429',
    borderWidth: 1,
    borderColor: '#38383F',
    borderRadius: 9,
    paddingHorizontal: 13,
    color: '#FFFFFF',
    fontSize: 15,
  },

  /* CATEGORY */

  categoryInput: {
    width: '100%',
    height: 50,
    backgroundColor: '#242429',
    borderWidth: 1,
    borderColor: '#38383F',
    borderRadius: 9,
    paddingHorizontal: 13,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },

  categoryText: {
    color: '#D5D5D9',
    fontSize: 15,
  },

  categoryMenu: {
    backgroundColor: '#202025',
    borderWidth: 1,
    borderColor: '#38383F',
    borderRadius: 9,
    marginTop: 8,
    overflow: 'hidden',
  },

  categoryOption: {
    minHeight: 48,
    justifyContent: 'center',
    paddingHorizontal: 13,
    borderBottomWidth: 1,
    borderBottomColor: '#303036',
  },

  categoryOptionText: {
    color: '#D5D5D9',
    fontSize: 15,
    fontWeight: '500',
  },

  activeCategoryOptionText: {
    color: '#48F59A',
    fontWeight: '700',
  },

  /* TIME */

  timeRow: {
    flexDirection: 'row',
    gap: 10,
  },

  timeInputBox: {
    flex: 1,
    height: 50,
    backgroundColor: '#242429',
    borderWidth: 1,
    borderColor: '#38383F',
    borderRadius: 9,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
  },

  timeInput: {
    flex: 1,
    color: '#FFFFFF',
    fontSize: 15,
    paddingVertical: 0,
  },

  timeUnit: {
    color: '#99999F',
    fontSize: 14,
  },

  /* DESCRIPTION */

  descriptionInput: {
    width: '100%',
    height: 120,
    backgroundColor: '#242429',
    borderWidth: 1,
    borderColor: '#38383F',
    borderRadius: 9,
    paddingHorizontal: 13,
    paddingTop: 13,
    color: '#FFFFFF',
    fontSize: 15,
  },

  /* UPLOAD */

  uploadBox: {
    height: 100,
    borderWidth: 1,
    borderStyle: 'dashed',
    borderColor: '#505057',
    borderRadius: 10,
    backgroundColor: '#202025',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 8,
  },

  uploadText: {
    color: '#A2A2A9',
    fontSize: 15,
  },

  /* BUTTON */

  postButton: {
    height: 52,
    backgroundColor: '#48F59A',
    borderRadius: 9,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 2,
  },

  postButtonText: {
    color: '#07140D',
    fontSize: 16,
    fontWeight: '700',
  },

});