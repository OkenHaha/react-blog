import { useEffect } from "react";

const TidioChat = () => {
    useEffect(() => {
        const script = document.createElement("script");
        script.src = "//code.tidio.co/z0tdlxr2cy542ub3yqfyhdjqvjzg0ci0.js"; 
        script.async = true;
        script.id = "tidio-script"; // Add an ID to identify it
        document.body.appendChild(script);

        return () => {
            // Proper cleanup: Hide chat instead of removing the script
            window.tidioChatApi?.hide?.();
        };
    }, []);

    return null;
};

export default TidioChat;