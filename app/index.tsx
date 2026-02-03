import { Button, StyleSheet, View } from "react-native";
import { AirplaneSvg } from "../components/svg";
import { router } from "expo-router";



export default function Index() {
  return (
    <View style={style.container}>
      <AirplaneSvg/>
      <Button 
        title="Ir para segunda tela"
        onPress={() => router.replace('/login')}
      />
      <Button 
        title="Go to ticket screen"
        onPress={() => router.replace('/tickets')}
      />
        <Button 
        title="Go to ticket screen"
        onPress={() => router.replace('/ticketFilter')}
      />
    </View>
  );
}


const style = StyleSheet.create({
  container: {
    backgroundColor: "#0B655A",
    alignItems: "center",
    justifyContent: "center",
    height: "100%",
  }
});
