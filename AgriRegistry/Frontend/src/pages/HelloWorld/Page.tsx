/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";

const Page = () => {
    const [message, setMessage] = useState(""); // State to hold API response
    const [error, setError] = useState(""); // State to hold any errors

    const fetchMessage = async () => {
        try {
            const response = await fetch("https://localhost:5000/api/HelloWorld");
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            const data = await response.text();
            setMessage(data);
            setError("");
        } catch (err: any) {
            setError(err.message);
            setMessage("");
        }
    };

    return (
        <div>
            <h1>Test</h1>
            <h1>Call the Hello World API !!!</h1>
            <button onClick={fetchMessage}>Get Message</button>
            <p>{message}</p>
            {error && <p style={{ color: "red" }}>Error: {error}</p>}
        </div>
    );
};

export default Page;
