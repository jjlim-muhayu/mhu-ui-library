const os = require('os')
const path = require('path')
const webpack = require('webpack')

const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin')
const CSSMQPackerPlugin = require('css-mqpacker-webpack-plugin')
const ImageMinimizerPlugin = require('image-minimizer-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')

/* -------------------------------------------------------------------------- */

// 개발 모드 감지
const isDevMode = process.env.NODE_ENV.includes('dev')

/* -------------------------------------------------------------------------- */

// 개발,배포 모든 모드에서 사용되는 Webpack 플러그인 목록(배열)
const plugins = [
    // 환경 변수 등록
    new webpack.EnvironmentPlugin({
        // process.env.NODE_ENV가 정의되지 않은 경우, 'development' 사용
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

        // 문서 타이틀

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
]

// 개발,배포 모든 모드에서 사용되는 엔트리 파일 설정
let entry = {
    main: './src/index.js',
}

// 배포 모드 설정
if (!isDevMode) {
    // 배포용 엔트리 파일(들) 추가
    entry = {
        ...entry,
        'polyfills': './src/polyfills/polyfills.js',
        'detect.polyfills': './src/polyfills/detect.polyfills.js',
    }

    // 배포용 플러그인 추가
    plugins.push(
        // CSS 추출
        new MiniCssExtractPlugin({
            linkType: false,
            filename: '[name].[contenthash].css', // 'style.css' 설정도 가능
            chunkFilename: '[id].[contenthash].css',
        }),
        // PNG — 이미지 포멧 최적화
        new ImageMinimizerPlugin({
            minimizerOptions: {
                plugins: ['pngquant'],
            },
        }),
        // WEBP — 이미지 포멧 최적화
        new ImageMinimizerPlugin({
            deleteOriginalAssets: true,
            filename: '[name].webp',
            minimizerOptions: {
                plugins: ['imagemin-webp'],
            },
        }),
        // JPE?G — 이미지 포멧 최적화
        new ImageMinimizerPlugin({
            // 약 8kb 이상 파일만 최적화 적용
            filter: (source) => {
                if (source.byteLength >= 8192) {
                    return true
                }

                return false
            },
            minimizerOptions: {
                plugins: [['jpegtran', { progressive: true }]],
            },
        }),
        new ImageMinimizerPlugin({
            // 약 8kb 미만 파일만 최적화 적용
            filter: (source) => {
                if (source.byteLength < 8192) {
                    return true
                }

                return false
            },
            minimizerOptions: {
                plugins: [['jpegtran', { progressive: false }]],
            },
        })
    )
}

/* -------------------------------------------------------------------------- */

module.exports = {
    // 입력 파일
    entry,

    // 출력 파일
    output: {
        path: path.resolve(__dirname, './dist'),
        // 파일 이름 브라우저 캐싱 처리
        filename: '[name].[contenthash].js',
        // publicPath: 'dist/',
    },

    // 감시 설정 (package.json 스크립트로 제어)
    // watch: true,

    // 모드 설정
    mode: isDevMode ? 'development' : 'production',

    // 소스맵 설정
    devtool: isDevMode ? 'inline-source-map' : 'source-map',

    // 플러그인 설정
    plugins,

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
                        // name: '[name].[ext]',
                        name: '[name].[contenthash].[ext]',
                    },
                },
            },
            // 스타일 파일 로더
            {
                test: /\.(sa|sc|c)ss$/i,
                exclude: /node_modules/,
                use: [
                    isDevMode ? 'style-loader' : MiniCssExtractPlugin.loader,
                    'css-loader',
                    'sass-loader',
                ],
            },
            // 스크립트 파일 로더
            {
                test: /\.m?js$/i,
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

    // 최적화 설정
    optimization: {
        // 압축
        minimize: isDevMode ? false : true,
        // 미니마이저
        minimizer: [
            // 플러그인 인스턴스 생성
            new CssMinimizerPlugin({
                // CPU 멀티 프로세서 병렬화 옵션 (기본 값: true)
                // os.cpus() → CPU 코어 정보를 포함하는 배열 객체 반환
                parallel: os.cpus().length - 1,
            }),
            // 미디어쿼리 그룹 병합
            new CSSMQPackerPlugin({
                sort: true,
            }),
        ],
    },
}