import { arrayOf, func, object, string } from "prop-types";

export const CONTEXT_SHAPE = {
    getCopyValue: func,
    getDisplayName: func,
    itemName: string,
    itemChildrenProps: arrayOf(object)
};
