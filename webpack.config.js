const webpack = require('webpack');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');
const isDevMode = process.env.NODE_ENV.includes('development')

module.exports = {
    mode: process.env.NODE_ENV,
    // Webpack v5 버그(Live Reload 문제) 해결
    target: 'web',
    entry: {
        vendor:['./src/js/plugins/modernizr-detectizr.js'],
        app1: './src/js/modules/index.js',
        app2: './src/js/modules/index2.js',
    },
    output: {
        path: path.resolve('./dist'),
        filename: '[name].js',
        publicPath: '/',
        clean: true
    },
    module: {
        rules: [
            {
                test: /\.css$/,
                use: [ 'style-loader','css-loader'],
            },
            {
                test: /\.(png|jpg|jpeg|gif|svg|woff|woff2|ttf|eot)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
                type: "asset", // 40KB(default) 미만은 inline, 이상은 resource로 대처
                parser: {
                    dataUrlCondition: {
                        maxSize: 20 * 1024, // 기준을 20KB 로 변경
                    },
                },
            }
        ]
    },
    plugins: [
        new webpack.LoaderOptionsPlugin({
            minimize: !isDevMode,
        }),
        new MiniCssExtractPlugin({ filename: 'app.css' }),
        new HtmlWebpackPlugin({ template: './src/html/index.html' })
        // new webpack.EnvironmentPlugin({ 'NODE_ENV': 'development' }), // 환경 변수 등록/관리 설정
    ],
    optimization: {
        minimize: !isDevMode,
        splitChunks: {},
        concatenateModules: !isDevMode,
    },
    resolve: {
        modules: ['node_modules'],
        extensions: ['.js', '.json', '.jsx', '.css'],
    },
    watchOptions: {
        aggregateTimeout: 200,
        ignored: /node_modules/,
        poll: 1000,
    },
    devServer: {
        //historyApiFallback: true,
        // dist 디렉토리를 웹 서버의 기본 호스트 위치로 설정
        //contentBase: path.resolve(__dirname, './dist'),
        // 인덱스 파일 설정
        //index: 'index.html',
        // 포트 번호 설정
        port: 9000,
        // 핫 모듈 교체(HMR) 활성화 설정
        hot: true,
        // gzip 압축 활성화
        compress: true,
        // dist 디렉토리에 실제 파일 생성
        //writeToDisk: true,
    },
};