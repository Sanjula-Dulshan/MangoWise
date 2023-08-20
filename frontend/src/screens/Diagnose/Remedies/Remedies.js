import { ScrollView, Text, View } from "react-native";
import Header from "../../../components/Common/Header";
import { useEffect, useState } from "react";
import { useRoute } from "@react-navigation/native";
import treatment from "./treatment-api";

export default function Remedies() {
  const route = useRoute();
  const [disease, setDisease] = useState();

  useEffect(() => {
    console.log("route.params>> ", route.params);
    const { disease } = route.params;
    setDisease(disease);
  }, [route.params]);
  return (
    <View style={{ backgroundColor: "#fdfafa", height: "100%" }}>
      <Header />
      {treatment.map((item, key) => {
        if (item.disease == disease) {
          return (
            <ScrollView showsVerticalScrollIndicator={false} key={key}>
              <Text>{item.disease}</Text>
              <Text>{item.symptoms}</Text>
              <Text>{item.description}</Text>
              <Text>{item.organic}</Text>
              <Text>{item.chemical}</Text>
            </ScrollView>
          );
        }
      })}
    </View>
  );
}
