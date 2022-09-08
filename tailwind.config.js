/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js}"],
  daisyui: {
    quizzesMakerTheme: [
      {
        mytheme: {
          primary: "#a991f7",
          secondary: "#096acc",
          accent: "#0C7BEA",
          neutral: "#343a40",
          mute: "#6c757d",
          box: "#1B2540",
          bga: "#1B2640",
          bgb: "#1A1929",
          bgc: "#1D1C2D",
          bgd: "#323140",
          bge: "#1A1929",
        },
      },
      "dark",
      "cupcake",
    ],
  },
  plugins: [require("daisyui")],
}
