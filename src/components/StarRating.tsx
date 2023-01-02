import {StyleProp, StyleSheet, View, ViewStyle} from 'react-native';
import React from 'react';
import {theme} from 'styles/theme';
import StarRatingComp from 'react-native-star-rating';

interface IProps {
  fullStarColor?: string;
  containerStyle?: StyleProp<ViewStyle>;
  starStyle?: StyleProp<ViewStyle>;
  disabled?: boolean;
  starSize?: number;
  rating?: number;
  maxStars?: number;
  selectedStar?: (rating: number) => void;
}

const StarRating: React.FC<IProps> = ({
  fullStarColor,
  containerStyle,
  disabled,
  starSize,
  rating,
  maxStars,
  starStyle,
  selectedStar,
}) => {
  return (
    <StarRatingComp
      containerStyle={containerStyle || {width: 50}}
      starSize={starSize || 10}
      fullStarColor={fullStarColor || theme.colors.yellow}
      disabled={!!disabled}
      maxStars={maxStars || 5}
      rating={rating || 4}
      starStyle={starStyle}
      selectedStar={selectedStar}
    />
  );
};

export default StarRating;

const styles = StyleSheet.create({});
