import { any, bool, number, shape, string } from "prop-types";
import { Children, cloneElement } from "react";
import css from "styled-jsx/css";
import { CONTEXT_SHAPE } from "./context";
import { InnerIcon } from "./inner-icon";

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
    }
`;

function renderIcon(icon, size, autosize) {
    if (autosize) {
        return cloneElement(icon, {
            style: { width: size, height: size }
        });
    }

    return icon;
}

function getIcon(children) {
    const childrenCount = Children.count(children);

    if (childrenCount > 1) {
        throw new Error("IconGallery - Expected to receive a single React element child");
    }

    return childrenCount !== 0 ? Children.toArray(children)[0] : undefined;
}

export function Variant({ size, copyValue, autosize, children, context }) {
    const { getCopyValue, itemName, itemChildrenProps } = context;

    const icon = getIcon(children);
    const containerSize = autosize ? Math.max(...itemChildrenProps.map(x => x.size)) : null;
    const containerStyle = autosize
        ? {
            width: containerSize,
            height: containerSize
        }
        : {};

    return (
        <div className="variant sbdocs sbdocs-ig-variant">
            <div className="header sbdocs sbdocs-ig-variant-header">{size}</div>
            <div className="content sbdocs sbdocs-ig-variant-content">
                {icon && <InnerIcon
                    icon={renderIcon(icon, size, autosize)}
                    copyValue={copyValue ? copyValue : getCopyValue({ itemName, variantSize: size, icon })}
                    containerStyle={containerStyle}
                />}
            </div>
            <style jsx>{styles}</style>
        </div>
    );
}

Variant.propTypes = {
    /**
     * The variant size.
     */
    size: number.isRequired,
    /**
     * A custom value to copy to the clipboard when the variant is clicked.
     */
    copyValue: string,
    /**
     * Automatically set the variant size as the width and height of the variant icon.
     */
    autosize: bool,
    /**
     * @ignore
     */
    context: shape(CONTEXT_SHAPE),
    /**
     * @ignore
     */
    children: any
};

Variant.defaultProps = {
    autosize: true
};
