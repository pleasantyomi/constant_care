import { useEffect, useState } from 'react';
import { View } from 'react-native';
import {
  formCopy,
  referralSchema,
  relationships,
  services,
  urgencyLevels,
} from '@constant-care/shared';
import { FormStatus } from '@/components/brand/form-status';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { Field } from '@/components/ui/field';
import { Input } from '@/components/ui/input';
import { Select } from '@/components/ui/select';
import { Text } from '@/components/ui/text';
import { postJson } from '@/lib/api';
import {
  forgetReferrerDetails,
  loadReferrerDetails,
  saveReferrerDetails,
  type ReferrerDetails,
} from '@/lib/referrer-details';
import { useSchemaForm } from '@/lib/use-form';

const serviceOptions = services.map((service) => service.label);

// Same fields, labels, and validation as the website's referral form
// (components/referrals/referral-form.tsx), posting to the same API route.
// Used by the Refer tab (visitors) and New Referral (signed-in referrers).
export function ReferralForm({ onSent }: { onSent?: () => void }) {
  const form = useSchemaForm(referralSchema, {
    referrerName: '',
    relationship: '',
    organization: '',
    referrerPhone: '',
    referrerEmail: '',
    clientName: '',
    clientContact: '',
    service: '',
    urgency: 'Standard',
    reason: '',
    notes: '',
    consent: false,
  });
  const { values, set, errors, setValues } = form;
  const copy = formCopy.referral;
  const [rememberMe, setRememberMe] = useState(true);

  // Prefill the referrer's own details if they asked us to remember them.
  useEffect(() => {
    loadReferrerDetails().then((saved) => {
      if (saved) setValues((current) => ({ ...current, ...saved }));
    });
  }, [setValues]);

  async function submitReferral() {
    const referrer: ReferrerDetails = {
      referrerName: values.referrerName,
      relationship: values.relationship,
      organization: values.organization,
      referrerPhone: values.referrerPhone,
      referrerEmail: values.referrerEmail,
    };
    const sent = await form.submit((data) => postJson('/api/referrals', data));
    if (!sent) return;
    if (rememberMe) {
      await saveReferrerDetails(referrer);
      // The form resets after sending; keep the referrer's details for next time.
      setValues((current) => ({ ...current, ...referrer }));
    } else {
      await forgetReferrerDetails();
    }
    onSent?.();
  }

  return (
      <View className="gap-6">
        <Card className="gap-5">
          <Text variant="eyebrow" className="text-muted-foreground">
            About You
          </Text>
          <Field label="Your Name" error={errors.referrerName}>
            <Input
              value={values.referrerName}
              onChangeText={(text) => set('referrerName', text)}
              placeholder="Jane Doe"
              autoComplete="name"
              textContentType="name"
              invalid={!!errors.referrerName}
            />
          </Field>
          <Field label="Role / Relationship to Client" error={errors.relationship}>
            <Select
              title="Relationship to Client"
              value={values.relationship || null}
              onChange={(value) => set('relationship', value)}
              options={relationships}
              placeholder="Select an option"
              invalid={!!errors.relationship}
            />
          </Field>
          <Field label="Organization" optional error={errors.organization}>
            <Input
              value={values.organization}
              onChangeText={(text) => set('organization', text)}
              placeholder="e.g. Dr. Smith Family Clinic"
              autoComplete="organization"
            />
          </Field>
          <Field label="Your Phone" error={errors.referrerPhone}>
            <Input
              value={values.referrerPhone}
              onChangeText={(text) => set('referrerPhone', text)}
              placeholder="(506) 000-0000"
              keyboardType="phone-pad"
              autoComplete="tel"
              textContentType="telephoneNumber"
              invalid={!!errors.referrerPhone}
            />
          </Field>
          <Field label="Your Email" error={errors.referrerEmail}>
            <Input
              value={values.referrerEmail}
              onChangeText={(text) => set('referrerEmail', text)}
              placeholder="jane@example.com"
              keyboardType="email-address"
              autoCapitalize="none"
              autoComplete="email"
              textContentType="emailAddress"
              invalid={!!errors.referrerEmail}
            />
          </Field>
          <Checkbox
            checked={rememberMe}
            onChange={setRememberMe}
            label="Remember my details on this device for my next referral"
          />
        </Card>

        <Card className="gap-5">
          <Text variant="eyebrow" className="text-muted-foreground">
            About the Client
          </Text>
          <Field label="Client Name" error={errors.clientName}>
            <Input
              value={values.clientName}
              onChangeText={(text) => set('clientName', text)}
              placeholder="Full name"
              invalid={!!errors.clientName}
            />
          </Field>
          <Field label="Client Contact Information" error={errors.clientContact}>
            <Input
              value={values.clientContact}
              onChangeText={(text) => set('clientContact', text)}
              placeholder="Phone or email"
              autoCapitalize="none"
              invalid={!!errors.clientContact}
            />
          </Field>
          <Field label="Service(s) Needed" error={errors.service}>
            <Select
              title="Service Needed"
              value={values.service || null}
              onChange={(value) => set('service', value)}
              options={serviceOptions}
              placeholder="Select a service"
            />
          </Field>
          <Field label="Urgency Level" error={errors.urgency}>
            <Select
              title="Urgency Level"
              value={values.urgency}
              onChange={(value) => set('urgency', value)}
              options={urgencyLevels}
              placeholder="Select urgency"
            />
          </Field>
          <Field label="Reason for Referral" error={errors.reason}>
            <Input
              value={values.reason}
              onChangeText={(text) => set('reason', text)}
              placeholder="What kind of support is being requested, and why?"
              multiline
              invalid={!!errors.reason}
            />
          </Field>
          <Field label="Additional Notes" optional error={errors.notes}>
            <Input
              value={values.notes}
              onChangeText={(text) => set('notes', text)}
              placeholder="Anything else we should know?"
              multiline
            />
          </Field>
          <View className="gap-1.5">
            <Checkbox
              checked={values.consent}
              onChange={(checked) => set('consent', checked)}
              label={copy.consent}
              invalid={!!errors.consent}
            />
            {errors.consent && (
              <Text variant="caption" className="text-destructive">
                {errors.consent}
              </Text>
            )}
          </View>

          <Button
            loading={form.status === 'sending'}
            onPress={submitReferral}>
            {form.status === 'sending' ? copy.sending : copy.submit}
          </Button>
          <FormStatus status={form.status} success={copy.success} error={form.submitError} />
        </Card>
      </View>
  );
}
