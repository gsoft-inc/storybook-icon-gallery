import { any, shape, string } from "prop-types";
import { Children, cloneElement } from "react";
import css from "styled-jsx/css";
import { CONTEXT_SHAPE, itemStyles } from "./shared";

const styles = css` /* stylelint-disable-line */
    .variants {
        display: flex;
        justify-content: center;
    }
`;

function renderVariant(variant, context) {
    return cloneElement(variant, {
        context
    });
}

export function IconVariants({ name, children, context }) {
    const { getDisplayName } = context;

    const displayName = getDisplayName({ name });
    const renderingSize = Math.max(...Children.map(children, x => x.props.size));

    return (
        <div className="item sbdocs sbdocs-ig-item">
            <div className="name sbdocs sbdocs-ig-name">{displayName}</div>
            <div className="variants sbdocs sbdocs-ig-variants">
                {Children.map(children, x => renderVariant(x, { ...context, itemName: name, renderingSize }))}
            </div>
            <style jsx>{itemStyles}</style>
            <style jsx>{styles}</style>
        </div>
    );
}

IconVariants.propTypes = {
    /**
     * The icon name.
     */
    name: string.isRequired,
    /**
     * @ignore
     */
    context: shape(CONTEXT_SHAPE),
    /**
     * @ignore
     */
    children: any.isRequired
};
