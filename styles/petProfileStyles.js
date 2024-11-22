import { StyleSheet, Dimensions } from "react-native";

const { width, height } = Dimensions.get("window");

const petProfileStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f8f8ff",
    marginTop: 10,
  },
  imageContainer: {
    marginHorizontal: 16,
    overflow: "hidden",
    // borderTopLeftRadius: 30,
    // borderTopRightRadius: 30,
    borderRadius: 30,
    maxHeight: height * 0.65,
  },
  image: {
    width: "100%",
    height: "100%",
    flex: 1,
    justifyContent: "flex-end",
  },
  genderIcon: {
    height: 32,
    width: 25,
  },
  overlay: {
    // backgroundColor: "rgba(0, 0, 0, 0.2)",
    // padding: 4,
    // borderRadius: 8,
    alignSelf: "flex-start",
    marginHorizontal: 20,
    marginBottom: 20,
  },
  imageText: {
    // fontSize: 30,
    // fontWeight: "bold",
    color: "#f8f8ff",
    textAlign: "left",
    textShadowColor: "rgba(0, 0, 0, 0.85)",
    textShadowOffset: { width: 2, height: 2 },
    textShadowRadius: 6,
  },
  bottomTextContainer: {
    marginHorizontal: 16,
    marginTop: 10,
    borderWidth: 2,
    borderRadius: 20,
    borderColor: "#33fff2",
    boxShadow: "3 3 3 #2edbd0",
  },
  bottomText: {
    margin: 10,
    fontWeight: 600,
    fontSize: 16,
  },
  bottomButton: {
    backgroundColor: "#4d71e9",
    marginHorizontal: 16,
    marginTop: 12,
    borderRadius: 6,
  },
  bottomButtonText: {
    textAlign: "center",
    color: "#f8f8ff",
    fontWeight: "bolder",
    fontSize: 20,
    padding: 10
  },
});

export default petProfileStyles;
