import { useEffect, useRef, useState } from "react";
import { a, useTransition } from "react-spring";
import css from "styled-jsx/css";
import { CheckmarkIcon } from "./assets";

// Using css.resolve because of the react-spring animation.
const { className, styles } = css.resolve` /* stylelint-disable-line */
    .icon {
        position: relative;
        display: flex;
        justify-content: center;
        align-items: center;
        width: 100%;
        height: 100%;
        outline: none;
    }

    .copy {
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
        box-sizing: content-box;
    }

    .icon:hover .copy,
    .icon:focus .copy,
    .icon:active .copy {
        opacity: 1;
        transition: opacity .15s ease-in;
    }

    .copy-action {
        position: absolute;
        color: #FFF;
        font-weight: 500;
        font-size: .75rem;
        cursor: pointer;
        width: 100%;
        height: 100%;
        background-color: transparent;
        border: 0;
        outline: none;
    }

    .copy-action::-moz-focus-inner {
        border: 0;
    }

    .copy-succeeded {
        position: absolute;
        display: flex;
        justify-content: center;
        align-items: center;
        width: 100%;
        height: 100%;
    }

    .copy-checkmark {
        width: 1rem;
        height: 1rem;
        fill: #FFF;
    }

    .copy-form {
        position: absolute;
        opacity: 0.01;
        height: 0;
        z-index: -1;
    }
`;

export function InnerIcon({ icon, copyValue }) {
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

    const onIconClick = () => {
        copyToClipboard();
    };

    const onIconEnterKey = event => {
        if (event.keyCode === 13) {
            copyToClipboard();
        }
    };

    const copyToClipboard = () => {
        textAreaRef.current.select();
        document.execCommand("copy");

        setCopySucceeded(true);
    };

    return (
        <div className={`${className} icon sbdocs sbdocs-ig-icon`} onKeyDown={onIconEnterKey} tabIndex={0}>
            {icon}
            <div className={`${className} copy sbdocs sbdocs-ig-copy`} tabIndex={-1}>
                {copyAnimation.map(({ item, props, key }) => {
                    if (item) {
                        return (
                            <a.div style={props} className={`${className} copy-succeeded sbdocs sbdocs-ig-copy-succeeded`} key={key} tabIndex={-1}>
                                <CheckmarkIcon className={`${className} copy-checkmark sbdocs sbdocs-ig-copy-checkmark`} tabIndex={-1} />
                            </a.div>
                        );
                    }

                    return (
                        <a.button
                            style={props}
                            className={`${className} copy-action sbdocs sbdocs-ig-copy-action`}
                            onClick={onIconClick}
                            type="button"
                            key={key}
                            tabIndex={-1}
                        >
                            Copy
                        </a.button>
                    );
                })}
            </div>
            <form className={`${className} copy-form`}>
                <textarea
                    readOnly
                    ref={textAreaRef}
                    value={copyValue}
                    tabIndex={-1}
                />
            </form>
            {styles}
        </div>
    );
}
