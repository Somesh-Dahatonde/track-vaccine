import axios from "axios";
import { useEffect, useState } from "react";
import HomeStyle from "..//../pages/Home.module.css";
import "antd/dist/antd.css";
import { Input, Select } from "antd";
import "../../pages/common.css";

const App = () => {
  const { Search } = Input;
  const [vaccine, setVaccine] = useState([]);
  const [search, setSearch] = useState("");
  const [pincode, setPincode] = useState("");
  const [district, setDistrict] = useState("");
  const [statisticsData, setStatistics] = useState([]);
  const [todayVaccinate, setTodayvaccine] = useState("");
  const [totalRegister, setTotalregister] = useState("");
  const [totalDosecomplete, setTotaldosecomplete] = useState("");

  const { Option } = Select;

  

  function handleChange(value) {
    setDistrict(value)
  }

  // console.log(district)


  let current_date = new Date()
    .toISOString()
    .replace(/T.*/, "")
    .split("-")
    .reverse()
    .join("-");



  var todayDate = new Date().toISOString().slice(0, 10);


  const vaccinationDataApi = "https://api.cowin.gov.in/api/v1/reports/v2/getPublicReports?state_id=&district_id=&date=" + current_date

  const getVaccineStatic = async () => {
    try {
      const response = await axios.get("https://api.cowin.gov.in/api/v1/reports/v2/getPublicReports?state_id=&district_id=&date=" + todayDate);
      setStatistics(response);
      setTodayvaccine(response.data.topBlock.vaccination.today);
      setTotalregister(response.data.topBlock.registration.total);
      setTotaldosecomplete(response.data.topBlock.vaccination.total)


    } catch (e) { }
  };

  useEffect(() => {
    getVaccineStatic();
  }, []);




  const apiUrl =
    "https://cdn-api.co-vin.in/api/v2/appointment/sessions/public/calendarByDistrict?district_id=" + district + "&date=" +
    current_date;

  


  const getVaccineData = async () => {
    try {
      const data = await axios.get(apiUrl);
      setVaccine(data.data.centers);
      // console.log(data.data.sessions);
      // console.log(data.data.sessions[0].name)
    } catch (e) { }
  };

  useEffect(() => {
    getVaccineData();
  }, []);

  if(district < 0) {
    // console.log("Data No Available")
    
  }

  else {
    // console.log("Data Available")
    getVaccineData();
  }


  // const onSearch = (value) => console.log(value);

  return (
    <div className={HomeStyle.table_component}>
      <div className={HomeStyle.container}>
        <div className={HomeStyle.vaccine_statics}>
          <div className={HomeStyle.vaccine_statics_title}>
            <p>Vaccination Data : </p>
            <p>(Till Date {current_date})</p>
          </div>
          <div className={HomeStyle.vaccine_statics_card}>
            <div className={HomeStyle.statics_card}>
              <div className={HomeStyle.static_card_title}>
                <p>
                  Vaccinated <br />
                  Today
                </p>
                <div className={HomeStyle.static_card_data}>
                  <p>{todayVaccinate}+</p>
                </div>
              </div>
            </div>
            <div className={HomeStyle.statics_card}>
              <div className={HomeStyle.static_card_title}>
                <p>
                  Total <br />
                  Registrations
                </p>
                <div className={HomeStyle.static_card_data}>
                  <p>{totalRegister}+</p>
                </div>
              </div>
            </div>
            <div className={HomeStyle.statics_card}>
              <div className={HomeStyle.static_card_title}>
                <p>Total Vaccination</p>
                <div className={HomeStyle.static_card_data}>
                  <p>{totalDosecomplete}+</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className={HomeStyle.select_dist}>
          <div className={HomeStyle.select_dist}>
            <h3>Select District : <span>(only Maharashatra)</span></h3>
          </div>
          <Select defaultValue="Select District"
            className={HomeStyle.select_styles}
            style={{ width: 340, }}
            onChange={handleChange}
            showSearch
            optionFilterProp="children"
            filterOption={(input, option) =>
              option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
            }

          >
            <Option value="391">Ahmednagar</Option>
            <Option value="364">Akola</Option>
            <Option value="366">Amravati</Option>
            <Option value="397">Aurangabad  </Option>
            <Option value="384">Beed</Option>
            <Option value="370">Bhandara</Option>
            <Option value="367">Buldhana</Option>
            <Option value="380">Chandrapur</Option>
            <Option value="388">Dhule</Option>
            <Option value="379">Gadchiroli</Option>
            <Option value="378">Gondia</Option>
            <Option value="386">Hingoli</Option>
            <Option value="390">Jalgaon</Option>
            <Option value="396">Jalna</Option>
            <Option value="371">Kolhapur</Option>
            <Option value="383">Latur</Option>
            <Option value="395">Mumbai</Option>
            <Option value="365">Nagpur</Option>
            <Option value="382">Nanded</Option>
            <Option value="387">Nandurbar</Option>
            <Option value="389">Nashik</Option>
            <Option value="381">Osmanabad</Option>
            <Option value="394">Palghar</Option>
            <Option value="385">Parbhani</Option>
            <Option value="363">Pune</Option>
            <Option value="393">Raigad</Option>
            <Option value="372">Ratnagiri</Option>
            <Option value="373">Sangli</Option>
            <Option value="376">Satara</Option>
            <Option value="374">Sindhudurg</Option>
            <Option value="375">Solapur</Option>
            <Option value="392">Thane</Option>
            <Option value="377">Wardha</Option>
            <Option value="369">Washim</Option>
            <Option value="368">Yavatmal</Option>
          </Select>
        </div>
      </div>


      <div className={HomeStyle.input_container}>
      </div>

      <input
        type="text"
        placeholder="Search Vaccination Center Name"
        className={HomeStyle.filer_input}
        onChange={(e) => {
          setSearch(e.target.value);
        }}
      />
      <div className={HomeStyle.disclamer}>
        <p>Disclaimer : While we have real-time data, slot availability
          on CoWin changes rapidly. If you see availability, please
          book on CoWin instantly before the slots are lost.</p>
      </div>

      {vaccine

        .filter((item) => {
          if (search === "") {
            return item;
          } else if (item.name.toLowerCase().includes(search.toLowerCase())) {
            return item;
          }
        })

        .map((item) => {
          return (
            <div className={HomeStyle.container}>
              <div className={HomeStyle.card_container} key={item.id}>
                <div className={HomeStyle.card_details}>
                  <div className={HomeStyle.center_details}>
                    <span>
                      <p>{item.name}</p>
                      <p>
                        {item.block_name}, {item.pincode}
                      </p>
                      <p>Minimun Age {item.sessions[0].min_age_limit}+</p>
                      <p>
                        {item.sessions[0].vaccine}, ( {item.fee_type} )
                      </p>
                    </span>
                  </div>
                </div>
                <div className={HomeStyle.card_btn}>
                  <div className={HomeStyle.slot}>
                    <p>
                      SLOT <br />
                      {item.sessions[0].available_capacity_dose1}
                    </p>
                    {/* <p>Dose 2: {item.sessions[0].available_capacity_dose2}</p>  */}
                    {/* <div className={HomeStyle.book_btn}>
                      <a href="https://selfregistration.cowin.gov.in/">Book Now</a>
                    </div> */}
                  </div>
                </div>
              </div>
            </div>
          );
        })}
    </div>
  );
};

export default App;
