import { any, number, shape, string } from "prop-types";
import { Children, cloneElement } from "react";
import css from "styled-jsx/css";
import { InnerIcon } from "./inner-icon";
import { CONTEXT_SHAPE } from "./shared";

const styles = css` /* stylelint-disable-line */
    .variant:not(:last-child) {
        margin-right: 1rem;
    }

    .header {
        color: #A8ADBB;
        text-align: center;
        margin-bottom: 1rem;
    }

    .content {
        display: flex;
        min-width: 2rem;
        min-height: 2rem;
    }
`;

function renderIcon(icon, size) {
    return cloneElement(icon, {
        style: { width: size, height: size }
    });
}

function getIcon(children) {
    const childrenCount = Children.count(children);

    if (childrenCount > 1) {
        throw new Error("IconVariant - Expected to receive a single React element child");
    }

    return childrenCount !== 0 ? Children.toArray(children)[0] : undefined;
}

export function IconVariant({ size, copyValue, children, context }) {
    const { getCopyValue, itemName, renderingSize } = context;

    const icon = getIcon(children);

    return (
        <div className="variant sbdocs sbdocs-ig-variant">
            <div className="header sbdocs sbdocs-ig-variant-header">{size}</div>
            <div className="content sbdocs sbdocs-ig-variant-content" style={{ width: renderingSize, height: renderingSize }}>
                {icon && <InnerIcon
                    icon={renderIcon(icon, size)}
                    copyValue={copyValue ? copyValue : getCopyValue({ name: itemName, size, isVariant: true })}
                />}
            </div>
            <style jsx>{styles}</style>
        </div>
    );
}

IconVariant.propTypes = {
    /**
     * The variant size.
     */
    size: number.isRequired,
    /**
     * A custom value to copy to the clipboard when the variant is clicked.
     */
    copyValue: string,
    /**
     * @ignore
     */
    context: shape({
        ...CONTEXT_SHAPE,
        itemName: string,
        renderingSize: number
    }),
    /**
     * @ignore
     */
    children: any
};
