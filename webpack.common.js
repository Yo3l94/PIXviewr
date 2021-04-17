const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
// const NodemonPlugin = require('nodemon-webpack-plugin');
const { CleanWebpackPlugin } = require("clean-webpack-plugin");

module.exports = {
	entry: "./src/index.tsx",
	// target: 'node',
	// externals: {
	// 	express: 'require("express")',
	// 	'app-root-path': 'require("app-root-path")',
	// 	keyv: 'require("keyv")',
	// 	'sync-rpc': 'require("sync-rpc")',
	// 	typeorm: 'require("typeorm")',
	// },
	module: {
		rules: [
			{
				// test: /\.(js|jsx)$/,
				test: /\.tsx?$/,
				exclude: /node_modules/,
				// use: {
				// 	loader: "babel-loader",
				// },
				use: "ts-loader",
			},
			{
				test: /\.html$/,
				use: {
					loader: "html-loader",
				},
			},
			{
				test: /\.css$/,
				use: ["style-loader", "css-loader"],
			},
			{
				test: /\.(jpg|gif|png|svg)$/,
				use: {
					loader: "file-loader",
					options: {
						esModule: false,
					}
				},
			},
		],
	},
	devServer: {
		historyApiFallback: true,
	},
	plugins: [
		new CleanWebpackPlugin(),
		// new NodemonPlugin(),
		new HtmlWebpackPlugin({
			template: "./src/index.html",
			filename: "./index.html",
		}),
	],
	resolve: {
		extensions: [".tsx", ".ts", ".js"],
	},
	output: {
		filename: "bundle.js",
		path: path.resolve(__dirname, "dist"),
	},
};
