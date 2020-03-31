import React, { useState, useEffect } from "react";
import "font-awesome/css/font-awesome.min.css";

import axios from "axios";

const ErrorMonkey = "/assets/errormonkey.svg";
const LoadingMonkey = "/assets/loadingmonkey.svg";
const HappyMonkey = "/assets/happymonkey.svg";

import style from "./style.css";

function App() {
  const [newKey, setNewKey] = useState("");
  const [newValue, setNewValue] = useState("");

  const [key, setKey] = useState("");
  const [value, setValue] = useState("");

  const [err, setError] = useState("");

  const [logo, setLogo] = useState(LoadingMonkey);

  //   const socket = openSocket(`http://localhost:${configPort}`);

  //   socket.on("new keyvalue result", data => {
  //     if (data.status > 201) {
  //       setLogo(ErrorMonkey);
  //       setError(data.details);
  //     } else {
  //       setLogo(HappyMonkey);
  //     }
  //   });

  //   socket.on("get keyvalue result", data => {
  //     if (data.status > 200) {
  //       setLogo(ErrorMonkey);
  //       setError(data.details);
  //     } else {
  //       setLogo(HappyMonkey);
  //       setValue(data.value);
  //     }
  //   });

  const handleSubmitNewPair = async event => {
    setError("");
    setLogo(LoadingMonkey);
    event.preventDefault();

    const url = `${process.env.URL}/keyvalue/key`;
    const keyvalue = await axios.post(url, { key: newKey, value: newValue });

    if (keyvalue.status > 201) {
      setLogo(ErrorMonkey);
      setError(keyvalue.details);
    } else {
      setLogo(HappyMonkey);
    }

    setNewKey("");
    setNewValue("");
  };

  const handleSubmitGetKeyValue = async event => {
    setError("");
    setNewKey("");
    setNewValue("");
    setLogo(LoadingMonkey);
    event.preventDefault();

    const url = `${process.env.URL}/keyvalue/key/${key}`;
    const keyvalue = await axios.get(url);

    if (keyvalue.status > 200) {
      setLogo(ErrorMonkey);
      setError(keyvalue.details);
    } else {
      setLogo(HappyMonkey);
      setValue(keyvalue.value);
    }
  };

  useEffect(() => {
    if (key === "" || key.trim().length === 0) {
      setLogo(LoadingMonkey);
      setValue("");
    }
  }, [key]);

  return (
    <div className={style.App}>
      <header className={style.App - header}>
        <img
          src={process.env.PUBLIC_URL + logo}
          className={style.App - logo}
          alt="logo"
        />
        <div>
          {err ? <p>{err}</p> : null}
          <h4>New Key-Value Pair</h4>
          <form onSubmit={handleSubmitNewPair}>
            <label>
              Key:
              <input
                type="text"
                name="key"
                onChange={e => setNewKey(e.target.value)}
                value={newKey}
              />
            </label>
            <label>
              Value:
              <input
                type="text"
                name="value"
                onChange={e => setNewValue(e.target.value)}
                value={newValue}
              />
            </label>
            <button type="submit" className={style.submitBtn}>
              Submit
            </button>
          </form>
        </div>
        <div>
          <h4>Get Key-Value Pair</h4>
          <form onSubmit={handleSubmitGetKeyValue}>
            <label>
              Key:
              <input
                type="text"
                name="key"
                onChange={e => setKey(e.target.value)}
                value={key}
              />
            </label>
            <button type="submit" className={style.submitBtn}>
              Submit
            </button>
          </form>
          {value && key ? (
            <div>
              <p>
                key: {key} | value: {value}
              </p>
            </div>
          ) : null}
        </div>
      </header>
    </div>
  );
}

export default App;
