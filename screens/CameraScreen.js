import { CameraView, useCameraPermissions } from "expo-camera";
import { saveToLibraryAsync, usePermissions as useMediaPermissions } from "expo-media-library";
import { useRef, useState } from "react";
import { Dimensions, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { Button } from "react-native-paper";

const windowWidth = Dimensions.get("window").width;

function CameraScreen() {
  const [permission, requestPermission] = useCameraPermissions();
  const [mediaPermission, requestMediaPermission] = useMediaPermissions();
  // const [mediaPermission, requestMediaPermission] = MediaLibrary.usePermissions();
  const [facing, setFacing] = useState("back");
  const cameraRef = useRef(null);

  if (!permission) {
    return <View />
  }

  if (!permission?.granted) {
    return (
      <View style={styles.container}>
        <Text style={styles.message}>
          We need your permission to show the camera
        </Text>
        <Button
          mode="contained"
          onPress={async () => {
            const permissionResponse = await requestPermission();
            console.log(permissionResponse);
          }}
          title="grant permission"
        >Grant Permission</Button>
      </View>
    )
  }

  if (!mediaPermission?.granted) {
    return (
      <View style={styles.container}>
        <Text style={styles.message}>
          We need your permission to save photos
        </Text>
        <Button
          onPress={async () => {
            const permissionResponse = await requestMediaPermission();
            console.log(permissionResponse);
          }}
          title="grant permission for saving photos"
        ></Button>
      </View>
    );
  }

  function toggleCameraFacing() {
    setFacing((current) => {
      return current === "back" ? "front" : "back";
    });
  }

  async function takePhoto() {
    const cameraViewObj = cameraRef.current;
    if (cameraViewObj) {
      try {
        const photo = await cameraViewObj.takePictureAsync();
        await saveToLibraryAsync(photo.uri);
        alert("Photo saved to gallery!");
        navigation.navigate("Home");
      } catch (error) {
        console.error("Failed to take photo. Reason:", error);
        alert("Failed to take photo")
      }
    }
  }

  return (
    <View style={styles.container}>
      <CameraView style={styles.camera} facing={facing} ref={cameraRef}>
        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={styles.button}
            onPress={() => {
              toggleCameraFacing();
            }}
          >
            <Text style={styles.text}>Flip Camera</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.button}
            onPress={async () => {
              // take photo
              await takePhoto();
            }}
          >
            <View style={styles.photoButton}>
              <View style={styles.photoButtonInner} />
            </View>
          </TouchableOpacity>
        </View>
      </CameraView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 30,
  },
  buttonContainer: {
    alignItems: "stretch",
  },
  launchButton: {
    backgroundColor: "#2196F3",
    padding: 15,
    borderRadius: 10,
  },
  launchButtonText: {
    color: "white",
    fontSize: 18,
    textAlign: "center",
    fontWeight: "bold",
  },
  camera: {
    flex: 1,
  },
  button: {
    alignItems: "center",
    padding: 10,
  },
  text: {
    fontSize: 24,
    fontWeight: "bold",
    color: "white",
  },
  message: {
    textAlign: "center",
    paddingBottom: 10,
  },
  imageContainer: {
    marginTop: 30,
    alignItems: "center",
  },
  selectedImage: {
    width: windowWidth - 40,
    height: windowWidth - 40,
    borderRadius: 10,
    backgroundColor: "#f0f0f0",
  },
  photoButton: {
    width: 70,
    height: 70,
    borderRadius: 35,
    backgroundColor: "rgba(255, 255, 255, 0.3)",
    justifyContent: "center",
    alignItems: "center",
  },
  photoButtonInner: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: "white",
  },
});

export default CameraScreen;