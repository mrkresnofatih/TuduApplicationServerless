import { css } from "@emotion/css"

const textStyles = {
    title: css`
        font-size: 36px;
        font-weight: 700;
        color: #06283D;
    `,
    subtitle: css`
        font-size: 24px;
        font-weight: 400;
        color: #06283D;
    `,
    link: css`
        font-size: 16px;
        font-weight: 400;
        color: #06283D;
        text-decoration: underline;

        &:hover {
            cursor: pointer;
        }
    `,
    boldparagraph: css`
        font-size: 16px;
        font-weight: 500;
        color: #06283D;
    `,
    lightparagraph: css`
        font-size: 14px;
        font-weight: 400;
        color: #06283D;
    `
}

export default textStyles