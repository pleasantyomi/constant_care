import { Linking } from 'react-native';
import { contact, mailtoHref, telHref } from '@constant-care/shared';

export const callUs = () => Linking.openURL(telHref);
export const emailUs = () => Linking.openURL(mailtoHref);
export const phoneDisplay = contact.phoneDisplay;
