import { View } from 'react-native';
import { useQueryClient } from '@tanstack/react-query';
import { formCopy } from '@constant-care/shared';
import { Screen } from '@/components/brand/screen';
import { ReferralForm } from '@/components/forms/referral-form';
import { Text } from '@/components/ui/text';

// New referral, opened from the signed-in tracker.
export default function NewReferral() {
  const queryClient = useQueryClient();
  return (
    <Screen insets="automatic">
      <View className="gap-6 px-4 pt-4">
        <Text className="text-base">{formCopy.referral.intro}</Text>
        {/* Refresh the tracker so the new referral shows up there. */}
        <ReferralForm onSent={() => queryClient.invalidateQueries({ queryKey: ['my-referrals'] })} />
      </View>
    </Screen>
  );
}
