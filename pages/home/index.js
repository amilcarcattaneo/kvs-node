import React, { useState, useEffect } from "react";

import axios from "axios";

const ErrorMonkey = "/assets/errormonkey.svg";
const LoadingMonkey = "/assets/loadingmonkey.svg";
const HappyMonkey = "/assets/happymonkey.svg";

function Home() {
  const [newKey, setNewKey] = useState("");
  const [newValue, setNewValue] = useState("");

  const [key, setKey] = useState("");
  const [value, setValue] = useState("");

  const [err, setError] = useState("");

  const [logo, setLogo] = useState(LoadingMonkey);

  const handleSubmitNewPair = async (event) => {
    setError("");
    setLogo(LoadingMonkey);
    event.preventDefault();

    const url = `/key`;
    const keyvalue = await axios.post(url, { key: newKey, value: newValue });

    if (keyvalue.status > 201) {
      setLogo(ErrorMonkey);
      setError(keyvalue.details);
    } else {
      setLogo(HappyMonkey);
    }

    setNewKey("");
    setNewValue("");
    setKey("");
    setValue("");
  };

  const handleSubmitGetKeyValue = async (event) => {
    setError("");
    setNewKey("");
    setNewValue("");
    setLogo(LoadingMonkey);
    event.preventDefault();

    const url = `/key/${key}`;
    const { status, data } = await axios.get(url, { validateStatus: false });

    if (status > 200) {
      setLogo(ErrorMonkey);
      setError(data.details);
    } else {
      setLogo(HappyMonkey);
      setValue(data.value);
    }
  };

  useEffect(() => {
    if (key === "" || key.trim().length === 0) {
      setLogo(LoadingMonkey);
      setValue("");
    }
  }, [key]);

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <div>
          {err ? <p>{err}</p> : null}
          <h4>New Key-Value Pair</h4>
          <form onSubmit={handleSubmitNewPair}>
            <label>
              <input
                type="text"
                name="key"
                placeholder="key"
                onChange={(e) => setNewKey(e.target.value)}
                value={newKey}
              />
            </label>
            <label>
              <input
                type="text"
                name="value"
                placeholder="value"
                onChange={(e) => setNewValue(e.target.value)}
                value={newValue}
              />
            </label>
            <button type="submit" className="submitBtn">
              Submit
            </button>
          </form>
        </div>
        <div>
          <h4>Get Key-Value Pair</h4>
          <form onSubmit={handleSubmitGetKeyValue}>
            <label>
              <input
                type="text"
                name="key"
                placeholder="key"
                onChange={(e) => setKey(e.target.value)}
                value={key}
              />
            </label>
            <button type="submit" className="submitBtn">
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

export default Home;
