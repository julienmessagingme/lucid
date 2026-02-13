# Lucid — Design Notes

Reference document for design tokens, component APIs, and design decisions.

---

## Color Palette

| Token              | Hex       | Usage                                  |
|--------------------|-----------|----------------------------------------|
| `bg`               | `#0D0D0F` | Main background                        |
| `card`             | `#1A1A1E` | Card / surface background              |
| `cardAlt`          | `#242428` | Alternate card background              |
| `border`           | `#2E2E33` | Borders and dividers                   |
| `textPrimary`      | `#FFFFFF` | Primary text                           |
| `textSecondary`    | `#A0A0A8` | Secondary / muted text                 |
| `accent`           | `#6C5CE7` | Primary accent (CTA, active tabs)      |
| `accentLight`      | `#8B7CF6` | Lighter accent variant                 |
| `success`          | `#00E676` | Positive indicators                    |
| `warning`          | `#FFC107` | Warning indicators                     |
| `error`            | `#FF5252` | Error / destructive indicators         |
| `gradientStart`    | `#6C5CE7` | Gradient start (accent)                |
| `gradientEnd`      | `#8B7CF6` | Gradient end (accent light)            |
| `skeleton`         | `#2A2A2E` | Skeleton loader base                   |
| `skeletonHighlight`| `#3A3A3E` | Skeleton loader shimmer highlight      |

---

## Spacing Scale

All spacing values follow a 4px base unit:

| Token | Value |
|-------|-------|
| `xs`  | 4px   |
| `s`   | 8px   |
| `m`   | 12px  |
| `l`   | 16px  |
| `xl`  | 20px  |
| `xxl` | 24px  |
| `3xl` | 32px  |
| `4xl` | 40px  |
| `5xl` | 48px  |

Usage: padding, margin, and gap values across all components reference these tokens to ensure consistent rhythm.

---

## Border Radius Tokens

| Token    | Value | Usage                               |
|----------|-------|-------------------------------------|
| `s`      | 8px   | Small elements (chips, badges)      |
| `m`      | 12px  | Cards, inputs                       |
| `l`      | 16px  | Larger cards, modals                |
| `xl`     | 20px  | CTAs, prominent interactive items   |
| `full`   | 9999px| Circular elements (avatars, dots)   |

---

## Typography Scale

All fonts use the system default (San Francisco on iOS, Roboto on Android).

| Token       | Size | Weight     | Usage                        |
|-------------|------|------------|------------------------------|
| `h1`        | 28px | Bold (700) | Screen titles                |
| `h2`        | 22px | Bold (700) | Section headings             |
| `h3`        | 18px | SemiBold (600) | Card titles, sub-headings |
| `body`      | 15px | Regular (400) | Body text                 |
| `bodySm`    | 13px | Regular (400) | Secondary info, captions  |
| `caption`   | 11px | Medium (500)  | Labels, timestamps        |
| `cta`       | 16px | Bold (700)    | Button text               |
| `stat`      | 32px | Bold (700)    | Large stat numbers        |

Line heights are set at 1.4x the font size for body text and 1.2x for headings.

---

## Shadow Style

A single shared shadow token applied to elevated cards and floating elements:

```ts
shadow: {
  shadowColor: '#000000',
  shadowOffset: { width: 0, height: 4 },
  shadowOpacity: 0.3,
  shadowRadius: 8,
  elevation: 6,       // Android
}
```

Used on: floating action button, modals, elevated cards, bottom tab bar.

---

## Component API Summary

### `GradientButton`
| Prop          | Type                  | Default     | Description                          |
|---------------|-----------------------|-------------|--------------------------------------|
| `title`       | `string`              | required    | Button label                         |
| `onPress`     | `() => void`          | required    | Press handler                        |
| `variant`     | `'primary' \| 'secondary'` | `'primary'` | Visual style                    |
| `disabled`    | `boolean`             | `false`     | Disables interaction and dims button |
| `loading`     | `boolean`             | `false`     | Shows a spinner instead of text      |

### `Card`
| Prop          | Type                  | Default     | Description                          |
|---------------|-----------------------|-------------|--------------------------------------|
| `children`    | `ReactNode`           | required    | Card content                         |
| `variant`     | `'default' \| 'alt'`  | `'default'` | Background color variant             |
| `onPress`     | `() => void`          | `undefined` | Makes card pressable                 |
| `style`       | `ViewStyle`           | `undefined` | Style overrides                      |

### `StatCard`
| Prop          | Type                  | Default     | Description                          |
|---------------|-----------------------|-------------|--------------------------------------|
| `label`       | `string`              | required    | Stat description                     |
| `value`       | `string`              | required    | Stat number / formatted value        |
| `icon`        | `string`              | required    | Icon name (Ionicons)                 |
| `trend`       | `'up' \| 'down' \| 'neutral'` | `'neutral'` | Trend direction indicator  |

### `ProgressRing`
| Prop          | Type                  | Default     | Description                          |
|---------------|-----------------------|-------------|--------------------------------------|
| `progress`    | `number`              | required    | 0..1 progress value                  |
| `size`        | `number`              | `64`        | Diameter in px                       |
| `strokeWidth` | `number`              | `6`         | Ring stroke width                    |
| `color`       | `string`              | `accent`    | Ring fill color                      |

### `BarChart`
| Prop          | Type                  | Default     | Description                          |
|---------------|-----------------------|-------------|--------------------------------------|
| `data`        | `{ label: string; value: number }[]` | required | Chart data points      |
| `height`      | `number`              | `160`       | Chart height in px                   |
| `barColor`    | `string`              | `accent`    | Bar fill color                       |
| `activeIndex` | `number`              | `undefined` | Highlighted bar index                |

### `LineChart`
| Prop          | Type                  | Default     | Description                          |
|---------------|-----------------------|-------------|--------------------------------------|
| `data`        | `number[]`            | required    | Y-axis values                        |
| `labels`      | `string[]`            | `[]`        | X-axis labels                        |
| `height`      | `number`              | `160`       | Chart height in px                   |
| `color`       | `string`              | `accent`    | Line / fill color                    |

### `BodyMap`
| Prop          | Type                  | Default     | Description                          |
|---------------|-----------------------|-------------|--------------------------------------|
| `highlights`  | `string[]`            | `[]`        | Muscle group IDs to highlight        |
| `onPress`     | `(muscleId: string) => void` | `undefined` | Muscle group tap handler    |

### `ExerciseCard`
| Prop          | Type                  | Default     | Description                          |
|---------------|-----------------------|-------------|--------------------------------------|
| `exercise`    | `Exercise`            | required    | Exercise mock data object            |
| `index`       | `number`              | required    | Position in the workout list         |
| `onPress`     | `() => void`          | required    | Press handler                        |

### `RestTimer`
| Prop          | Type                  | Default     | Description                          |
|---------------|-----------------------|-------------|--------------------------------------|
| `duration`    | `number`              | required    | Duration in seconds                  |
| `onComplete`  | `() => void`          | required    | Callback when timer reaches zero     |
| `onSkip`      | `() => void`          | required    | Callback when user taps skip         |

### `SurveySlider`
| Prop          | Type                  | Default     | Description                          |
|---------------|-----------------------|-------------|--------------------------------------|
| `label`       | `string`              | required    | Question text                        |
| `value`       | `number`              | required    | Current slider value                 |
| `onChange`    | `(v: number) => void` | required    | Value change handler                 |
| `min`         | `number`              | `1`         | Minimum value                        |
| `max`         | `number`              | `10`        | Maximum value                        |

### `SkeletonBlock`
| Prop          | Type                  | Default     | Description                          |
|---------------|-----------------------|-------------|--------------------------------------|
| `width`       | `DimensionValue`      | `'100%'`    | Block width                          |
| `height`      | `number`              | `16`        | Block height                         |
| `radius`      | `number`              | `m` (12)    | Border radius                        |

### `QuoteModal`
| Prop          | Type                  | Default     | Description                          |
|---------------|-----------------------|-------------|--------------------------------------|
| `visible`     | `boolean`             | required    | Controls modal visibility            |
| `quote`       | `Quote`               | required    | Quote object (text + author)         |
| `onClose`     | `() => void`          | required    | Close handler                        |

### `SectionHeader`
| Prop          | Type                  | Default     | Description                          |
|---------------|-----------------------|-------------|--------------------------------------|
| `title`       | `string`              | required    | Section title                        |
| `action`      | `string`              | `undefined` | Optional right-side link text        |
| `onAction`    | `() => void`          | `undefined` | Action press handler                 |

### `TabIcon`
| Prop          | Type                  | Default     | Description                          |
|---------------|-----------------------|-------------|--------------------------------------|
| `name`        | `string`              | required    | Ionicons icon name                   |
| `focused`     | `boolean`             | required    | Whether tab is active                |
| `label`       | `string`              | required    | Accessibility label                  |

### `WeightInput`
| Prop          | Type                  | Default     | Description                          |
|---------------|-----------------------|-------------|--------------------------------------|
| `value`       | `string`              | required    | Current weight string                |
| `onChange`     | `(v: string) => void` | required    | Value change handler                 |
| `unit`        | `'kg' \| 'lbs'`      | `'kg'`      | Weight unit                          |

### `PreferenceRow`
| Prop          | Type                  | Default     | Description                          |
|---------------|-----------------------|-------------|--------------------------------------|
| `label`       | `string`              | required    | Preference name                      |
| `value`       | `string \| boolean`   | required    | Current value or toggle state        |
| `onPress`     | `() => void`          | required    | Press handler                        |
| `type`        | `'toggle' \| 'select'`| `'select'`  | Row interaction type                 |

### `NotchTabBar`
| Prop          | Type                  | Default     | Description                          |
|---------------|-----------------------|-------------|--------------------------------------|
| `state`       | `TabNavigationState`  | required    | React Navigation tab state           |
| `descriptors` | `BottomTabDescriptorsMap` | required | Tab descriptors                     |
| `navigation`  | `NavigationHelpers`   | required    | Navigation object                    |

---

## Design Decisions

### Dark Theme Rationale
The app uses a fully dark UI (`bg: #0D0D0F`) for several reasons:
- Fitness apps are frequently used in gym environments with mixed lighting; dark themes reduce glare.
- OLED screens benefit from true-dark backgrounds (battery savings and contrast).
- The dark surface makes the purple accent (`#6C5CE7`) pop, creating a premium, focused aesthetic.
- All text passes WCAG AA contrast ratios against the dark backgrounds.

### Notch Tab Bar
The bottom tab bar features a custom SVG notch (concave cutout) in the center that houses a floating "+" action button. This design:
- Creates a clear visual hierarchy — the primary action (start session) is elevated above navigation.
- Uses an SVG path for the notch shape to ensure pixel-perfect rendering at all screen widths.
- The "+" button has a gradient fill and shadow to reinforce its importance.

### Pillow CTA Style
Primary call-to-action buttons use a "pillow" style:
- `borderRadius: 20px` (xl token) for a soft, rounded appearance.
- Linear gradient fill (accent to accentLight) for depth.
- `paddingVertical: 16px` for a generous touch target.
- Subtle shadow to lift the button above the surface.
- This creates buttons that feel tappable and inviting without sharp edges.

### Card Layering
Cards use two background levels (`card: #1A1A1E` and `cardAlt: #242428`) to create depth hierarchy without relying solely on shadows. Nested information (e.g., exercise details within a session card) uses the alternate level.

### Stat Presentation
Large stat numbers use the `stat` typography token (32px Bold) paired with a small `caption` label below. This "big number, small label" pattern provides instant scanability during or after workouts.

---

## Accessibility

### Touch Targets
All interactive elements maintain a minimum touch target of **44x44px** (Apple HIG recommendation):
- Tab bar icons: 48x48px hit area
- Buttons: minimum height 48px via padding
- Card press areas: full card surface
- Slider thumb: 44x44px

### Labels
Every interactive element carries an `accessibilityLabel`:
- Buttons: descriptive action (e.g., `"Start workout session"`)
- Tab icons: tab name + state (e.g., `"Home tab, selected"`)
- Stat cards: `"${label}: ${value}"` combined label
- Charts: summary description (e.g., `"Weekly workout bar chart"`)
- Body map regions: muscle group name (e.g., `"Chest muscles"`)
- Sliders: `"${label}, current value ${value} out of ${max}"`

### Contrast
- Primary text (#FFFFFF) on bg (#0D0D0F): contrast ratio 19.3:1 (AAA)
- Secondary text (#A0A0A8) on bg (#0D0D0F): contrast ratio 7.2:1 (AA)
- Accent (#6C5CE7) on bg (#0D0D0F): contrast ratio 4.6:1 (AA for large text)

---

## Animation Patterns

### Scale Press Springs
Interactive cards and buttons use a spring-based scale animation on press:
```ts
Animated.spring(scaleValue, {
  toValue: 0.96,        // pressed state
  useNativeDriver: true,
  friction: 8,
  tension: 100,
})
```
Release springs back to `1.0`. This provides tactile feedback that complements the haptic impulse.

### Fade-In Cards
Cards and list items fade in on mount with a staggered delay:
```ts
Animated.timing(opacityValue, {
  toValue: 1,
  duration: 300,
  delay: index * 80,    // stagger per item
  useNativeDriver: true,
})
```
Creates a cascading reveal effect when navigating to a new screen.

### Skeleton Shimmer
Skeleton placeholders use a looping shimmer animation:
- Duration: **600ms** per cycle
- Easing: `Easing.inOut(Easing.ease)` for smooth oscillation
- Implementation: animated `translateX` on a linear gradient overlay
- Loop: `Animated.loop` with no delay between cycles
- The shimmer travels left-to-right across the skeleton block, giving a subtle loading indication without jarring movement.

### Rest Timer Countdown
The circular rest timer uses a combination of:
- SVG `strokeDashoffset` animation for the progress ring
- Numeric countdown with `Animated.timing` for smooth digit transitions
- A brief scale pulse (`1.0 -> 1.05 -> 1.0`) when the timer completes

### Screen Transitions
React Navigation's default native stack transitions are preserved (slide from right on iOS, fade on Android) to maintain platform-native feel. No custom transition overrides are applied.
