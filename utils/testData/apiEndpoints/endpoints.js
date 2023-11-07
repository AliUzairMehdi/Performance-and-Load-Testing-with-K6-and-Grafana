module.exports = {
  Api: {
    url: "https://petstore.swagger.io/v2",
    path: {
      createUsers: "/user/createWithArray",
      getUser: "/user",
      createUser: "/user",
      updateUser: "/user",
    },
  },
  bookingsApi: {
    url: "https://restful-booker.herokuapp.com",
    path: {
      getBookings: "/booking",
      createBooking: "/booking",
      partialUpdateBooking: "/booking",
      deleteBooking: "/booking",
    },
  },
};
