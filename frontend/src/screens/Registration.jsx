import {
  useFocusEffect,
  useNavigation,
  useRoute,
} from '@react-navigation/native';
import React, {useCallback, useContext, useState} from 'react';
import {
  View,
  Text,
  ScrollView,
  RefreshControl,
  Dimensions,
  Modal,
  TouchableOpacity,
  FlatList,
  TextInput,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import useFunctions from '../hooks/useFunctions';
import {Styles} from '../styles/Registration';
import {AnimatedScreen} from '../components/AnimatedScreen';
import {ActivityIndicator, Button, Icon} from 'react-native-paper';
import {MyContext} from '../context/ContextProvider';
import LinearGradient from 'react-native-linear-gradient';
import EmailInput, {
  ConfirmPasswordInput,
  NameInput,
  NumberInput,
  PasswordInput,
} from '../ui/InputFields';
import LoadingScreen from './LoadingScreen';
import {countryData} from '../data/countryData';

export default function Registration() {
  const {
    registerFormData: formData,
    loading,
    handleChange,
    refreshing,
    onRefresh,
    orientation,
    setGradientColor,
  } = useContext(MyContext);

  const [selectedCountry, setSelectedCountry] = useState(
    formData.country || 'United States',
  );
  const [pickerVisible, setPickerVisible] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const {Wrapper, handleUserRegister} = useFunctions();
  const navigation = useNavigation();
  const route = useRoute();
  const {height, width} = Dimensions.get('window');
  const isPortrait = orientation === 'portrait';
  const styles = Styles({width, height, isPortrait});

  useFocusEffect(
    useCallback(() => {
      Wrapper(route);
      setGradientColor(['#E53B35', '#E95233']);
      const initCountry = formData.country || selectedCountry;
      const initCode = countryData[initCountry]?.phoneCode || '+1';
      handleChange('country')(initCountry);
      handleChange('country_code')(initCode);
      return;
    }, []),
  );

  const sortedCountries = Object.keys(countryData).sort();

  const filteredCountries = sortedCountries.filter(c =>
    c.toLowerCase().includes(searchQuery.toLowerCase()) ||
    (countryData[c]?.phoneCode || '').includes(searchQuery),
  );

  const handleCountrySelect = value => {
    setSelectedCountry(value);
    const code = countryData[value]?.phoneCode || '';
    handleChange('country')(value);
    handleChange('country_code')(code);
    setPickerVisible(false);
    setSearchQuery('');
  };

  if (loading) return <LoadingScreen />;

  return (
    <LinearGradient
      colors={['#E53B35', '#F7A526']}
      style={styles.container}
      start={{x: 0, y: 0}}
      end={{x: 1, y: 1}}>
      <AnimatedScreen style={styles.container}>
        <ScrollView
          contentContainerStyle={styles.scrollContainer}
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
          refreshControl={
            <RefreshControl
              refreshing={refreshing}
              onRefresh={onRefresh}
              colors={['#E53B35']}
            />
          }>
          <View style={styles.iconContainer}>
            <Icon source="shield-outline" size={35} color="#fff" />
          </View>
          <Text style={styles.heading}>Join SecureAccess</Text>
          <Text style={styles.subHead}>Create your security dashboard</Text>
          <View style={styles.formContainer}>
            {/* Name Row */}
            <View style={styles.nameContainer}>
              <View style={styles.nameFieldContainer}>
                <Text style={styles.label}>First Name *</Text>
                <NameInput
                  styles={styles.inputField}
                  value={formData.first_name}
                  placeholder="John"
                  onChangeText={text => handleChange('first_name')(text)}
                />
              </View>
              <View style={styles.nameFieldContainer}>
                <Text style={styles.label}>Last Name *</Text>
                <NameInput
                  styles={styles.inputField}
                  value={formData.last_name}
                  placeholder="Doe"
                  onChangeText={text => handleChange('last_name')(text)}
                />
              </View>
            </View>

            {/* Country Picker */}
            <Text style={styles.label}>Country *</Text>
            <TouchableOpacity
              style={styles.countryPickerButton}
              onPress={() => setPickerVisible(true)}
              activeOpacity={0.8}>
              <Text style={styles.countryPickerText}>
                {countryData[selectedCountry]?.phoneCode || ''}{' '}
                {selectedCountry}
              </Text>
              <Icon source="chevron-down" size={20} color="#EAEBEC" />
            </TouchableOpacity>

            {/* Country Search Modal */}
            <Modal
              visible={pickerVisible}
              transparent
              animationType="slide"
              onRequestClose={() => {
                setPickerVisible(false);
                setSearchQuery('');
              }}>
              <KeyboardAvoidingView
                style={styles.modalOverlay}
                behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
                <TouchableOpacity
                  style={styles.modalBackdrop}
                  activeOpacity={1}
                  onPress={() => {
                    setPickerVisible(false);
                    setSearchQuery('');
                  }}
                />
                <View style={styles.modalContainer}>
                  {/* Modal Header */}
                  <View style={styles.modalHeader}>
                    <Text style={styles.modalTitle}>Select Country</Text>
                    <TouchableOpacity
                      onPress={() => {
                        setPickerVisible(false);
                        setSearchQuery('');
                      }}
                      style={styles.modalCloseBtn}>
                      <Icon source="close" size={22} color="#EAEBEC" />
                    </TouchableOpacity>
                  </View>

                  {/* Search Input */}
                  <View style={styles.searchContainer}>
                    <Icon source="magnify" size={20} color="#C8C3BD" />
                    <TextInput
                      style={styles.searchInput}
                      placeholder="Search country or code..."
                      placeholderTextColor="#7A6F69"
                      value={searchQuery}
                      onChangeText={setSearchQuery}
                      autoFocus
                      clearButtonMode="while-editing"
                    />
                    {searchQuery.length > 0 && (
                      <TouchableOpacity onPress={() => setSearchQuery('')}>
                        <Icon source="close-circle" size={18} color="#C8C3BD" />
                      </TouchableOpacity>
                    )}
                  </View>

                  {/* Country List */}
                  {filteredCountries.length === 0 ? (
                    <View style={styles.emptyState}>
                      <Icon source="earth-off" size={36} color="#61524D" />
                      <Text style={styles.emptyText}>No countries found</Text>
                    </View>
                  ) : (
                    <FlatList
                      data={filteredCountries}
                      keyExtractor={item => item}
                      keyboardShouldPersistTaps="handled"
                      showsVerticalScrollIndicator={false}
                      renderItem={({item}) => {
                        const isSelected = item === selectedCountry;
                        return (
                          <TouchableOpacity
                            style={[
                              styles.countryItem,
                              isSelected && styles.countryItemSelected,
                            ]}
                            onPress={() => handleCountrySelect(item)}
                            activeOpacity={0.7}>
                            <Text style={styles.countryCode}>
                              {countryData[item]?.phoneCode || ''}
                            </Text>
                            <Text
                              style={[
                                styles.countryName,
                                isSelected && styles.countryNameSelected,
                              ]}>
                              {item}
                            </Text>
                            {isSelected && (
                              <Icon source="check" size={18} color="#F7A526" />
                            )}
                          </TouchableOpacity>
                        );
                      }}
                    />
                  )}
                </View>
              </KeyboardAvoidingView>
            </Modal>

            {/* Phone Number */}
            <Text style={[styles.label, {marginTop: 10}]}>Phone Number *</Text>
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              <NumberInput
                placeholder="1234567890"
                styles={[styles.inputField, {flex: 1, marginLeft: 0}]}
                contentStyles={styles.inputFieldContent}
                value={formData.phone_no}
                onChangeText={text => handleChange('phone_no')(text)}
              />
            </View>

            {/* Email */}
            <Text style={[styles.label, {marginTop: 10}]}>Email Address *</Text>
            <EmailInput
              placeholder="john@example.com"
              styles={styles.inputField}
              contentStyles={styles.inputFieldContent}
              value={formData.email}
              onChangeText={text => handleChange('email')(text)}
            />

            {/* Password */}
            <Text style={[styles.label, {marginTop: 10}]}>
              Create Password *
            </Text>
            <PasswordInput
              styles={styles.inputField}
              contentStyles={styles.inputFieldContent}
              value={formData.password}
              onChangeText={text => handleChange('password')(text)}
            />

            {/* Confirm Password */}
            <Text style={[styles.label, {marginTop: 10}]}>
              Confirm Password *
            </Text>
            <ConfirmPasswordInput
              styles={styles.inputField}
              contentStyles={styles.inputFieldContent}
              value={formData.confirm_password}
              onChangeText={text => handleChange('confirm_password')(text)}
            />

            <Button
              children="Create Account"
              icon="shield-outline"
              mode="contained-tonal"
              style={styles.button}
              labelStyle={styles.buttonLabelStyle}
              onPress={event => handleUserRegister(event)}
            />
            <Text style={styles.text}>
              Already have an account?{' '}
              <Text
                style={styles.linkText}
                onPress={() => navigation.navigate('Login')}>
                Sign In
              </Text>
            </Text>
          </View>
        </ScrollView>
      </AnimatedScreen>
    </LinearGradient>
  );
}