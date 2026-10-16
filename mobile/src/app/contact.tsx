import { Pressable, View } from 'react-native';
import { Clock, Mail, Phone, type LucideIcon } from 'lucide-react-native';
import { contact, contactSchema, formCopy, services } from '@constant-care/shared';
import { FormStatus } from '@/components/brand/form-status';
import { IconRing } from '@/components/brand/icon-ring';
import { Screen } from '@/components/brand/screen';
import { SectionHeader } from '@/components/brand/section-header';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Field } from '@/components/ui/field';
import { Input } from '@/components/ui/input';
import { Select } from '@/components/ui/select';
import { Text } from '@/components/ui/text';
import { postJson } from '@/lib/api';
import { callUs, emailUs } from '@/lib/links';
import { useSchemaForm } from '@/lib/use-form';

const serviceOptions = ['General Inquiry', ...services.map((service) => service.label)];

function ContactRow({
  icon,
  label,
  value,
  onPress,
}: {
  icon: LucideIcon;
  label: string;
  value: string;
  onPress?: () => void;
}) {
  const body = (
    <Card className="flex-row items-center gap-4 p-5">
      <IconRing icon={icon} size="sm" />
      <View className="flex-1 gap-0.5">
        <Text variant="caption">{label}</Text>
        <Text variant="label">{value}</Text>
      </View>
    </Card>
  );
  if (!onPress) return body;
  return (
    <Pressable
      accessibilityRole="link"
      accessibilityLabel={`${label}: ${value}`}
      onPress={onPress}
      style={({ pressed }) => (pressed ? { opacity: 0.8 } : undefined)}>
      {body}
    </Pressable>
  );
}

// Same fields and validation as the website's contact form
// (components/contact-us/form.tsx), posting to the same API route.
export default function Contact() {
  const form = useSchemaForm(contactSchema, {
    name: '',
    email: '',
    phone: '',
    service: '',
    message: '',
  });
  const { values, set, errors } = form;

  return (
    <Screen insets="automatic">

      <View className="gap-4 px-4 pt-4">
        <ContactRow icon={Phone} label="Phone" value={contact.phoneDisplay} onPress={callUs} />
        <ContactRow icon={Mail} label="Email" value={contact.email} onPress={emailUs} />
        <ContactRow icon={Clock} label="Open Time" value={contact.officeHours} />
      </View>

      <View className="mt-12 gap-6 bg-secondary/40 px-4 py-12">
        <SectionHeader eyebrow="Get In Touch" title="Send Us a Message" />
        <Card className="gap-5">
          <Field label="Full Name" error={errors.name}>
            <Input
              value={values.name}
              onChangeText={(text) => set('name', text)}
              placeholder="eg. John Doe"
              autoComplete="name"
              textContentType="name"
              invalid={!!errors.name}
            />
          </Field>
          <Field label="Email" error={errors.email}>
            <Input
              value={values.email}
              onChangeText={(text) => set('email', text)}
              placeholder="eg. johndoe@gmail.com"
              keyboardType="email-address"
              autoCapitalize="none"
              autoComplete="email"
              textContentType="emailAddress"
              invalid={!!errors.email}
            />
          </Field>
          <Field label="Phone" optional error={errors.phone}>
            <Input
              value={values.phone}
              onChangeText={(text) => set('phone', text)}
              placeholder="eg. +1234567890"
              keyboardType="phone-pad"
              autoComplete="tel"
              textContentType="telephoneNumber"
            />
          </Field>
          <Field label="Service" error={errors.service}>
            <Select
              title="Service"
              value={values.service || null}
              onChange={(value) => set('service', value)}
              options={serviceOptions}
              placeholder="General Inquiry"
            />
          </Field>
          <Field label="Message" error={errors.message}>
            <Input
              value={values.message}
              onChangeText={(text) => set('message', text)}
              placeholder="Enter your message..."
              multiline
              invalid={!!errors.message}
            />
          </Field>

          <Button
            loading={form.status === 'sending'}
            onPress={() => form.submit((data) => postJson('/api/contact', data))}>
            {form.status === 'sending' ? formCopy.contact.sending : formCopy.contact.submit}
          </Button>
          <FormStatus status={form.status} success={formCopy.contact.success} error={form.submitError} />
        </Card>
      </View>
    </Screen>
  );
}
