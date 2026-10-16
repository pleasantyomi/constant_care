import { useState } from 'react';
import { Pressable, View } from 'react-native';
import * as DocumentPicker from 'expo-document-picker';
import { Briefcase, FileText, UploadCloud, X } from 'lucide-react-native';
import { applicationSchema, careerPositions, formCopy } from '@constant-care/shared';
import { ScreenHeader } from '@/components/brand/screen-header';
import { EmptyState } from '@/components/brand/empty-state';
import { FadeIn } from '@/components/brand/fade-in';
import { FormStatus } from '@/components/brand/form-status';
import { Screen } from '@/components/brand/screen';
import { SectionHeader } from '@/components/brand/section-header';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Field } from '@/components/ui/field';
import { Input } from '@/components/ui/input';
import { Select } from '@/components/ui/select';
import { Text } from '@/components/ui/text';
import { postForm } from '@/lib/api';
import { useOpenings } from '@/lib/queries';
import { color } from '@/lib/theme';
import { useSchemaForm } from '@/lib/use-form';

// Same limits as the website's /api/applications route.
const MAX_RESUME_BYTES = 5 * 1024 * 1024;
const RESUME_TYPES = [
  'application/pdf',
  'application/msword',
  'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
];

type Resume = { uri: string; name: string; mimeType: string };

export default function Careers() {
  const openings = useOpenings();
  const [resume, setResume] = useState<Resume | null>(null);
  const [resumeError, setResumeError] = useState<string | null>(null);
  const form = useSchemaForm(applicationSchema, {
    name: '',
    email: '',
    phone: '',
    position: '',
    message: '',
  });
  const { values, set, errors } = form;
  const copy = formCopy.application;

  // Openings come from the admin panel; fall back to the standard roles.
  const positionOptions = openings.data?.length
    ? [...openings.data.map((opening) => opening.title), 'Other']
    : careerPositions;

  async function pickResume() {
    setResumeError(null);
    const result = await DocumentPicker.getDocumentAsync({
      type: RESUME_TYPES,
      copyToCacheDirectory: true,
    });
    if (result.canceled) return;
    const asset = result.assets[0];
    if (asset.size && asset.size > MAX_RESUME_BYTES) {
      setResumeError('Resume must be under 5MB.');
      return;
    }
    setResume({
      uri: asset.uri,
      name: asset.name,
      mimeType: asset.mimeType ?? 'application/pdf',
    });
  }

  async function apply() {
    const sent = await form.submit((data) => {
      const body = new FormData();
      for (const [key, value] of Object.entries(data)) {
        if (value) body.append(key, String(value));
      }
      if (resume) {
        // React Native's FormData takes a { uri, name, type } file object.
        body.append('resume', { uri: resume.uri, name: resume.name, type: resume.mimeType } as unknown as Blob);
      }
      return postForm('/api/applications', body);
    });
    if (sent) setResume(null);
  }

  return (
    <Screen onRefresh={openings.refetch} refreshing={openings.isRefetching}>
      <ScreenHeader title="Careers" subtitle="Build a career with purpose." />

      <View className="gap-6 px-4 pt-6">
        <SectionHeader eyebrow="Careers" title="Current Openings" />
        {openings.isPending ? (
          <Text className="text-center">Loading openings…</Text>
        ) : openings.data?.length ? (
          openings.data.map((opening, index) => (
            <FadeIn key={opening.id} index={index}>
              <Pressable
                accessibilityRole="button"
                accessibilityHint="Selects this role in the application form below"
                onPress={() => set('position', opening.title)}
                style={({ pressed }) => (pressed ? { opacity: 0.8 } : undefined)}>
                <Card className="gap-1 p-5">
                  <Text variant="title">{opening.title}</Text>
                  <Text>
                    {opening.category} · {opening.location}
                  </Text>
                </Card>
              </Pressable>
            </FadeIn>
          ))
        ) : (
          <EmptyState
            icon={Briefcase}
            message={
              openings.isError
                ? "We couldn't load openings right now. Pull down to try again, or apply below."
                : "We don't have any open positions right now. Check back soon, or apply below and we'll reach out when a role opens up."
            }
          />
        )}
      </View>

      <View className="mt-12 gap-6 bg-secondary/40 px-4 py-12">
        <SectionHeader eyebrow="Apply" title={copy.title} intro={copy.intro} />
        <Card className="gap-5">
          <Field label="Full Name" error={errors.name}>
            <Input
              value={values.name}
              onChangeText={(text) => set('name', text)}
              placeholder="Jane Doe"
              autoComplete="name"
              textContentType="name"
              invalid={!!errors.name}
            />
          </Field>
          <Field label="Email" error={errors.email}>
            <Input
              value={values.email}
              onChangeText={(text) => set('email', text)}
              placeholder="jane@example.com"
              keyboardType="email-address"
              autoCapitalize="none"
              autoComplete="email"
              textContentType="emailAddress"
              invalid={!!errors.email}
            />
          </Field>
          <Field label="Phone" error={errors.phone}>
            <Input
              value={values.phone}
              onChangeText={(text) => set('phone', text)}
              placeholder="(506) 000-0000"
              keyboardType="phone-pad"
              autoComplete="tel"
              textContentType="telephoneNumber"
              invalid={!!errors.phone}
            />
          </Field>
          <Field label="Position of Interest" error={errors.position}>
            <Select
              title="Position of Interest"
              value={values.position || null}
              onChange={(value) => set('position', value)}
              options={positionOptions}
              placeholder="Select a role"
            />
          </Field>
          <Field label="Resume" optional error={resumeError ?? undefined}>
            {resume ? (
              <View className="min-h-12 flex-row items-center gap-3 rounded-md border border-input px-3">
                <FileText size={18} color={color.accent} />
                <Text className="flex-1 text-foreground" numberOfLines={1}>
                  {resume.name}
                </Text>
                <Pressable
                  accessibilityRole="button"
                  accessibilityLabel="Remove resume"
                  onPress={() => setResume(null)}
                  hitSlop={12}>
                  <X size={18} color={color['muted-foreground']} />
                </Pressable>
              </View>
            ) : (
              <Button
                variant="outline"
                icon={<UploadCloud size={18} color={color.accent} />}
                onPress={pickResume}
                className="self-start">
                Upload Resume
              </Button>
            )}
            <Text variant="caption">PDF or Word, up to 5MB.</Text>
          </Field>
          <Field label="Message" optional error={errors.message}>
            <Input
              value={values.message}
              onChangeText={(text) => set('message', text)}
              placeholder="Tell us why you'd be a great fit..."
              multiline
            />
          </Field>

          <Button loading={form.status === 'sending'} onPress={apply}>
            {form.status === 'sending' ? copy.sending : copy.submit}
          </Button>
          <FormStatus
            status={form.status}
            success={copy.success}
            error={form.submitError}
          />
        </Card>
      </View>
    </Screen>
  );
}
