import { any, bool, func } from "prop-types";
import { Children, cloneElement } from "react";
import css from "styled-jsx/css";
import { IconItem } from "./icon-item";
import { IconVariant } from "./icon-variant";

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

export function IconGallery({ getCopyValue, getDisplayName, autosize, children }) {
    const context = {
        getCopyValue,
        getDisplayName,
        autosize
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
     * @param {{ itemName: string, variantSize: number, icon: Component }} data
     * @returns {string}
     */
    getCopyValue: func,
    /**
     * Automatically set the variant size as the width and height of the variant icon.
     */
    autosize: bool,
    /**
     * @ignore
     */
    children: any.isRequired
};

IconGallery.defaultProps = {
    getDisplayName: ({ itemName }) => itemName,
    getCopyValue: ({ itemName, variantSize }) => `${itemName}${variantSize}`,
    autosize: true
};

IconGallery.Item = IconItem;
IconGallery.Variant = IconVariant;
