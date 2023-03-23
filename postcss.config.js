module.exports = {
    plugins: [
        [
            'postcss-preset-env',
            // 플러그인 옵션 설정
            {
                browsers: '> 5% in KR, defaults, not IE < 11',
                autoprefixer: {grid: 'autoplace'},
            },
        ]
    ]
}