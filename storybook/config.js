import "@orbit-ui/fonts";
import { addParameters, configure } from "@storybook/react";
import "./styles.css";

addParameters({
    options: {
        brandTitle: "Icon Gallery"
    }
});

configure([require.context("../stories", true, /\.stories\.(mdx|jsx?)$/)], module);
