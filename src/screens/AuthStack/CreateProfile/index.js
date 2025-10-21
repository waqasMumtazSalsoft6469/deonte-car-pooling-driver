import { pick } from '@react-native-documents/picker';
import React, { useRef, useState } from 'react';
import {
    Alert,
    Image,
    ScrollView,
    TouchableOpacity,
    View,
    Modal,
    Platform,
    FlatList
} from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import ImageCropPicker from '../../../components/ImageCropPicker';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { useDispatch } from 'react-redux';
import { showToast } from '../../../Api/HelperFunction';
import { icons, images } from '../../../assets';
import Button from '../../../components/Button';
import TextInput from '../../../components/TextInput';
import DropdownSelect from '../../../components/DropdownSelect';
import GilroyBold from '../../../components/Wrappers/Text/GilroyBold';
import GilroyRegular from '../../../components/Wrappers/Text/GilroyRegular';
import { styles } from './styles';
import { colors } from '../../../utils/theme';

const CreateProfile = ({ navigation }) => {
    const dispatch = useDispatch();

    // Form state
    const [formData, setFormData] = useState({
        fullName: 'Tom Felix',
        email: 'tom@email.com',
        phoneNumber: '866-546-232-42',
        gender: '',
        dateOfBirth: '',
        drivingLicenseNo: '',
        licenseExpireDate: '',
        bankTitle: '',
        accountNumber: '',
        routingNumber: '',
    });

    // Document states
    const [documents, setDocuments] = useState({
        profilePicture: null,
        drivingLicenseFront: null,
        drivingLicenseBack: null,
        vehicleInsurance: null,
        licensePlate: null,
        tlcNo: null,
    });

    // Refs for form inputs
    const fullNameRef = useRef(null);
    const emailRef = useRef(null);
    const phoneRef = useRef(null);
    const genderRef = useRef(null);
    const dobRef = useRef(null);
    const licenseNoRef = useRef(null);
    const licenseExpireRef = useRef(null);
    const bankTitleRef = useRef(null);
    const accountNoRef = useRef(null);
    const routingNoRef = useRef(null);

    // Modal states
    const [showDatePicker, setShowDatePicker] = useState(false);
    const [showExpiryDatePicker, setShowExpiryDatePicker] = useState(false);
    const [selectedDate, setSelectedDate] = useState(new Date());
    const [selectedExpiryDate, setSelectedExpiryDate] = useState(new Date());
    const [currentDateField, setCurrentDateField] = useState('');

    // Gender options for dropdown
    const genderOptions = [
        { key: 'male', value: 'Male' },
        { key: 'female', value: 'Female' },
        { key: 'other', value: 'Other' }
    ];

    const updateFormData = (field, value) => {
        setFormData(prev => ({
            ...prev,
            [field]: value,
        }));
    };

    const updateDocument = (field, value) => {
        setDocuments(prev => ({
            ...prev,
            [field]: value,
        }));
    };

    // Handle gender selection
    const handleGenderChange = (value) => {
        updateFormData('gender', value);
    };

    // Handle date of birth selection
    const handleDateOfBirthSelect = () => {
        setCurrentDateField('dateOfBirth');
        setSelectedDate(formData.dateOfBirth ? new Date(formData.dateOfBirth) : new Date());
        setShowDatePicker(true);
    };

    // Handle license expiry date selection
    const handleLicenseExpirySelect = () => {
        setCurrentDateField('licenseExpireDate');
        setSelectedExpiryDate(formData.licenseExpireDate ? new Date(formData.licenseExpireDate) : new Date());
        setShowExpiryDatePicker(true);
    };

    // Handle date selection
    const handleDateSelected = (event, selectedDate) => {
        if (Platform.OS === 'android') {
            setShowDatePicker(false);
            setShowExpiryDatePicker(false);
        }
        
        if (selectedDate) {
            const formattedDate = selectedDate.toLocaleDateString();
            updateFormData(currentDateField, formattedDate);
            
            if (currentDateField === 'dateOfBirth') {
                setSelectedDate(selectedDate);
            } else {
                setSelectedExpiryDate(selectedDate);
            }
        }
    };

    // Handle date picker cancel
    const handleDatePickerCancel = () => {
        setShowDatePicker(false);
        setShowExpiryDatePicker(false);
    };


    const pickImage = (type) => {
        const handleImageChange = (imageData) => {
            console.log('Image Path handleImageChange', imageData.path, imageData.type, type);
            updateDocument(type, imageData);
        };

        const handleError = (error, message) => {
            console.log('ImagePicker Error:', error, message);
        };

        if (type === 'profilePicture') {
            ImageCropPicker.openProfilePicturePicker(handleImageChange, handleError);
        } else {
            ImageCropPicker.openDocumentPicker(handleImageChange, handleError);
        }
    };

    const pickDocument = (type) => {
        pick({
            type: ['public.item'],
            copyTo: 'cachesDirectory',
        }).then((result) => {
            if (result && result[0]) {
                updateDocument(type, result[0]);
                showToast('Document selected successfully', 'success');
            }
        }).catch((error) => {
            showToast('Error selecting document', 'error');
        });
    };

    const validateForm = () => {
        const requiredFields = [
            'fullName',
            'email',
            'phoneNumber',
            'gender',
            'dateOfBirth',
            'drivingLicenseNo',
            'licenseExpireDate',
            'bankTitle',
            'accountNumber',
            'routingNumber',
        ];

        for (const field of requiredFields) {
            if (!formData[field] || formData[field].trim() === '') {
                showToast(`Please fill ${field.replace(/([A-Z])/g, ' $1').toLowerCase()}`, 'error');
                return false;
            }
        }

        const requiredDocuments = [
            'drivingLicenseFront',
            'drivingLicenseBack',
            'vehicleInsurance',
            'licensePlate',
            'tlcNo',
        ];

        for (const doc of requiredDocuments) {
            if (!documents[doc]) {
                showToast(`Please upload ${doc.replace(/([A-Z])/g, ' $1').toLowerCase()}`, 'error');
                return false;
            }
        }

        return true;
    };

    const handleCreateProfile = () => {
        if (validateForm()) {
            // Create the complete payload
            const payload = {
                // Personal Information
                fullName: formData.fullName,
                email: formData.email,
                phoneNumber: formData.phoneNumber,
                gender: formData.gender,
                dateOfBirth: formData.dateOfBirth,
                
                // License Information
                drivingLicenseNo: formData.drivingLicenseNo,
                licenseExpireDate: formData.licenseExpireDate,
                
                // Banking Information
                bankTitle: formData.bankTitle,
                accountNumber: formData.accountNumber,
                routingNumber: formData.routingNumber,
                
                // Documents - Direct fields
                profilePicture: documents.profilePicture ? {
                    uri: documents.profilePicture.uri,
                    type: documents.profilePicture.type,
                    name: documents.profilePicture.name
                } : null,
                
                drivingLicenseFront: documents.drivingLicenseFront ? {
                    uri: documents.drivingLicenseFront.uri,
                    type: documents.drivingLicenseFront.type,
                    name: documents.drivingLicenseFront.name
                } : null,
                
                drivingLicenseBack: documents.drivingLicenseBack ? {
                    uri: documents.drivingLicenseBack.uri,
                    type: documents.drivingLicenseBack.type,
                    name: documents.drivingLicenseBack.name
                } : null,
                
                vehicleInsurance: documents.vehicleInsurance ? {
                    uri: documents.vehicleInsurance.uri,
                    type: documents.vehicleInsurance.type,
                    name: documents.vehicleInsurance.name
                } : null,
                
                licensePlate: documents.licensePlate ? {
                    uri: documents.licensePlate.uri,
                    type: documents.licensePlate.type,
                    name: documents.licensePlate.name
                } : null,
                
                tlcNo: documents.tlcNo ? {
                    uri: documents.tlcNo.uri,
                    type: documents.tlcNo.type,
                    name: documents.tlcNo.name
                } : null,
            };

            // Log the complete payload
            console.log('=== CREATE PROFILE PAYLOAD ===');
            console.log('Form Data:', JSON.stringify(formData, null, 2));
            console.log('Documents:', JSON.stringify(documents, null, 2));
            console.log('Complete Payload:', JSON.stringify(payload, null, 2));
            console.log('=== END PAYLOAD ===');

            // Here you would typically dispatch an action to save the profile
            showToast('Profile created successfully!', 'success');
            // navigation.navigate('Login'); // or wherever you want to navigate
        }
    };

    const handleSkip = () => {
        Alert.alert(
            'Skip Profile Creation',
            'Are you sure you want to skip creating your profile? You can complete it later.',
            [
                { text: 'Cancel', style: 'cancel' },
                { text: 'Skip', onPress: () => navigation.navigate('Login') },
            ]
        );
    };

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <GilroyBold style={styles.headerTitle}>Create Profile</GilroyBold>
                <GilroyRegular style={styles.headerSubtitle}>
                    Welcome book you're been missed.
                </GilroyRegular>
            </View>

            <KeyboardAwareScrollView
                style={styles.scrollView}
                contentContainerStyle={styles.scrollContent}
                showsVerticalScrollIndicator={false}
                keyboardShouldPersistTaps="handled"
            >
                <ScrollView>

                    {/* Profile Picture */}
                    <View style={styles.profilePictureContainer}>
                        <TouchableOpacity
                            style={styles.profilePicture}
                            onPress={() => pickImage('profilePicture')}
                        >
                            {documents.profilePicture ? (
                                <Image
                                    source={{ uri: documents.profilePicture.uri }}
                                    style={styles.profileImage}
                                />
                            ) : (
                                <View style={styles.profilePlaceholder}>
                                    <Image source={images.userImage} style={styles.profileIcon} />
                                </View>
                            )}
                            <View style={styles.cameraIcon}>
                                <Image source={icons.cameraIcon} style={styles.cameraIconImage} resizeMode='contain' tintColor={colors.white} />
                            </View>
                        </TouchableOpacity>
                    </View>

                    {/* Form Fields */}
                    <View style={styles.formContainer}>
                        <TextInput
                            ref={fullNameRef}
                            label="Full Name"
                            value={formData.fullName}
                            onChangeText={(text) => updateFormData('fullName', text)}
                            placeholder="Enter full name"
                            containerStyle={styles.inputContainer}
                        />

                        <TextInput
                            ref={emailRef}
                            label="Email"
                            value={formData.email}
                            onChangeText={(text) => updateFormData('email', text)}
                            placeholder="Enter email"
                            keyboardType="email-address"
                            containerStyle={styles.inputContainer}
                        />

                        <TextInput
                            ref={phoneRef}
                            label="Phone Number"
                            value={formData.phoneNumber}
                            onChangeText={(text) => updateFormData('phoneNumber', text)}
                            placeholder="Enter phone number"
                            keyboardType="phone-pad"
                            containerStyle={styles.inputContainer}
                        />

                        <DropdownSelect
                            data={genderOptions}
                            // label="Gender"
                            placeholder="Select gender"
                            value={formData.gender}
                            onSelect={handleGenderChange}
                            containerStyle={styles.inputContainer}
                            required={true}
                        />

                        <TouchableOpacity
                            onPress={handleDateOfBirthSelect}
                            style={[styles.inputContainer, styles.dateInputContainer]}
                        >
                            {/* <GilroyRegular style={styles.dateInputLabel}>Date Of Birth *</GilroyRegular> */}
                            <View style={styles.dateInput}>
                                <GilroyRegular style={styles.dateInputText}>
                                    {formData.dateOfBirth ? formData.dateOfBirth : 'Select date of birth'}
                                </GilroyRegular>
                                <Image source={icons.calendar} style={styles.calendarIcon} />
                            </View>
                        </TouchableOpacity>

                        <TextInput
                            ref={licenseNoRef}
                            // label="Driving License No."
                            value={formData.drivingLicenseNo}
                            onChangeText={(text) => updateFormData('drivingLicenseNo', text)}
                            placeholder="Enter driving license number"
                            rightIcon={icons.myVehicle}
                            containerStyle={styles.inputContainer}
                        />

                        <TouchableOpacity
                            onPress={handleLicenseExpirySelect}
                            style={[styles.inputContainer, styles.dateInputContainer]}
                        >
                            {/* <GilroyRegular style={styles.dateInputLabel}>License Expire Date *</GilroyRegular> */}
                            <View style={styles.dateInput}>
                                <GilroyRegular style={styles.dateInputText}>
                                    {formData.licenseExpireDate ? formData.licenseExpireDate : 'Select expiry date'}
                                </GilroyRegular>
                                <Image source={icons.calendar} style={styles.calendarIcon} />
                            </View>
                        </TouchableOpacity>

                        <TextInput
                            ref={bankTitleRef}
                            label="Bank Title"
                            value={formData.bankTitle}
                            onChangeText={(text) => updateFormData('bankTitle', text)}
                            placeholder="Enter bank title"
                            rightIcon={icons.profileIcon}
                            containerStyle={styles.inputContainer}
                        />

                        <TextInput
                            ref={accountNoRef}
                            label="Account Number"
                            value={formData.accountNumber}
                            onChangeText={(text) => updateFormData('accountNumber', text)}
                            placeholder="Enter account number"
                            keyboardType="numeric"
                            rightIcon={icons.card}
                            containerStyle={styles.inputContainer}
                        />

                        <TextInput
                            ref={routingNoRef}
                            label="Routing Number"
                            value={formData.routingNumber}
                            onChangeText={(text) => updateFormData('routingNumber', text)}
                            placeholder="Enter routing number"
                            keyboardType="numeric"
                            rightIcon={icons.phone}
                            containerStyle={styles.inputContainer}
                        />

                        {/* Document Upload Sections */}
                        <View style={styles.documentSection}>
                            <GilroyBold style={styles.documentSectionTitle}>Required Documents</GilroyBold>

                            <TouchableOpacity
                                style={styles.documentUpload}
                                onPress={() => pickImage('drivingLicenseFront')}
                            >
                                <Image source={icons.uploadIcon} style={styles.uploadIcon} />
                                <GilroyRegular style={styles.uploadText}>
                                    Upload Driving License Picture Front*
                                </GilroyRegular>
                                {documents.drivingLicenseFront && (
                                    <Image source={icons.check} style={styles.checkIcon} />
                                )}
                            </TouchableOpacity>

                            <TouchableOpacity
                                style={styles.documentUpload}
                                onPress={() => pickImage('drivingLicenseBack')}
                            >
                                <Image source={icons.uploadIcon} style={styles.uploadIcon} />
                                <GilroyRegular style={styles.uploadText}>
                                    Upload Driving License Picture Back*
                                </GilroyRegular>
                                {documents.drivingLicenseBack && (
                                    <Image source={icons.check} style={styles.checkIcon} />
                                )}
                            </TouchableOpacity>

                            <TouchableOpacity
                                style={styles.documentUpload}
                                onPress={() => pickImage('vehicleInsurance')}
                            >
                                <Image source={icons.uploadIcon} style={styles.uploadIcon} />
                                <GilroyRegular style={styles.uploadText}>
                                    Upload Vehicle Insurance Picture*
                                </GilroyRegular>
                                {documents.vehicleInsurance && (
                                    <Image source={icons.check} style={styles.checkIcon} />
                                )}
                            </TouchableOpacity>

                            <TouchableOpacity
                                style={styles.documentUpload}
                                onPress={() => pickImage('licensePlate')}
                            >
                                <Image source={icons.uploadIcon} style={styles.uploadIcon} />
                                <GilroyRegular style={styles.uploadText}>
                                    Upload License Plate Picture*
                                </GilroyRegular>
                                {documents.licensePlate && (
                                    <Image source={icons.check} style={styles.checkIcon} />
                                )}
                            </TouchableOpacity>

                            <TouchableOpacity
                                style={styles.documentUpload}
                                onPress={() => pickImage('tlcNo')}
                            >
                                <Image source={icons.uploadIcon} style={styles.uploadIcon} />
                                <GilroyRegular style={styles.uploadText}>
                                    Upload TLC No. Picture*
                                </GilroyRegular>
                                {documents.tlcNo && (
                                    <Image source={icons.check} style={styles.checkIcon} />
                                )}
                            </TouchableOpacity>
                        </View>
                    </View>

                    {/* Action Buttons */}
                    <View style={styles.buttonContainer}>
                        <Button
                            text="Create Profile"
                            onPress={handleCreateProfile}
                            containerStyle={styles.createButton}
                        />

                        <TouchableOpacity onPress={handleSkip} style={styles.skipButton}>
                            <GilroyRegular style={styles.skipButtonText}>Skip For Now</GilroyRegular>
                        </TouchableOpacity>
                    </View>
                </ScrollView>

            </KeyboardAwareScrollView>


            {/* Date Picker for Date of Birth */}
            {showDatePicker && (
                <DateTimePicker
                    testID="dateTimePicker"
                    value={selectedDate}
                    mode="date"
                    is24Hour={true}
                    display="default"
                    onChange={handleDateSelected}
                    maximumDate={new Date()}
                    minimumDate={new Date(1900, 0, 1)}
                />
            )}

            {/* Date Picker for License Expiry */}
            {showExpiryDatePicker && (
                <DateTimePicker
                    testID="dateTimePicker"
                    value={selectedExpiryDate}
                    mode="date"
                    is24Hour={true}
                    display="default"
                    onChange={handleDateSelected}
                    maximumDate={new Date(2030, 11, 31)}
                    minimumDate={new Date()}
                />
            )}
        </View>
    );
};

export default CreateProfile;
