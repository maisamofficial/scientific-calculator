import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  SafeAreaView,
  StatusBar,
  useWindowDimensions,
  Platform,
  Modal,
  ScrollView,
  Switch,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Settings, Info, ChevronUp, ChevronDown, X, Moon, Sun, CheckCircle2 } from 'lucide-react-native';
import { calculate, toggleSign } from './src/services/mathService';

export default function App() {
  const { width, height } = useWindowDimensions();
  const [display, setDisplay] = useState('0');
  const [history, setHistory] = useState('');
  const [isScientific, setIsScientific] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(true);
  const [showSettings, setShowSettings] = useState(false);
  const [showInfo, setShowInfo] = useState(false);

  // Advanced Responsive Logic
  const isLandscape = width > height;
  const isTablet = width > 768;
  const showScientific = isScientific || isLandscape || isTablet;
  
  const numColumns = showScientific ? (isTablet || isLandscape ? 10 : 5) : 4;
  const gap = 12;
  const padding = 20;
  const availableWidth = width - (padding * 2);
  const buttonWidth = (availableWidth - (gap * (numColumns - 1))) / numColumns;
  const buttonHeight = isTablet ? buttonWidth * 0.75 : buttonWidth * 0.9;

  const handlePress = (value: string) => {
    if (display === 'Error') {
      setDisplay('0');
      if (['AC', 'C'].includes(value)) return;
    }

    switch (value) {
      case 'AC': setDisplay('0'); setHistory(''); break;
      case 'C': setDisplay(display.length > 1 ? display.slice(0, -1) : '0'); break;
      case '=':
        const result = calculate(display);
        setHistory(display + ' =');
        setDisplay(result);
        break;
      case '+/-': setDisplay(toggleSign(display)); break;
      case '%': setDisplay(calculate(`${display} / 100`)); break;
      case 'x²': setDisplay(`${display}^2`); break;
      case 'x³': setDisplay(`${display}^3`); break;
      case '√': setDisplay(`√(${display === '0' ? '' : display}`); break;
      case '³√': setDisplay(`³√(${display === '0' ? '' : display}`); break;
      case 'xʸ': setDisplay(`${display}^`); break;
      case 'sin':
      case 'cos':
      case 'tan':
      case 'asin':
      case 'acos':
      case 'atan':
      case 'log':
      case 'ln':
      case 'abs':
        setDisplay(`${value}(${display === '0' ? '' : display}`);
        break;
      case 'π': setDisplay(display === '0' ? 'π' : display + 'π'); break;
      case 'e': setDisplay(display === '0' ? 'e' : display + 'e'); break;
      case '÷': setDisplay(display + '÷'); break;
      case '×': setDisplay(display + '×'); break;
      default:
        setDisplay(display === '0' ? value : display + value);
    }
  };

  const basicButtons = [
    ['AC', '+/-', '%', '÷'],
    ['7', '8', '9', '×'],
    ['4', '5', '6', '-'],
    ['1', '2', '3', '+'],
    ['0', '.', 'C', '='],
  ];

  const scientificButtons = [
    ['sin', 'cos', 'tan', 'x²', '√'],
    ['asin', 'acos', 'atan', 'x³', '³√'],
    ['log', 'ln', '(', ')', 'xʸ'],
    ['π', 'e', '!', 'abs', 'mod'],
  ];

  const renderButton = (btn: string, type: 'basic' | 'scientific' = 'basic') => {
    let bgColor = isDarkMode ? ['#2C2C2E', '#1C1C1E'] : ['#F2F2F7', '#E5E5EA'];
    let textColor = isDarkMode ? '#FFFFFF' : '#000000';

    if (['÷', '×', '-', '+', '='].includes(btn)) {
      bgColor = ['#FF9F0A', '#FFB340'];
      textColor = '#FFFFFF';
    } else if (['AC', '+/-', '%', 'C'].includes(btn)) {
      bgColor = isDarkMode ? ['#636366', '#48484A'] : ['#D1D1D6', '#AEAEB2'];
      textColor = isDarkMode ? '#FFFFFF' : '#000000';
    } else if (type === 'scientific') {
      bgColor = isDarkMode ? ['#1C1C1E', '#000000'] : ['#E5E5EA', '#D1D1D6'];
      textColor = '#FF9F0A';
    }

    return (
      <TouchableOpacity
        key={btn}
        activeOpacity={0.7}
        onPress={() => handlePress(btn)}
        style={[
          styles.button,
          {
            width: buttonWidth,
            height: buttonHeight,
            borderRadius: buttonWidth / 3,
            shadowColor: isDarkMode ? '#000' : '#888',
          },
        ]}
      >
        <LinearGradient
          colors={bgColor as any}
          style={[styles.gradient, { borderRadius: buttonWidth / 3 }]}
        >
          <Text style={[
            styles.buttonText, 
            { 
              fontSize: isTablet ? 28 : (btn.length > 2 ? 14 : 22),
              color: textColor 
            }
          ]}>
            {btn}
          </Text>
        </LinearGradient>
      </TouchableOpacity>
    );
  };

  const themeColors = {
    bg: isDarkMode ? ['#000000', '#1C1C1E'] : ['#FFFFFF', '#F2F2F7'],
    text: isDarkMode ? '#FFFFFF' : '#000000',
    subtext: isDarkMode ? '#8E8E93' : '#8E8E93',
    headerBg: isDarkMode ? '#1C1C1E' : '#F2F2F7',
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle={isDarkMode ? "light-content" : "dark-content"} />
      <LinearGradient colors={themeColors.bg as any} style={styles.background}>
        
        {/* Header */}
        <SafeAreaView style={styles.header}>
          <View style={styles.headerContent}>
            <Text style={[styles.brand, { color: themeColors.text }]}>SCIENCY<Text style={{color: '#FF9F0A'}}>CALC</Text></Text>
            <View style={styles.headerIcons}>
              <TouchableOpacity onPress={() => setShowSettings(true)}>
                <Settings size={22} color={themeColors.subtext} />
              </TouchableOpacity>
              <TouchableOpacity style={{marginLeft: 20}} onPress={() => setShowInfo(true)}>
                <Info size={22} color={themeColors.subtext} />
              </TouchableOpacity>
            </View>
          </View>
        </SafeAreaView>

        {/* Display */}
        <View style={styles.displayContainer}>
          <Text style={[styles.historyText, { color: themeColors.subtext }]}>{history}</Text>
          <Text 
            style={[styles.displayText, { color: themeColors.text, fontSize: display.length > 10 ? 44 : 72 }]}
            numberOfLines={1}
            adjustsFontSizeToFit
          >
            {display}
          </Text>
        </View>

        {/* Scientific Toggle */}
        {!isTablet && !isLandscape && (
          <TouchableOpacity 
            style={[styles.drawerHandle, { backgroundColor: themeColors.headerBg }]} 
            onPress={() => setIsScientific(!isScientific)}
          >
            {isScientific ? <ChevronDown color="#FF9F0A" /> : <ChevronUp color="#FF9F0A" />}
            <Text style={styles.drawerText}>{isScientific ? 'Standard' : 'Scientific'}</Text>
          </TouchableOpacity>
        )}

        {/* Keypad */}
        <View style={[styles.keypad, { paddingHorizontal: padding }]}>
          {showScientific && !isTablet && !isLandscape && (
            <View style={styles.scientificGrid}>
              {scientificButtons.map((row, i) => (
                <View key={`sci-${i}`} style={styles.row}>
                  {row.map((btn) => renderButton(btn, 'scientific'))}
                </View>
              ))}
            </View>
          )}

          <View style={styles.mainGrid}>
            {basicButtons.map((row, i) => (
              <View key={`basic-${i}`} style={styles.row}>
                {(isTablet || isLandscape) && showScientific && 
                  scientificButtons[i]?.map(btn => renderButton(btn, 'scientific'))
                }
                {row.map((btn) => renderButton(btn))}
              </View>
            ))}
          </View>
        </View>

        {/* Modal: Settings */}
        <Modal visible={showSettings} animationType="slide" transparent={true}>
          <View style={styles.modalOverlay}>
            <View style={[styles.modalContent, { backgroundColor: themeColors.headerBg }]}>
              <View style={styles.modalHeader}>
                <Text style={[styles.modalTitle, { color: themeColors.text }]}>Settings</Text>
                <TouchableOpacity onPress={() => setShowSettings(false)}>
                  <X color={themeColors.text} />
                </TouchableOpacity>
              </View>
              <View style={styles.settingItem}>
                <View style={styles.settingLabelGroup}>
                  {isDarkMode ? <Moon size={20} color="#FF9F0A" /> : <Sun size={20} color="#FF9F0A" />}
                  <Text style={[styles.settingLabel, { color: themeColors.text }]}>Dark Mode</Text>
                </View>
                <Switch 
                  value={isDarkMode} 
                  onValueChange={setIsDarkMode} 
                  trackColor={{ false: '#767577', true: '#FF9F0A' }}
                />
              </View>
            </View>
          </View>
        </Modal>

        {/* Modal: Info/Tips */}
        <Modal visible={showInfo} animationType="fade" transparent={true}>
          <View style={styles.modalOverlay}>
            <View style={[styles.modalContent, { backgroundColor: themeColors.headerBg, maxHeight: '80%' }]}>
              <View style={styles.modalHeader}>
                <Text style={[styles.modalTitle, { color: themeColors.text }]}>About SciencyCalc</Text>
                <TouchableOpacity onPress={() => setShowInfo(false)}>
                  <X color={themeColors.text} />
                </TouchableOpacity>
              </View>
              <ScrollView style={{ marginTop: 15 }}>
                <Text style={[styles.infoVersion, { color: '#FF9F0A' }]}>v1.0.0</Text>
                <Text style={[styles.infoDescription, { color: themeColors.text }]}>
                  SciencyCalc is a high-performance scientific calculator designed for precision and ease of use.
                </Text>
                <View style={styles.tipContainer}>
                  <CheckCircle2 size={16} color="#FF9F0A" />
                  <Text style={[styles.tipText, { color: themeColors.subtext }]}>Rotate device for Scientific mode</Text>
                </View>
                <View style={styles.tipContainer}>
                  <CheckCircle2 size={16} color="#FF9F0A" />
                  <Text style={[styles.tipText, { color: themeColors.subtext }]}>Tap history to reuse expressions</Text>
                </View>
                <View style={styles.tipContainer}>
                  <CheckCircle2 size={16} color="#FF9F0A" />
                  <Text style={[styles.tipText, { color: themeColors.subtext }]}>Long press "C" to clear all</Text>
                </View>
              </ScrollView>
            </View>
          </View>
        </Modal>

        <View style={{ height: Platform.OS === 'ios' ? 20 : 10 }} />
      </LinearGradient>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  background: { flex: 1 },
  header: { paddingTop: Platform.OS === 'android' ? 40 : 0 },
  headerContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 25,
    paddingVertical: 10,
  },
  brand: { fontSize: 22, fontWeight: '900', letterSpacing: 2 },
  headerIcons: { flexDirection: 'row', alignItems: 'center' },
  displayContainer: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'flex-end',
    paddingHorizontal: 30,
    paddingBottom: 20,
  },
  historyText: { fontSize: 24, marginBottom: 8, fontWeight: '300' },
  displayText: { fontWeight: '200' },
  drawerHandle: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 10,
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    marginTop: 10,
  },
  drawerText: { color: '#FF9F0A', marginLeft: 8, fontSize: 14, fontWeight: '700', textTransform: 'uppercase' },
  keypad: { paddingBottom: 10 },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  button: {
    elevation: 4,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 3,
  },
  gradient: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonText: { fontWeight: '600' },
  scientificGrid: { marginBottom: 12 },
  mainGrid: {},
  // Modal Styles
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.6)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  modalContent: {
    width: '100%',
    borderRadius: 30,
    padding: 25,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.5,
    shadowRadius: 15,
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  modalTitle: { fontSize: 24, fontWeight: '800' },
  settingItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 15,
  },
  settingLabelGroup: { flexDirection: 'row', alignItems: 'center' },
  settingLabel: { fontSize: 18, marginLeft: 15, fontWeight: '500' },
  infoVersion: { fontSize: 32, fontWeight: '900', textAlign: 'center', marginBottom: 10 },
  infoDescription: { fontSize: 16, textAlign: 'center', marginBottom: 25, lineHeight: 22 },
  tipContainer: { flexDirection: 'row', alignItems: 'center', marginBottom: 12 },
  tipText: { marginLeft: 10, fontSize: 15 },
});
