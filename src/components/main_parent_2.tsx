import "../css/main_parent_2.css";
import office from "../assets/office.svg";
import check from "../assets/timein.svg";
import timeout from "../assets/timeout.svg";
import { useState, useRef, useEffect } from "react";
import QrScanner from "qr-scanner";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClock } from "@fortawesome/free-solid-svg-icons";
import { v4 as uuidv4 } from 'uuid';

export interface UserData {
  id: number;
  first_name: string;
  last_name: string;
}
type Scan = {
  name: string;
  time: string;
  id: string;
  type: string;
};

function Main_2() {
  const [timeInClicked, setTimeInClicked] = useState(false);
  const [timeOutClicked, setTimeOutClicked] = useState(false);
  const [scanner, setScanner] = useState<QrScanner | null>(null);
  const [decodedResult, setDecodedResult] = useState<string | false>();
  const [showCamera, setShowCamera] = useState(false);
  const [showCameraOut, setshowCameraOut] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [currentTime, setCurrentTime] = useState(new Date());
  const [users, setUsers] = useState<UserData[]>([]);
  const [scans, setScans] = useState<Scan[]>([]);
  const [scanType, setScanType] = useState("");
  const [mouseHover, setHovered] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      const response = await axios.get("https://reqres.in/api/users?page=1");
      const reversedData = response.data.data.reverse();
      setUsers(reversedData);
    };

    fetchData();
  }, []);

  const handleQRScan = (result: string) => {
    debugger;
    const newScan: Scan = {
      id:  uuidv4(),
      name: result,
      time: new Date().toLocaleTimeString(),
      type: scanType,
    };
  
    setScans((prevScans) => [newScan, ...prevScans]);
    setDecodedResult(result);
  };

  useEffect(() => {
    if (videoRef.current) {
      const qrScanner = new QrScanner(videoRef.current, handleQRScan);
      setScanner(qrScanner);
    }
  }, [videoRef.current]);

  useEffect(() => {
    scanner?.start();
    return () => {
      scanner?.stop();
    };
  }, [scanner]);

  const handleTimeinButtonClick = (timeIn: boolean) => {
    setScanType("time in");
    setTimeInClicked(timeIn);
    setTimeOutClicked(!timeIn);
    setShowCamera(true);
    setshowCameraOut(false);
    setDecodedResult(false);
  };

  const handleTimeOutButtonClick = (timeOut: boolean) => {
    setScanType("time out");
    setTimeInClicked(timeOut);
    setTimeOutClicked(!timeOut);
    setShowCamera(false);
    setshowCameraOut(true);
    setDecodedResult(false);
  };

  // Update current time every second
  useEffect(() => {
    const interval = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(interval);
  }, [timeInClicked, timeOutClicked]);

  const formattedTime = currentTime.toLocaleTimeString([], {
    hour: "numeric",
    minute: "numeric",
    second: "numeric",
    hour12: true,
  });

  function timeLogic(user: UserData) {
    const minutes = (user.last_name.length % 6) * 10;

    let hour = user.first_name.length % 12;
    if (user.first_name.length > 12) {
      hour += 12;
    }

    const paddedMinutes = minutes.toString().padStart(2, "0");
    const paddedHour = hour.toString().padStart(2, "0");

    return `${paddedHour}:${paddedMinutes} ${hour >= 12 ? "PM" : "AM"}`;
  }

  const handleHover = () => setHovered(true);
  const handleLeave = () => setHovered(false);
  console.log(scans);

  return (
    <div className="parent3">
      <div className="section1">
        <div
          className="background-logo"
          style={{
            boxShadow:
              mouseHover || timeInClicked || timeOutClicked
                ? "0 0 10px 5px orange"
                : "",
            borderColor:
              mouseHover || timeInClicked || timeOutClicked ? "orange" : "",
          }}
        >
          <img src={office} className="logo" alt="logo" />
        </div>
        <div>
          <button
            className={timeInClicked ? "time-button-clicked" : "time-button"}
            onClick={() => handleTimeinButtonClick(true)}
            onMouseEnter={handleHover}
            onMouseLeave={handleLeave}
          >
            TIME IN
          </button>
          <button
            className={timeOutClicked ? "time-button-clicked" : "time-button"}
            onClick={() => handleTimeOutButtonClick(false)}
            onMouseEnter={handleHover}
            onMouseLeave={handleLeave}
          >
            TIME OUT
          </button>
        </div>
      </div>
      <div className="section2">
        <div>
          {!showCamera && !showCameraOut ? (
            <div className="camera-section">
              <div className="timein-success">
                <img src={check} alt="check logo" />
                <h1> Welcome! </h1>
                <p>This is the Attendance System for Essilor Employees</p>
                <p>Click the time in button to start!</p>
              </div>
            </div>
          ) : null}
          {showCamera ? (
            decodedResult ? (
              <div className="camera-section">
                <div className="timein-success">
                  <img src={check} alt="check logo" />

                  <h1> Successfully Time In</h1>
                  <p>
                    Hi {decodedResult}, your time in is&nbsp;
                    <b>{scans[0].time} </b>
                  </p>
                </div>
              </div>
            ) : (
              <div className="video-section">
                <video ref={videoRef} />
              </div>
            )
          ) : null}
        </div>
        {showCameraOut ? (
          decodedResult ? (
            <div className="camera-section">
              <div className="timein-success">
                <img src={timeout} alt="check logo" />

                <h1> Successfully Time Out</h1>
                <p>
                  Hi {decodedResult}, your time out is&nbsp;
                  <b>{scans[0].time} </b>
                </p>
              </div>
            </div>
          ) : (
            <div className="video-section">
              <video ref={videoRef} />
            </div>
          )
        ) : null}
      </div>
      <div className="section3">
        <h1 className="welcome-header"> LOGGED HISTORY</h1>
        {scans.map((scan) => (
          <div key={scan.id}>
            <div>
              <p>
                <FontAwesomeIcon
                  icon={faClock}
                  shake
                  style={{ color: scan.type === "time in" ? "green" : "red" }}
                />{" "}
                &nbsp; {`${scan.name} ${scan.time}`}
              </p>
            </div>
          </div>
        ))}

        {users.map((user) => (
          <div key={user.id}>
            <div>
              <p>
                <FontAwesomeIcon icon={faClock} shake /> &nbsp;
                {`${user.first_name} ${user.last_name}`} : {timeLogic(user)}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Main_2;
