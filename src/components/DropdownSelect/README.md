# DropdownSelect Component

A reusable dropdown component built with `react-native-dropdown-select-list` that you can use anywhere in your app.

## Features

- ✅ **Easy to use** - Simple props interface
- ✅ **Customizable** - Styling and behavior options
- ✅ **Search support** - Optional search functionality
- ✅ **Error handling** - Built-in error display
- ✅ **Required field** - Visual indicator for required fields
- ✅ **Consistent styling** - Matches your app's design system

## Usage

### Basic Usage

```javascript
import DropdownSelect from '../components/DropdownSelect';

const MyComponent = () => {
  const [selectedValue, setSelectedValue] = useState('');

  const options = [
    { key: '1', value: 'Option 1' },
    { key: '2', value: 'Option 2' },
    { key: '3', value: 'Option 3' },
  ];

  return (
    <DropdownSelect
      data={options}
      placeholder="Select an option"
      value={selectedValue}
      onSelect={setSelectedValue}
    />
  );
};
```

### With Label and Required Field

```javascript
<DropdownSelect
  data={genderOptions}
  label="Gender"
  placeholder="Select gender"
  value={formData.gender}
  onSelect={handleGenderChange}
  required={true}
/>
```

### With Search

```javascript
<DropdownSelect
  data={countryOptions}
  label="Country"
  placeholder="Select country"
  value={selectedCountry}
  onSelect={setSelectedCountry}
  search={true}
  searchPlaceholder="Search countries..."
/>
```

### With Custom Styling

```javascript
<DropdownSelect
  data={options}
  placeholder="Select option"
  value={selectedValue}
  onSelect={setSelectedValue}
  containerStyle={{ marginBottom: 20 }}
  dropdownStyle={{ borderColor: '#FF0000' }}
  inputStyles={{ fontSize: 18 }}
/>
```

### With Error Handling

```javascript
<DropdownSelect
  data={options}
  placeholder="Select option"
  value={selectedValue}
  onSelect={setSelectedValue}
  error={validationError}
  required={true}
/>
```

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `data` | Array | `[]` | Array of objects with `key` and `value` properties |
| `placeholder` | String | `"Select an option"` | Placeholder text |
| `label` | String | `""` | Label text above dropdown |
| `value` | String | `""` | Currently selected value |
| `onSelect` | Function | `() => {}` | Callback when selection changes |
| `containerStyle` | Object | `{}` | Style for container |
| `dropdownStyle` | Object | `{}` | Style for dropdown box |
| `inputStyles` | Object | `{}` | Style for input text |
| `search` | Boolean | `false` | Enable search functionality |
| `searchPlaceholder` | String | `"Search..."` | Search input placeholder |
| `notFoundText` | String | `"No data found"` | Text when no results found |
| `disabled` | Boolean | `false` | Disable dropdown |
| `error` | String | `""` | Error message to display |
| `required` | Boolean | `false` | Show required asterisk |
| `...props` | Object | `{}` | Additional props passed to SelectList |

## Data Format

The `data` prop should be an array of objects with `key` and `value` properties:

```javascript
const options = [
  { key: 'male', value: 'Male' },
  { key: 'female', value: 'Female' },
  { key: 'other', value: 'Other' }
];
```

## Examples

### Gender Selection
```javascript
const genderOptions = [
  { key: 'male', value: 'Male' },
  { key: 'female', value: 'Female' },
  { key: 'other', value: 'Other' }
];

<DropdownSelect
  data={genderOptions}
  label="Gender"
  placeholder="Select gender"
  value={formData.gender}
  onSelect={(value) => setFormData(prev => ({ ...prev, gender: value }))}
  required={true}
/>
```

### Country Selection with Search
```javascript
const countryOptions = [
  { key: 'us', value: 'United States' },
  { key: 'ca', value: 'Canada' },
  { key: 'uk', value: 'United Kingdom' },
  // ... more countries
];

<DropdownSelect
  data={countryOptions}
  label="Country"
  placeholder="Select country"
  value={selectedCountry}
  onSelect={setSelectedCountry}
  search={true}
  searchPlaceholder="Search countries..."
/>
```

### Status Selection
```javascript
const statusOptions = [
  { key: 'active', value: 'Active' },
  { key: 'inactive', value: 'Inactive' },
  { key: 'pending', value: 'Pending' }
];

<DropdownSelect
  data={statusOptions}
  label="Status"
  placeholder="Select status"
  value={status}
  onSelect={setStatus}
  containerStyle={{ marginBottom: 20 }}
/>
```

## Styling

The component uses your app's theme colors from `utils/theme`. You can customize:

- Container styles
- Dropdown box styles
- Input text styles
- Error text styles
- Required field indicator

## Dependencies

- `react-native-dropdown-select-list`
- `react-native`
- Your app's theme colors
- `GilroyRegular` text component
