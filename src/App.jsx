import { useState } from "react";
import "./App.css";
import { useEffect } from "react";
import axios from "axios";

const LanguageAPI = "https://libretranslate.com/languages";
const LanguageHeader = { accept: "application/json" };



function App() {
  const [language, setLanguage] = useState([]);
  const [from, setFrom] = useState("en");
  const [to, setTo] = useState("hi");
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");

  // Fetch Languages
  useEffect(() => {
    axios
      .get(LanguageAPI, LanguageHeader)
      .then((res) => {
        setLanguage(res.data);
      })
      .catch((error) => {
        alert(error);
      });
  }, []);

  // Fetch Translate

  // const onHandleTranslate = () => {
  //   const params = new URLSearchParams();
  //   params.append("q", input);
  //   params.append("source", from);
  //   params.append("target", to);
  //   params.append("api_key", apiKey);

  //   axios.post(translateAPI, params, {
  //     headers: {
  //       accept: "application/json",
  //       "Content-Type": "application/x-www-form-urlencoded",
  //     },
  //   })
  //   .then((res) => {
  //     setOutput(res.data.translatedText);
  //   })
  //   .catch((error) => {
  //     alert(error);
  //   });
  // };

  // const onHandleTranslate = () =>{
  //   axios.post("https://libretranslate.com/translate", {
  //     body: JSON.stringify({
  //       q: input,
  //       source: from,
  //       target: to,
  //       format: "text",
  //       alternatives: 3,
  //       api_key: apiKey
  //     }),
  //     headers: { "Content-Type": "application/json" }
  //   }).then((res)=>{
  //     console.log(res.data);
  //   }).catch((err)=>{
  //     alert(err);
  //   })
  // }

  const onHandleTranslate = async () => {

    const data = new FormData();
    data.append("source_language", from);
    data.append("target_language", to);
    data.append("text", input);

    const options = {
      method: "POST",
      url: "https://text-translator2.p.rapidapi.com/translate",
      headers: {
        "x-rapidapi-key": "8560c8046dmsh7ba4ae66a503545p12020djsn5c065bb705a6",
        "x-rapidapi-host": "text-translator2.p.rapidapi.com",
      },
      data: data,
    };

    try {
      const response = await axios.request(options);
      // console.log(response)
      setOutput(response.data.data.translatedText);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <div className="Container">
        <h2>Translator App</h2>
        <div className="drop-down">
          From :
          <select value={from} onChange={(e) => setFrom(e.target.value)}>
            {language?.map((opt) => {
              return (
                <option key={opt.code} value={opt.code}>
                  {opt.name}
                </option>
              );
            })}
          </select>
          To :
          <select value={to} onChange={(e) => setTo(e.target.value)}>
            {language?.map((opt) => {
              return (
                <option key={opt.code} value={opt.code}>
                  {opt.name}
                </option>
              );
            })}
          </select>
        </div>
        <div className="textarea-input-output">
          Input :
          <textarea
            cols={49}
            rows={6}
            placeholder="Enter Text"
            spellCheck="false"
            onChange={(e) => setInput(e.target.value)}
          />
          Output :
          <textarea
            cols={49}
            rows={6}
            placeholder="Translation"
            readOnly
            value={output}
          />
        </div>
        <button onClick={onHandleTranslate}>Translate</button>
      </div>
    </>
  );
}

export default App;
