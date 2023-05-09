import React from "react";
import { View, Text, StyleSheet, Pressable } from "react-native";

const CustomButton = ({
  onPress,
  text,
  type = "PRIMARY",
  bgColor,
  fgColor,

}) => {
  return (
    <Pressable
      onPress={onPress}
      style={[
        styles.container,
        styles[`container_${type}`],
        bgColor ? { backgroundColor: bgColor } : {},
      ]}
    >
      <Text
        style={[
          styles.text,
          styles[`text_${type}`],
          fgColor ? { color: fgColor } : {},
        ]}
      >
        {text}
      </Text>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: 52,

    padding: 15,
    marginVertical: 5,

    alignItems: "center",
    borderRadius: 10,
  },

  container_PRIMARY: {
    backgroundColor: "#FBBC05",
    elevation: 7,
  },

  container_confirm: {
    marginTop: 20,
    backgroundColor: "black",
    elevation: 7,
  },

  container_SECONDARY: {
    borderColor: "#FBBC05",
    borderWidth: 2,
  },

  container_minus:{
    height:50,
    width : 50,
    marginTop : -55,
    marginRight : 170,
    //align text in center
    justifyContent : 'center',
    alignItems : 'center',

  },

  container_plus:{
    height:50,
    width : 50,
    marginTop : -55,
    marginLeft : 170,
    //align text in center
    justifyContent : 'center',
    alignItems : 'center',
    paddingBottom : 10,

  },

  container_datepicker:{
    backgroundColor: "#FBBC05",
    elevation: 0,
    textAlign : 'left',
    alignItems : 'flex-start',

  },

  container_seat: {
    backgroundColor: "#FBBC05",
    elevation: 7,
    marginTop : 30,
  },

  container_takeIt: {
    backgroundColor: "#EEB815",
    elevation: 7,
    width : 100,
    height : 40,
    marginHorizontal: "65%",
    paddingTop: 8,
    paddingBottom: 3,
    zIndex:3,
  },

  container_TERTIARY: {},

  container_DATE: {
    backgroundColor: "#3B71F3",
    elevation: 7,
  },
  container_decline: {
    elevation: 7,
    width: 100,
    height: 40,
    marginHorizontal: "7%",
    paddingTop: 8,
    paddingBottom: 3,
    borderColor: "#F40000",
    borderWidth: 2,
  },
  container_view: {
    elevation: 7,
    width: 100,
    height: 40,
    marginHorizontal: "7%",
    paddingTop: 8,
    paddingBottom: 3,
    borderColor: "#EEB815",
    borderWidth: 2,
  },
  container_report: {
    elevation: 7,
    width: 100,
    height: 40,
    marginHorizontal: "7%",
    paddingTop: 8,
    paddingBottom: 3,
    borderColor: "#F40000",
    backgroundColor: "#F40000",
    borderWidth: 2,
    marginLeft: "100%",
  },
  container_viewReport: {
    elevation: 7,
    width: 100,
    height: 40,
    marginHorizontal: "7%",
    paddingTop: 8,
    paddingBottom: 3,
    borderColor: "#EEB815",
    backgroundColor: "#EEB815",
    borderWidth: 2,
  },

  container_DownloadReport: {
    elevation: 7,
    width: "50%",
    backgroundColor: "#EEB815",
    height: 50,
    marginLeft: "35%",
  },

  text: {
    fontWeight: "bold",
    fontSize: 16,
    color: "white",
  },

  text_SECONDARY: {
    color: "#FBBC05",
  },

  text_TERTIARY: {
    color: "#FBBC05",
    marginLeft: "35%",
  },
  text_FOURTH: {
    color: "#FBBC05",
  },
  text_FORGOT: {
    alignSelf: "flex-end",
    color: "#000000",
  },

  text_FINE: {
    alignSelf: "flex-start",
    color: "#000000",
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: "-3%",
  },
  text_DownloadReport: {
    alignSelf: "center",
    color: "#000000",
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: "-3%",
},
  text_PROCEED: {
    alignSelf: "flex-end",
    backgroundColor: "#FBBC05",
    color: "white",
    fontFamily: "Roboto",
    fontSize: 22,
    textAlign: "center",
    width: "50%",
    height: 34,
    borderRadius: 10,
    marginRight: "52%",
  },
  text_gogo: {
    alignSelf: "flex-end",
    backgroundColor: "#FBBC05",
    color: "white",
    fontFamily: "Roboto",
    fontSize: 26,
    textAlign: "center",
    width: "60%",
    height: 45,
    borderRadius: 8,
    marginRight: "20%",
  },

  text_VIEWCARD: {
    color: "#2DAB22",
    marginRight: "60%",
    fontSize: 21,
    marginTop: "-5%",
    marginLeft: "-10%",
    fontStyle: "underline",
    textDecorationLine: "underline",
  },
  text_HISTORY: {
    alignSelf: "flex-end",
    backgroundColor: "black",
    color: "white",
    fontFamily: "Roboto",
    fontSize: 20,
    paddingLeft: "4%",
    paddingTop: "2%",
    width: "75%",
    height: 44,
    borderRadius: 8,
    marginRight: "27%",
    marginTop: "3%",
  },
  text_LOAN: {
    alignSelf: "flex-end",
    backgroundColor: "black",
    color: "white",
    fontFamily: "Roboto",
    fontSize: 22,
    textAlign: "center",
    width: "60%",
    height: 44,
    borderRadius: 8,
    marginRight: "42%",
    paddingTop: "1%",
    marginTop: "6%",
  },
  text_WALLET: {
    alignSelf: "flex-end",
    backgroundColor: "#FBBC05",
    color: "white",
    fontFamily: "Roboto",
    fontSize: 22,
    textAlign: "center",
    width: "70%",
    height: 50,
    borderRadius: 6,
    alignContent: "center",
    marginRight: "18%",
    borderColor: "black",
    borderTopWidth: 1.5,
    borderWidth: 1.5,
    borderStyle: "solid",
    paddingTop: "2%",
  },

  container_takeIt: {
    backgroundColor: "#EEB815",
    elevation: 7,
    width: 100,
    height: 40,
    marginHorizontal: "65%",
    paddingTop: 8,
    paddingBottom: 3,
  },
  container_approve: {
    elevation: 7,
    width: 100,
    height: 40,
    marginHorizontal: "7%",
    paddingTop: 8,
    paddingBottom: 3,
  },
  container_decline: {
    elevation: 7,
    width: 100,
    height: 40,
    marginHorizontal: "7%",
    paddingTop: 8,
    paddingBottom: 3,
    borderColor: "#F40000",
    borderWidth: 2,
  },
  container_view: {
    elevation: 7,
    width: 100,
    height: 40,
    marginHorizontal: "7%",
    paddingTop: 8,
    paddingBottom: 3,
    borderColor: "#EEB815",
    borderWidth: 2,
},
  text_REMOVECARD: {
    alignSelf: "flex-end",
    backgroundColor: "white",
    color: "red",
    borderColor: "red",
    borderWidth:1.3,
    fontFamily: "Roboto",
    fontSize: 18,
    textAlign: "center",
    width: "38%",
    height: 38,
    paddingTop: "2%",
    borderRadius: 8,
    marginRight: "65%",
    marginTop: "-4%",


  },
});

export default CustomButton;
