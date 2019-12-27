import { isNil } from "lodash";
import { any, number, shape, string } from "prop-types";
import { Children, cloneElement, useEffect, useRef, useState } from "react";
import { a, useTransition } from "react-spring";
import css from "styled-jsx/css";
import { CheckmarkIcon } from "./assets";
import { CONTEXT_SHAPE } from "./context";

// Using css.resolve because of the react-spring animation.
const { className, styles } = css.resolve` /* stylelint-disable-line */
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

    .iconContainer {
        position: relative;
        display: flex;
        justify-content: center;
        align-items: center;
        min-width: 2rem;
        min-height: 2rem;
    }

    .copyContainer {
        position: absolute;
        opacity: 0;
        transition: opacity .15s ease-in;
        display: flex;
        justify-content: center;
        align-items: center;
        padding: .25rem;
        background-color: #0E1C3D;
        width: 100%;
        height: 100%;
    }

    .content:hover .copyContainer,
    .content:focus .copyContainer,
    .content:active .copyContainer {
        opacity: 1;
        transition: opacity .15s ease-in;
    }

    .copyAction {
        display: flex;
        justify-content: center;
        align-items: center;
        color: #FFF;
        font-weight: 500;
        font-size: .75rem;
        cursor: pointer;
        width: 100%;
        height: 100%;
    }

    .copySucceeded {
        position: absolute;
        display: flex;
        justify-content: center;
        align-items: center;
        width: 100%;
        height: 100%;
    }

    .copyCheckmark {
        width: 1rem;
        height: 1rem;
        fill: #FFF;
    }

    .copyForm {
        opacity: 0.01;
        height: 0;
        position: absolute;
        z-index: -1;
    }
`;

function CopyAction({ size, copyValue, context: { name, getCopyValue }, icon }) {
    const [copySucceeded, setCopySucceeded] = useState(false);
    const textAreaRef = useRef(null);

    useEffect(() => {
        let timeoutId = null;

        if (copySucceeded) {
            timeoutId = setTimeout(() => {
                setCopySucceeded(false);
            }, 1000);
        }

        return () => clearTimeout(timeoutId);
    }, [copySucceeded]);

    const copyAnimation = useTransition(copySucceeded, null, {
        from: {
            opacity: 0,
            transform: "translate3d(0,-20px,0)"
        },
        enter: {
            opacity: 1,
            transform: "translate3d(0,0px,0)"
        },
        leave: {
            opacity: 0,
            transform: "translate3d(0,0px,0)"
        }
    });

    const copyToClipboard = () => {
        textAreaRef.current.select();
        document.execCommand("copy");

        setCopySucceeded(true);
    };

    return (
        <>
            <div className={`${className} copyContainer sbdocs sbdocs-ig-copy-container sbdocs-ig-copy-container-${size}`} onClick={copyToClipboard}>
                {copyAnimation.map(({ item, props, key }) => {
                    if (item) {
                        return (
                            <a.div style={props} className={`${className} copySucceeded sbdocs sbdocs-ig-copy-succeeded sbdocs-ig-copy-succeeded-${size}`} key={key}>
                                <CheckmarkIcon className={`${className} copyCheckmark sbdocs sbdocs-ig-copy-checkmark sbdocs-ig-copy-checkmark-${size}`} />
                            </a.div>
                        );
                    }

                    return <a.div style={props} className={`${className} copyAction sbdocs sbdocs-ig-copy-action sbdocs-ig-copy-action-${size}`} key={key}>Copy</a.div>;
                })}
            </div>
            <form className={`${className} copyForm`}>
                <textarea
                    readOnly
                    ref={textAreaRef}
                    value={!isNil(copyValue) ? copyValue : getCopyValue({ itemName: name, variantSize: size, icon })}
                />
            </form>
        </>
    );
}

function renderIcon(iconInstance, size, autosize) {
    if (autosize) {
        return cloneElement(iconInstance, {
            style: { width: size, height: size }
        });
    }

    return iconInstance;
}

function getIcon(children) {
    const childrenCount = Children.count(children);

    if (childrenCount > 1) {
        throw new Error("IconGallery - Expected to receive a single React element child");
    }

    return childrenCount !== 0 ? Children.toArray(children)[0] : undefined;
}

export function IconVariant({ size, copyValue, context, children }) {
    const { renderingSize, autosize } = context;

    const icon = getIcon(children);
    const iconContainerStyle = !autosize ? {} : {
        width: renderingSize,
        height: renderingSize
    };

    return (
        <div className={`${className} variant sbdocs sbdocs-ig-variant`}>
            <div className={`${className} header sbdocs sbdocs-ig-variant-header`}>{size}</div>
            <div className={`${className} content sbdocs sbdocs-ig-variant-content sbdocs-ig-variant-content-${size}`}>
                <div className={`${className} iconContainer sbdocs sbdocs-ig-icon-container sbdocs-ig-icon-container-${size}`} style={iconContainerStyle}>
                    {icon && renderIcon(icon, size, autosize)}
                    {icon && <CopyAction size={size} copyValue={copyValue} context={context} icon={icon} />}
                </div>
            </div>
            {styles}
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
    context: shape(CONTEXT_SHAPE),
    /**
     * @ignore
     */
    children: any
};
