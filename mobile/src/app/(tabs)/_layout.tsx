import { NativeTabs } from 'expo-router/unstable-native-tabs';
import { color } from '@/lib/theme';

// The platform's own tab bar: Liquid Glass with SF Symbols on iOS 26,
// Material 3 navigation with Material Symbols on Android. Brand colours tint
// the selection; the bar itself is system chrome, so it uses the system font.
//
// Insets are handled by <Screen> (disableAutomaticContentInsets), because
// the automatic ones would also pad the top and push the blue banners below
// the status bar.
export default function TabsLayout() {
  return (
    <NativeTabs
      tintColor={color.accent}
      iconColor={{ default: color['muted-foreground'], selected: color.accent }}
      labelStyle={{ default: { color: color['muted-foreground'] }, selected: { color: color.accent } }}
      indicatorColor={color.secondary}
      minimizeBehavior="onScrollDown">
      <NativeTabs.Trigger name="index" disableAutomaticContentInsets>
        <NativeTabs.Trigger.Label>Home</NativeTabs.Trigger.Label>
        <NativeTabs.Trigger.Icon sf={{ default: 'house', selected: 'house.fill' }} md="home" />
      </NativeTabs.Trigger>
      <NativeTabs.Trigger name="services" disableAutomaticContentInsets>
        <NativeTabs.Trigger.Label>Services</NativeTabs.Trigger.Label>
        <NativeTabs.Trigger.Icon
          sf={{ default: 'heart.text.square', selected: 'heart.text.square.fill' }}
          md="volunteer_activism"
        />
      </NativeTabs.Trigger>
      <NativeTabs.Trigger name="refer" disableAutomaticContentInsets>
        <NativeTabs.Trigger.Label>Refer</NativeTabs.Trigger.Label>
        <NativeTabs.Trigger.Icon
          sf={{ default: 'list.clipboard', selected: 'list.clipboard.fill' }}
          md="assignment_add"
        />
      </NativeTabs.Trigger>
      <NativeTabs.Trigger name="careers" disableAutomaticContentInsets>
        <NativeTabs.Trigger.Label>Careers</NativeTabs.Trigger.Label>
        <NativeTabs.Trigger.Icon sf={{ default: 'briefcase', selected: 'briefcase.fill' }} md="work" />
      </NativeTabs.Trigger>
      <NativeTabs.Trigger name="account" disableAutomaticContentInsets>
        <NativeTabs.Trigger.Label>Account</NativeTabs.Trigger.Label>
        <NativeTabs.Trigger.Icon
          sf={{ default: 'person.crop.circle', selected: 'person.crop.circle.fill' }}
          md="account_circle"
        />
      </NativeTabs.Trigger>
    </NativeTabs>
  );
}
