import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, LayoutAnimation, UIManager, Platform } from 'react-native';

if (Platform.OS === 'android' && UIManager.setLayoutAnimationEnabledExperimental) {
  UIManager.setLayoutAnimationEnabledExperimental(true);
}

const Accordion = ({ title, content }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const toggleAccordion = () => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    setIsExpanded(!isExpanded);
  };

  return (
    <View className="border border-linegray overflow-hidden">
      <TouchableOpacity onPress={toggleAccordion} >
        <View className="flex flex-row justify-between p-2 items-center">
          <Text className="font-semibold text-lightText">{title}</Text>
          <Text className="text-lg">{isExpanded ? '-' : '+'}</Text>
        </View>
      </TouchableOpacity>

      {isExpanded && <View className="p-4 bg-linegray"><Text>{content}</Text></View>}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    borderWidth: 1,
    borderColor: '#e2e2e2',
    marginBottom: 10,
    overflow: 'hidden',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 10,
    backgroundColor: '#f2f2f2',
  },
  title: {
    fontWeight: 'bold',
  },
  content: {
    padding: 10,
  },
});

export default Accordion;
