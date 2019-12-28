import { any, bool, shape, string } from "prop-types";
import { Children, cloneElement } from "react";
import css from "styled-jsx/css";
import { CONTEXT_SHAPE } from "./context";
import { itemStyles } from "./styles";

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

export function IconVariants({ name, autosize, children, context }) {
    const { getDisplayName } = context;

    const displayName = getDisplayName({ itemName: name });
    const renderingSize = autosize ? Math.max(...Children.map(children, x => x.props.size)) : null;

    return (
        <div className="item sbdocs sbdocs-ig-item">
            <div className="name sbdocs sbdocs-ig-name">{displayName}</div>
            <div className="variants sbdocs sbdocs-ig-variants">
                {Children.map(children, x => renderVariant(x, { ...context, itemName: name, autosize, renderingSize }))}
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
     * Automatically set the variant size as the width and height of the underlying icons.
     */
    autosize: bool,
    /**
     * @ignore
     */
    context: shape(CONTEXT_SHAPE),
    /**
     * @ignore
     */
    children: any.isRequired
};

IconVariants.defaultProps = {
    autosize: true
};
