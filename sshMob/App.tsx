/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React, {useEffect, useRef, useState} from 'react';
import {Alert, BackHandler, SafeAreaView} from 'react-native';
import WebView from 'react-native-webview';

interface INav {
  url: string;
  canGoBack: boolean;
}

function App(): React.JSX.Element {
  const webViewRef = useRef<WebView>(null);
  const [nav, setNav] = useState<INav>({
    url: '',
    canGoBack: false,
  });

  const close = () => {
    Alert.alert('떠나실건가요?', '확인을 누르면 종료됩니다.', [
      {
        text: '취소',
        onPress: () => {},
        style: 'cancel',
      },
      {
        text: '확인',
        onPress: () => BackHandler.exitApp(),
      },
    ]);
  };

  useEffect(() => {
    const handleBack = () => {
      if (nav.canGoBack) {
        if (
          nav.url === 'https://www.solsol-high.kro.kr' ||
          nav.url === 'https://www.solsol-high.kro.kr/login'
        ) {
          close();
        } else {
          webViewRef.current?.goBack();
        }
      } else {
        close();
      }
      return true;
    };

    BackHandler.addEventListener('hardwareBackPress', handleBack);

    return () => {
      BackHandler.removeEventListener('hardwareBackPress', handleBack);
    };
  }, [nav]);

  return (
    <SafeAreaView style={{flex: 1}}>
      <WebView
        ref={webViewRef}
        source={{uri: 'https://www.solsol-high.kro.kr'}}
        onNavigationStateChange={(nav: INav) => {
          setNav({url: nav.url, canGoBack: nav.canGoBack});
        }}
      />
    </SafeAreaView>
  );
}

export default App;
