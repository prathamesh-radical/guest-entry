import React, {
  useCallback,
  useContext,
  useState,
  useEffect,
  useRef,
} from 'react';
import {
  View,
  TextInput,
  ScrollView,
  RefreshControl,
  Dimensions,
  Text,
  TouchableOpacity,
} from 'react-native';
import {
  useFocusEffect,
  useNavigation,
  useRoute,
} from '@react-navigation/native';
import useFunctions from '../hooks/useFunctions';
import DropDownPicker from 'react-native-dropdown-picker';
import {MyContext} from '../context/ContextProvider';
import {Button, Icon, IconButton} from 'react-native-paper';
import {Styles} from '../styles/AddVisitors';
import LinearGradient from 'react-native-linear-gradient';
import LoadingScreen from './LoadingScreen';
import {AnimatedScreen} from '../components/AnimatedScreen';

const PURPOSE_OPTIONS = [
  {
    label: 'Meet',
    value: 'Meet',
    icon: () => <Icon source="account-group" size={20} color="#fff" />,
  },
  {
    label: 'Delivery',
    value: 'Delivery',
    icon: () => <Icon source="package-variant" size={20} color="#fff" />,
  },
  {
    label: 'Servant',
    value: 'Servant',
    icon: () => <Icon source="account-wrench" size={20} color="#fff" />,
  },
  {
    label: 'Other',
    value: 'Other',
    icon: () => <Icon source="dots-horizontal" size={20} color="#fff" />,
  },
];

const VEHICLE_OPTIONS = [
  {
    label: 'Walking',
    value: 'Walking',
    icon: () => <Icon source="walk" size={20} color="#fff" />,
  },
  {
    label: 'Cycle',
    value: 'Cycle',
    icon: () => <Icon source="bike" size={20} color="#fff" />,
  },
  {
    label: 'Bike',
    value: 'Bike',
    icon: () => <Icon source="motorbike" size={20} color="#fff" />,
  },
  {
    label: 'Car',
    value: 'Car',
    icon: () => <Icon source="car" size={20} color="#fff" />,
  },
];

function getFormattedDate() {
  return new Date().toLocaleDateString('en-IN', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
  });
}

function getFormattedTime() {
  return new Date().toLocaleTimeString('en-IN', {
    hour: '2-digit',
    minute: '2-digit',
    hour12: true,
  });
}

function SectionHeader({styles, color, title, topMargin}) {
  return (
    <View
      style={[
        styles.sectionHeader,
        topMargin && styles.sectionHeaderTopMargin,
      ]}>
      <View style={[styles.sectionDot, {backgroundColor: color}]} />
      <Text style={styles.sectionTitle}>{title}</Text>
    </View>
  );
}

export default function AddVisitors() {
  const {
    visitorFormData: formData,
    apartmentData,
    flatData,
    handleChange,
    dropdownValues,
    setDropdownValues,
    loading,
    refreshing,
    onRefresh,
    setVisitorFormData,
    orientation,
    setGradientColor,
  } = useContext(MyContext);

  const {Wrapper, handleAddVisitor} = useFunctions();
  const route = useRoute();
  const navigation = useNavigation();

  const {height, width} = Dimensions.get('window');
  const isPortrait = orientation === 'portrait';
  const styles = Styles({width, height, isPortrait});

  const isMounted = useRef(true);
  useEffect(() => {
    isMounted.current = true;
    return () => {
      isMounted.current = false;
    };
  }, []);

  const [open, setOpen] = useState({
    vehicle_type: false,
    purpose: false,
    apartment: false,
    floor: false,
    flat: false,
  });

  const [items, setItems] = useState({
    vehicle_type: VEHICLE_OPTIONS,
    purpose: PURPOSE_OPTIONS,
    apartment: apartmentData.map(item => ({
      label: item.apartment_name,
      value: item.apartment_name,
      key: item.id.toString(),
      icon: () => (
        <Icon source="office-building-outline" size={20} color="#fff" />
      ),
    })),
    floor: [],
    flat: [],
  });

  const [visitDate] = useState(getFormattedDate());
  const [visitTime, setVisitTime] = useState(getFormattedTime());
  const timeInterval = useRef(null);

  // ── Validation errors state ──
  const [errors, setErrors] = useState({});

  useEffect(() => {
    timeInterval.current = setInterval(() => {
      if (isMounted.current) setVisitTime(getFormattedTime());
    }, 30000);
    return () => clearInterval(timeInterval.current);
  }, []);

  const filterPerson = flatData.find(
    item =>
      item.apartment_name === dropdownValues.apartment &&
      String(item.floor_no) === String(dropdownValues.floor) &&
      String(item.flat_no) === String(dropdownValues.flat),
  );
  const personName = filterPerson
    ? `${filterPerson.first_name || ''} ${filterPerson.last_name || ''}`.trim()
    : '';

  useFocusEffect(
    useCallback(() => {
      Wrapper(route);
      setGradientColor(['#59AC5E', '#3BADA0']);
      return;
    }, []),
  );

  useEffect(() => {
    const selectedApartment = apartmentData.find(
      a => a.apartment_name === dropdownValues.apartment,
    );
    const totalFloors = selectedApartment
      ? Number(selectedApartment.total_floors)
      : 0;

    const floorList =
      totalFloors > 0
        ? Array.from({length: totalFloors}, (_, i) => ({
            label: (i + 1).toString(),
            value: i + 1,
            key: `${dropdownValues.apartment}-${i + 1}`,
            icon: () => <Icon source="floor-plan" size={20} color="#fff" />,
          }))
        : [];

    const flatList = flatData
      .filter(
        item =>
          item.apartment_name === dropdownValues.apartment &&
          String(item.floor_no) === String(dropdownValues.floor),
      )
      .map(item => ({
        label: item.flat_no,
        value: item.flat_no,
        key: `${item.apartment_name}-${item.floor_no}-${item.flat_no}`,
        icon: () => <Icon source="home-outline" size={20} color="#fff" />,
      }));

    setItems(prev => ({...prev, floor: floorList, flat: flatList}));
    setVisitorFormData(prev => ({
      ...prev,
      apartment_name: dropdownValues.apartment,
      floor_no: dropdownValues.floor,
      flat_no: dropdownValues.flat,
      person_to_meet: personName,
    }));
  }, [
    dropdownValues.apartment,
    dropdownValues.floor,
    flatData,
    personName,
    apartmentData,
  ]);

  // ── Frontend validation ──
  const validate = () => {
    const newErrors = {};

    if (!formData.first_name?.trim())
      newErrors.first_name = 'First name is required';
    if (!formData.last_name?.trim())
      newErrors.last_name = 'Last name is required';
    if (!formData.phone_no?.trim())
      newErrors.phone_no = 'Mobile number is required';
    else if (!/^\d{10}$/.test(formData.phone_no.trim()))
      newErrors.phone_no = 'Enter a valid 10-digit mobile number';
    if (!formData.address?.trim())
      newErrors.address = 'Place / address is required';
    if (!formData.purpose) newErrors.purpose = 'Purpose of visit is required';
    if (formData.purpose === 'Other' && !formData.other_purpose?.trim())
      newErrors.other_purpose = 'Please specify the purpose';
    if (!formData.vehicle_type)
      newErrors.vehicle_type = 'Vehicle type is required';
    if (
      (formData.vehicle_type === 'Car' || formData.vehicle_type === 'Bike') &&
      !formData.vehicle_no?.trim()
    )
      newErrors.vehicle_no = 'Vehicle number is required';
    if (!dropdownValues.apartment) newErrors.apartment = 'Building is required';
    if (!dropdownValues.floor) newErrors.floor = 'Floor is required';
    if (!dropdownValues.flat) newErrors.flat = 'Flat is required';
    if (!formData.person_to_meet?.trim())
      newErrors.person_to_meet = 'Person to meet could not be determined';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = event => {
    if (!validate()) return;
    handleAddVisitor(event);
  };

  if (loading) return <LoadingScreen />;

  const dropdownProps = (key, zIndex, zIndexInverse) => ({
    open: open[key],
    value: dropdownValues[key],
    items: items[key],
    setOpen: () => setOpen(prev => ({...prev, [key]: !prev[key]})),
    setValue: cb =>
      setDropdownValues(prev => ({...prev, [key]: cb(prev[key])})),
    setItems: newItems => setItems(prev => ({...prev, [key]: newItems})),
    zIndex,
    zIndexInverse,
    listMode: 'SCROLLVIEW',
    scrollViewProps: {nestedScrollEnabled: true},
    style: styles.dropdownStyle,
    dropDownContainerStyle: styles.dropDownContainerStyle,
    placeholderStyle: {color: '#666'},
    arrowIconStyle: {tintColor: '#888'},
    listItemLabelStyle: {fontSize: 15, color: '#fff'},
    listItemContainerStyle: {height: 40},
    textStyle: {fontSize: 15, color: '#fff'},
    tickIconStyle: {tintColor: '#fff'},
  });

  return (
    <View style={styles.container}>
      {/* ── Header ── */}
      <View style={styles.headerContainer}>
        <IconButton
          icon="arrow-left"
          size={24}
          onPress={() => navigation.goBack()}
          iconColor="#fff"
        />
        <View style={styles.headerContent}>
          <Text style={styles.headerTitle}>New Visitor Entry</Text>
          <Text style={styles.headerSubtitle}>Register a visitor securely</Text>
        </View>
      </View>

      <ScrollView
        contentContainerStyle={styles.scrollContainer}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
            colors={['#59AC5E']}
          />
        }>
        <AnimatedScreen>
          <View style={styles.sectionContainer}>
            {/* ══ SECTION 1 — Visitor Information ══ */}
            <SectionHeader
              styles={styles}
              color="#4A90E2"
              title="Visitor Information"
            />

            <View style={styles.nameRow}>
              <View style={styles.nameContain}>
                <Text style={styles.fieldLabel}>First Name *</Text>
                <TextInput
                  style={styles.inputField}
                  placeholder="First name"
                  placeholderTextColor="#666"
                  value={formData.first_name}
                  onChangeText={text => {
                    handleChange('first_name')(text);
                    if (errors.first_name)
                      setErrors(p => ({...p, first_name: null}));
                  }}
                />
                {errors.first_name ? (
                  <Text style={styles.errorText}>{errors.first_name}</Text>
                ) : null}
              </View>
              <View style={styles.nameContain}>
                <Text style={styles.fieldLabel}>Last Name *</Text>
                <TextInput
                  style={styles.inputField}
                  placeholder="Last name"
                  placeholderTextColor="#666"
                  value={formData.last_name}
                  onChangeText={text => {
                    handleChange('last_name')(text);
                    if (errors.last_name)
                      setErrors(p => ({...p, last_name: null}));
                  }}
                />
                {errors.last_name ? (
                  <Text style={styles.errorText}>{errors.last_name}</Text>
                ) : null}
              </View>
            </View>

            <Text style={styles.fieldLabel}>Mobile Number *</Text>
            <TextInput
              style={styles.inputField}
              placeholder="Enter mobile number"
              placeholderTextColor="#666"
              value={formData.phone_no}
              keyboardType="number-pad"
              maxLength={10}
              onChangeText={text => {
                handleChange('phone_no')(text);
                if (errors.phone_no) setErrors(p => ({...p, phone_no: null}));
              }}
            />
            {errors.phone_no ? (
              <Text style={styles.errorText}>{errors.phone_no}</Text>
            ) : null}

            <Text style={styles.fieldLabel}>Place *</Text>
            <TextInput
              style={[styles.inputField, styles.textArea]}
              placeholder="Visitor's place / address"
              placeholderTextColor="#666"
              value={formData.address}
              onChangeText={text => {
                handleChange('address')(text);
                if (errors.address) setErrors(p => ({...p, address: null}));
              }}
              multiline
              numberOfLines={2}
              textAlignVertical="top"
            />
            {errors.address ? (
              <Text style={styles.errorText}>{errors.address}</Text>
            ) : null}

            <Text style={styles.fieldLabel}>Number of Visitors *</Text>
            <View style={styles.counterRow}>
              <TouchableOpacity
                style={styles.counterBtn}
                onPress={() => {
                  const curr = Number(formData.visitor_count) || 1;
                  if (curr > 1) handleChange('visitor_count')(String(curr - 1));
                }}>
                <Icon source="minus" size={20} color="#fff" />
              </TouchableOpacity>
              <Text style={styles.counterValue}>
                {formData.visitor_count || '1'}
              </Text>
              <TouchableOpacity
                style={styles.counterBtn}
                onPress={() => {
                  const curr = Number(formData.visitor_count) || 1;
                  handleChange('visitor_count')(String(curr + 1));
                }}>
                <Icon source="plus" size={20} color="#fff" />
              </TouchableOpacity>
            </View>

            {/* ══ SECTION 2 — Visit Details ══ */}
            <SectionHeader
              styles={styles}
              color="#D133AB"
              title="Visit Details"
              topMargin
            />

            <Text style={styles.fieldLabel}>Purpose of Visit *</Text>
            <DropDownPicker
              {...dropdownProps('purpose', 5000, 1000)}
              placeholder="Select purpose"
              onChangeValue={value => {
                handleChange('purpose')(value);
                // Clear other_purpose when switching away from Other
                if (value !== 'Other') {
                  handleChange('other_purpose')('');
                }
                if (errors.purpose) setErrors(p => ({...p, purpose: null}));
                if (errors.other_purpose)
                  setErrors(p => ({...p, other_purpose: null}));
              }}
            />
            {errors.purpose ? (
              <Text style={styles.errorText}>{errors.purpose}</Text>
            ) : null}

            {/* ── "Other" purpose text input ── */}
            {formData.purpose === 'Other' && (
              <View style={{marginTop: 10}}>
                <Text style={styles.fieldLabel}>Specify Purpose *</Text>
                <TextInput
                  style={styles.inputField}
                  placeholder="Please describe the purpose"
                  placeholderTextColor="#666"
                  value={formData.other_purpose}
                  onChangeText={text => {
                    handleChange('other_purpose')(text);
                    if (errors.other_purpose)
                      setErrors(p => ({...p, other_purpose: null}));
                  }}
                />
                {errors.other_purpose ? (
                  <Text style={styles.errorText}>{errors.other_purpose}</Text>
                ) : null}
              </View>
            )}

            <View style={styles.nameRow}>
              <View style={styles.nameContain}>
                <Text style={styles.fieldLabel}>Date</Text>
                <View style={styles.autoField}>
                  <Icon source="calendar" size={16} color="#59AC5E" />
                  <Text style={styles.autoFieldText}>{visitDate}</Text>
                </View>
              </View>
              <View style={styles.nameContain}>
                <Text style={styles.fieldLabel}>Time</Text>
                <View style={styles.autoField}>
                  <Icon source="clock-outline" size={16} color="#59AC5E" />
                  <Text style={styles.autoFieldText}>{visitTime}</Text>
                </View>
              </View>
            </View>

            {/* ══ SECTION 3 — Vehicle Details ══ */}
            <SectionHeader
              styles={styles}
              color="#F5A623"
              title="Vehicle Details"
              topMargin
            />

            <View style={styles.vehicleRow}>
              <View style={styles.vehicleTypeContainer}>
                <Text style={styles.fieldLabel}>Vehicle Type *</Text>
                <DropDownPicker
                  {...dropdownProps('vehicle_type', 4000, 2000)}
                  placeholder="Select type"
                  onChangeValue={value => {
                    handleChange('vehicle_type')(value);
                    if (errors.vehicle_type)
                      setErrors(p => ({...p, vehicle_type: null}));
                  }}
                />
                {errors.vehicle_type ? (
                  <Text style={styles.errorText}>{errors.vehicle_type}</Text>
                ) : null}
              </View>
              {(formData?.vehicle_type === 'Car' ||
                formData?.vehicle_type === 'Bike') && (
                <View style={styles.nameContain}>
                  <Text style={styles.fieldLabel}>Vehicle Number *</Text>
                  <TextInput
                    style={styles.inputField}
                    placeholder="e.g. MH12AB1234"
                    placeholderTextColor="#666"
                    value={formData.vehicle_no}
                    onChangeText={text => {
                      handleChange('vehicle_no')(text);
                      if (errors.vehicle_no)
                        setErrors(p => ({...p, vehicle_no: null}));
                    }}
                    autoCapitalize="characters"
                  />
                  {errors.vehicle_no ? (
                    <Text style={styles.errorText}>{errors.vehicle_no}</Text>
                  ) : null}
                </View>
              )}
            </View>

            {/* ══ SECTION 4 — Visit Location ══ */}
            <SectionHeader
              styles={styles}
              color="#9715FA"
              title="Visit Location"
              topMargin
            />

            <Text style={styles.fieldLabel}>Select Building *</Text>
            <DropDownPicker
              {...dropdownProps('apartment', 3000, 3000)}
              placeholder="Choose building"
              onChangeValue={value => {
                handleChange('apartment_name')(value);
                if (errors.apartment) setErrors(p => ({...p, apartment: null}));
              }}
            />
            {errors.apartment ? (
              <Text style={styles.errorText}>{errors.apartment}</Text>
            ) : null}

            <View style={styles.nameRow}>
              <View style={styles.nameContain}>
                <Text style={styles.fieldLabel}>Floor No. *</Text>
                <DropDownPicker
                  {...dropdownProps('floor', 2000, 4000)}
                  placeholder="Floor"
                  onChangeValue={value => {
                    handleChange('floor_no')(value);
                    if (errors.floor) setErrors(p => ({...p, floor: null}));
                  }}
                />
                {errors.floor ? (
                  <Text style={styles.errorText}>{errors.floor}</Text>
                ) : null}
              </View>
              <View style={styles.nameContain}>
                <Text style={styles.fieldLabel}>Flat *</Text>
                <DropDownPicker
                  {...dropdownProps('flat', 1000, 5000)}
                  placeholder="Flat"
                  onChangeValue={value => {
                    handleChange('flat_no')(value);
                    if (errors.flat) setErrors(p => ({...p, flat: null}));
                  }}
                />
                {errors.flat ? (
                  <Text style={styles.errorText}>{errors.flat}</Text>
                ) : null}
              </View>
            </View>

            <Text style={styles.fieldLabel}>Person to Meet *</Text>
            <TextInput
              style={styles.inputFieldReadOnly}
              placeholder="Auto-filled from flat selection"
              placeholderTextColor="#555"
              value={formData.person_to_meet}
              editable={false}
            />
            {errors.person_to_meet ? (
              <Text style={styles.errorText}>{errors.person_to_meet}</Text>
            ) : null}

            {/* ── Submit Button ── */}
            <LinearGradient
              colors={['#43A049', '#27A697']}
              start={{x: 0, y: 0}}
              end={{x: 1, y: 1}}
              style={styles.buttonContainer}>
              <Button
                mode="contained"
                style={styles.submitButton}
                labelStyle={styles.submitButtonLabel}
                onPress={handleSubmit}
                icon={() => <Icon source="floppy" size={20} color="#fff" />}>
                Register Visitor Entry
              </Button>
            </LinearGradient>
          </View>
        </AnimatedScreen>
      </ScrollView>
    </View>
  );
}
