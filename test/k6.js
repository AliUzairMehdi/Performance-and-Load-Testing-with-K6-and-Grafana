import { group } from "k6";
import { htmlReport } from "https://raw.githubusercontent.com/benc-uk/k6-reporter/2.2.0/dist/bundle.js";
import sql from "k6/x/sql";
import * as users from "../main/swaggerApis/users.js";
import * as bookings from "../main/bookingApis/bookings.js";
import * as queries from "../utils/dbUtils/dbQueries.js";

const db = sql.open(
  "postgres",
  "postgres://postgres:aliuzair@localhost:5432/library?sslmode=disable"
);

export const options = {
  thresholds: {
    checks: ["rate>=0.50"],
    http_req_duration: ["p(95)<2000"],
    http_req_failed: [`rate<0.50`],
  },
  ext: {
    loadimpact: {
      projectID: 3667645,
      name: "Performance Testing Assignment",
      distribution: {
        loadzone1: {
          loadZone: "amazon:ca:montreal",
          percent: 75,
        },
        loadzone2: {
          loadZone: "amazon:gb:london",
          percent: 25,
        },
      },
    },
  },
  scenarios: {
    scenarioOne: {
      executor: "constant-vus",
      vus: 1,
      duration: "600s",
      startTime: "0s",
    },
    // scenarioTwo: {
    //   executor: "constant-vus",
    //   vus: 20,
    //   duration: "300s",
    //   startTime: "100s",
    // },
  },
};

export default function () {
  group("Testing: K6 Assignment", function () {
    group("Booking Api Requests", function () {
      group("Get Bookings Request", function () {
        bookings.getBookings();
      });

      group("Create Booking Request", function () {
        bookings.createBookings();
      });

      group("Partial Update Request", function () {
        bookings.partialUpdateBooking();
      });

      group("Delete Booking Request", function () {
        bookings.deleteBookings();
      });
    });

    group("Swagger Api Requests", function () {
      group("Create Single User", function () {
        users.createUser();
      });
      group("Create User with Array", function () {
        users.createUsersWithArray();
      });

      group("Get Users", function () {
        users.getUser();
      });

      group("Update User", function () {
        users.updateUser();
      });
      group("Delete Users", function () {
        users.deleteUser();
      });
    });

    group("PostgreSql DB Testing", function () {
      group("Select Queries", function () {
        queries.selectQueryResponseFromDB(db, "SELECT * FROM books;");
        queries.selectQueryResponseFromDB(
          db,
          "SELECT * FROM books WHERE author = 'J.K. Rowling';"
        );
        queries.selectQueryResponseFromDB(db, "SELECT COUNT(*) FROM books;");
        queries.selectQueryResponseFromDB(
          db,
          "SELECT * FROM books ORDER BY publication_year ASC;"
        );
        queries.selectQueryResponseFromDB(
          db,
          "SELECT * FROM books WHERE publication_year = (SELECT MAX(publication_year) FROM books);"
        );
        queries.selectQueryResponseFromDB(
          db,
          "SELECT * FROM books ORDER BY publication_year DESC LIMIT 5;"
        );
      });
      group("Insert Queries", function () {
        queries.dbInsertQuery(
          db,
          "INSERT INTO books (title, author, publication_year) VALUES ('The Catcher in the Rye', 'J.D. Salinger', 1951);"
        );
        queries.dbInsertQuery(
          db,
          "INSERT INTO books (title, author, publication_year) VALUES ('To Kill a Mockingbird', 'Harper Lee', 1960);"
        );
      });
    });
  });
}

export function handleSummary(data) {
  return {
    "report/summary.html": htmlReport(data),
  };
}
