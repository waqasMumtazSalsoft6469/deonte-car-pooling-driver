import { StyleSheet, Dimensions } from 'react-native';
import vh from '../../../utils/units/vh';
import vw from '../../../utils/units/vw';
import theme, { colors } from '../../../utils/theme';

const { width, height } = Dimensions.get('window');

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.primaryColor,
    },
    header: {
        paddingHorizontal: 7 * vw,
        paddingTop: 10 * vh,
        paddingBottom: 2 * vh,

    },
    headerTitle: {
        fontSize: 28,
        color: '#FFFFFF',
        textAlign: 'center',
        marginBottom: 8,
    },
    headerSubtitle: {
        fontSize: 16,
        color: '#FFFFFF',
        textAlign: 'center',
        opacity: 0.9,
    },
    scrollView: {
        flex: 1,
        // backgroundColor: colors.white,
    },
    scrollContent: {
        alignItems: 'center',
        backgroundColor: colors.white,
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30,
        flex: 1,
    },
    profilePictureContainer: {
        alignItems: 'center',
        marginTop: 30,
        marginBottom: 20,
    },
    profilePicture: {
        width: 120,
        height: 120,
        borderRadius: 60,
        backgroundColor: '#E5E5E5',
        justifyContent: 'center',
        alignItems: 'center',
        position: 'relative',
    },
    profileImage: {
        width: 120,
        height: 120,
        borderRadius: 60,
    },
    profilePlaceholder: {
        width: 120,
        height: 120,
        borderRadius: 60,
        backgroundColor: '#E5E5E5',
        justifyContent: 'center',
        alignItems: 'center',
    },
    profileIcon: {
        width: 60,
        height: 60,
        tintColor: '#9CA3AF',
    },
    cameraIcon: {
        position: 'absolute',
        bottom: 5,
        right: 5,
        width: 30,
        height: 30,
        borderRadius: 15,
        backgroundColor: colors.primaryColor,
        justifyContent: 'center',
        alignItems: 'center',
    },
    cameraIconImage: {
        width: 16,
        height: 16,
        tintColor: '#FFFFFF',
    },
    formContainer: {
        paddingHorizontal: 20,
        marginTop: 10,
    },
    inputContainer: {
        // marginBottom: 15,
        // backgroundColor: theme.colors.gray,
    },
    touchableInput: {
        marginBottom: 15,
    },
    documentSection: {
        marginTop: 20,
        // paddingHorizontal: 20,
    },
    documentSectionTitle: {
        fontSize: 18,
        color: '#374151',
        marginBottom: 15,
        fontWeight: 'bold',
    },
    documentUpload: {
        borderWidth: 2,
        borderColor: '#D1D5DB',
        borderStyle: 'dashed',
        borderRadius: 12,
        padding: 20,
        marginBottom: 15,
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#FFFFFF',
        paddingVertical: 5 * vh,
    },
    uploadIcon: {
        width: 24,
        height: 24,
        tintColor: '#6B46C1',
        marginRight: 12,
    },
    uploadText: {
        flex: 1,
        fontSize: 14,
        color: '#374151',
    },
    checkIcon: {
        width: 20,
        height: 20,
        tintColor: '#10B981',
    },
    buttonContainer: {
        paddingHorizontal: 20,
        marginTop: 20,
    },
    createButton: {
        backgroundColor: '#6B46C1',
        borderRadius: 12,
        paddingVertical: 16,
        marginBottom: 15,
    },
    skipButton: {
        alignItems: 'center',
        paddingVertical: 12,
    },
    skipButtonText: {
        fontSize: 16,
        color: '#6B7280',
    },
    // Modal styles
    modalOverlay: {
        flex: 1,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        justifyContent: 'flex-end',
    },
    modalContent: {
        backgroundColor: colors.white,
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        paddingBottom: 30,
    },
    modalHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 20,
        paddingVertical: 15,
        borderBottomWidth: 1,
        borderBottomColor: '#E5E5E5',
    },
    modalTitle: {
        fontSize: 18,
        color: colors.black,
        fontWeight: 'bold',
    },
    modalButton: {
        fontSize: 16,
        color: colors.primaryColor,
        fontWeight: '500',
    },
    pickerContainer: {
        paddingHorizontal: 20,
        paddingVertical: 10,
    },
    picker: {
        height: 200,
        width: '100%',
    },
    dateInputContainer: {
        paddingVertical: 20,
    },
    dateInputLabel: {
        fontSize: 16,
        color: colors.black,
        marginBottom: 10,
        fontWeight: '500',
    },
    dateInput: {
        marginBottom: 0,
    },
    // Dropdown styles
    dropdownContainer: {
        maxHeight: 200,
        paddingHorizontal: 20,
        paddingVertical: 10,
    },
    dropdownItem: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingVertical: 15,
        paddingHorizontal: 15,
        borderBottomWidth: 1,
        borderBottomColor: '#E5E5E5',
    },
    selectedDropdownItem: {
        backgroundColor: colors.primaryColor + '10',
    },
    dropdownItemText: {
        fontSize: 16,
        color: colors.black,
    },
    selectedDropdownItemText: {
        color: colors.primaryColor,
        fontWeight: '600',
    },
    dateInputContainer: {
        marginBottom: 15,
    },
    dateInputLabel: {
        fontSize: 14,
        color: colors.black,
        marginBottom: 5,
        fontWeight: '500',
    },
    dateInput: {
        height: 6 * vh,
        borderRadius: 10,
        borderWidth: 1,
        borderColor: colors.gray,
        backgroundColor: theme.colors.gray,
        paddingHorizontal: 4 * vw,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    dateInputText: {
        fontSize: 1.8 * vh,
        color: colors.placeholder,
        flex: 1,
    },
    calendarIcon: {
        width: 2 * vw,
        height: 2 * vh,
        tintColor: colors.gray,
    },
});
