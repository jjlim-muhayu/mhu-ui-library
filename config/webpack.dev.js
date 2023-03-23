const path = require('path')
const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')


/* -------------------------------------------------------------------------- */

module.exports = {
    // 입력 파일
    entry: {
        main: './src/index.js',
    },

    // 출력 파일
    output: {
        path: path.resolve(__dirname, '../dist'),
        // 파일 이름 브라우저 캐싱 처리
        filename: '[name].js',
    },

    // 감시 설정 (package.json 스크립트로 제어)
    // watch: true,

    // 모드 설정
    mode: 'development',

    // 소스맵 설정
    devtool: 'inline-source-map',

    // 모듈 설정
    module: {
        // 로더 규칙
        rules: [
            // 이미지 파일 로더
            {
                test: /\.(png|jpe?g|gif|svg|webp)$/i,
                use: {
                    loader: 'file-loader',
                    options: {
                        name: '[name].[ext]',
                    },
                },
            },
            // 스타일 파일 로더
            {
                test: /\.(sa|sc|c)ss$/i,
                exclude: /node_modules/,
                use: ['style-loader', 'css-loader', 'sass-loader'],
            },
            // 스크립트 파일 로더
            {
                test: /\.js$/i,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['@babel/preset-env', '@babel/preset-react'],
                        plugins: ['@babel/plugin-proposal-class-properties'],
                        sourceMap: true,
                    },
                },
            },
        ],
    },

    // 플러그인 설정
    plugins: [
        // 환경 변수 등록
        new webpack.EnvironmentPlugin({
            NODE_ENV: 'development',
        }),
        // 빌드 된 결과물 정리
        new CleanWebpackPlugin(),
        // 빌드 결과 HTML 문서 자동 주입
        new HtmlWebpackPlugin({
            // 템플릿 설정
            template: './src/template/template.ejs',

            // 자동 주입 해제
            inject: false,

            // 압축 설정
            minify: true,

            // 문서 메타
            meta: {
                'theme-color': '#4285f4',
                'description': 'Webpack 러닝 가이드 실습을 진행합니다.',
            },

            // 사용자 정의 옵션
            templateParameters: {
                title: 'Webpack 러닝 가이드',
                lang: 'ko-KR',
            },
        }),
    ],
}