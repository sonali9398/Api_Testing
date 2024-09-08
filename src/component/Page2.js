import React, { useState } from "react";

const Page2 = () => {
  const [inputText, setInputText] = useState(""); 
  const [formattedJson, setFormattedJson] = useState("");
  const [isValidJson, setIsValidJson] = useState(true); 
  const [copyButtonText, setCopyButtonText] = useState("Copy");

  const handleProceed = () => {
    try {
      const cleanedInput = inputText.trim();

      const parsedJson = parseRawJson(cleanedInput);

      const prettyJson = JSON.stringify(parsedJson, null, 2);
      setFormattedJson(prettyJson);
      setIsValidJson(true);
      setCopyButtonText("Copy"); 
    } catch (error) {
      setFormattedJson("Invalid JSON. Please check the structure.");
      setIsValidJson(false);
      setCopyButtonText("Copy"); 
    }
  };

  const parseRawJson = (rawText) => {
    let fixedJson = rawText.replace(/([a-zA-Z0-9]+)\s*=\s*/g, '"$1":');
    
    return JSON.parse(fixedJson);
  };

  const handleCopy = () => {
    if (isValidJson) {
      navigator.clipboard.writeText(formattedJson);
      setCopyButtonText("Copied");
      
      setTimeout(() => {
        setCopyButtonText("Copy");
      }, 2000);
    } else {
    }
  };

  return (
    <div className="flex justify-center items-start p-4 space-x-8">
      {/* Left box to enter query */}
      <div className="w-1/2">
        <textarea
          className="w-full h-48 p-2 border rounded-md shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Enter raw JSON text"
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
        />
        <button
          className="mt-4 bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition duration-300"
          onClick={handleProceed}
        >
          Proceed
        </button>
      </div>

      {/* Right box to display formatted JSON */}
      <div className="w-1/2">
        <textarea
          className={`w-full h-48 p-2 border rounded-md shadow-md bg-gray-100 ${!isValidJson ? 'text-red-500' : ''}`}
          value={formattedJson}
          readOnly
        />
        <button
          className="mt-4 bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600 transition duration-300"
          onClick={handleCopy}
        >
          {copyButtonText}
        </button>
      </div>
    </div>
  );
};

export default Page2;
