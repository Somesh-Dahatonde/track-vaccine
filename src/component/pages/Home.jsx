import React from "react";
import Time from "../Dateandtime";
import HomeStyle from "../pages/Home.module.css";
import Cards from "../Card";

class Home extends React.Component {
  render() {
    return (
      <React.Fragment>
        <div className={HomeStyle.container}>
          <div className={HomeStyle.title}>
            <h2>WASHIM DISTRICT VACCINATION APPOINTMENT AVAILABILITY</h2>
            <div className={HomeStyle.time}>
              <Time />
              <Cards />
            </div>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default Home;