/* eslint-disable react-native/no-inline-styles */
import React, { useState } from 'react';
import { View, FlatList, TouchableOpacity } from 'react-native';
import { AppColors, responsiveHeight, responsiveWidth } from '../../../utils';
import AppHeader from '../../../components/AppHeader';
import Container from '../../../components/Container';
import AppText from '../../../components/AppText';
import LineBreak from '../../../components/LineBreak';
import SVGXml from '../../../assets/icons/SVGXML';
import { AppIcons } from '../../../assets/icons';

const data = [
  {
    id: 1,
    title: 'How can i setup my account?',
    subTitle:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua',
  },
  {
    id: 2,
    title: 'How can i setup my account?',
    subTitle:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua',
  },
  {
    id: 3,
    title: 'How can i setup my account?',
    subTitle:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua',
  },
  {
    id: 4,
    title: 'How can i setup my account?',
    subTitle:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua',
  },
  {
    id: 5,
    title: 'How can i setup my account?',
    subTitle:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua',
  },
  {
    id: 6,
    title: 'How can i setup my account?',
    subTitle:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua',
  },
  {
    id: 7,
    title: 'How can i setup my account?',
    subTitle:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua',
  },
];

const Faqs = () => {
  const [expandedId, setExpandedId] = useState(null);

  const toggleExpand = id => {
    setExpandedId(prev => (prev === id ? null : id));
  };

  return (
    <Container>
      <View style={{ paddingHorizontal: responsiveWidth(5) }}>
        <AppHeader onBackPress={true} heading={'FAQs'} />
        <FlatList
          data={data}
          keyExtractor={item => item.id.toString()}
          ItemSeparatorComponent={<LineBreak space={1} />}
          renderItem={({ item }) => {
            const isExpanded = expandedId === item.id;
            return (
              <View
                style={{
                  backgroundColor: AppColors.app_light,
                  gap: responsiveWidth(2),
                  paddingHorizontal: responsiveWidth(3),
                  paddingVertical: responsiveHeight(1.5),
                  borderRadius: 10,
                }}
              >
                <View
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                  }}
                >
                  <AppText
                    title={item.title}
                    textSize={2}
                    textColor={AppColors.ThemeColor}
                    textFontWeight
                  />

                  <View style={{ flex: 1, alignItems: 'flex-end' }}>
                    <TouchableOpacity onPress={() => toggleExpand(item.id)}>
                      <SVGXml
                        icon={isExpanded ? AppIcons.minus : AppIcons.plus}
                        width={15}
                        height={15}
                      />
                    </TouchableOpacity>
                  </View>
                </View>

                {isExpanded && (
                  <AppText
                    title={item.subTitle}
                    textSize={1.6}
                    textColor={AppColors.ThemeColor}
                  />
                )}
              </View>
            );
          }}
        />
      </View>
    </Container>
  );
};

export default Faqs;
