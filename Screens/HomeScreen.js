import React, { Component } from "react";
import {
  View,
  StyleSheet,
  StatusBar,
  Dimensions,
  Image,
  Alert,
  Linking,
  ScrollView,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import {
  SocialIcon,
  Icon,
  Input,
  Text,
  Button,
  Header as HeaderRNE,
  HeaderProps,
  Overlay,
} from "react-native-elements";
import LottieView from "lottie-react-native";
import Swiper from "react-native-swiper";
import ThemedListItem from "react-native-elements/dist/list/ListItem";
import { Observer, observer } from "mobx-react";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import { TouchableOpacity } from "react-native-gesture-handler";
import AnimateNumber from "react-native-animate-number";
import {
  Table,
  Row,
  Rows,
  TableWrapper,
  Cell,
} from "react-native-table-component";
import AuthStore from "../Stores/AuthStore";
import SelectDropdown from "react-native-select-dropdown";

const hareketler = ["Depo", "Müşteri", "Fuar"];

const PlaygroundNavigate = () => {
  let navigation = useNavigation();

  return (
    <TouchableOpacity
      style={{ marginLeft: 10, flexDirection: "row" }}
      onPress={() => navigation.navigate("barkod")}
    >
      <Icon type="font-awesome-5" name="qrcode" color="green" />
      <Text style={{ color: "green" }} h5>
        Barkod
      </Text>
    </TouchableOpacity>
  );
};

@observer
class HomeScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tableHead: ["Id", "Kucuker Kod", "Model", "Sil"],
      tableData: AuthStore.barcoded,
      overlaystatus: false,
      hareketcesidi: "",
    };
  }
  _alertIndex(index) {
    //Alert.alert(`This is row ${index + 1}`);
    AuthStore.DeleteItemFromBarkodList(index + 1);
    alert("silincek");
  }

  ///barkodları gönderme butonu
  toggleOverlay = () => {
    if (this.state.hareketcesidi != "") {
      var list = [];

      AuthStore.barcoded.map((t, index) =>
        list.push({
          barkodid: t[0],
          kucukerkod: t[1],
          model: t[2],
          hareketadi: this.state.hareketcesidi,
        })
      );

      AuthStore.SetHareket(list);

      this.setState({
        hareketcesidi: "",
        overlaystatus: !this.state.overlaystatus,
      });

      AuthStore.ClearBarkodList();
      alert("Barkod Hareketleri Sisteme Kaydedildi!");
    } else alert("Bir Hareket Seçmeden Barkodları Aktaramazsınız!");
  };

  toggleOverlayBackdrop = () => {
    this.setState({
      overlaystatus: !this.state.overlaystatus,
    });
  };

  render() {
    const element = (data, index) => (
      <TouchableOpacity onPress={() => this._alertIndex(index)}>
        <View style={styles.btn}>
          <Text style={styles.btnText}>Sil</Text>
        </View>
      </TouchableOpacity>
    );

    return (
      <SafeAreaProvider>
        <Overlay
          isVisible={this.state.overlaystatus}
          onBackdropPress={this.toggleOverlayBackdrop}
        >
          <Text style={styles.textSecondary}>Hareket Seç</Text>

          <View>
            <SelectDropdown
              defaultButtonText="Hareket Türü Seçiniz"
              data={hareketler}
              onSelect={(selectedItem, index) => {
                this.setState({ hareketcesidi: selectedItem });
              }}
              buttonTextAfterSelection={(selectedItem, index) => {
                // text represented after item is selected
                // if data array is an array of objects then return selectedItem.property to render after item is selected
                return selectedItem;
              }}
            />
            <Text>.</Text>
            <Button
              icon={
                <Icon
                  name="wrench"
                  type="font-awesome"
                  color="white"
                  size={25}
                  iconStyle={{ marginRight: 10 }}
                />
              }
              title="Barkodları Gönder"
              onPress={this.toggleOverlay}
            />
          </View>
        </Overlay>

        <HeaderRNE
          backgroundColor={"white"}
          borderColor={"black"}
          containerStyle={{
            borderBottomColor: "#85106a",
            borderBottomWidth: 1,
          }}
          leftComponent={{
            icon: "menu",
            color: "#fff",
          }}
          rightComponent={
            <View style={styles.headerRight}>
              <PlaygroundNavigate></PlaygroundNavigate>
            </View>
          }
          centerComponent={{
            text: "Casadora Baby",
            style: styles.heading,
          }}
        />
        <ScrollView style={styles.container}>
          <Table borderStyle={{ borderColor: "transparent" }}>
            <Row
              data={this.state.tableHead}
              style={styles.head}
              textStyle={styles.text}
            />
            {AuthStore.barcoded.map((rowData, index) => (
              <TableWrapper key={index} style={styles.row}>
                {rowData.map((cellData, cellIndex) => (
                  <Cell
                    key={cellIndex}
                    data={cellIndex === 3 ? element(cellData, index) : cellData}
                    textStyle={styles.text}
                  />
                ))}
              </TableWrapper>
            ))}
          </Table>
          {AuthStore.barcoded.length != 0 ? (
            <Button
              icon={<Icon name="arrow-right" size={40} color="white" />}
              iconRight
              title="Ürünleri Aktar"
              loading={false}
              loadingProps={{ size: "small", color: "white" }}
              buttonStyle={{
                backgroundColor: "green",
                borderRadius: 5,
              }}
              titleStyle={{ fontWeight: "bold", fontSize: 15 }}
              containerStyle={{
                flex: 1,
              }}
              onPress={() => {
                this.setState({
                  overlaystatus: !this.state.overlaystatus,
                });
              }}
            />
          ) : (
            <View></View>
          )}
        </ScrollView>
      </SafeAreaProvider>
    );
  }
}

export default observer(HomeScreen);
const styles = StyleSheet.create({
  loadinghat: {
    borderColor: "red",

    justifyContent: "flex-end",
  },
  headerContainer: {
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#397af8",
    marginBottom: 20,
    width: "100%",
  },
  heading: {
    color: "black",
    fontSize: 22,
    fontWeight: "bold",
  },

  subheaderText: {
    color: "black",
    fontSize: 16,
    fontWeight: "bold",
  },
  headerRight: {
    display: "flex",
    flexDirection: "row",
    marginTop: 5,
    color: "black",
  },

  container: { flex: 1, padding: 16, paddingTop: 30, backgroundColor: "#fff" },
  head: { height: 40, backgroundColor: "azure" },
  text: { margin: 6, textAlign: "center", alignItems: "center" },
  row: { flexDirection: "row", backgroundColor: "white" },
  btn: { width: 58, height: 18, backgroundColor: "#78B7BB", borderRadius: 2 },
  btnText: { textAlign: "center", color: "#fff" },
});
