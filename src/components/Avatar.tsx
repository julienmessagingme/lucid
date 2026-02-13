import React from 'react';
import { Image, StyleSheet, Text, View } from 'react-native';
import { colors, radius, typography } from '../theme';

interface AvatarProps {
  initials: string;
  size?: number;
  image?: string;
}

export function Avatar({ initials, size = 40, image }: AvatarProps) {
  const fontSize = size * 0.4;

  return (
    <View
      style={[
        styles.container,
        {
          width: size,
          height: size,
          borderRadius: radius.avatar,
        },
      ]}
    >
      {image ? (
        <Image
          source={{ uri: image }}
          style={{
            width: size,
            height: size,
            borderRadius: radius.avatar,
          }}
        />
      ) : (
        <Text style={[styles.initials, { fontSize }]}>{initials}</Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.surfaceLight,
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
  },
  initials: {
    ...typography.caption,
    color: colors.text,
  },
});
