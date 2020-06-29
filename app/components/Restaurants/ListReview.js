import React, { useState, useCallback } from "react";
import { StyleSheet, Text, View } from "react-native";
import { Button, Avatar, Rating } from "react-native-elements";
import { map, create } from "lodash";
import { useFocusEffect } from "@react-navigation/native";

import { firebaseApp } from "../../utils/firebase";
import firebase from "firebase/app";
import "firebase/firestore";

const db = firebase.firestore(firebaseApp);

export default function ListReview(props) {
  const { navigation, idRestaurant } = props;
  const [userLogged, setUserLogged] = useState(false);
  const [reviews, setReviews] = useState([]);

  firebase.auth().onAuthStateChanged((user) => {
    user ? setUserLogged(true) : setUserLogged(false);
  });

  useFocusEffect(
    useCallback(() => {
      db.collection("reviews")
        .where("idRestaurant", "==", idRestaurant)
        .get()
        .then((response) => {
          const resultReviews = [];
          response.forEach((doc) => {
            const data = doc.data();
            data.id = doc.id;
            resultReviews.push(data);
          });
          setReviews(resultReviews);
        });
    }, [])
  );

  return (
    <View>
      {userLogged ? (
        <Button
          title="Escribe algo acerca del restaurante"
          buttonStyle={styles.btnAddReview}
          titleStyle={styles.tittleAddReview}
          icon={{
            type: "material-community",
            name: "square-edit-outline",
            color: "#00a680",
          }}
          onPress={() =>
            navigation.navigate("addReviewRestaurant", {
              idRestaurant: idRestaurant,
            })
          }
        />
      ) : (
        <View>
          <Text
            style={styles.textNotLog}
            onPress={() => navigation.navigate("accounts", { screen: "login" })}
          >
            Se requiere iniciar sesión para comentar {"\n"}
            <Text style={{ fontWeight: "bold" }}>
              Click aqui para iniciar sesión
            </Text>
          </Text>
        </View>
      )}

      {map(reviews, (review, index) => (
        <Review key={index} review={review} />
      ))}
    </View>
  );
}

function Review(props) {
  const { title, review, rating, createAt, avatarUser } = props.review;
  const createReview = new Date(createAt.seconds * 1000);

  return (
    <View style={styles.viewReview}>
      <View style={styles.viewImageAvatar}>
        <Avatar
          size="large"
          rounded
          containerStyle={styles.imageAvatarUser}
          source={
            avatarUser
              ? { uri: avatarUser }
              : require("../../../assets/img/avatar-default.jpg")
          }
        />
      </View>
      <View style={styles.viewInfo}>
        <Text style={styles.reviewTitle}>{title}</Text>
        <Text style={styles.reviewText}>{review}</Text>
        <Rating imageSize={15} startingValue={rating} readonly />
        <Text style={styles.reviewDate}>
          {createReview.getDate()}/{createReview.getMonth() + 1}/
          {createReview.getFullYear()} - {createReview.getHours()}:
          {createReview.getMinutes() < 10 ? "0" : ""}
          {createReview.getMinutes()}
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  btnAddReview: {
    backgroundColor: "transparent",
  },
  tittleAddReview: {
    color: "#00a680",
  },
  textNotLog: {
    textAlign: "center",
    color: "#00a680",
    padding: 20,
  },
  viewReview: {
    flexDirection: "row",
    padding: 10,
    paddingBottom: 20,
    borderBottomColor: "#e3e3e3",
    borderBottomWidth: 1,
  },
  viewImageAvatar: {
    marginRight: 15,
  },
  imageAvatarUser: {
    width: 50,
    height: 50,
  },
  viewInfo: {
    flex: 1,
    alignItems: "flex-start",
  },
  reviewTitle: {
    fontWeight: "bold",
  },
  reviewText: {
    paddingTop: 2,
    color: "grey",
  },
  reviewDate: {
    marginTop: 5,
    color: "grey",
    fontSize: 12,
    position: "absolute",
    right: 0,
    bottom: 0,
  },
});
