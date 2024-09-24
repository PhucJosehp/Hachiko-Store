/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js}"],
  theme: {
    extend: {
      fontFamily: {
        breeSerif: ["Bree Serif", "serif"],
      },
      keyframes: {
        heartbeat: {
          "0%": {
            transform: "scale(1)",
            "transform-origin": "center center",
            "animation-timing-function": "ease-out",
          },
          "10%": {
            transform: "scale(0.91)",
            "animation-timing-function": "ease-in",
          },
          "17%": {
            transform: "scale(0.98)",
            "animation-timing-function": "ease-out",
          },
          "33%": {
            transform: "scale(0.87)",
            "animation-timing-function": "ease-in",
          },
          "45%": {
            transform: "scale(1)",
            "animation-timing-function": "ease-out",
          },
        },
        "slide-in-top": {
          "0%": {
            transform: "translateY(-1000px)",
            opacity: "0",
          },
          "100%": {
            transform: "translateY(0)",
            opacity: "1",
          },
        },
      },
      animation: {
        heartbeat: "heartbeat 1s infinite",
        "slide-in-top": "slide-in-top 1s ease-out forwards",
      },
    },
  },
  plugins: [
    require("daisyui"),
    function ({ addUtilities }) {
      const newUtilities = {
        ".scrollbar-webkit-main": {
          "&::-webkit-scrollbar": {
            width: "10px",
            height: "8px",
            zIndex: 0,
            position: "absolute",
          },
          "&::-webkit-scrollbar-track": {
            background: "#f1f1f100",
            borderRadius: "10px",
            zIndex: 0,
            position: "absolute",
          },

          "&::-webkit-scrollbar-thumb": {
            backgroundColor: "#c1c1c100",
            borderRadius: "10px",
            zIndex: 0,
            position: "absolute",
          },
        },
      };

      addUtilities(newUtilities, ["responsive", "hover"]);
    },
  ],
};
