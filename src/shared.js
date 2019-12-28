import { func } from "prop-types";
import css from "styled-jsx/css";

export const itemStyles = css` /* stylelint-disable-line */
    .item {
        flex-direction: column;
        flex: 0 1 calc(20% - 10px);
        margin: 0 10px 30px 0;
    }

    .name {
        padding-bottom: .75rem;
        text-align: center;
    }
`;

export const CONTEXT_SHAPE = {
    getCopyValue: func,
    getDisplayName: func
};
