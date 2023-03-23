const os = require('os')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin')
const CSSMQPackerPlugin = require('css-mqpacker-webpack-plugin')
const ImageMinimizerPlugin = require('image-minimizer-webpack-plugin')

// 개발 모드 구성 가져오기
const devConfig = require('./webpack.dev')

// 배포 모드 구성 설정
const prodConfig = {
    entry: {
        ...devConfig.entry,
        'polyfills': './src/polyfills/polyfills.js',
        'detect.polyfills': './src/polyfills/detect.polyfills.js',
    },
    output: {
        ...devConfig.output,
        filename: '[name].[contenthash].js',
        publicPath: '',
    },
    module: {
        rules: [
            ...devConfig.module.rules.filter((rule) => {
                if (Array.isArray(rule.use)) {
                    return !rule.use.includes('css-loader')
                }
                return rule
            }),
            // MiniCssExtractPlugin.loader 설정 (대체)
            {
                test: /\.(sa|sc|c)ss$/i,
                exclude: /node_modules/,
                use: [MiniCssExtractPlugin.loader, 'css-loader', 'sass-loader'],
            },
        ],
    },
    plugins: [
        ...devConfig.plugins,
        // CSS 추출
        new MiniCssExtractPlugin({
            linkType: false,
            filename: '[name].[contenthash].css',
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
            filter: (source) => (source.byteLength >= 8192 ? true : false),
            minimizerOptions: {
                plugins: [['jpegtran', { progressive: true }]],
            },
        }),
        new ImageMinimizerPlugin({
            // 약 8kb 미만 파일만 최적화 적용
            filter: (source) => (source.byteLength < 8192 ? true : false),
            minimizerOptions: {
                plugins: [['jpegtran', { progressive: false }]],
            },
        }),
    ],
}

/* -------------------------------------------------------------------------- */

module.exports = {
    entry: prodConfig.entry,
    output: prodConfig.output,
    mode: 'production',
    devtool: 'source-map',

    // 모듈 설정
    module: prodConfig.module,

    // 플러그인 설정
    plugins: prodConfig.plugins,

    // 최적화 설정
    optimization: {
        // 압축
        minimize: true,
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