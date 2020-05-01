import { useEffect, useRef, useState } from "react";
import css from "styled-jsx/css";
import { CheckmarkIcon } from "./assets";

const styles = css` /* stylelint-disable-line */
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
        /* stylelint-disable-next-line */
        animation-duration: 500ms;
        animation-name: slidein;
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

    @keyframes slidein {
        from {
            opacity: 0;
            transform: translateY(-20px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
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
        <div className="icon sbdocs sbdocs-ig-icon" onKeyDown={onIconEnterKey} tabIndex={0}>
            {icon}
            <div className="copy sbdocs sbdocs-ig-copy" tabIndex={-1}>
                {!copySucceeded && <button
                    className="copy-action sbdocs sbdocs-ig-copy-action"
                    onClick={onIconClick}
                    type="button"
                    tabIndex={-1}
                >
                    Copy
                </button>}
                {copySucceeded && <div className="copy-succeeded sbdocs sbdocs-ig-copy-succeeded" tabIndex={-1}>
                    <CheckmarkIcon className="copy-checkmark sbdocs sbdocs-ig-copy-checkmark" tabIndex={-1} />
                </div>}
            </div>
            <form className="copy-form">
                <textarea
                    readOnly
                    ref={textAreaRef}
                    value={copyValue}
                    tabIndex={-1}
                />
            </form>
            <style jsx>{styles}</style>
        </div>
    );
}
