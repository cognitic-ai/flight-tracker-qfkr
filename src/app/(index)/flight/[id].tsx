import { ScrollView, Text, View } from "react-native";
import { useLocalSearchParams } from "expo-router";
import * as AC from "@bacons/apple-colors";
import { Flight } from "@/components/flight-card";

const SAMPLE_FLIGHTS: Flight[] = [
  {
    id: "1",
    flightNumber: "AA 2451",
    airline: "American Airlines",
    departure: {
      airport: "JFK",
      city: "New York",
      time: "14:30",
      gate: "B22",
    },
    arrival: {
      airport: "LAX",
      city: "Los Angeles",
      time: "18:15",
      gate: "C14",
    },
    status: "on-time",
    aircraft: "Boeing 737-800",
  },
  {
    id: "2",
    flightNumber: "UA 1234",
    airline: "United Airlines",
    departure: {
      airport: "SFO",
      city: "San Francisco",
      time: "09:45",
      gate: "D8",
    },
    arrival: {
      airport: "ORD",
      city: "Chicago",
      time: "15:30",
      gate: "A12",
    },
    status: "boarding",
    aircraft: "Airbus A320",
  },
  {
    id: "3",
    flightNumber: "DL 5678",
    airline: "Delta Air Lines",
    departure: {
      airport: "ATL",
      city: "Atlanta",
      time: "11:20",
      gate: "E15",
    },
    arrival: {
      airport: "MIA",
      city: "Miami",
      time: "13:05",
      gate: "G9",
    },
    status: "delayed",
    aircraft: "Boeing 757-200",
  },
  {
    id: "4",
    flightNumber: "SW 9012",
    airline: "Southwest Airlines",
    departure: {
      airport: "DEN",
      city: "Denver",
      time: "07:15",
      gate: "B5",
    },
    arrival: {
      airport: "PHX",
      city: "Phoenix",
      time: "09:00",
      gate: "C3",
    },
    status: "departed",
    aircraft: "Boeing 737 MAX 8",
  },
  {
    id: "5",
    flightNumber: "BA 117",
    airline: "British Airways",
    departure: {
      airport: "LHR",
      city: "London",
      time: "20:00",
      gate: "T5-A12",
    },
    arrival: {
      airport: "JFK",
      city: "New York",
      time: "23:30",
      gate: "B45",
    },
    status: "arrived",
    aircraft: "Boeing 777-300ER",
  },
];

export default function FlightDetailRoute() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const flight = SAMPLE_FLIGHTS.find((f) => f.id === id);

  if (!flight) {
    return (
      <ScrollView
        contentInsetAdjustmentBehavior="automatic"
        style={{
          flex: 1,
          backgroundColor: AC.systemBackground,
        }}
      >
        <View style={{ padding: 16 }}>
          <Text style={{ color: AC.label, fontSize: 17 }}>Flight not found</Text>
        </View>
      </ScrollView>
    );
  }

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
    <ScrollView
      contentInsetAdjustmentBehavior="automatic"
      style={{
        flex: 1,
        backgroundColor: AC.systemBackground,
      }}
      contentContainerStyle={{
        padding: 16,
        gap: 24,
        paddingTop: process.env.EXPO_OS === "web" ? 80 : 16,
      }}
    >
      {/* Status Badge */}
      <View style={{ alignItems: "center", gap: 12 }}>
        <View
          style={{
            backgroundColor: getStatusColor(),
            paddingHorizontal: 16,
            paddingVertical: 8,
            borderRadius: 12,
            borderCurve: "continuous",
          }}
        >
          <Text
            style={{
              color: "white",
              fontSize: 16,
              fontWeight: "600",
            }}
          >
            {getStatusText()}
          </Text>
        </View>
      </View>

      {/* Route Visualization */}
      <View
        style={{
          backgroundColor: AC.secondarySystemBackground,
          borderRadius: 16,
          borderCurve: "continuous",
          padding: 20,
          gap: 24,
        }}
      >
        {/* Departure */}
        <View style={{ gap: 8 }}>
          <Text style={{ fontSize: 14, color: AC.secondaryLabel, fontWeight: "600" }}>
            DEPARTURE
          </Text>
          <Text style={{ fontSize: 36, fontWeight: "700", color: AC.label }}>
            {flight.departure.airport}
          </Text>
          <Text style={{ fontSize: 18, color: AC.secondaryLabel }}>
            {flight.departure.city}
          </Text>
          <Text style={{ fontSize: 28, fontWeight: "600", color: AC.label, marginTop: 8 }}>
            {flight.departure.time}
          </Text>
          {flight.departure.gate && (
            <View style={{ flexDirection: "row", gap: 8, marginTop: 8 }}>
              <Text style={{ fontSize: 16, color: AC.secondaryLabel }}>Gate</Text>
              <Text style={{ fontSize: 16, fontWeight: "600", color: AC.label }}>
                {flight.departure.gate}
              </Text>
            </View>
          )}
        </View>

        {/* Flight Icon */}
        <View style={{ alignItems: "center" }}>
          <Text style={{ fontSize: 32 }}>✈️</Text>
          <View
            style={{
              width: "100%",
              height: 2,
              backgroundColor: AC.separator,
              marginTop: 8,
            }}
          />
        </View>

        {/* Arrival */}
        <View style={{ gap: 8 }}>
          <Text style={{ fontSize: 14, color: AC.secondaryLabel, fontWeight: "600" }}>
            ARRIVAL
          </Text>
          <Text style={{ fontSize: 36, fontWeight: "700", color: AC.label }}>
            {flight.arrival.airport}
          </Text>
          <Text style={{ fontSize: 18, color: AC.secondaryLabel }}>
            {flight.arrival.city}
          </Text>
          <Text style={{ fontSize: 28, fontWeight: "600", color: AC.label, marginTop: 8 }}>
            {flight.arrival.time}
          </Text>
          {flight.arrival.gate && (
            <View style={{ flexDirection: "row", gap: 8, marginTop: 8 }}>
              <Text style={{ fontSize: 16, color: AC.secondaryLabel }}>Gate</Text>
              <Text style={{ fontSize: 16, fontWeight: "600", color: AC.label }}>
                {flight.arrival.gate}
              </Text>
            </View>
          )}
        </View>
      </View>

      {/* Flight Details */}
      <View
        style={{
          backgroundColor: AC.secondarySystemBackground,
          borderRadius: 16,
          borderCurve: "continuous",
          padding: 20,
          gap: 16,
        }}
      >
        <Text style={{ fontSize: 20, fontWeight: "600", color: AC.label }}>
          Flight Details
        </Text>

        <View style={{ gap: 12 }}>
          <DetailRow label="Flight Number" value={flight.flightNumber} />
          <DetailRow label="Airline" value={flight.airline} />
          {flight.aircraft && <DetailRow label="Aircraft" value={flight.aircraft} />}
        </View>
      </View>
    </ScrollView>
  );
}

function DetailRow({ label, value }: { label: string; value: string }) {
  return (
    <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center" }}>
      <Text style={{ fontSize: 16, color: AC.secondaryLabel }}>{label}</Text>
      <Text
        style={{ fontSize: 16, fontWeight: "600", color: AC.label, textAlign: "right", flex: 1, marginLeft: 16 }}
        selectable
      >
        {value}
      </Text>
    </View>
  );
}
