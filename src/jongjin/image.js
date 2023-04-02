import islandImage from '@image/sample.jpg'

import { createElement } from '@module/vDOM'

/* -------------------------------------------------------------------------- */

export default function imageIsland() {
    return createElement('img', {
        src: islandImage,
        alt: '섬 근처 수역에 서있는 사람',
    })
}