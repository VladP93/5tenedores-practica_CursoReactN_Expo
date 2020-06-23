import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import Restaurants from "../screens/Restaurants/Restaurants";
import AddRestaurant from "../screens/Restaurants/AddRestaurnat";
import Restaurant from "../screens/Restaurants/Restaurant.js";

const Stack = createStackNavigator();

export default function RestaurantsStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="restaurants"
        component={Restaurants}
        options={{ title: "Restaurantes" }}
      />
      <Stack.Screen
        name="addrestaurant"
        component={AddRestaurant}
        options={{ title: "Añadir nuevo restaurante" }}
      />
      <Stack.Screen name="restaurant" component={Restaurant} />
    </Stack.Navigator>
  );
}
