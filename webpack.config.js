const path = require("path"); // подключаем path к конфигу вебпак
const HtmlWebpackPlugin = require("html-webpack-plugin"); // подключите плагин
const { CleanWebpackPlugin } = require("clean-webpack-plugin"); // подключили плагин
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

module.exports = {
  entry: { main: "./src/pages/index.js" },

  devtool: "eval-source-map",

  output: {
    path: path.resolve(__dirname, "dist"), // переписали точку выхода, используя утилиту path
    filename: "main.js",
    publicPath: "",
  },

  mode: "development", // добавили режим разработчика

  devServer: {
    static: path.resolve(__dirname, "./dist"), // путь, куда "смотрит" режим разработчика
    compress: true, // ускорит загрузку в режиме разработки
    port: 8040, // чтобы открывать сайт по localhost:8080, можно менять порт
    open: true, // сайт будет открываться сам при запуске npm run dev
  },

  module: {
    rules: [
      // rules — это массив правил. Добавим в него объект правил для бабеля

      // инструктирую вебкак чтоб использовал бабел
      {
        test: /\.js$/, // регулярное выражение, которое ищет все js файлы
        use: "babel-loader", // при обработке этих файлов использовать babel-loader
        exclude: "/node_modules/", // исключает папку node_modules, файлы в ней обрабатывать не нужно
      },

      // правило для обработки файлов картинок и шрифтов
      {
        test: /\.(png|svg|jpg|gif|woff(2)?|eot|ttf|otf)$/, // регулярное выражение ищет все файлы с такими расширениями
        type: "asset/resource",
      },

      // правило для обработки файлов CSS
      {
        test: /\.css$/, // применять это правило только к CSS-файлам. Регулярное выражение, которое ищет все CSS файлы
        use: [
          MiniCssExtractPlugin.loader, // При обработке этих файлов нужно использовать MiniCssExtractPlugin.loader и css-loader
          {
            loader: "css-loader",
            options: { importLoaders: 1 }, //  объект options со значением 1 говорит что некоторые трансформации PostCSS нужно применить до css-loader.
          },
          "postcss-loader", // Добавьте postcss-loader
        ],
      },
    ],
  },

  plugins: [
    new HtmlWebpackPlugin({
      template: "./src/index.html", // путь к файлу index.html
    }),
    new CleanWebpackPlugin(), // ставим плагин, который до сборки чистит папку dist
    new MiniCssExtractPlugin(), // подключение плагина для объединения файлов
  ],
};

// module.exports — это синтаксис экспорта в Node.js
// entry = точка входа — файл index.js в папке src
// output = в какой файл собирать весь js: путь, имя, св-во для обновления путей внутри CSS- и HTML-файлов
// подключаем path к конфигу вебпак
// переписали точку выхода, используя утилиту path
