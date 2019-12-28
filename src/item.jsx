import { any, shape, string } from "prop-types";
import { Children, cloneElement } from "react";
import css from "styled-jsx/css";
import { CONTEXT_SHAPE } from "./context";

const styles = css` /* stylelint-disable-line */
    .item {
        flex-direction: column;
        flex: 0 1 calc(20% - 10px);
        margin: 0 10px 30px 0;
    }

    .name {
        padding-bottom: .75rem;
        text-align: center;
    }

    .children {
        display: flex;
        justify-content: center;
    }
`;

function renderChild(child, context) {
    return cloneElement(child, {
        context
    });
}

export function Item({ name, context, children }) {
    const { getDisplayName } = context;

    const displayName = getDisplayName({ itemName: name });
    const childrenProps = Children.map(children, x => x.props);

    return (
        <div className="item sbdocs sbdocs-ig-item">
            <div className="name sbdocs sbdocs-ig-name">{displayName}</div>
            <div className="children">
                {Children.map(children, x => renderChild(x, { ...context, itemName: name, itemChildrenProps: childrenProps }))}
            </div>
            <style jsx>{styles}</style>
        </div>
    );
}

Item.propTypes = {
    /**
     * The item name.
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
