import { useEffect } from "react";

declare global {
  interface Window {
    chatbase?: any;
  }
}

const ChatbaseWidget: React.FC = () => {
  useEffect(() => {
    if (!window.chatbase || window.chatbase("getState") !== "initialized") {
      window.chatbase = ((...args: any[]) => {
        if (!window.chatbase!.q) window.chatbase!.q = [];
        window.chatbase!.q.push(args);
      }) as any;

      window.chatbase = new Proxy(window.chatbase, {
        get(target, prop) {
          if (prop === "q") return target.q;
          return (...args: any[]) => target(prop, ...args);
        },
      });

      const onLoad = () => {
        const script = document.createElement("script");
        script.src = "https://www.chatbase.co/embed.min.js";
        script.id = "DO1N-8U_GuvW-0w9EkFN9"; // Your widget ID
        document.body.appendChild(script);
      };

      if (document.readyState === "complete") {
        onLoad();
      } else {
        window.addEventListener("load", onLoad);
      }
    }
  }, []);

  return null;
};

export default ChatbaseWidget;
