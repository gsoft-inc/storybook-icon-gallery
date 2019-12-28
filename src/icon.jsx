import { any, shape, string } from "prop-types";
import { Children } from "react";
import { CONTEXT_SHAPE } from "./context";
import { InnerIcon } from "./inner-icon";

export function Icon({ copyValue, children, context }) {
    const { getCopyValue, itemName } = context;

    const icon = Children.only(children);

    return <InnerIcon
        icon={icon}
        copyValue={copyValue ? copyValue : getCopyValue({ itemName, variantSize: null, icon })}
    />;
}

Icon.propTypes = {
    /**
     * A custom value to copy to the clipboard when the variant is clicked.
     */
    copyValue: string,
    /**
     * @ignore
     */
    context: shape(CONTEXT_SHAPE),
    /**
     * @ignore
     */
    children: any
};
