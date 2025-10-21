import { StyleSheet } from 'react-native';
import { colors } from '../../utils/theme';

export const styles = StyleSheet.create({
  container: {
    marginBottom: 15,
  },
  label: {
    fontSize: 14,
    color: colors.black,
    marginBottom: 8,
    fontWeight: '500',
  },
  required: {
    color: colors.red || '#FF0000',
  },
  dropdownBox: {
    borderWidth: 1,
    borderColor: colors.borderColor || '#E5E5E5',
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 12,
    backgroundColor: colors.white,
    minHeight: 50,
  },
  inputText: {
    fontSize: 16,
    color: colors.black,
  },
  dropdownList: {
    borderWidth: 1,
    borderColor: colors.borderColor || '#E5E5E5',
    borderRadius: 8,
    backgroundColor: colors.white,
    marginTop: 5,
    maxHeight: 200,
  },
  dropdownText: {
    fontSize: 16,
    color: colors.black,
    paddingVertical: 10,
  },
  errorText: {
    fontSize: 12,
    color: colors.red || '#FF0000',
    marginTop: 5,
  },
});
