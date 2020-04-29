import { useEffect, useRef, useState } from "react";
import css from "styled-jsx/css";

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
        padding: 0;
        background-color: #0E1C3D;
        width: 100%;
        height: 100%;
        box-sizing: content-box;
    }

    .icon:hover .copy,
    .icon:hover:focus .copy,
    .icon:hover:active .copy {
        opacity: 1;
        transition: opacity .15s ease-in;
    }

    .icon::after {
        position: absolute;
        color: #FFF;
        font-size: .75rem;
        display: flex;
        justify-content: center; /* align horizontal */
        align-items: center; /* align vertical */
        height: 100%;
        width: 100%;
    }

    .icon:hover::after {
        content: "Copy";
    }

    .icon:hover:focus::after,
    .icon:hover:active::after {
        opacity: 1;
        content: "\2713";
        animation-duration: 300ms;
        animation-name: slidein;
    }

    @keyframes slidein {
        from {
            opacity: 0;
            transform: translateY(-20px);
        }
        
        to {
            opacity: 1;
            transform: translateY(0px);
        }
    }
    
    .copy-action {
        position: absolute;
        color: #FFF;
        font-weight: 500;
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
                <button
                    className="copy-action sbdocs sbdocs-ig-copy-action"
                    onClick={onIconClick}
                    type="button"
                    tabIndex={-1}
                >
                </button>
                <div class="copy-text"></div>
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
