import { StyleSheet } from 'react-native';

export const Styles = ({ width, height, isPortrait }) =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#152019',
    },
    scrollContainer: {
      flexGrow: 1,
      backgroundColor: '#152019',
      paddingVertical: 10,
      paddingHorizontal: isPortrait ? width * 0.03 : height * 0.15,
    },
    headerContainer: {
      flexDirection: 'row',
      gap: 10,
      paddingTop: 10,
      paddingBottom: 12,
      backgroundColor: '#152019',
      paddingHorizontal: isPortrait ? 0 : '1%',
    },
    headerContent: {
      justifyContent: 'center',
    },
    headerTitle: {
      fontSize: 24,
      fontWeight: 'bold',
      color: '#FFFFFF',
      marginBottom: 5,
    },
    headerSubtitle: {
      fontSize: 16,
      color: '#AAAAAA',
      fontWeight: '400',
    },
    sectionContainer: {
      marginBottom: 25,
      backgroundColor: '#1C1F1D',
      borderRadius: 12,
      padding: 20,
      borderWidth: 1,
      borderColor: '#404040',
    },
    sectionHeader: {
      flexDirection: 'row',
      alignItems: 'center',
      marginBottom: 8,
      paddingBottom: 10,
      borderBottomWidth: 1,
      borderBottomColor: '#2A2A2A',
    },
    sectionHeaderTopMargin: {
      marginTop: 22,
    },
    sectionDot: {
      width: 8,
      height: 8,
      borderRadius: 4,
      marginRight: 10,
    },
    sectionTitle: {
      fontSize: 15,
      fontWeight: '600',
      color: '#FFFFFF',
    },
    nameRow: {
      flexDirection: 'row',
      gap: 15,
    },
    nameContain: {
      flex: 1,
      flexDirection: 'column',
    },
    fieldLabel: {
      fontSize: 14,
      fontWeight: '500',
      color: '#FFFFFF',
      marginBottom: 8,
      marginTop: 5,
    },
    inputField: {
      backgroundColor: '#4A4A4A',
      borderWidth: 1,
      borderColor: '#555555',
      borderRadius: 8,
      paddingHorizontal: 15,
      paddingVertical: 12,
      fontSize: 15,
      color: '#FFFFFF',
      marginBottom: 15,
      minHeight: 45,
    },
    inputFieldReadOnly: {
      backgroundColor: '#1E1E1E',
      borderWidth: 1,
      borderColor: '#333',
      borderRadius: 8,
      paddingHorizontal: 15,
      paddingVertical: 12,
      fontSize: 15,
      color: '#888',
      marginBottom: 15,
      minHeight: 45,
    },
    textArea: {
      minHeight: 70,
      textAlignVertical: 'top',
      paddingTop: 12,
    },
    dropdownStyle: {
      backgroundColor: '#4A4A4A',
      borderColor: '#555555',
      borderRadius: 8,
      minHeight: 45,
      marginBottom: 15,
      paddingHorizontal: 15,
    },
    dropDownContainerStyle: {
      backgroundColor: '#4A4A4A',
      borderColor: '#555555',
      borderRadius: 8,
      marginTop: 2,
      zIndex: 9999,
      maxHeight: 200,
    },
    vehicleRow: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'flex-start',
      gap: 15,
    },
    vehicleTypeContainer: {
      flex: 1,
      flexDirection: 'column',
    },
    buttonContainer: {
      borderRadius: 10,
      marginTop: 10,
    },
    submitButton: {
      backgroundColor: 'transparent',
      borderRadius: 12,
      paddingVertical: 3,
      elevation: 3,
      shadowColor: '#4CAF50',
      shadowOffset: { width: 0, height: 4 },
      shadowOpacity: 0.3,
      shadowRadius: 8,
    },
    submitButtonLabel: {
      fontSize: 16,
      fontWeight: '600',
      color: '#FFFFFF',
    },

    // ── Visitor Count Counter ─────────────────────────────────────────────────
    counterRow: {
      flexDirection: 'row',
      alignItems: 'center',
      backgroundColor: '#3A3A3A', // Buttons ka background pure row pe apply kiya
      borderRadius: 10,
      width: 140, // Fixed width taaki alignment sahi rahe
      height: 44,
      overflow: 'hidden', // Corners rounded rakhne ke liye
      borderWidth: 1,
      borderColor: '#555',
      marginBottom: 15,
    },
    counterBtn: {
      flex: 1, // Equal space divide karega
      height: '100%',
      alignItems: 'center',
      justifyContent: 'center',
      // Background yahan se hata diya kyunki parent mein hai
    },
    counterValue: {
      width: 50,
      height: '100%',
      textAlign: 'center',
      textAlignVertical: 'center', // Android focus
      fontSize: 18,
      fontWeight: 'bold',
      color: '#fff',
      backgroundColor: '#2A2A2A', // Beech wala part thoda dark
      borderLeftWidth: 1,
      borderRightWidth: 1,
      borderColor: '#555',
    },

    // ── Auto Date / Time display ──────────────────────────────────────────────
    autoField: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: 8,
      backgroundColor: '#1E1E1E',
      borderWidth: 1,
      borderColor: '#333',
      borderRadius: 8,
      paddingHorizontal: 12,
      paddingVertical: 10,
      marginBottom: 15,
      minHeight: 45,
    },
    autoFieldText: {
      color: '#59AC5E',
      fontSize: 14,
      fontWeight: '500',
    },
  });