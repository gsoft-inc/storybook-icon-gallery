import { any, number, shape, string } from "prop-types";
import { Children, cloneElement } from "react";
import css from "styled-jsx/css";
import { InnerIcon } from "./inner-icon";
import { CONTEXT_SHAPE, itemStyles } from "./shared";

const styles = css` /* stylelint-disable-line */
    .icon-wrapper {
        display: flex;
        justify-content: center;
    }

    .icon-container {
        min-width: 2rem;
        min-height: 2rem;
    }
`;

function renderIcon(icon, size) {
    return cloneElement(icon, {
        style: { width: size, height: size }
    });
}

export function IconItem({ name, size, copyValue, children, context }) {
    const { getDisplayName, getCopyValue } = context;

    const icon = Children.only(children);
    const displayName = getDisplayName({ name });

    return (
        <div className="item sbdocs sbdocs-ig-item">
            <div className="name sbdocs sbdocs-ig-name">{displayName}</div>
            <div className="icon-wrapper sbdocs-ig-icon-wrapper">
                <div className="icon-container sbdocs-ig-icon-container" style={{ width: size, height: size }}>
                    <InnerIcon
                        icon={renderIcon(icon, size)}
                        copyValue={copyValue ? copyValue : getCopyValue({ name, size, isVariant: false })}
                    />
                </div>
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
     * The icon size.
     */
    size: number,
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

IconItem.defaultProps = {
    size: 32
};
