import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { SelectList } from 'react-native-dropdown-select-list';
import GilroyRegular from '../Wrappers/Text/GilroyRegular';
import theme, { colors } from '../../utils/theme';

const DropdownSelect = ({
  data = [],
  placeholder = "Select an option",
  label = "",
  value = "",
  onSelect = () => {},
  containerStyle = {},
  dropdownStyle = {},
  inputStyles = {},
  search = false,
  searchPlaceholder = "Search...",
  notFoundText = "No data found",
  disabled = false,
  error = "",
  required = false,
  ...props
}) => {
  const [selected, setSelected] = useState(value);

  const handleSelection = (val) => {
    setSelected(val);
    onSelect(val);
  };

  return (
    <View style={[styles.container, containerStyle]}>
      {label && (
        <GilroyRegular style={styles.label}>
          {label}
          {required && <GilroyRegular style={styles.required}> *</GilroyRegular>}
        </GilroyRegular>
      )}
      
      <SelectList
        data={data}
        setSelected={handleSelection}
        defaultOption={{ key: selected, value: selected }}
        placeholder={placeholder}
        search={search}
        searchPlaceholder={searchPlaceholder}
        notFoundText={notFoundText}
        disabled={disabled}
        boxStyles={[styles.dropdownBox, dropdownStyle]}
        inputStyles={[styles.inputText, inputStyles]}
        dropdownStyles={styles.dropdownList}
        dropdownTextStyles={styles.dropdownText}
        {...props}
      />
      
      {error && (
        <GilroyRegular style={styles.errorText}>
          {error}
        </GilroyRegular>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
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
    borderColor: theme.colors.gray,
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 12,
    minHeight: 50,
    backgroundColor: theme.colors.gray,

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

export default DropdownSelect;
