import * as AC from "@bacons/apple-colors";
import { View, Text, Pressable } from "react-native";
import { Link } from "expo-router";

export interface Flight {
  id: string;
  flightNumber: string;
  airline: string;
  departure: {
    airport: string;
    city: string;
    time: string;
    gate?: string;
  };
  arrival: {
    airport: string;
    city: string;
    time: string;
    gate?: string;
  };
  status: "on-time" | "delayed" | "boarding" | "departed" | "arrived" | "cancelled";
  aircraft?: string;
}

export default function FlightCard({ flight }: { flight: Flight }) {

  const getStatusColor = () => {
    switch (flight.status) {
      case "on-time":
      case "arrived":
        return AC.systemGreen;
      case "delayed":
      case "cancelled":
        return AC.systemRed;
      case "boarding":
      case "departed":
        return AC.systemBlue;
      default:
        return AC.systemGray;
    }
  };

  const getStatusText = () => {
    return flight.status
      .split("-")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");
  };

  return (
    <Link href={`/flight/${flight.id}`} asChild>
      <Pressable
        style={({ pressed }) => ({
          backgroundColor: AC.secondarySystemBackground,
          borderRadius: 16,
          borderCurve: "continuous",
          padding: 16,
          gap: 12,
          opacity: pressed ? 0.7 : 1,
          shadowColor: "#000",
          shadowOffset: { width: 0, height: 2 },
          shadowOpacity: 0.1,
          shadowRadius: 8,
        })}
      >
      {/* Header */}
      <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center" }}>
        <View style={{ gap: 4 }}>
          <Text
            style={{
              fontSize: 20,
              fontWeight: "600",
              color: AC.label,
            }}
          >
            {flight.flightNumber}
          </Text>
          <Text
            style={{
              fontSize: 14,
              color: AC.secondaryLabel,
            }}
          >
            {flight.airline}
          </Text>
        </View>
        <View
          style={{
            backgroundColor: getStatusColor(),
            paddingHorizontal: 12,
            paddingVertical: 6,
            borderRadius: 8,
            borderCurve: "continuous",
          }}
        >
          <Text
            style={{
              color: "white",
              fontSize: 12,
              fontWeight: "600",
            }}
          >
            {getStatusText()}
          </Text>
        </View>
      </View>

      {/* Route */}
      <View style={{ flexDirection: "row", alignItems: "center", gap: 12 }}>
        <View style={{ flex: 1, gap: 4 }}>
          <Text
            style={{
              fontSize: 24,
              fontWeight: "700",
              color: AC.label,
            }}
          >
            {flight.departure.airport}
          </Text>
          <Text
            style={{
              fontSize: 14,
              color: AC.secondaryLabel,
            }}
          >
            {flight.departure.city}
          </Text>
          <Text
            style={{
              fontSize: 16,
              fontWeight: "600",
              color: AC.label,
              marginTop: 4,
            }}
          >
            {flight.departure.time}
          </Text>
        </View>

        <View style={{ alignItems: "center", paddingHorizontal: 8 }}>
          <Text style={{ fontSize: 24 }}>✈️</Text>
          <View
            style={{
              width: 40,
              height: 2,
              backgroundColor: AC.separator,
              marginVertical: 4,
            }}
          />
        </View>

        <View style={{ flex: 1, gap: 4, alignItems: "flex-end" }}>
          <Text
            style={{
              fontSize: 24,
              fontWeight: "700",
              color: AC.label,
            }}
          >
            {flight.arrival.airport}
          </Text>
          <Text
            style={{
              fontSize: 14,
              color: AC.secondaryLabel,
            }}
          >
            {flight.arrival.city}
          </Text>
          <Text
            style={{
              fontSize: 16,
              fontWeight: "600",
              color: AC.label,
              marginTop: 4,
            }}
          >
            {flight.arrival.time}
          </Text>
        </View>
      </View>

      </Pressable>
    </Link>
  );
}
