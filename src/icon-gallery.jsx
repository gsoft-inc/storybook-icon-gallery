import { any, func } from "prop-types";
import { Children, cloneElement } from "react";
import css from "styled-jsx/css";
import { IconItem } from "./icon-item";
import { IconVariant } from "./icon-variant";
import { IconVariants } from "./icon-variants";

const styles = css` /* stylelint-disable-line */
    .icon-gallery {
        box-sizing: border-box;
        display: flex;
        flex-wrap: wrap;
    }
`;

function renderItem(item, context) {
    return cloneElement(item, {
        context: context
    });
}

export function IconGallery({ getCopyValue, getDisplayName, children }) {
    const context = {
        getCopyValue,
        getDisplayName
    };

    return (
        <div className="icon-gallery sbdocs sbdocs-ig">
            {Children.map(children, x => renderItem(x, context))}
            <style jsx>{styles}</style>
        </div>
    );
}

IconGallery.propTypes = {
    /**
     * Called during the rendering of an item to retrieve the display name of the matching item.
     * @param {{ itemName: string }} data
     * @returns {string}
     */
    getDisplayName: func,
    /**
     * Called during the rendering of a variant to retrieve the value to copy to the clipboard when the matching variant is clicked.
     * @param {{ itemName: string, variantSize: ?number, icon: Element }} data
     * @returns {string}
     */
    getCopyValue: func,
    /**
     * @ignore
     */
    children: any.isRequired
};

IconGallery.defaultProps = {
    getDisplayName: ({ itemName }) => itemName,
    getCopyValue: ({ itemName, variantSize }) => variantSize ? `${itemName}${variantSize}` : itemName
};

IconGallery.Variants = IconVariants;
IconGallery.Variant = IconVariant;
IconGallery.Item = IconItem;
