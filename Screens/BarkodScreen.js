import React, { AppRegistry, Component } from "react";
import {
  View,
  StyleSheet,
  StatusBar,
  Dimensions,
  ScrollView,
  TouchableOpacity,
  Linking,
} from "react-native";
import { SocialIcon, Icon, Input, Text, Button } from "react-native-elements";
import MaterialIcon from "react-native-vector-icons/MaterialCommunityIcons";
import { useNavigation } from "@react-navigation/native";
import LottieView from "lottie-react-native";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import QRCodeScanner from "react-native-qrcode-scanner";
import { RNCamera } from "react-native-camera";
import { autorun } from "mobx";
import AuthStore from "../Stores/AuthStore";

import { Observer, observer } from "mobx-react";
const SCREEN_WIDTH = Dimensions.get("window").width;

class LoginScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      incbarkod: "",
      statereader: false,
    };
  }
  animationlogo = () => {
    return (
      <LottieView
        resizeMode="cover"
        style={{
          width: 50,
          flex: 1,
        }}
        source={require("../AniJsons/36605-shopping-cart.json")}
        autoPlay
        loop
      />
    );
  };
  onSuccess = (e) => {
    const myArray = e.data.split(" ");

    /*
    AuthStore.UpdatedBarkodList({
      barkodid: myArray[0],
      kucukerkod: myArray[1],
      model: myArray[2],
      hareketkodu: "",
    });
*/
    var varmi = false;

    AuthStore.barcoded.forEach((element) => {
      if (element[0] == myArray[0]) varmi = true;
    });

    if (!varmi) {
      AuthStore.UpdatedBarkodList([myArray[0], myArray[1], myArray[2], ""]);

      this.setState({
        incbarkod: e.data,
        statereader: true,
      });
    } else {
      alert(
        myArray[0] + " Numaralı Barkod Daha Önceden Seçildi. Listeye Eklenmedi!"
      );
      this.setState({
        incbarkod: "",
        statereader: true,
      });
    }
    // Linking.openURL(e.data).catch((err) =>
    // console.error("An error occured", err)
    //   );
  };

  /*
 <View style={styles.headerhat}>
          <Text h4>Casadora Baby</Text>
        </View>
        <View style={styles.animationhat}>{this.animationlogo()}</View>
        <View style={styles.middlehat}>
          <LoginButton></LoginButton>
        </View>

//    this.scanner.reactivate();

  */

  render() {
    return (
      <QRCodeScanner
        ref={(node) => {
          this.scanner = node;
        }}
        onRead={this.onSuccess}
        //flashMode={RNCamera.Constants.FlashMode.torch}
        topContent={
          <Text style={styles.centerText}>
            Barkod Çıktısı{" "}
            <Text style={styles.textBold}>{this.state.incbarkod}</Text>
          </Text>
        }
        bottomContent={
          this.state.statereader ? (
            <TouchableOpacity
              style={styles.buttonTouchable}
              onPress={() => {
                this.scanner.reactivate();

                this.setState({
                  statereader: false,
                });
              }}
            >
              <Text style={styles.buttonText}>Diğer Barkoda Geç!</Text>
            </TouchableOpacity>
          ) : (
            ""
          )
        }
      />
    );
  }
}

export default observer(LoginScreen);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignContent: "center",
    marginTop: StatusBar.currentHeight || 0,
    marginBottom: StatusBar.currentHeight + 3,
  },
  tophat: {
    flex: 0.75,
    justifyContent: "space-between",
    alignContent: "center",
  },
  middlehat: {
    flex: 3,
    justifyContent: "flex-start",
  },
  headerhat: {
    flex: 0.5,
    justifyContent: "center",
    alignItems: "center",
  },
  animationhat: {
    flex: 0.5,
    justifyContent: "center",
    alignContent: "center",
    flexWrap: "wrap",
  },

  bottomhat: {
    flex: 2,
    borderColor: "red",
    justifyContent: "center",
    backgroundColor: "yellow",
  },

  centerText: {
    flex: 1,
    fontSize: 18,
    padding: 32,
    color: "#777",
  },
  textBold: {
    fontWeight: "500",
    color: "#000",
  },
  buttonText: {
    fontSize: 21,
    color: "rgb(0,122,255)",
  },
  buttonTouchable: {
    padding: 16,
  },
});
