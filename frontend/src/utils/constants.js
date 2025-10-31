import { formatDate, formatTime } from "./formatData";

export const CustomerDataFields = (index, item) => {
    const tableData = {
        "S. No.": index + 1,
        "Visitor Name": `${item?.first_name || ''} ${item?.last_name || ''}`,
        ...(item?.phone_no && { "Phone No.": item?.phone_no }),
        ...(item?.address && { "Address": item?.address }),
        "Vehicle Type": item?.vehicle_type,
        ...(item?.vehicle_no && { "Vehicle No": item?.vehicle_no }),
        "Apartment Name": item?.apartment_name,
        "Floor No": item?.floor_no,
        "Flat No": item?.flat_no,
        "Person To Meet": item?.person_to_meet,
        "Date": formatDate(item.datetime),
        "Time": formatTime(item.datetime),
    };

    return tableData;
};

export const analyticsData = ({ styles, visitorStats, logVisitorData }) => [
    {
        styles: styles,
        onPress: () => logVisitorData('yesterday'),
        src: require('../../assets/icons/yesterday.png'),
        analyticsLabel: "Yesterday's Visitors",
        colors: ['#a64dff', '#6600cc'],
        icon: "arrow-left",
        visitorStats: visitorStats?.yesterday,
    },
    {
        styles: styles,
        onPress: () => logVisitorData('today'),
        src: require('../../assets/icons/calendar.png'),
        analyticsLabel: "Today's Visitors",
        colors: ['#1D7CCF', '#0F4696'],
        icon: "clock-outline",
        visitorStats: visitorStats?.today,
    },
    {
        styles: styles,
        onPress: () => logVisitorData('thisWeek'),
        src: require('../../assets/icons/week.png'),
        analyticsLabel: "This Week",
        colors: ['#23978C', '#034E42'],
        icon: "chart-line",
        visitorStats: visitorStats?.thisWeek,
    },
    {
        styles: styles,
        onPress: () => logVisitorData('thisMonth'),
        src: require('../../assets/icons/month.png'),
        analyticsLabel: "This Month",
        colors: ['#26A4DF', '#0464A3'],
        icon: "pulse",
        visitorStats: visitorStats?.thisMonth,
    },
    {
        styles: styles,
        onPress: () => logVisitorData('thisYear'),
        src: require('../../assets/icons/year.png'),
        analyticsLabel: "This Year",
        colors: ['#3D9041', '#1C5A21'],
        icon: "home-outline",
        visitorStats: visitorStats?.thisYear,
    },
];

export const BottomTabs = [
    {
        name: "Security Hub",
        label: "Home",
        icon: "home-outline",
        colors: ['#635DFF', '#9715FA'],
        iconBgColor: '#9F64FD',
        iconColor: "#deb4fd",
    },
    {
        name: "New Entry",
        label: "Add",
        icon: "account-plus-outline",
        colors: ['#00C850', '#009A66'],
        iconBgColor: '#33BB81',
        iconColor: "#4dff94",
    },
    {
        name: "Visitor Log",
        label: "Visitors",
        icon: "account-group-outline",
        colors: ['#2A7FFF', '#0092BA'],
        iconBgColor: '#33A4DF',
        iconColor: "#66a3ff",
    },
    {
        name: "Analytics",
        label: "Reports",
        icon: "chart-bar",
        colors: ['#FF6700', '#E80009'],
        iconBgColor: '#FA6D33',
        iconColor: "#ffa366",
    },
    {
        name: "Settings",
        label: "Profile",
        icon: "account-circle-outline",
        colors: ['#635DFF', '#9715FA'],
        iconBgColor: '#9F64FD',
        iconColor: "#deb4fd",
    }
];