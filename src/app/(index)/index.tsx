import { ScrollView, Text, View, RefreshControl } from "react-native";
import { useState } from "react";
import * as AC from "@bacons/apple-colors";
import FlightCard, { Flight } from "@/components/flight-card";

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

export default function IndexRoute() {
  const [refreshing, setRefreshing] = useState(false);
  const [flights, setFlights] = useState<Flight[]>(SAMPLE_FLIGHTS);

  const onRefresh = () => {
    setRefreshing(true);
    setTimeout(() => {
      setRefreshing(false);
    }, 1000);
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
        gap: 16,
        paddingTop: process.env.EXPO_OS === "web" ? 80 : 16,
      }}
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }
    >
      <View style={{ gap: 8, marginBottom: 8 }}>
        <Text
          style={{
            fontSize: 17,
            color: AC.secondaryLabel,
          }}
        >
          Tracking {flights.length} flights
        </Text>
      </View>

      {flights.map((flight) => (
        <FlightCard key={flight.id} flight={flight} />
      ))}
    </ScrollView>
  );
}
