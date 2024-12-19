/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";

const Page = () => {
    const [message, setMessage] = useState(""); // State to hold API response
    const [error, setError] = useState(""); // State to hold any errors

    const fetchMessage = async () => {
        try {
            const response = await fetch("http://localhost:1234", {
                method: "GET",
                headers: {
                    "Content-Type": "application/json"
                }
            });

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const data = await response.json(); 
            setMessage(data.message);
            setError("");
        } catch (err: any) {
            setError(err.message);
            setMessage("");
        }
    };


    return (
        <div>
            <h1>HELLO WORLD PYTHON API ですけど！!!</h1>
            <button onClick={fetchMessage}>Get Message</button>
            <p>{message}</p>
            {error && <p style={{ color: "red" }}>Error: {error}</p>}
        </div>
    );
};

export default Page;
