import { any, shape, string } from "prop-types";
import { Children } from "react";
import css from "styled-jsx/css";
import { CONTEXT_SHAPE } from "./context";
import { InnerIcon } from "./inner-icon";
import { itemStyles } from "./styles";

const styles = css` /* stylelint-disable-line */
    .content {
        min-width: 2rem;
        min-height: 2rem;
    }
`;

export function IconItem({ name, copyValue, children, context }) {
    const { getDisplayName, getCopyValue } = context;

    const icon = Children.only(children);
    const displayName = getDisplayName({ itemName: name });

    return (
        <div className="item sbdocs sbdocs-ig-item">
            <div className="name sbdocs sbdocs-ig-name">{displayName}</div>
            <div className="content">
                <InnerIcon
                    icon={icon}
                    copyValue={copyValue ? copyValue : getCopyValue({ itemName: name, variantSize: null, icon })}
                />
            </div>
            <style jsx>{itemStyles}</style>
            <style jsx>{styles}</style>
        </div>
    );
}

IconItem.propTypes = {
    /**
     * The icon name.
     */
    name: string.isRequired,
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
