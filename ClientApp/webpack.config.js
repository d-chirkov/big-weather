const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const CopyWebpackPlugin = require("copy-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");

module.exports = {
	mode: "development",
	entry: "./src/index",
	output: {
		path: path.join(__dirname, "/public/"),
		filename: "index.bundle.js"
	},
	resolve: {
		extensions: [".ts", ".tsx", ".js", ".jsx"],
		alias: {
			globalize$: path.resolve( __dirname, "node_modules/globalize/dist/globalize.js" ),
			globalize: path.resolve(__dirname, "node_modules/globalize/dist/globalize"),
			cldr$: path.resolve(__dirname, "node_modules/cldrjs/dist/cldr.js"),
			cldr: path.resolve(__dirname, "node_modules/cldrjs/dist/cldr")
		},
	},
	module: {
		rules: [
			{
				test: /\.ts(x?)$/,
				exclude: /node_modules/,
				use: {
					loader: "ts-loader"
				}
			},
			{
				test: /\.js(x?)$/,
				exclude: /node_modules/,
				use: {
					loader: "babel-loader"
				},
			},
			{
				test: /\.gstyle.css$/,
				use: ["style-loader", "css-loader"],
			},
			{
				test: /\.style.css$/,
				use: [
					"style-loader",
					{
						loader: "css-loader",
						options: {
							sourceMap: true,
							localsConvention: "camelCase",
							modules: {
								localIdentName: "[folder]_[local]__[hash:base64:5]",
							}
						}
					}
				],
			},
			{
				test: /\.(png|jpg|gif|svg|jpeg|mp4|eot|ttf|woff|woff2)$/,
				loader: "file-loader",
				options: {
					name: "[name]_[md5:hash:base64:5].[ext]"
				}
			}
		]
	},
	plugins: [
		new CleanWebpackPlugin(),
		new HtmlWebpackPlugin({
			favicon: "./favicon.ico",
			template: path.resolve( __dirname, 'index.html' ),
			filename: 'index.html'
		}),
		new CopyWebpackPlugin([
			{ from: "./app.config.js" }
		], { copyUnmodified: true }),
	],
	devServer: {
		hot: true,
		open: true,
		compress: false,
		contentBase: path.join(__dirname, 'public'),
		publicPath: "/",
		historyApiFallback: true,
	},
	externals: {
		"./app.config": "config"
	}
};