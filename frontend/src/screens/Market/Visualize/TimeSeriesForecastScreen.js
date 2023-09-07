import React, { useState } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import ForecastModal from "./ForecastModal"; // Import the modal component

const TimeSeriesForecastScreen = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const timeSeriesData = [
    { month: "Jan", price: 100 },
    { month: "Feb", price: 120 },
    // ... more data
  ];

  return (
    <View>
      {/* Trigger to show the modal */}
      <TouchableOpacity onPress={() => setModalVisible(true)}>
        <Text>Show Graph</Text>
      </TouchableOpacity>

      {/* Modal for graph visualization */}
      <ForecastModal
        visible={modalVisible}
        onClose={() => setModalVisible(false)}
        timeSeriesData={timeSeriesData}
      />
    </View>
    // <View>
    //   <Text>Bezier Line Chart</Text>
    //   <LineChart
    //     data={{
    //       labels: ["January", "February", "March", "April", "May", "June"],
    //       datasets: [
    //         {
    //           data: [
    //             Math.random() * 100,
    //             Math.random() * 100,
    //             Math.random() * 100,
    //             Math.random() * 100,
    //             Math.random() * 100,
    //             Math.random() * 100,
    //           ],
    //         },
    //       ],
    //     }}
    //     width={Dimensions.get("window").width} // from react-native
    //     height={220}
    //     yAxisLabel="$"
    //     yAxisSuffix="k"
    //     yAxisInterval={1} // optional, defaults to 1
    //     chartConfig={{
    //       backgroundColor: "#e26a00",
    //       backgroundGradientFrom: "#fb8c00",
    //       backgroundGradientTo: "#ffa726",
    //       decimalPlaces: 2, // optional, defaults to 2dp
    //       color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
    //       labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
    //       style: {
    //         borderRadius: 16,
    //       },
    //       propsForDots: {
    //         r: "6",
    //         strokeWidth: "2",
    //         stroke: "#ffa726",
    //       },
    //     }}
    //     bezier
    //     style={{
    //       marginVertical: 8,
    //       borderRadius: 16,
    //     }}
    //   />
    // </View>
  );
};

export default TimeSeriesForecastScreen;
