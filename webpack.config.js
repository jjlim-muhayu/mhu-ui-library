const webpack = require('webpack');
const os = require('os')
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
//const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');

const isDevMode = process.env.NODE_ENV.includes('development')

module.exports = {
    mode: process.env.NODE_ENV,
    // Webpack v5 버그(Live Reload 문제) 해결
    target: 'web',
    entry: {
        //vendor:['./src/js/plugins/modernizr-detectizr.js'],
        app: './src/js/index.js',
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
                // CSS Loader → MiniCssExtractPlugin.loader 로더를 사용해 추출
                use: [MiniCssExtractPlugin.loader, 'css-loader'],
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
        new MiniCssExtractPlugin({
            linkType: false, // 기본 값 'text/css'
            filename: 'jongjin.css'
        }),
        new HtmlWebpackPlugin({
            template: "./src/template/basic.html",
            templateParameters: {
                title: '웹팩 연습', // 문서 타이틀
                lang: 'ko-KR',             // 주 언어 명시
            },
            // 자동 주입 해제
            //inject: false,

            // 문서 메타
            meta: {
                'theme-color': '#4285f4',
                'description': '웹팩 연습중',
            },
            minify:
                !isDevMode
                    ? { collapseWhitespace: true, removeComments: true }
                    : false,
        }),
        // new webpack.EnvironmentPlugin({ 'NODE_ENV': 'development' }), // 환경 변수 등록/관리 설정
    ],
    optimization: {
        minimize: !isDevMode,
        splitChunks: {},
        concatenateModules: !isDevMode,
        //inject: !isDevMode,
        // minimizer: [
        //     // 플러그인 인스턴스 생성
        //     new CssMinimizerPlugin({
        //         // CPU 멀티 프로세서 병렬화 옵션 (기본 값: true)
        //         parallel: os.cpus().length - 1,
        //     }),
        // ],
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
        hot: isDevMode,
        // gzip 압축 활성화
        compress: !isDevMode,
        // dist 디렉토리에 실제 파일 생성
        //writeToDisk: true,
    },
};